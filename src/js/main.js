import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import imagesLoaded from 'imagesloaded';
import App from './modules/app';

// Set up js error logging to sentry io
Sentry.init({
  dsn: 'https://d4afa6ae642644d29b7d07d0c0941210@o346983.ingest.sentry.io/5631798',
  release: 'starter@0.1',
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
  beforeSend(e) {
    document.body.classList.add('has-js-error');
    return e;
  },
});

// Set 2 Promises before we init Main. Images and Window Load
const windowLoad = new Promise((resolve) => {
  window.addEventListener('load', () => {
    resolve();
  });
});
const imagesLoadedP = new Promise((resolve) => {
  const imgLoad = imagesLoaded(document.body, { background: true });
  imgLoad.on('always', () => {
    resolve();
  });
});
Promise.all([windowLoad, imagesLoadedP]).then(() => {
  /* eslint-disable-next-line no-new */
  new App();
});
