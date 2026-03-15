import './styles/main.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const mm = gsap.matchMedia()

// 도형 parallax
// const shapes = document.querySelectorAll('.shape')

// if (shapes.length > 0) {
//   gsap.utils.toArray('.shape').forEach((shape, i) => {
//     const direction = i % 2 === 0 ? 1 : -1

//     gsap.to(shape, {
//       yPercent: (i + 1) * 80,
//       xPercent: direction * 20,
//       rotate: (i + 1) * 100,
//       scale: 1.1,
//       ease: 'none',
//       scrollTrigger: {
//         trigger: '.visual-wrap',
//         start: 'top top',
//         end: 'bottom top',
//         scrub: 1.5
//       }
//     })
//   })
//}

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
      start: 'top top+=200',
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

const aboutWrap = document.querySelector('.about-wrap')
if (visualWrap) {
  aboutWrap.addEventListener('mouseenter', () => {
    cursor.classList.add('black')
  })
  aboutWrap.addEventListener('mouseleave', () => {
    cursor.classList.remove('black')
  })
}

const cursorScaleElements = document.querySelectorAll('.cursor-scale')
cursorScaleElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add(el.classList.contains('small') ? 'grow-small' : 'grow')
  })
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('grow', 'grow-small')
  })
})

// About 섹션
gsap.from('.text-wrap', {
  y: 60,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.text-wrap',
    start: 'top 65%',
    end: 'bottom top',
    toggleActions: 'play reverse play reverse'
  }
})

// 텍스트 타이핑
const textWrap = document.querySelector('.text-wrap p')

if (textWrap) {
  ScrollTrigger.create({
    trigger: '.text-wrap',
    start: 'center bottom',
    toggleClass: { targets: textWrap, className: 'on' }
  })
}

// 가로 스크롤 슬라이드
const sldWrap = document.querySelector('.sld-wrap')
const slides = document.querySelector('.items')
const slideItems = gsap.utils.toArray('.item')

if (slides && slideItems.length > 0) {
  const mm = gsap.matchMedia()

  mm.add('(min-width: 640px)', () => {
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

// 모바일 슬라이드
mm.add('(max-width: 640px)', () => {
  const items = gsap.utils.toArray('.sld .item')

  items.forEach((item) => {
    const img = item.querySelector('.img')
    const txt = item.querySelector('.txt')

    gsap.set(img, { opacity: 0, y: 60 })
    gsap.set(txt, { opacity: 0, y: 30 })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse'
        }
      })
      .to(img, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power4.out'
      })
      .to(
        txt,
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power4.out'
        },
        '-=0.3'
      )
  })
})
