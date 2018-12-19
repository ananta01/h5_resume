(function () {
  let devWidth = 640;
  let clientWidth = document.documentElement.clientWidth;
  let ratio = clientWidth / devWidth;
  let mainEle = document.querySelector('.main');
  if (clientWidth > devWidth) {
    mainEle.style.margin = '0 auto';
    mainEle.style.width = devWidth + 'px';
    return
  }
  document.documentElement.style.fontSize = ratio * 100 + 'px';
})();

let init = (function () {

  // 初始化swiper
  function initSwiper() {
    new Swiper('.swiper-container', {
      loop: true,
      direction : 'vertical',
      on: {
        slideChangeTransitionEnd: function () {
          let slideArr = this.slides;
          let curIndex = this.activeIndex;
          let allCount = slideArr.length;

          let tarId = 'page';
          switch (curIndex) {
            case 0:
              tarId += allCount - 2;
              break;
            case (allCount - 1):
              tarId += 1;
              break;
            default:
              tarId += curIndex
          }

          Array.from(slideArr).forEach(function (item, index) {
            if (curIndex === index) {
              item.id = tarId;
              return;
            }
            item.id = ''
          })
        }
      }
    })
  }

  // 初始化audio
  function initAudio() {
    let domMusic = document.getElementsByClassName('audio')[0];
    let domAudio = document.getElementById('audio-mp3');

    domMusic.addEventListener('click', function () {
      if (domAudio.paused) {
        domAudio.play();
        domMusic.className = 'audio audio-rotate';
      } else {
        domAudio.pause();
        domMusic.className = 'audio'
      }
    }, false);

    // 解决iphone在微信不能自动播放
    document.addEventListener('WeixinJSBridgeReady', controlMusic, false)

    // 控制音乐参数
    function controlMusic() {
      domAudio.volume = 0.2;
      domAudio.play();
      domAudio.addEventListener('canplay', function () {
        domMusic.className = 'audio audio-rotate';
      }, false)
    }

    controlMusic()
  }


  return {
    initSwiper,
    initAudio
  }

})();

init.initSwiper()
init.initAudio()