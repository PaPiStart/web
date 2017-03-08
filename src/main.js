function init() {
    showSwiper();
}

init();

function showSwiper() {
    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        autoplay: 3000, //可选选项，自动滑动
        autoplayDisableOnInteraction: false,
        loop: false,
        autoHeight: false, //高度随内容变化
    });
}

