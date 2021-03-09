import {
  gsap, ScrollToPlugin, Power3, ScrollTrigger,
} from 'gsap/all';

import barba from '@barba/core';
import imagesLoaded from 'imagesloaded';

import MainNavigation from './nav';
import Footer from './footer';

import {
  transitionEnter, transitionLeave,
} from './animations';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Project from '../pages/Project';
import Services from '../pages/Services';
import Contact from '../pages/Contact';

class App {
  constructor() {
    const app = this;
    document.querySelector('.preloader').classList.add('done');

    app.initCommon();

    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    // create all the pages
    this.pages = [];
    this.pages.push('home', new Home());
    this.pages.push('about', new About());
    this.pages.push('projects', new Projects());
    this.pages.push('project', new Project());
    this.pages.push('services', new Services());
    this.pages.push('contact', new Contact());

    // create the views for barba
    this.barbaViews = [];
    this.pages.forEach((element) => {
      const obj = {
        namespace: element.namespace,
        afterLeave: element.destroy,
        beforeEnter: element.init,
      };
      this.barbaViews.push(obj);
    });

    const loadImages = (container) => new Promise((resolve) => {
      const imgLoad = imagesLoaded(container, { background: '.page-hero__bg-img' });
      imgLoad.on('progress', (instance, image) => {
        const result = image.isLoaded ? 'loaded' : 'broken';
        console.log(`image is ${result} for ${image.img.src}`);
      });
      imgLoad.on('always', (instance) => {
        console.log('done');
        resolve();
      });
    });

    // setup barba
    barba.init({
      debug: true,
      logLevel: 'debug',
      views: this.barbaViews,
      transitions: [{
        name: 'default-transition',
        sync: false,
        leave: (data) => transitionLeave(data),
        enter: (data) => transitionEnter(data)
          .then(() => loadImages(data.next.container)),
      }],
    });

    // close menu if open and changing page
    barba.hooks.afterLeave((data) => {
      // Pace.restart();
      if (app.nav.isMenuOpen) {
        app.nav.closeMenu();
      }
    });

    barba.hooks.afterEnter((data) => {
      // menu
      const menuIndex = data.next.container.dataset.activeMenuIndex;
      this.nav.setActive(menuIndex);

      data.next.container.classList.add('is-loaded');
      document.querySelector('.js-go-top').addEventListener('click', () => {
        gsap.to(window, {
          scrollTo: 0,
          duration: 0.6,
          ease: Power3.easeInOut,
        });
      });

      // next page
      this.footer.destroy();
      const { nextPage } = data.next.container.dataset;
      if (nextPage) {
        this.footer.init(() => {
          barba.go(nextPage);
        });
      }
    });
  }

  /* eslint-disable-next-line class-methods-use-this */
  initCommon() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    this.nav = new MainNavigation();
    this.footer = new Footer();
  }
}
export default App;
