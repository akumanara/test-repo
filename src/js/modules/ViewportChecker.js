/*!
 * Determine if an element is in the viewport
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}    elem The element
 * @return {Boolean}      Returns true if element is in the viewport
 */
// import { Monitor } from './monitor';

const MathUtils = {
  scale: (num, in_min, in_max, out_min, out_max) => (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min,
  lineEq: (y2, y1, x2, x1, currentVal) => {
    // y = mx + b
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    return m * currentVal + b;
  },
  lerp: (a, b, n) => (1 - n) * a + n * b,
  getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2),
};

// eslint-disable-next-line import/prefer-default-export
export default class {
  constructor(el, setting = 'mid', bounds = { lowerBoundTrigger: 5, upperBoundTrigger: 95 }, fn = null) {
    // vars to be monitored
    this.el = el;
    this.linePositionPercentageInRegardToTheViewport = 0;
    this.onScroll = this.onScroll.bind(this);
    this.top = 0;
    this.setting = setting;
    this.fn = fn;
    this.lowerBoundTrigger = bounds.lowerBoundTrigger;
    this.upperBoundTrigger = bounds.upperBoundTrigger;

    this.init();
    // this.monitor = new Monitor();
    // this.monitor.add(this, 'top', 'top');
    // this.monitor.add(window, 'innerHeight', 'winHeight');
    // this.monitor.add(this, 'linePositionPercentageInRegardToTheViewport', 'lineP');

    this.calcPerc();
    this.isInView = false;
  }

  init() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  calcPerc() {
    // we check on line not the whole rectangle.
    // the line we check is not the top. but the middle of the element being tracked
    this.top = this.el.getBoundingClientRect().top;
    let lineToCheck;
    if (this.setting == 'mid') {
      lineToCheck = this.top + this.el.getBoundingClientRect().height / 2;
    } else if (this.setting == 'top') {
      lineToCheck = this.top;
    }
    // If the line is not visible in the viewport at all just return
    if (lineToCheck <= 0 || lineToCheck > window.innerHeight) return;

    this.linePositionPercentageInRegardToTheViewport = MathUtils.scale(lineToCheck, 0, window.innerHeight, 0, 100);

    if (this.linePositionPercentageInRegardToTheViewport > this.lowerBoundTrigger && this.linePositionPercentageInRegardToTheViewport < this.upperBoundTrigger) {
      this.el.classList.add('in-view');
      this.isInView = true;
      if (this.fn != null) {
        this.fn();
      }
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    this.calcPerc();
  }
}
