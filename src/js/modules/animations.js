import { gsap, Power3 } from 'gsap';
// import imagesLoaded from 'imagesloaded';

const transitionLeave = (data) => new Promise((resolve) => {
  const tl = gsap.timeline({
    onComplete() {
      data.current.container.remove();
      window.scrollTo(0, 0);
      resolve();
    },
  });
  tl.to(data.current.container, {
    duration: 0.6,
    autoAlpha: 0,
    y: -20,
    ease: Power3.easeInOut,
    clearProps: 'all',
  });
});

const transitionEnter = (data) => new Promise((resolve) => {
  const tl = gsap.timeline({
    onComplete() {
      resolve();
    },
  });
  tl.from(data.next.container, {
    duration: 0.6,
    autoAlpha: 0,
    y: -20,
    ease: Power3.easeInOut,
    clearProps: 'all',
  });
});

export { transitionLeave, transitionEnter };
