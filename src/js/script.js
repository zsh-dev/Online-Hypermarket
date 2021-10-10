// Слайдеры
const promoSlider = new Swiper('.promo__slider', {
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

const productSliderNav = document.querySelector('.product__slider-nav'),
  productSliderMain = document.querySelector('.product__slider-main');

const sliderProductNav = new Swiper(productSliderNav, {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,

  spaceBetween: 20,
})

const sliderProductMain = new Swiper(productSliderMain, {
  slidesPerView: 1,
  spaceBetween: 40,
  centeredSlides: true,
  speed: 600,
  breakpoints: {
    // when window width is >= 320px
    320: {
      direction: 'horizontal',
    },
    768: {
      direction: 'vertical',

    },

  },
  pagination: {
    el: '.product__slider-bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.product__slider-btn_next',
    prevEl: '.product__slider-btn_prev',
  },
  thumbs: {
    swiper: sliderProductNav
  }
})

// Кнопка для выбора города

function modalOpen(someModal) {
  modal.classList.add('active');
  someModal.classList.add('active');
  document.body.classList.add('lock');
}

function modalClose(someModal) {
  modal.classList.remove('active');
  someModal.classList.remove('active');
  document.body.classList.remove('lock');
}

const btnCity = document.querySelector('.header__city'),
modal = document.querySelector('.modal'),
  modalCity = document.querySelector('.modal-city');

btnCity.addEventListener('click', () => {
  modalOpen(modalCity)
})


modal.addEventListener('click', ({target}) => {
  if (target == modal || target.classList.contains('btn-close') || target.classList.contains('modal-city__link')) {
    modalClose(modalCity);
  }
  if (target.classList.contains('modal-city__link')) {
    btnCity.textContent = target.textContent;
  }
})

// ССылка еще

const linkMore = document.querySelector('.header__menu-link_more'),
      listMore = document.querySelector('.header__mobile-list');

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('header__btn')) {
    document.querySelector('.header__categories').classList.toggle('active');
  } else {
    document.querySelector('.header__categories').classList.remove('active');
  }
  if (linkMore) {
    if (target == linkMore) {
      event.preventDefault();
      listMore.classList.toggle('active');
    } else {
      listMore.classList.remove('active');
    }
  }
})

// Модадльное окно заказа

const products = document.querySelector('.products'),
      modalOrder = document.querySelector('.modal-order'),
      btnModalClose = document.querySelector('.modal-order .btn-close');

products.addEventListener('click', ({target}) => {
  if (target.classList.contains('card__btn')) {
    let product = target.parentNode;


    let productTitle = product.querySelector('.card__title').textContent,
     productImg = product.querySelector('.card__img img').getAttribute('src'),
     productPrice = product.querySelector('.card__price').textContent,
     productPriceOld = product.querySelector('.card__price_old').textContent,
     productRating = product.querySelector('.rating').outerHTML,
     productComment = product.querySelector('.feedback__comments').textContent,
     productCommentLink = product.querySelector('.feedback__comments').getAttribute('href');





    
    modalOrder.querySelector('.product__title').textContent = productTitle;
    modalOrder.querySelector('.product__img img').setAttribute('src', productImg);
    modalOrder.querySelector('.product__price').textContent = productPrice;
    modalOrder.querySelector('.product__price_old').textContent = productPriceOld;
    modalOrder.querySelector('.feedback__comments span').textContent = productComment;
    modalOrder.querySelector('.feedback__comments span').setAttribute('src', productCommentLink);
    modalOrder.querySelector('.rating').innerHTML = productRating;

    modalOpen(modalOrder);
  }
})

modal.addEventListener('click', ({target}) => {
  if (target == modal || target.classList.contains('btn-close')) {
    modalClose(modalOrder);
  }
})


// Кнопки сортировки
document.querySelectorAll('.catalog__btn-filter').forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('active')
  })
});

// Вид каталога товаров

const btnSortList = document.querySelector('.catalog__btn_list'),
  btnSortGrid = document.querySelector('.catalog__btn_grid'),
  catalogProducts = document.querySelector('.catalog__products'),
  cards = document.querySelectorAll('.catalog__products .card');

if (btnSortList) {
  btnSortList.addEventListener('click', () => {
    btnSortGrid.classList.remove('active')
    btnSortList.classList.add('active')
    catalogProducts.classList.remove('catalog__grid')
    cards.forEach((card) => {
      if (!card.classList.contains('card-list')) {
        card.classList.add('card-list')
        card.classList.remove('card-grid')
      }
    })
  })

}

if (btnSortGrid) {
  btnSortGrid.addEventListener('click', () => {
    btnSortList.classList.remove('active')
    btnSortGrid.classList.add('active')
    catalogProducts.classList.add('catalog__grid')
    cards.forEach((card) => {
      if (!card.classList.contains('card-grid')) {
        card.classList.add('card-grid')
        card.classList.remove('card-list')
      }
    })
  })
}


// Аккордеон

function accordeonTrigger(selectors) {
  const items = document.querySelectorAll(selectors);
  items.forEach((item) => {
    const itemParent = item.parentNode,
      itemSibling = item.nextSibling;

    if (itemParent.classList.contains('active')) {
      itemSibling.style.maxHeight = itemSibling.scrollHeight + 'px';
    }
    item.addEventListener('click', () => {

      itemParent.classList.toggle('active');
      if (itemParent.classList.contains('active')) {
        itemSibling.style.maxHeight = itemSibling.scrollHeight + 'px';
      } else {
        itemSibling.style.maxHeight = null;
      }

    })
  })
}

accordeonTrigger('.filter__title');
accordeonTrigger('.product__info-btn');
if (window.innerWidth < 640) {
  accordeonTrigger('.links__list-title');
}


// Работа с ползунком

const rangeSlider = document.querySelector('.filter__range');
const rangeMinInput = document.getElementById('rangeMin'),
  rangeMaxInput = document.getElementById('rangeMax');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [0, 999999],
    connect: true,
    range: {
      'min': 0,
      'max': 150000
    }
  });

}

const inputs = [rangeMinInput, rangeMaxInput];
if (rangeSlider) {
  rangeSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

}



const setRangeSlider = (i, value) => {
  let arr = [null, null];
  arr[i] = value;

  console.log(arr);

  rangeSlider.noUiSlider.set(arr);
};


if (inputs) {
  inputs.forEach((el, index) => {
    if (el) {
      el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      });
    }

  });
}

// Открытие и закрытие фильтра

const filterCloseBtn = document.querySelector('.filter__close'),
  filterOpenBtn = document.querySelector('.catalog__btn-open');

if (filterOpenBtn) {
  filterOpenBtn.addEventListener('click', () => {
    document.querySelector('.filter').classList.add('active');
    document.body.classList.add('lock')
  })
}
if (filterCloseBtn) {
  filterCloseBtn.addEventListener('click', () => {
    document.querySelector('.filter').classList.remove('active');
    document.body.classList.remove('lock')
  })
}




// Работа с бургер меню

const burger = document.querySelector('.burger[data-burger]'),
  burgerClose = document.querySelector('.burger[data-burger-close]'),
  menu = document.querySelector('.header__nav');


burger.addEventListener('click', () => {
  menu.classList.toggle('active');
  document.body.classList.toggle('lock');
})


menu.addEventListener('click', ({
  target
}) => {
  if (target == menu || target == burgerClose) {
    menu.classList.remove('active');
    document.body.classList.remove('lock');
  }
})


const btnFormOpen = document.querySelector('.header__btn-search_open'),
  btnFormClose = document.querySelector('.header__form-close'),
  headerForm = document.querySelector('.header__form');

btnFormOpen.addEventListener('click', () => {
  headerForm.classList.add('active')
  document.body.classList.add('lock')
})

headerForm.addEventListener('click', ({
  target
}) => {
  if (target == headerForm || target == btnFormClose) {
    headerForm.classList.remove('active')
    document.body.classList.remove('lock')
  }

})



// Кнопка показать еще

const btnMore = document.querySelector('.text__btn-more'),
  sectionText = document.querySelector('.text');

if (btnMore) {
  btnMore.addEventListener('click', () => {
    sectionText.classList.add('open')
  })
}

const specificationsLink = document.querySelector('.product__link');

if (specificationsLink) {
  specificationsLink.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = specificationsLink.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}



const tabBtns = document.querySelectorAll('.specifications__btn'),
  tabContent = document.querySelectorAll('.specifications__item');
if (tabBtns) {
  tabBtns.forEach((btn) => {

    btn.addEventListener('click', () => {
      let btnId = btn.getAttribute('data-tab'),
        tab = document.querySelector(btnId);

      if (!btn.classList.contains('active')) {
        tabBtns.forEach((btn) => {
          btn.classList.remove('active');
        })
        tabContent.forEach((tab) => {
          tab.classList.remove('active');
        })

        btn.classList.add('active')
        tab.classList.add('active')
      }


    })
  })


}

if (window.innerWidth < 768) {
  accordeonTrigger('.specifications__title');
}