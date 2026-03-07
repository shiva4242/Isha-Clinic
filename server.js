const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch (e) {
    await fs.writeFile(DB_PATH, JSON.stringify({ appointments: [] }, null, 2));
  }
}

async function readDb() {
  const raw = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeDb(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

app.use(express.static(path.join(__dirname)));

app.get('/api/appointments', async (req, res) => {
  try {
    await ensureDb();
    const db = await readDb();
    res.json(db.appointments || []);
  } catch (err) {
    res.status(500).json({ message: 'Failed to read appointments' });
  }
});

app.post('/api/appointments', async (req, res) => {
  const { name, phone, service, message } = req.body || {};
  if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone are required' });
  }

  try {
    await ensureDb();
    const db = await readDb();
    const id = Date.now();
    const entry = { id, name, phone, service, message, createdAt: new Date().toISOString() };
    db.appointments = db.appointments || [];
    db.appointments.push(entry);
    await writeDb(db);
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save appointment' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
