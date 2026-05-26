/* ===== Config ===== */
const SITE = {
  name: 'Elius Karanja',
  email: 'nyamburaken5@gmail.com',
  phone: '0799212126',
  phoneDisplay: '+254 799 212 126',
  github: 'https://github.com/kenelius',
  linkedin: 'https://www.linkedin.com/in/ken-karanja-6577743a3/',
  cvFile: 'assets/Elius-Karanja-CV.html',
  cvDownloadName: 'Elius-Karanja-CV.html',
}

const TYPING_PHRASES = [
  'Econometric Modeling',
  'Data Analytics',
  'Policy Evaluation',
  'Dashboard Development',
  'AI Workflow Automation',
  'Statistical Research',
]

const STATS = [
  { label: 'Projects Completed', value: 2, suffix: '' },
  { label: 'GitHub Repositories', value: 3, suffix: '' },
  { label: 'Technologies Used', value: 25, suffix: '+' },
  { label: 'Research Interests', value: 8, suffix: '+' },
]

/* ===== Loader ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('hidden')
  }, 2200)
})

/* ===== Navbar ===== */
const navbar = document.getElementById('navbar')
const menuBtn = document.getElementById('menuBtn')
const mobileMenu = document.getElementById('mobileMenu')

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40)
})

menuBtn?.addEventListener('click', () => {
  const open = mobileMenu?.classList.toggle('open')
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false')
})

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'))
})

/* ===== Hero background slideshow ===== */
const slides = document.querySelectorAll('.hero-bg-slide')
let slideIndex = 0

if (slides.length) {
  slides[0].classList.add('active')
  setInterval(() => {
    slides[slideIndex].classList.remove('active')
    slideIndex = (slideIndex + 1) % slides.length
    slides[slideIndex].classList.add('active')
  }, 6000)
}

/* ===== Typing effect ===== */
const typingEl = document.getElementById('typingText')
let phraseIndex = 0
let charIndex = 0
let isDeleting = false

function typeLoop() {
  if (!typingEl) return
  const current = TYPING_PHRASES[phraseIndex]
  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) {
      setTimeout(() => { isDeleting = true; typeLoop() }, 2000)
      return
    }
    setTimeout(typeLoop, 80)
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length
      setTimeout(typeLoop, 400)
      return
    }
    setTimeout(typeLoop, 40)
  }
}
typeLoop()

/* ===== Particles ===== */
;(function initParticles() {
  const canvas = document.getElementById('particles')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let particles = []
  let animId

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000))
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.35 + 0.1,
    }))
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach((p, i) => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(20, 184, 166, ${p.opacity})`
      ctx.fill()
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 110) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.05 * (1 - dist / 110)})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }
    })
    animId = requestAnimationFrame(draw)
  }

  resize()
  draw()
  window.addEventListener('resize', resize)
})()

/* ===== Scroll reveal ===== */
const revealEls = document.querySelectorAll('.reveal')
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '-40px' },
)
revealEls.forEach((el) => revealObserver.observe(el))

/* ===== Animated counters ===== */
const statValues = document.querySelectorAll('[data-count]')
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const el = entry.target
      const end = parseInt(el.dataset.count, 10)
      const suffix = el.dataset.suffix || ''
      const duration = 2000
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * end) + suffix
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      counterObserver.unobserve(el)
    })
  },
  { threshold: 0.3 },
)
statValues.forEach((el) => counterObserver.observe(el))

/* ===== Skill bars ===== */
const skillFills = document.querySelectorAll('.skill-fill')
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width
        skillObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 },
)
skillFills.forEach((el) => skillObserver.observe(el))

/* ===== Language bars ===== */
const langFills = document.querySelectorAll('.lang-fill')
const langObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width
        langObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 },
)
langFills.forEach((el) => langObserver.observe(el))

/* ===== Project filters (2 projects — filters still work for categories) ===== */
const filterBtns = document.querySelectorAll('.filter-btn')
const projectCards = document.querySelectorAll('.project-card')

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
    const cat = btn.dataset.filter
    projectCards.forEach((card) => {
      const match = cat === 'all' || card.dataset.category === cat
      card.classList.toggle('hidden-card', !match)
    })
  })
})

/* ===== GitHub contribution heatmap ===== */
function buildContributionGrid() {
  const container = document.getElementById('contribGrid')
  if (!container) return
  for (let w = 0; w < 52; w++) {
    const week = document.createElement('div')
    week.className = 'contrib-week'
    for (let d = 0; d < 7; d++) {
      const cell = document.createElement('div')
      const r = Math.random()
      const level = r > 0.75 ? 4 : r > 0.55 ? 3 : r > 0.35 ? 2 : r > 0.2 ? 1 : 0
      cell.className = `contrib-cell l${level}`
      cell.title = `Activity level ${level}`
      week.appendChild(cell)
    }
    container.appendChild(week)
  }
}
buildContributionGrid()

/* ===== Contact form ===== */
const contactForm = document.getElementById('contactForm')
const formSuccess = document.getElementById('formSuccess')

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(contactForm)
  const subject = encodeURIComponent(data.get('subject') || 'Portfolio Contact')
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`,
  )
  window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
  formSuccess?.classList.add('show')
  contactForm.reset()
  setTimeout(() => formSuccess?.classList.remove('show'), 5000)
})

/* ===== CV download ===== */
document.querySelectorAll('[data-cv-download]').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    const a = document.createElement('a')
    a.href = SITE.cvFile
    a.download = SITE.cvDownloadName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  })
})

/* ===== Smooth anchor offset for fixed nav ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href')
    if (!id || id === '#') return
    const target = document.querySelector(id)
    if (!target) return
    e.preventDefault()
    const offset = 80
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  })
})
