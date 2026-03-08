import './styles/main.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 무한 스크롤 텍스트
const movingWrapper = document.querySelector('.pin-moving-wrapper')
const movingText = document.querySelector('.pin-moving-text')

if (movingWrapper && movingText) {
  const textWidth = movingText.offsetWidth
  const cloneCount = Math.ceil(window.innerWidth / textWidth) + 3

  for (let i = 0; i < cloneCount; i++) {
    const clone = movingText.cloneNode(true)
    clone.setAttribute('aria-hidden', 'true')
    movingWrapper.appendChild(clone)
  }

  gsap.to(movingWrapper, {
    x: -textWidth,
    duration: 20,
    ease: 'none',
    repeat: -1
  })
}

// 이미지 효과
const mm = gsap.matchMedia()

mm.add('(min-width: 1025px)', () => {
  const imageZoom = gsap.timeline({
    scrollTrigger: {
      trigger: '#trigger1',
      start: 'top top+=300',
      end: 'bottom top',
      scrub: 0.5,
      invalidateOnRefresh: true
    }
  })

  imageZoom
    .to('#animate1', {
      scale: 0.7,
      borderRadius: '30rem',
      ease: 'none'
    })
    .to(
      '#animate1 img',
      {
        scale: 1.05,
        ease: 'none'
      },
      0
    )
})

mm.add('(min-width: 641px) and (max-width: 1024px)', () => {
  const imageZoom = gsap.timeline({
    scrollTrigger: {
      trigger: '#trigger1',
      start: 'top top+=150',
      end: 'bottom top',
      scrub: 0.5,
      invalidateOnRefresh: true
    }
  })

  imageZoom
    .to('#animate1', {
      scale: 0.7,
      borderRadius: '20rem',
      ease: 'none'
    })
    .to(
      '#animate1 img',
      {
        scale: 1.05,
        ease: 'none'
      },
      0
    )
})

mm.add('(max-width: 640px)', () => {
  const imageZoom = gsap.timeline({
    scrollTrigger: {
      trigger: '#trigger1',
      start: 'top top+=-250',
      end: 'bottom top',
      scrub: 0.5,
      invalidateOnRefresh: true
    }
  })

  imageZoom
    .to('#animate1', {
      scale: 0.7,
      borderRadius: '10rem',
      ease: 'none'
    })
    .to(
      '#animate1 img',
      {
        scale: 1.05,
        ease: 'none'
      },
      0
    )
})

// 커서 효과
const cursor = document.querySelector('.cursor')
let mouseX = 0
let mouseY = 0

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

gsap.ticker.add(() => {
  gsap.set(cursor, {
    x: mouseX,
    y: mouseY
  })
})

const cursorColorElements = document.querySelectorAll('.visual-wrap')
cursorColorElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add(el.classList.contains('white') ? 'black' : 'white')
  })

  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('white', 'black')
  })
})

const cursorScaleElements = document.querySelectorAll('.cursor-scale')
cursorScaleElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add(el.classList.contains('small') ? 'grow-small' : 'grow')
  })

  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('grow', 'grow-small')
  })
})

// 텍스트 타이핑 효과
const textWrap = document.querySelector('.text-wrap p')

if (textWrap) {
  ScrollTrigger.create({
    trigger: '.text-wrap',
    start: 'center bottom',
    toggleClass: { targets: textWrap, className: 'on' }
    // once: true 삭제!
  })
}

// 가로 스크롤 슬라이드
const sldWrap = document.querySelector('.sld-wrap')
const slides = document.querySelector('.items')
const slideItems = gsap.utils.toArray('.item')

if (slides && slideItems.length > 0) {
  const mm = gsap.matchMedia()

  mm.add('(min-width: 769px)', () => {
    gsap.to(slides, {
      x: () => -(slides.scrollWidth - sldWrap.offsetWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sldWrap,
        start: 'top top',
        end: () => `+=${slides.scrollWidth - sldWrap.offsetWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    })
  })
}
