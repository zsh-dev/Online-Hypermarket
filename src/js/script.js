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

document.querySelectorAll('.catalog__btn-filter').forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('active')
  })
});

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

const filterCloseBtn = document.querySelector('.filter__close'),
  filterOpenBtn = document.querySelector('.catalog__btn-open');;

filterOpenBtn.addEventListener('click', () => {
  document.querySelector('.filter').classList.add('active');
  document.body.classList.add('lock')
})

filterCloseBtn.addEventListener('click', () => {
  document.querySelector('.filter').classList.remove('active');
  document.body.classList.remove('lock')
})


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



if (window.innerWidth < 640) {
  accordeonTrigger('.links__list-title');
}


const btnMore = document.querySelector('.text__btn-more'),
  sectionText = document.querySelector('.text');

if (btnMore) {
  btnMore.addEventListener('click', () => {
    sectionText.classList.add('open')
  })
}