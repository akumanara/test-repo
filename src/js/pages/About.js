import Smarquee from 'smarquee';
import {
  gsap, ScrollToPlugin, Power3, ScrollTrigger,
} from 'gsap/all';

import ViewportChecker from '../modules/ViewportChecker';
import SplitText from '../modules/split';

export default class {
  constructor() {
    this.namespace = 'about';
  }

  init() {
    this.splitModule = new SplitText();
    document.querySelectorAll('.js-track').forEach((el) => {
      const tmp = new ViewportChecker(el);
    });

    // about facilities
    //= ============================
    this.aboutFacilities = gsap.timeline({
      defaults: { ease: Power3.easeInOut },
      scrollTrigger: {
        trigger: document.querySelector('.about-facilities__container'),
        pin: true, // pin the trigger element while active
        start: 'center center', // when the top of the trigger hits the top of the viewport
        end: '+=100%', // end after scrolling 500px beyond the start
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar\
        id: 'about-facilities',
      },
    });

    this.aboutFacilities.from('.about-facilities__mask', { autoAlpha: 0.2 });
    this.aboutFacilities.addLabel('aftermask');
    this.aboutFacilities.from('.about-facilities__title', { autoAlpha: 0, y: 50 }, 'aftermask');
    this.aboutFacilities.from('.about-facilities__col-2', { autoAlpha: 0 }, 'aftermask');
    this.aboutFacilities.from('.about-facilities__content', { autoAlpha: 0 });
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
  }

  destroy() {
    this.aboutFacilities.kill();
    ScrollTrigger.getById('about-facilities').kill(true);
    this.smarquee1.destroy();
    this.smarquee2.destroy();
    this.splitModule.destroy();
  }
}
