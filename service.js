document.addEventListener('DOMContentLoaded', function() {
    const left_content = document.querySelector('.left_content');
  
    function checkVisibility() {
        const rect = left_content.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            left_content.classList.add('visible');
        }
    }
  
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check in case the element is already in view
  });