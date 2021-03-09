import Smarquee from 'smarquee';
import {
  gsap, ScrollToPlugin, Power3, ScrollTrigger,
} from 'gsap/all';
import SplitText from '../modules/split';

export default class {
  constructor() {
    this.namespace = 'projects';
  }

  init() {
    this.splitModule = new SplitText();
  }

  destroy() {
    this.splitModule.destroy();
  }
}
