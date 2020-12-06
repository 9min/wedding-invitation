const $ = (name) => document.querySelector(name);
const addEvent = (target, event, callback) =>
  target.addEventListener(event, callback);
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

class WeddingInvitation {
  constructor() {
    this.name = "엠타워컨벤션";
    this.location = {
      lat: 37.3844042,
      lon: 126.931606,
    };
    this.pageUrl = "https://9min.github.io/wedding-invitation/";
    this.imgUrl =
      "https://9min.github.io/wedding-invitation/src/images/visual/main.jpg";
    this.el = null;

    this.init();
    this.initElements();
    this.initEvents();
    this.dday();
    this.balloon();
  }

  init = () => {
    Kakao.init("1156a56912dacaa8c7473a4bec0234b9");
  };

  initElements = () => {
    this.el = {
      dday: $("#dday"),
      cover: $("#cover"),
      gallery: $("#gallery"),
      btnKakaoNavi: $("#btnKakaoNavi"),
      btnKakaoMap: $("#btnKakaoMap"),
      btnNaverMap: $("#btnNaverMap"),
      btnTMap: $("#btnTMap"),
      btnKakaoTalk: $("#btnKakaoTalk"),
      btnFacebook: $("#btnFacebook"),
      btnBride: $("#btnBride"),
      btnQRcode: $("#btnQRcode"),
    };
  };

  initEvents = () => {
    const {
      gallery,
      btnKakaoNavi,
      btnKakaoMap,
      btnNaverMap,
      btnTMap,
      btnKakaoTalk,
      btnFacebook,
      btnBride,
      btnQRcode,
    } = this.el;
    lightGallery(gallery, {
      download: false,
      preload: 2,
    });

    addEvent(btnKakaoNavi, "click", this.onClickKakaoNavi);
    addEvent(btnKakaoMap, "click", this.onClickKakaoMap);
    addEvent(btnNaverMap, "click", this.onClickNaverMap);
    addEvent(btnTMap, "click", this.onClickTMap);
    addEvent(btnKakaoTalk, "click", this.onClickKakaoTalk);
    addEvent(btnFacebook, "click", this.onClickShareFacebook);
    addEvent(btnBride, "click", this.onClickBride);
    addEvent(btnQRcode, "click", this.onClickQRcode);
  };

  dday = () => {
    const dday = new Date("November 14, 2020 00:00:00");
    const gap = dday.getTime() - new Date().getTime();
    const date = Math.floor(gap / (1000 * 60 * 60 * 24)) + 1;
    this.el.dday.innerHTML = date > 0 ? `D-${date}` : `D+${Math.abs(date)}`;
  };

  balloon = () => {
    const ratio = isMobile ? 2 : 1;
    const target = this.el.cover;
    const targetWidth = target.clientWidth;
    const targetHeight = target.clientHeight;

    const X = 0;
    const Y = 200;
    const speed = () => Math.random() * 7 + 10;
    const delay = () => Math.random() * 12 - 5;
    const getRandomX = () => Math.random() * (targetWidth * ratio + 200) - 100;
    const getStartY = () => targetHeight + Math.random() * 300 + 350;
    const getEndY = () => -targetHeight;

    const createBalloon = ({ id, fillColor }) => {
      return `
        <g id='${id}'>
          <defs>
            <radialGradient id="RadialGradient${id}" cx="0.60" cy="0.38" r="0.35">
              <stop offset="0%" stop-color="white"/>
              <stop offset="100%" stop-color="${fillColor}"/>
            </radialGradient>
          </defs>
          <path id='balloon' fill='url(#RadialGradient${id})' stroke='${fillColor}' d="M${
        X - 1
      } ${Y - 4} c-85 -100 85 -100 2 0"/>
          <path id='balloon-bottom' fill='${fillColor}' d="M${X + 3} ${
        Y - 2
      } h-5 l2 -2 l2 0 " stroke='${fillColor}' />
          <path id='thread' d="M${X + 7} ${
        Y - 4
      } h-4 q-20,2,1,45 q15,30,-3,49 q-21,22,4,65" fill='none' stroke='${fillColor}'/>
        </g>
      `;
    };

    const colors = [
      "rgba(134, 117, 169, 0.8)",
      "rgba(239, 187, 207, 0.8)",
      "rgba(221, 243, 245, 0.8)",
      "rgba(250, 240, 175, 0.8)",
      "rgba(238, 218, 209, 0.8)",
      "rgba(227, 99, 135, 0.8)",
      "rgba(160, 193, 184, 0.8)",
      "rgba(125, 90, 90, 0.8)",
      "rgba(188, 101, 141, 0.8)",
      "rgba(130, 196, 195, 0.8)",
      "rgba(249, 249, 249, 0.8)",
      "rgba(255, 235, 153, 0.8)",
      "rgba(117, 183, 158, 0.8)",
      "rgba(117, 129, 132, 0.8)",
      "rgba(230, 178, 198, 0.8)",
      "rgba(215, 127, 161, 0.8)",
      "rgba(255, 187, 204, 0.8)",
      "rgba(182, 255, 234, 0.8)",
      "rgba(174, 239, 240, 0.8)",
      "rgba(245, 251, 241, 0.8)",
      "rgba(238, 238, 238, 0.8)",
    ];
    const balloons = colors.map((fillColor, i) => ({
      id: `balloon${i}`,
      fillColor,
    }));

    this.el.cover.innerHTML = `
      <svg viewBox="-10 -10 ${targetWidth * ratio} ${targetHeight * ratio}">
          ${balloons.map(createBalloon).join("")}
      </svg>
    `;

    balloons.forEach(({ id }) => {
      TweenMax.fromTo(
        `#${id}`,
        speed(),
        {
          css: { transform: `translate(${getRandomX()}px, ${getStartY()}px)` },
        },
        {
          css: { transform: `translate(${getRandomX()}px, ${getEndY()}px)` },
          repeat: -1,
          delay: delay(),
        }
      );
    });
  };

  onClickKakaoNavi = () => {
    Kakao.Navi.start({
      name: "엠타워컨벤션",
      x: 126.934311592801,
      y: 37.3843947506304,
      coordType: "wgs84",
    });
  };

  onClickKakaoMap = () => {
    window.location.href =
      "https://m.map.kakao.com/actions/detailMapView?id=20515606&refService=place#none";
  };

  onClickNaverMap = () => {
    window.location.href =
      "https://m.place.naver.com/place/34585318/location?subtab=location";
  };

  onClickTMap = () => {
    window.location.href = `https://apis.openapi.sk.com/tmap/app/routes?appKey=l7xx0cad021f2b204989bff69ad3176bd011&name=${this.name}&lon=${this.location.lon}&lat=${this.location.lat}`;
  };

  onClickKakaoTalk = () => {
    Kakao.Link.sendDefault({
      objectType: "location",
      address: "경기 안양시 만안구 안양로 104 엠타워컨벤션 6층 파티오볼룸",
      addressTitle: "엠타워컨벤션",
      content: {
        title: "구민♥주희 결혼식에 초대합니다!",
        description: "11/14(토) pm 5:30 안양 엠타워컨벤션",
        imageUrl: this.imgUrl,
        link: {
          mobileWebUrl: this.pageUrl,
          webUrl: this.pageUrl,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: this.pageUrl,
            webUrl: this.pageUrl,
          },
        },
      ],
    });
  };

  onClickShareFacebook = () => {
    window.open(
      `http://facebook.com/sharer/sharer.php?u=${this.pageUrl}`,
      "",
      "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  onClickBride = () => {
    window.location.href = "https://joohee0928.github.io/wedding-invitation/";
  };

  onClickQRcode = () => {
    window.location.href = "https://accounts.kakao.com/qr_check_in";
  };
}

new WeddingInvitation();
