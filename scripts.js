// scripts.js
// Reveal on scroll and gallery lightbox

document.addEventListener('DOMContentLoaded', ()=>{
  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  reveals.forEach(r=>io.observe(r));

  // Gallery lightbox
  const galleryBtns = Array.from(document.querySelectorAll('.gallery-btn'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lb-img');
  const lbClose = document.querySelector('.lb-close');
  const lbPrev = document.querySelector('.lb-prev');
  const lbNext = document.querySelector('.lb-next');
  let currentIndex = 0;

  function openLightbox(index){
    currentIndex = index;
    const img = galleryBtns[index].querySelector('img');
    lbImg.src = img.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
  }

  function next(){
    currentIndex = (currentIndex + 1) % galleryBtns.length;
    openLightbox(currentIndex);
  }
  function prev(){
    currentIndex = (currentIndex - 1 + galleryBtns.length) % galleryBtns.length;
    openLightbox(currentIndex);
  }

  galleryBtns.forEach((btn, idx)=>{
    btn.addEventListener('click', ()=> openLightbox(idx));
  });
  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', next);
  lbPrev.addEventListener('click', prev);

  // keyboard controls
  document.addEventListener('keydown', (e)=>{
    if(lightbox.classList.contains('open')){
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowRight') next();
      if(e.key === 'ArrowLeft') prev();
    }
  });

  // close when clicking outside image
  lightbox.addEventListener('click', (e)=>{
    if(e.target === lightbox) closeLightbox();
  });
});
