document.getElementById('readMoreBtn').addEventListener('click', function() {
  window.location.href = './aboutUs.html';
});

document.addEventListener('DOMContentLoaded', function() {
  const wlcmNE = document.querySelector('.WlcmNE');

  function checkVisibility() {
      const rect = wlcmNE.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
          wlcmNE.classList.add('visible');
      }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Initial check in case the element is already in view
});