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

document.addEventListener('click', ({
  target
}) => {

  if (target.classList.contains('header__btn')) {
    document.querySelector('.header__categories').classList.toggle('active');
  } else {
    document.querySelector('.header__categories').classList.remove('active');
  }
})


const burger = document.querySelector('.burger[data-burger]'),
  burgerClose = document.querySelector('.burger[data-burger-close]'),
  menu = document.querySelector('.header__nav');


  burger.addEventListener('click', () => {
    menu.classList.toggle('active');
    document.body.classList.toggle('lock');
  })


 menu.addEventListener('click', ({target}) => {
   if (target == menu || target == burgerClose) {
    menu.classList.remove('active');
    document.body.classList.remove('lock');
   }
 })



function accordeonTrigger(params) {
  if (window.innerWidth < 640) {
    const linksBtns = document.querySelectorAll('.links__list-title');
    linksBtns.forEach((item) => {
      item.addEventListener('click', () => {
        const itemParent = item.parentNode,
          itemSibling = item.nextSibling;
        itemParent.classList.toggle('active');
        if (itemParent.classList.contains('active')) {
          itemSibling.style.maxHeight = itemSibling.scrollHeight + 'px';
        } else {
          itemSibling.style.maxHeight = null;
        }
        
      })
    })

  }
}

accordeonTrigger();

const btnMore = document.querySelector('.text__btn-more'),
      sectionText = document.querySelector('.text');

      btnMore.addEventListener('click', () => {
        sectionText.classList.add('open')
      })