import { addBackToTop } from 'vanilla-back-to-top';
addBackToTop({
  backgroundColor: 'rgba(16, 136, 133, .8)',
  cornerOffset: 16, // px
  diameter: 56, // px
  // ease: inOutSine, // any one from https://www.npmjs.com/package/ease-component will do
  id: 'back-to-top',
  innerHTML: '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>',
  onClickScrollTo: 0, // px
  scrollContainer: document.body, // or a DOM element, e.g., document.getElementById('content')
  scrollDuration: 100, // ms
  showWhenScrollTopIs: 1, // px
  // size: diameter, // alias for diameter
  textColor: '#fff',
  zIndex: 1
});
