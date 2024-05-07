console.log("\n %c基于 HeoMusic 开源静态音乐播放器 v1.3.2 二改（自用）：Gavin Chen%c https://github.com/zhheo/HeoMusic \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
var volume = 0.8;

// 获取地址栏参数
// 创建URLSearchParams对象并传入URL中的查询字符串
const params = new URLSearchParams(window.location.search);

var heo = {
  // 音乐节目切换背景
  changeMusicBg: function (isChangeBg = true) {
    const heoMusicBg = document.getElementById("music_bg")

    if (isChangeBg) {
      // player loadeddata 会进入此处
      const musiccover = document.querySelector("#heoMusic-page .aplayer-pic");
      var img = new Image();
      img.src = extractValue(musiccover.style.backgroundImage);
      img.onload = function() {
        heoMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
      };
    } else {
      // 第一次进入，绑定事件，改背景
      let timer = setInterval(()=>{
        const musiccover = document.querySelector("#heoMusic-page .aplayer-pic");
        // 确保player加载完成
        // console.info(heoMusicBg);
        if (musiccover) {
          clearInterval(timer)
          //初始化音量
          document.querySelector('meting-js').aplayer.volume(0.8,true);
          // 绑定事件
          heo.addEventListenerChangeMusicBg();
        }
      }, 100)
    }
  },
  addEventListenerChangeMusicBg: function () {
    const heoMusicPage = document.getElementById("heoMusic-page");
    heoMusicPage.querySelector("meting-js").aplayer.on('loadeddata', function () {
      heo.changeMusicBg();
      // console.info('player loadeddata');
    });
  },
  getCustomPlayList: function() {
    const heoMusicPage = document.getElementById("heoMusic-page");
    if (params.get("id") && params.get("server")) {
      console.log("获取到自定义内容")
      var id = params.get("id")
      var server = params.get("server")
      heoMusicPage.innerHTML = `<meting-js id="${id}" server=${server} type="playlist" mutex="true" preload="auto" order="random"></meting-js>`;
    }else {
      console.log("无自定义内容")
      heoMusicPage.innerHTML = `<meting-js id="${userId}" server="${userServer}" type="playlist" mutex="true" preload="auto" order="random"></meting-js>`;
    }
    heo.changeMusicBg(false);
  }
}

// 调用
heo.getCustomPlayList();


// 改进vh
const vh = window.innerHeight * 1;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 1;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//获取图片url
function extractValue(input) {
  var valueRegex = /\("([^\s]+)"\)/g;
  var match = valueRegex.exec(input);
  return match[1];
}

//空格控制音乐
document.addEventListener("keydown", function(event) {
  //暂停开启音乐
  if (event.code === "Space") {
    event.preventDefault();
    document.querySelector('meting-js').aplayer.toggle();
  };
  //切换下一曲
  if (event.keyCode === 39) {
    event.preventDefault();
    document.querySelector('meting-js').aplayer.skipForward();
  };
  //切换上一曲
  if (event.keyCode === 37) {
    event.preventDefault();
    document.querySelector('meting-js').aplayer.skipBack();
  }
  //增加音量
  if (event.keyCode === 38) {
    if (volume <= 1) {
      volume += 0.1;
      document.querySelector('meting-js').aplayer.volume(volume,true);
    }
  }
  //减小音量
  if (event.keyCode === 40) {
    if (volume >= 0) {
      volume += -0.1;
      document.querySelector('meting-js').aplayer.volume(volume,true);
    }
  }
});



//外接歌单置入
var JaySongsheet = [
      {
        "title":"你为何还未睡",
        "author":"邓思朗",
        "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/img/202405031119274.mp3",
        "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/img/202405031120468.jpg",
        "lrc":"../all_lrc/niweihe.lrc"
    },
    {
        "title":"Mojito",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL001.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWr5l.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL001.lrc"
    },{
        "title":"Try",
        "author":"派伟俊 / 周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL002.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWy1K.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL002.lrc"
    },{
        "title":"爱在西元前",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL003.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW7pP.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL003.lrc"
    },{
        "title":"本草纲目",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL004.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWm8S.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL004.lrc"
    },{
        "title":"不能说的秘密",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL005.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW4Bi.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL005.lrc"
    },{
        "title":"彩虹",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL006.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW1k6.md.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL006.lrc"
    },{
        "title":"稻香",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL007.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWNfb.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL007.lrc"
    },{
        "title":"东风破",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL008.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWPpC.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL008.lrc"
    },{
        "title":"发如雪",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL009.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWK0B.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL009.lrc"
    },{
        "title":"告白气球",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL010.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWhDD.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL010.lrc"
    },{
        "title":"公主病",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL011.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWgHa.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL011.lrc"
    },{
        "title":"花海",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL012.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWNfb.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL012.lrc"
    },{
        "title":"黄金甲",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL013.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWFnI.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL013.lrc"
    },{
        "title":"霍元甲",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL014.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWJxN.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL014.lrc"
    },{
        "title":"简单爱",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL015.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW7pP.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL015.lrc"
    },{
        "title":"菊花台",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL016.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWm8S.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL016.lrc"
    },{
        "title":"兰亭序",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL017.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWNfb.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL017.lrc"
    },{
        "title":"龙卷风",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL018.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWxw1.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL018.lrc"
    },{
        "title":"迷迭香",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL019.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWxw1.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL019.lrc"
    },{
        "title":"牛仔很忙",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL020.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW1k6.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL020.lrc"
    },{
        "title":"蒲公英的约定",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL021.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW1k6.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL021.lrc"
    },{
        "title":"千里之外",
        "author":"周杰伦 / 费玉清",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL022.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWm8S.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL022.lrc"
    },{
        "title":"千山万水",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL023.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWkSG.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL023.lrc"
    },{
        "title":"七里香",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL024.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWi8F.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL024.lrc"
    },{
        "title":"青花瓷",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL025.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW1k6.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL025.lrc"
    },{
        "title":"晴天",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL026.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWPpC.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL026.lrc"
    },{
        "title":"三年二班",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL027.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWPpC.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL027.lrc"
    },{
        "title":"珊瑚海",
        "author":"周杰伦 / Lara梁心颐",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL028.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWK0B.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL028.lrc"
    },{
        "title":"双截棍",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL029.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW7pP.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL029.lrc"
    },{
        "title":"算什么男人",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL030.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWZws.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL030.lrc"
    },{
        "title":"甜甜的",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL031.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW1k6.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL031.lrc"
    },{
        "title":"听爸爸的话",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL032.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWZws.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL032.lrc"
    },{
        "title":"听妈妈的话",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL033.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWm8S.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL033.lrc"
    },{
        "title":"烟花易冷",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL034.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWRfL.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL034.lrc"
    },{
        "title":"夜的第七章",
        "author":"周杰伦 / 潘儿",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL035.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWm8S.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL035.lrc"
    },{
        "title":"夜曲",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL036.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWK0B.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL036.lrc"
    },{
        "title":"一口气全念对",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL037.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWZws.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL037.lrc"
    },{
        "title":"一路向北",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL038.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWK0B.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL038.lrc"
    },{
        "title":"最伟大的作品",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL039.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWAKg.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL039.lrc"
    }
];
var t_load = setInterval(() => {
  if (document.querySelector("meting-js").aplayer != undefined){
    document.querySelector("meting-js").aplayer.list.add(JaySongsheet);
    clearInterval(t_load);
  };
},50);
