import gsap from 'gsap';
import {
  Power2,
} from 'gsap/all';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

export default class {
  constructor() {
    this.DOM = {
      header: document.querySelector('.header'),
      headerBurger: document.querySelector('.header__burger'),
      menu: document.querySelector('.menu'),
      menuBG: document.querySelector('.menu__bg'),
      headerBG: document.querySelector('.header__bg'),
      menuItems: document.querySelectorAll('.menu__li'),
      secondMenu: document.querySelector('.menu__secondary'),
      socialMenu: document.querySelector('.menu__social'),
      links: document.querySelectorAll('.menu__link'),
    };

    this.isMenuOpen = false;

    this.scrollToResizeMenu = 200;
    this.scrollThreshold = 50;
    this.isScrolled = false;

    this.tl = gsap.timeline({ paused: true });
    this.setEvents();
    this.setTimeline();
    this.onResize();
    this.onScroll();
  }

  setEvents() {
    this.DOM.headerBurger.addEventListener('click', () => {
      this.toggleMenu();
    });

    document.querySelector('.header__lang').addEventListener('click', () => {
      document.querySelector('.header__lang').classList.toggle('active');
    });

    window.addEventListener('resize', debounce(this.onResize.bind(this), 150));
    window.addEventListener('scroll', throttle(this.onScroll.bind(this), 120), { passive: true });
  }

  onResize() {
    document.documentElement.style.setProperty('--header-height', `${this.DOM.header.clientHeight}px`);
  }

  onScroll() {
    const scroll = window.scrollY;
    if (scroll > this.scrollToResizeMenu + this.scrollThreshold && !this.isMenuScrolled) {
      this.DOM.header.classList.add('scrolled');
      this.isMenuScrolled = true;
    } else if (scroll < this.scrollToResizeMenu - this.scrollThreshold && this.isMenuScrolled) {
      this.DOM.header.classList.remove('scrolled');
      this.isMenuScrolled = false;
    }
  }

  setTimeline() {
    gsap.set(this.DOM.menu, { autoAlpha: 0 });
    gsap.set(this.DOM.menuBG, { scaleY: 0 });
    gsap.set(this.DOM.headerBG, { scaleY: 0 });
    gsap.set(this.DOM.menuItems, { autoAlpha: 0, y: 25 });
    gsap.set(this.DOM.secondMenu, { autoAlpha: 0, y: 25 });
    gsap.set(this.DOM.socialMenu, { autoAlpha: 0, y: 25 });

    // open/close tl
    this.tl.set(this.DOM.menu, { autoAlpha: 1 })
      .to(this.DOM.menuBG, { scaleY: 1, ease: Power2.easeInOut, duration: 0.6 })
      .to(this.DOM.headerBG, { scaleY: 1, ease: Power2.easeInOut, duration: 0.6 }, '0')
      .to(this.DOM.menuItems, {
        autoAlpha: 1, y: 0, ease: Power2.easeInOut, duration: 0.5, stagger: 0.1,
      }, '=-.3')
      .addLabel('afterMenu')
      .to(this.DOM.secondMenu, {
        autoAlpha: 1, y: 0, ease: Power2.easeInOut, duration: 0.5,
      }, 'afterMenu-=.3')
      .to(this.DOM.socialMenu, {
        autoAlpha: 1, y: 0, ease: Power2.easeInOut, duration: 0.5,
      }, 'afterMenu-=.15');
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    document.querySelector('.header__burger').classList.toggle('active');
    this.tl.timeScale(1).play();
    this.isMenuOpen = !this.isMenuOpen;
    document.body.classList.add('hide-overflow');
    this.DOM.header.classList.add('open');
  }

  closeMenu() {
    document.querySelector('.header__burger').classList.toggle('active');
    this.tl.timeScale(1.5).reverse();
    this.isMenuOpen = !this.isMenuOpen;
    document.body.classList.remove('hide-overflow');
    this.DOM.header.classList.remove('open');
  }

  setActive(index) {
    this.DOM.links.forEach((link) => {
      link.classList.remove('active');
    });

    if (index) {
      this.DOM.links[index].classList.add('active');
    }
  }
}
