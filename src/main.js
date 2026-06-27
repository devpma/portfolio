import './styles/main.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 비주얼 pin — 어바웃이 위로 덮어오는 효과
ScrollTrigger.create({
  trigger: '.visual-wrap',
  start: 'top top',
  end: () => `+=${document.querySelector('.about-wrap').offsetHeight}`,
  pin: true,
  pinSpacing: false
})

// 비주얼 텍스트 진입 애니메이션 — 타이핑 효과
if (!reducedMotion) {
  gsap.set('.visual-logo .position span', { opacity: 0 })
  gsap.set('.visual-logo .name span:not(.name-cursor)', { opacity: 0 })
  gsap.set('.visual-caption p', { y: 30, opacity: 0 })

  // position 타이핑
  gsap.to('.visual-logo .position span', {
    opacity: 1,
    duration: 0.01,
    stagger: 0.07,
    delay: 0.3
  })
}

// name 타이핑 + 커서 이동
document.fonts.ready.then(() => {
  const nameEl = document.querySelector('.visual-logo .name')
  if (!nameEl) return

  const cursor = nameEl.querySelector('.name-cursor')
  const letterSpans = [...nameEl.querySelectorAll('span:not(.name-cursor)')]
  if (!cursor || !letterSpans.length) return

  const getMetrics = () => {
    const charWidth = letterSpans[0].getBoundingClientRect().width
    const nameRect = nameEl.getBoundingClientRect()
    const lastRect = letterSpans[letterSpans.length - 1].getBoundingClientRect()
    return {
      charWidth,
      xEnd: lastRect.right - nameRect.left
    }
  }

  const { charWidth } = getMetrics()
  gsap.set(cursor, { x: 0 })

  if (reducedMotion) {
    const { xEnd } = getMetrics()
    gsap.set(cursor, { x: xEnd })
  } else {
    const tl = gsap.timeline({ delay: 1.1 })
    letterSpans.forEach((span, i) => {
      tl.set(span, { opacity: 1 }, i * 0.1)
      tl.set(cursor, { x: (i + 1) * charWidth }, i * 0.1)
    })
  }

  window.addEventListener('resize', () => {
    const { xEnd } = getMetrics()
    gsap.set(cursor, { x: xEnd })
  })
})

if (!reducedMotion) {
  gsap.to('.visual-caption p', {
    y: 0,
    opacity: 1,
    duration: 0.9,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 2.2
  })
}

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

const visualWrap = document.querySelector('.visual-wrap')
if (visualWrap) {
  visualWrap.addEventListener('mouseenter', () => {
    cursor.classList.add('white')
  })
  visualWrap.addEventListener('mouseleave', () => {
    cursor.classList.remove('white')
  })
}

// About 애니메이션
if (!reducedMotion) {
  gsap.from('.about-wrap .title', {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-wrap .title-box',
      start: 'top 70%',
      toggleActions: 'play reverse play reverse'
    }
  })

  gsap.from('.about-wrap .info-stats', {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 1.0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-wrap .info-text',
      start: 'top 100%',
      toggleActions: 'play reverse play reverse'
    }
  })
}

// stat 카운터 (스크롤할 때마다 재실행)
document.querySelectorAll('.about-wrap .stat-number').forEach((el) => {
  const original = el.textContent.trim()
  const num = parseInt(original)
  const suffix = original.replace(/[0-9]/g, '')

  if (!isNaN(num)) {
    let anim
    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      onEnter: () => {
        if (reducedMotion) {
          el.textContent = original
          return
        }
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

if (!reducedMotion) {
  gsap.from('.about-wrap .stat-item', {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 1.0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-wrap .info-stats',
      start: 'top 60%',
      toggleActions: 'play reverse play reverse'
    }
  })

  // 스킬 태그 순차 등장
  gsap.from('.about-wrap .skill-tag', {
    scale: 0.6,
    opacity: 0,
    stagger: 0.07,
    duration: 0.5,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.about-wrap .skills-tags',
      start: 'top 65%',
      toggleActions: 'play reverse play reverse'
    }
  })

  gsap.from('.about-wrap .info-text p', {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 1.0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-wrap .info-text',
      start: 'top 60%',
      toggleActions: 'play reverse play reverse'
    }
  })

  gsap.from('.about-wrap .contact-link', {
    scale: 0.6,
    opacity: 0,
    stagger: 0.07,
    duration: 0.5,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.about-wrap .contact-link',
      start: 'top 85%',
      toggleActions: 'play reverse play reverse'
    }
  })

  // portfolio effect
  gsap.utils.toArray('.portfolio-wrap .project-name').forEach((name) => {
    gsap.from(name, {
      y: 40,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: name,
        start: 'top 70%',
        toggleActions: 'play reverse play reverse'
      }
    })
  })

  gsap.utils.toArray('.portfolio-wrap .portfolio-box').forEach((box) => {
    const infoText = box.querySelector('.info-desc')
    if (infoText) {
      gsap.from(infoText.querySelectorAll('p'), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: infoText,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      })
    }

    const desc = box.querySelector('.info-list')
    if (desc) {
      gsap.from(desc.querySelectorAll('dt, dd'), {
        scale: 0.6,
        opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: desc,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      })
    }
  })
}

// Scroll word highlight
const highlightWords = gsap.utils.toArray('.highlight-text .word')
if (highlightWords.length) {
  if (reducedMotion) {
    highlightWords.forEach((word) => {
      gsap.set(word, { color: word.classList.contains('accent') ? '#ffe36d' : '#333' })
    })
  } else {
    gsap.set(highlightWords, { color: '#d0d0d0' })

    const scrubDistance = highlightWords.length * 160
    const holdDistance = 500
    const totalAnimDist = scrubDistance + holdDistance

    // animation 끝난 후 portfolio가 viewport 하단에 오도록 margin 계산 (resize 대응)
    const portfolioEl = document.querySelector('.portfolio-wrap')
    const highlightEl = document.querySelector('.highlight-wrap')

    const syncPortfolioMargin = () => {
      if (!portfolioEl || !highlightEl) return
      const margin = totalAnimDist + window.innerHeight - highlightEl.offsetHeight
      portfolioEl.style.marginTop = `${Math.max(0, margin)}px`
    }

    syncPortfolioMargin()
    ScrollTrigger.addEventListener('refreshInit', syncPortfolioMargin)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.highlight-wrap',
        start: 'top top',
        end: () => `+=${totalAnimDist + window.innerHeight}`,
        scrub: 1.5,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true
      }
    })

    highlightWords.forEach((word, i) => {
      const isAccent = word.classList.contains('accent')
      tl.to(word, { color: isAccent ? '#ffe36d' : '#333', ease: 'none', duration: 1 }, i * 0.8)
    })

    // 단어 애니메이션 종료 후 hold 구간 (scrub 비율에 맞춰 빈 tween 추가)
    const wordsDuration = (highlightWords.length - 1) * 0.8 + 1
    tl.to({}, { duration: (wordsDuration * holdDistance) / scrubDistance })
  }
}

// 여러 pin 섹션이 있을 때 트리거 위치 재계산
ScrollTrigger.refresh()
