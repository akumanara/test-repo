import {
  gsap,
  Expo,
} from 'gsap/all';
import SplitText from './SplitText.min';
import ViewportChecker from './ViewportChecker';

const formatPrefixZero = (num) => ((num < 10) ? `0${num}` : num);
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
export default class {
  constructor() {
    this.DOM = {
      splitTitles: document.querySelectorAll('.split-title'),
    };
    this.init();
  }

  init() {
    // this.DOM.splitTitles = [...this.DOM.splitTitles].reverse();
    this.DOM.splitTitles.forEach((title) => {
      const split = new SplitText(title, {
        type: 'lines words chars',
        linesClass: 'hide-overflow',
      });
      const {
        chars,
      } = split;
      // console.log(chars);
      // chars.reverse();
      shuffleArray(chars);
      const tl = gsap.timeline({
        paused: true,
      });
      tl.set(title, {
        opacity: 1,
      });
      tl.from(chars, {
        y: 100,
        rotation: Math.random() > 0.5 ? 10 : -10,
        duration: 2,
        ease: Expo.easeOut,
        stagger: 0.005, // 0.1 seconds between when each ".box" element starts animating
      });
      title.vc = new ViewportChecker(title, 'top', {
        lowerBoundTrigger: 15,
        upperBoundTrigger: 85,
      }, () => {
        tl.play();
      });
    });
  }

  destroy() {
    this.DOM.splitTitles.forEach((title) => {
      title.vc.destroy();
    });
  }
}
