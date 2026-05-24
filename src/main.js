import './styles/main.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const mm = gsap.matchMedia()

// 무한 스크롤 텍스트 + 돋보기 텍스트
// 폰트 로드 후 width 측정해야 정확함
document.fonts.ready.then(() => {
  const movingWrapper = document.querySelector('.pin-moving-wrapper')
  const movingText = document.querySelector('.pin-moving-text')
  const magWrapper = document.querySelector('.zoom-text-wrapper')
  const magText = document.querySelector('.zoom-text')

  if (!movingWrapper || !movingText) return

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

  // 커서 팔로잉 돋보기
  const lensEl = document.querySelector('#animate1')
  const pinWrap = document.querySelector('.pin-wrap')
  if (magWrapper && magText && lensEl && pinWrap) {
    const magTextWidth = magText.offsetWidth
    const magCloneCount = Math.ceil(window.innerWidth / magTextWidth) + 3
    for (let i = 0; i < magCloneCount; i++) {
      const clone = magText.cloneNode(true)
      clone.setAttribute('aria-hidden', 'true')
      magWrapper.appendChild(clone)
    }

    const r = magTextWidth / textWidth

    // 렌즈 초기 상태: 섹션 중앙 + 크게 (overflow:hidden이 자연스럽게 클리핑)
    gsap.set(lensEl, { xPercent: -50, yPercent: -50, width: '95vmin', height: '95vmin' })

    // 스크롤에 따라 큰 원 → 작은 돋보기로 자연스럽게 축소
    gsap.to(lensEl, {
      width: '28rem',
      height: '28rem',
      ease: 'none',
      scrollTrigger: {
        trigger: pinWrap,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 2
      }
    })

    // 확대 텍스트 위치 동기화 (렌즈 중앙 = 뷰포트 중앙 기준)
    gsap.ticker.add(() => {
      const innerRadius = lensEl.clientWidth / 2
      const bgX = gsap.getProperty(movingWrapper, 'x')
      const lensCenterX = window.innerWidth / 2
      const rawMagX = r * (bgX - lensCenterX) + innerRadius
      const loopedMagX = rawMagX % magTextWidth
      gsap.set(magWrapper, { x: loopedMagX })
    })
  }
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
gsap.from('.about-intro h2', {
  y: 60,
  opacity: 0,
  duration: 1.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.about-intro',
    start: 'top 60%',
    toggleActions: 'play reverse play reverse'
  }
})

gsap.from('.intro-text', {
  y: 40,
  opacity: 0,
  stagger: 0.25,
  duration: 1.0,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.about-intro',
    start: 'top 55%',
    toggleActions: 'play reverse play reverse'
  }
})

// stat 카운터 (스크롤할 때마다 재실행)
document.querySelectorAll('.stat-number').forEach((el) => {
  const original = el.textContent.trim()
  const num = parseInt(original)
  const suffix = original.replace(/[0-9]/g, '')

  if (!isNaN(num)) {
    let anim
    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      onEnter: () => {
        if (anim) anim.kill()
        el.textContent = '0' + suffix
        anim = gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: num,
            duration: 1.8,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate() {
              el.textContent = Math.round(Number(el.textContent)) + suffix
            }
          }
        )
      },
      onLeaveBack: () => {
        if (anim) anim.kill()
        el.textContent = original
      }
    })
  }
})

gsap.from('.stat-item', {
  y: 40,
  opacity: 0,
  stagger: 0.2,
  duration: 1.0,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.info-text.stats',
    start: 'top 60%',
    toggleActions: 'play reverse play reverse'
  }
})

// 스킬 태그 순차 등장
gsap.from('.skill-tag', {
  scale: 0.6,
  opacity: 0,
  stagger: 0.07,
  duration: 0.5,
  ease: 'back.out(1.7)',
  scrollTrigger: {
    trigger: '.skills-tags',
    start: 'top 65%',
    toggleActions: 'play reverse play reverse'
  }
})

// 연락처 슬라이드인
gsap.from('.contact-link', {
  x: -20,
  opacity: 0,
  stagger: 0.18,
  duration: 0.8,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.info-text.contact',
    start: 'top 65%',
    toggleActions: 'play reverse play reverse'
  }
})

gsap.from('.about-card', {
  x: 60,
  opacity: 0,
  duration: 1.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.about-card',
    start: 'top 60%',
    toggleActions: 'play reverse play reverse'
  }
})

// 타이핑 텍스트
ScrollTrigger.create({
  trigger: '.text-wrap',
  start: 'top 70%',
  end: 'bottom 20%',
  onEnter: () => {
    const p = document.querySelector('.text-wrap p')
    if (p) p.classList.add('on')
  },
  onLeave: () => {
    const p = document.querySelector('.text-wrap p')
    if (p) p.classList.remove('on')
  },
  onEnterBack: () => {
    const p = document.querySelector('.text-wrap p')
    if (p) p.classList.add('on')
  },
  onLeaveBack: () => {
    const p = document.querySelector('.text-wrap p')
    if (p) p.classList.remove('on')
  }
})

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
