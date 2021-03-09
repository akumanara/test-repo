import {
  gsap, ScrollToPlugin, Power3, ScrollTrigger,
} from 'gsap/all';

export default class {
  constructor() {
    this.namespace = 'contact';
  }

  init() {
    this.form = document.querySelector('form');
    document.querySelector('.js-submit-form').addEventListener('click', (e) => {
      e.preventDefault();
      this.form.submit();
    });
  }

  destroy() {
  }
}
