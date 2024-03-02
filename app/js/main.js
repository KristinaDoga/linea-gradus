$(function () {

   //Кастомизация активного пункта меню
   $('.menu a').each(function () {
      var location = window.location.href;
      var link = this.href;
      if (location == link) {
         $('.menu a').removeClass('menu__link--active');
         $(this).addClass('menu__link--active');
      }
   });

   //Поиск по фильтрам по нажатию на одну из кнопок
   function searchByFilter() {
      $('.catalog-filters').removeClass('catalog-filters--mobile-active');
      $('.product-list').removeClass('disable');
   }
   $('.filter-search__btn').on('click', searchByFilter);
   $('.filter-price__btn').on('click', searchByFilter);
   $('.catalog-filters__btn').on('click', searchByFilter);

   //Вывод сообщений при нажатии на кнопки
   function removeMessage() {
      document.querySelector('div').remove();
   };
   function addToCard() {
      const message = document.createElement('div');
      message.innerHTML = "товар успешно добавлен в корзину";
      message.style.cssText = `
      background-color: #2ECC71;
        box-shadow: 0px 7px 20px 0px #27ae5f63;
      font-family: "Roboto Regular",sans-serif;
      font-weight: 400;
      font-size: 16px;
      text-transform: uppercase;
      color: #fff;
      position: fixed;
      text-align: center;
      padding: 20px;
      top: 0;
      right: 0;
      left: 0;
      z-index: 5;
      `
      $('.header').before(message);
      setTimeout(removeMessage, 2000);
   }
   function orderSend() {
      const message = document.createElement('div');
      message.innerHTML = "Ваш заказ отправлен на обработку";
      message.style.cssText = `
         background-color: #2ECC71;
         box-shadow: 0px 7px 20px 0px #27ae5f63;
         font-family: "Roboto Regular",sans-serif;
         font-weight: 400;
         font-size: 16px;
         text-transform: uppercase;
         color: #fff;
         position: fixed;
         text-align: center;
         padding: 20px;
         top: 0;
         right: 0;
         left: 0;
         z-index: 5;
         `
      $('.header').before(message);
      setTimeout(removeMessage, 2000);

   }
   function AddToFavour() {
      const message = document.createElement('div');
      message.innerHTML = "Товар добавлен в избранное";
      message.style.cssText = `
      background-color: #2ECC71;
        box-shadow: 0px 7px 20px 0px #27ae5f63;
      font-family: "Roboto Regular",sans-serif;
      font-weight: 400;
      font-size: 16px;
      text-transform: uppercase;
      color: #fff;
      position: fixed;
      text-align: center;
      padding: 20px;
      top: 0;
      right: 0;
      left: 0;
      z-index: 5;
      `
      $('.header').before(message);
      setTimeout(removeMessage, 2000);
   }
   function removeCard() {
      const message = document.createElement('div');
      message.innerHTML = "Товар удален из корзины";
      message.style.cssText = `
      background-color: #2ECC71;
        box-shadow: 0px 7px 20px 0px #27ae5f63;
      font-family: "Roboto Regular",sans-serif;
      font-weight: 400;
      font-size: 16px;
      text-transform: uppercase;
      color: #fff;
      position: fixed;
      text-align: center;
      padding: 20px;
      top: 0;
      right: 0;
      left: 0;
      z-index: 5;
      `
      $('.header').before(message);
      setTimeout(removeMessage, 2000);
   }
   function subscribeMessage() {
      const message = document.createElement('div');
      message.innerHTML = "Вы подписаны";
      message.style.cssText = `
      background-color: #2ECC71;
        box-shadow: 0px 7px 20px 0px #27ae5f63;
      font-family: "Roboto Regular",sans-serif;
      font-weight: 400;
      font-size: 16px;
      text-transform: uppercase;
      color: #fff;
      position: fixed;
      text-align: center;
      padding: 20px;
      top: 0;
      right: 0;
      left: 0;
      z-index: 5;
      `
      $('.header').before(message);
      setTimeout(removeMessage, 2000);
   }
   $('.product-item__link--line').on('click', addToCard);
   $('.product-item__btn').on('click', addToCard);
   $('.ware__btn').on('click', addToCard);
   $('.order-btn').on('click', orderSend);
   $('.product-item__link--favourite').on('click', AddToFavour);
   $('.card-info__btn').on('click', removeCard);
   $('.footer__form-btn').on('click', subscribeMessage);


   //смена табов в карточке тоавра
   $('.ware-tabs__top-item').on('click', function (e) {
      e.preventDefault();
      $('.ware-tabs__top-item').removeClass('ware-tabs__top-item--active');
      $(this).addClass('ware-tabs__top-item--active');
      $('.ware-tabs__content-item').removeClass('ware-tabs__content-item--active');
      $($(this).attr('href')).addClass('ware-tabs__content-item--active');
   })

   // Счётчик. Количество товара в корзине
   $('.count__num-minus').on('click', function () {
      this.nextElementSibling.stepDown();
      // this.nextElementSibling.onchange();
   });
   $('.count__num-plus').on('click', function () {
      this.previousElementSibling.stepUp();
      // this.previousElementSibling.onchange();
   });

   //Кастомизация кнопок переключения внешнего вида товара grig/list
   $('.product-list__btn').on('click', function () {
      $('.product-list__btn').removeClass('product-list__btn--active');
      $(this).addClass('product-list__btn--active');
   })
   //Изменение внешнего вида товара grig/list
   $('.btn-list').on('click', function () {
      $('.product-item').addClass('product-item--list')
   });
   $('.btn-grid').on('click', function () {
      $('.product-item').removeClass('product-item--list')
   });
   //Пагинация
   $('.pagination__link').on('click', function () {
      $('.pagination__link').removeClass('pagination__link--active');
      $(this).addClass('pagination__link--active');
   })

   //В мобильной версии страницы каталога фильтры появляются при нажатии на кнопку
   $('.product-list__filter-btn').on('click', function () {
      $('.catalog-filters').addClass('catalog-filters--mobile-active');
      $('.product-list').addClass('disable');
   });

   //Ранжирование цены в фильтре на странице каталога
   $(".filter-price__input").ionRangeSlider({
      type: "double",
      prefix: "$",
      onStart: function (data) {
         $('.filter-price__from').text(data.from);
         $('.filter-price__to').text(data.to);
      },
      onChange: function (data) {
         $('.filter-price__from').text(data.from);
         $('.filter-price__to').text(data.to);
      },
   });
});

//кастомизация слайдера в карточке товара
//Ленты
$('.ware__slider-scroll').slick({
   draggable: false,
   arrows: false,
   slidesToShow: 3,
   slidesToScroll: 1,
   asNavFor: '.ware__slider-show',
   centerMode: true,
   focusOnSelect: true,
   vertical: true

});
//и основного слайдера
$('.ware__slider-show').slick({
   draggable: false,

   slidesToShow: 1,
   slidesToScroll: 1,
   arrows: false,
   fade: true,
   asNavFor: '.ware__slider-scroll'
});
//кастомизация слайдера на главной станице
$('.top-slider__wrapper').slick({
   dots: true,
   arrows: false,
   autoplay: true,
});

//рейтинг товара
$('.product-item__rank, .ware__rank').rateYo({
   starWidth: "17px",
   normalFill: "#ccccce",
   ratedFill: "#ffc35b",
   readOnly: true,
});

//счётчик на главной странице
var deadline = $('.promo__clock').attr('data-clock');
function time_remaining(endtime) {
   var t = Date.parse(endtime) - Date.parse(new Date());
   var seconds = Math.floor((t / 1000) % 60);
   var minutes = Math.floor((t / 1000 / 60) % 60);
   var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
   var days = Math.floor(t / (1000 * 60 * 60 * 24));
   return { 'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds };
}
function run_clock(id, endtime) {
   var clock = document.querySelector('.promo__clock');

   var days_span = clock.querySelector('.promo__days');
   var hours_span = clock.querySelector('.promo__hours');
   var minutes_span = clock.querySelector('.promo__minutes');
   var seconds_span = clock.querySelector('.promo__seconds');

   function update_clock() {
      var t = time_remaining(endtime);

      days_span.innerHTML = t.days;
      hours_span.innerHTML = ('0' + t.hours).slice(-2);
      minutes_span.innerHTML = ('0' + t.minutes).slice(-2);
      seconds_span.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) { clearInterval(timeinterval); }
   }
   update_clock();
   var timeinterval = setInterval(update_clock, 1000);
}
run_clock('clockdiv', deadline);
