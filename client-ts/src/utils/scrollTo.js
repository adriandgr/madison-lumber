import scrollToElement from 'scroll-to-element';

const scroll = {
  to: (className, durration) => {
    const duration = durration || 500;
    setTimeout(() => {
      scrollToElement(className, {
        offset: -20,
        ease: 'out-expo',
        durration: duration
      });
    }, 1);
  }
}

export default scroll;