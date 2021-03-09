import {
  gsap, ScrollToPlugin, Power3, ScrollTrigger,
} from 'gsap/all';
import GLightbox from 'glightbox';
import SplitText from '../modules/split';

export default class {
  constructor() {
    this.namespace = 'project';
  }

  init() {
    this.lightbox = GLightbox({
      loop: true,
    });
  }

  destroy() {
    this.lightbox.destroy();
  }
}
