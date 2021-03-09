import { gsap, Back } from 'gsap/all';
/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2019, Codrops
 * http://www.codrops.com
 */
export default class {
  constructor() {
    this.initCursor();
    this.initHovers();
  }

  initCursor() {
    this.outerCursor = document.querySelector('.circle-cursor--outer');
    // this.innerCursor = document.querySelector('.circle-cursor--inner');
    this.outerCursorBox = this.outerCursor.getBoundingClientRect();
    this.outerCursorSpeed = 0;
    this.easing = Back.easeOut.config(1.7);
    this.clientX = -100;
    this.clientY = -100;
    this.showCursor = false;

    const unveilCursor = () => {
      // gsap.set(this.innerCursor, {
      //   x: this.clientX,
      //   y: this.clientY,
      // });
      gsap.set(this.outerCursor, {
        x: this.clientX - this.outerCursorBox.width / 2,
        y: this.clientY - this.outerCursorBox.height / 2,
      });
      setTimeout(() => {
        this.outerCursorSpeed = 0.2;
      }, 100);
      this.showCursor = true;
    };
    document.addEventListener('mousemove', unveilCursor);

    document.addEventListener('mousemove', (e) => {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
    });

    const render = () => {
      // gsap.set(this.innerCursor, {
      //   x: this.clientX,
      //   y: this.clientY,
      // });
      if (!this.isStuck) {
        gsap.to(this.outerCursor, this.outerCursorSpeed, {
          x: this.clientX - this.outerCursorBox.width / 2,
          y: this.clientY - this.outerCursorBox.height / 2,
        });
      }
      if (this.showCursor) {
        document.removeEventListener('mousemove', unveilCursor);
      }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  initHovers() {
    const handleMouseEnter = (e) => {
      this.outerCursor.classList.add('onlink');
      gsap.to(this.outerCursor, {
        duration: 0.2,
        width: 50,
        height: 50,
        backgroundColor: '#d71920',
      });
      // this.isStuck = true;
      // const target = e.currentTarget;
      // const box = target.getBoundingClientRect();
      // this.outerCursorOriginals = {
      //   width: this.outerCursorBox.width,
      //   height: this.outerCursorBox.height,
      // };
      // gsap.to(this.outerCursor, 0.2, {
      //   x: box.left,
      //   y: box.top,
      //   width: box.width,
      //   height: box.height,
      //   opacity: 0.4,
      //   borderColor: '#ff0000',
      // });
    };

    const handleMouseLeave = () => {
      // this.isStuck = false;
      this.outerCursor.classList.remove('onlink');
      gsap.to(this.outerCursor, {
        duration: 0.2,
        width: 30,
        height: 30,
        backgroundColor: 'transparent',
      });
    };

    const linkItems = document.querySelectorAll('a, .js-cursor-item');
    linkItems.forEach((item) => {
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    // const mainNavHoverTween = gsap.to(this.outerCursor, 0.3, {
    //   backgroundColor: '#ffffff',
    //   ease: this.easing,
    //   paused: true,
    // });

    // const mainNavMouseEnter = () => {
    //   this.outerCursorSpeed = 0;
    //   gsap.set(this.innerCursor, { opacity: 0 });
    //   mainNavHoverTween.play();
    // };

    // const mainNavMouseLeave = () => {
    //   this.outerCursorSpeed = 0.2;
    //   gsap.set(this.innerCursor, { opacity: 1 });
    //   mainNavHoverTween.reverse();
    // };

    // const mainNavLinks = document.querySelectorAll('.content--fixed a');
    // mainNavLinks.forEach((item) => {
    //   item.addEventListener('mouseenter', mainNavMouseEnter);
    //   item.addEventListener('mouseleave', mainNavMouseLeave);
    // });
  }
}
