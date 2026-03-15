import './styles/main.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const mm = gsap.matchMedia()

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

// 이미지 줌 효과
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
if (aboutWrap) {
  aboutWrap.addEventListener('mouseenter', () => {
    cursor.classList.add('black')
  })
  aboutWrap.addEventListener('mouseleave', () => {
    cursor.classList.remove('black')
  })
}

// 커서 확대 효과
const cursorScaleElements = document.querySelectorAll('.cursor-scale')
cursorScaleElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add(el.classList.contains('small') ? 'grow-small' : 'grow')
  })
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('grow', 'grow-small')
  })
})

// About 애니메이션
gsap.from('.about-intro', {
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.about-intro',
    start: 'top 70%'
  }
})

gsap.from('.about-stats .stat-item', {
  y: 30,
  opacity: 0,
  stagger: 0.15,
  duration: 0.6,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.about-stats',
    start: 'top 75%'
  }
})

gsap.from('.about-card', {
  x: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.about-card',
    start: 'top 70%'
  }
})

// 타이핑 텍스트
gsap.from('.text-wrap', {
  y: 40,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.text-wrap',
    start: 'top 70%'
  }
})

const textWrapP = document.querySelector('.text-wrap p')
if (textWrapP) {
  gsap.set(textWrapP, { opacity: 0 })

  ScrollTrigger.create({
    trigger: '.text-wrap',
    start: 'top 60%',
    onEnter: () => {
      gsap.to(textWrapP, {
        opacity: 1,
        duration: 0.3,
        onComplete: () => {
          textWrapP.classList.add('on')
        }
      })
    }
  })
}

// 가로 스크롤 슬라이드
const sldWrap = document.querySelector('.sld-wrap')
const slides = document.querySelector('.items')

if (slides && sldWrap) {
  mm.add('(min-width: 641px)', () => {
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

// 모바일 슬라이드 애니메이션
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
