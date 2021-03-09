import {
  gsap, ScrollToPlugin, Power3, ScrollTrigger,
} from 'gsap/all';

export default class {
  constructor() {
    this.namespace = 'services';
  }

  init() {
    const el = document.querySelectorAll('.services__inner>div');
    this.width = 0;
    el.forEach((element) => {
      this.width += element.offsetWidth;
    });
    this.width -= window.innerWidth;

    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.services__inner',
        pin: true,
        scrub: true,
        // base vertical scrolling on how wide the test is so it feels more natural.
        end: () => `+=${this.width}`,
        id: 'services',
      },
    });

    this.tl.to(document.querySelector('.services__inner'), {
      x: -this.width,
      ease: 'none',
      duration: 3,
    });
  }

  destroy() {
    this.tl.kill();
    ScrollTrigger.getById('services').kill(true);
  }
}
