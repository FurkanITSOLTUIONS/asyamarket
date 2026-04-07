
const menuToggle = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');
const headerTools = document.getElementById('header-tools');
if (menuToggle && mainNav && headerTools) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('mobile-open');
    headerTools.classList.toggle('mobile-open');
  });
}
