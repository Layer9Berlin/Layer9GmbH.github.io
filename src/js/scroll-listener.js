import {throttle} from "@/js/throttle";

const updateCustomProperties = (element, scrollPosition) => {
  const progress = Math.max(Math.min((scrollPosition - element.offsetTop + element.scrollHeight / 2) / (element.scrollHeight / 2), 1), 0);
  [.2, .4, .6, .8, 1].forEach(progressBreakpoint => {
    element.style.setProperty(`--progressive-reveal-${Math.round(progressBreakpoint * 100)}`, progress >= progressBreakpoint ? 1 : 0)
  })
}

const updateCustomPropertiesCallback = throttle(() => {
  document.querySelector('body').classList.toggle('scrolled', window.scrollY > 0)
  updateCustomProperties(document.querySelector('#development_section'), window.scrollY)
  updateCustomProperties(document.querySelector('#consulting_section'), window.scrollY)
}, 100)

window.addEventListener('scroll', updateCustomPropertiesCallback, {passive: true});
