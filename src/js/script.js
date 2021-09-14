const swiper = new Swiper('.promo__slider', {
  loop: true,
  spaceBetween: 30,
  speed: 400,
  autoplay: true,


  pagination: {
    el: '.promo__bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.promo__slider-btn_next',
    prevEl: '.promo__slider-btn_prev',
  },
});

const linkMore = document.querySelector('.header__menu-link_more'),
    listMore = document.querySelector('.header__mobile-list');

linkMore.addEventListener('click', (e) => {
    e.preventDefault();
    listMore.classList.toggle('active');
});

document.addEventListener('click', ({target}) => {

    if (target.classList.contains('header__btn')) {
      document.querySelector('.header__categories-list').classList.toggle('active');
    } else {
      document.querySelector('.header__categories-list').classList.remove('active');
    }
    if (document.querySelector('.products__sort-form')) {
      if (target.classList.contains('products__sort-btn')) {
        document.querySelector('.products__sort-items').classList.toggle('active');
      } else if (!target.classList.contains('products__sort-btn')) {
        document.querySelector('.products__sort-items').classList.remove('active');
      }
    }
    
  
  })


const burger = document.querySelector('.burger[data-burger]'),
    burgerClose = document.querySelector('.burger[data-burger-close]'),
    menu = document.querySelector('.header__nav');

burger.addEventListener('click', () => {
    menu.classList.toggle('active');
    document.body.classList.toggle('lock');
})
burgerClose.addEventListener('click', () => {
    menu.classList.remove('active');
    document.body.classList.remove('lock');
})