import {
  gsap, ScrollToPlugin, Power3, ScrollTrigger,
} from 'gsap/all';
import Swiper from 'swiper/bundle';
import Smarquee from 'smarquee';
import RAFManager from 'raf-manager';
// import Rellax from 'rellax';
import SplitText from '../modules/split';
import breakpoints from '../modules/breakpoints';

const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);

export default class {
  constructor() {
    this.namespace = 'home';
  }

  init(data) {

    // const { container } = data.next;
    // hp services slider
    //= ============================
    this.hpServicesSlider = new Swiper('.hp-services__swiper-init', {
      speed: 600,
      slidesPerView: 'auto',
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
    });

    // hp-projects slider
    //= ============================
    this.hpProjectsSlider = new Swiper('.hp-projects__swiper-init', {
      speed: 600,
      slidesPerView: 'auto',
      grabCursor: true,
    });

    this.hpProjectsSliderUpdate = () => {
      const progress = clamp(this.hpProjectsSlider.progress * 2, 0, 1);
      const rev = 1 - progress;

      gsap.to('.hp-projects__copy', {
        autoAlpha: rev,
        xPercent: progress * (-window.innerWidth * 0.1) * 0.25,
      });
    };
    if (window.innerWidth > breakpoints.sm) {
      RAFManager.add(this.hpProjectsSliderUpdate);
    }

    // hp facilities
    //= ============================
    this.facilitiesScrolTrigger = gsap.timeline({
      defaults: { ease: Power3.easeInOut },
      scrollTrigger: {
        trigger: document.querySelector('.hp-facilities__container'),
        pin: true, // pin the trigger element while active
        start: 'center center', // when the top of the trigger hits the top of the viewport
        end: '+=100%', // end after scrolling 500px beyond the start
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar\
        id: 'hp-facilities',
      },
    });

    this.facilitiesScrolTrigger.from('.hp-facilities__mask', { autoAlpha: 0.2 });
    this.facilitiesScrolTrigger.from('.hp-facilities__copy', { autoAlpha: 0, y: 50 }, '-=.25');
    ScrollTrigger.refresh();

    // hp clients marquee
    //= ============================
    this.smarquee1 = new Smarquee({
      element: document.querySelector('.hp-clients__marquee-1'), // you can select your own element and pass it in here.
      velocity: 100, // A represntation of the animation speed.
      styleOptions: {
        scrollingTitleMargin: 0, // in pixels. This is the size of the margin
        pausePercent: 0, // for animations that iterate more than once, you can build in a pause
      },
    });
    this.smarquee1.init();
    this.smarquee2 = new Smarquee({
      element: document.querySelector('.hp-clients__marquee-2'), // you can select your own element and pass it in here.
      velocity: 100, // A represntation of the animation speed.
      styleOptions: {
        scrollingTitleMargin: 0, // in pixels. This is the size of the margin
        pausePercent: 0, // for animations that iterate more than once, you can build in a pause
        fillMode: 'backwards',
      },
    });
    this.smarquee2.init();

    this.splitModule = new SplitText();
    // this.rellax = new Rellax('.rellax');
  }

  destroy() {
    this.hpServicesSlider.destroy();
    this.hpProjectsSlider.destroy();
    RAFManager.remove(this.hpProjectsSliderUpdate);
    this.facilitiesScrolTrigger.kill();
    ScrollTrigger.getById('hp-facilities').kill(true);
    this.smarquee1.destroy();
    this.smarquee2.destroy();
    this.splitModule.destroy();
  }
}
