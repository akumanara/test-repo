import { init } from '@sentry/browser';
import gsap from 'gsap';
import {
  Linear,
  Power2,
} from 'gsap/all';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

export default class {
  constructor() {
    this.isActive = false;
    this.onScroll = throttle(this.onScroll.bind(this), 120);
  }

  init(fn) {
    this.DOM = {
      progress: document.querySelector('.footer__loader-progress'),
    };
    this.tl = gsap.timeline({ paused: true, onComplete: fn });

    this.setEvents();
    this.setTimeline();

    this.isActive = true;
  }

  destroy() {
    if (this.isActive) {
      this.tl.kill();
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  setEvents() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  onScroll() {
    const scroll = window.scrollY + window.innerHeight;
    const targetS = document.body.offsetHeight;

    if (scroll === targetS) {
      this.tl.timeScale(1).play();
    } else {
      this.tl.timeScale(3).reverse();
    }
  }

  setTimeline() {
    gsap.set(this.DOM.progress, { scaleX: 0 });
    this.tl.to(this.DOM.progress, { scaleX: 1, ease: Linear.easeNone, duration: 4 });
  }
}
