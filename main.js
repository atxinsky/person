import { content } from './data.js'
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js'

// ═══════════════════════════════════════════
// State
// ═══════════════════════════════════════════
let currentLang = 'en'

// ═══════════════════════════════════════════
// DOM refs
// ═══════════════════════════════════════════
const navbar = document.getElementById('navbar')
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobileMenu')
const langToggle = document.getElementById('langToggle')
const langToggleMobile = document.getElementById('langToggleMobile')

// ═══════════════════════════════════════════
// Custom Cursor (Version A style)
// ═══════════════════════════════════════════
function initCursor() {
  const cursor = document.getElementById('customCursor')
  if (!cursor || window.innerWidth < 768) return

  const interactiveSelectors = 'a, button, .project-card, .writing-row, .contact-btn, .tool-tag, .descriptor-pill, .stat-card'
  const cursorPos = { x: -100, y: -100 }

  document.addEventListener('mousemove', (e) => {
    cursorPos.x = e.clientX
    cursorPos.y = e.clientY
  })

  function updateCursor() {
    cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`
    requestAnimationFrame(updateCursor)
  }
  updateCursor()

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursor.classList.add('hovering')
    }
  })

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursor.classList.remove('hovering')
    }
  })

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'
  })
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1'
  })
}

// ═══════════════════════════════════════════
// Three.js 3D Scene (from Version A)
// ═══════════════════════════════════════════
function initThreeScene() {
  const container = document.getElementById('hero3d')
  if (!container || window.innerWidth < 480) return

  const mouse3d = { x: 0, y: 0, targetX: 0, targetY: 0 }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  // Main Icosahedron wireframe
  const icoGeo = new THREE.IcosahedronGeometry(1.6, 1)
  const wireframeMat = new THREE.MeshBasicMaterial({
    color: 0xC0582A,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  })
  const icosahedron = new THREE.Mesh(icoGeo, wireframeMat)
  scene.add(icosahedron)

  // Inner solid with subtle fill
  const innerGeo = new THREE.IcosahedronGeometry(1.55, 1)
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xC0582A,
    transparent: true,
    opacity: 0.04,
    side: THREE.DoubleSide,
  })
  const innerMesh = new THREE.Mesh(innerGeo, innerMat)
  scene.add(innerMesh)

  // Secondary smaller rotating polyhedron
  const dodGeo = new THREE.DodecahedronGeometry(0.6, 0)
  const dodMat = new THREE.MeshBasicMaterial({
    color: 0xC0582A,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  })
  const dodecahedron = new THREE.Mesh(dodGeo, dodMat)
  scene.add(dodecahedron)

  // Floating particles
  const particleCount = 120
  const particleGeo = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const velocities = []

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 2 + Math.random() * 1.5
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
    velocities.push({
      x: (Math.random() - 0.5) * 0.003,
      y: (Math.random() - 0.5) * 0.003,
      z: (Math.random() - 0.5) * 0.003,
    })
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particleMat = new THREE.PointsMaterial({
    color: 0xC0582A,
    size: 0.025,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  })
  const particles = new THREE.Points(particleGeo, particleMat)
  scene.add(particles)

  // Edge-glow lines
  const edgeGroup = new THREE.Group()
  const vertexPositions = icoGeo.attributes.position.array
  const lineCount = 18
  for (let i = 0; i < lineCount; i++) {
    const idx1 = Math.floor(Math.random() * (vertexPositions.length / 3)) * 3
    const idx2 = Math.floor(Math.random() * (vertexPositions.length / 3)) * 3
    const lineGeo = new THREE.BufferGeometry()
    const linePositions = new Float32Array([
      vertexPositions[idx1], vertexPositions[idx1 + 1], vertexPositions[idx1 + 2],
      vertexPositions[idx2], vertexPositions[idx2 + 1], vertexPositions[idx2 + 2],
    ])
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xC0582A,
      transparent: true,
      opacity: 0.08 + Math.random() * 0.1,
    })
    edgeGroup.add(new THREE.Line(lineGeo, lineMat))
  }
  scene.add(edgeGroup)

  // Mouse tracking for 3D
  document.addEventListener('mousemove', (e) => {
    mouse3d.targetX = (e.clientX / window.innerWidth - 0.5) * 2
    mouse3d.targetY = (e.clientY / window.innerHeight - 0.5) * 2
  })

  // Animation loop
  const clock = new THREE.Clock()

  function animate() {
    requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    mouse3d.x += (mouse3d.targetX - mouse3d.x) * 0.05
    mouse3d.y += (mouse3d.targetY - mouse3d.y) * 0.05

    icosahedron.rotation.x = t * 0.08 + mouse3d.y * 0.4
    icosahedron.rotation.y = t * 0.12 + mouse3d.x * 0.4
    icosahedron.rotation.z = t * 0.03

    innerMesh.rotation.copy(icosahedron.rotation)
    edgeGroup.rotation.copy(icosahedron.rotation)

    dodecahedron.rotation.x = -t * 0.15 + mouse3d.y * 0.2
    dodecahedron.rotation.y = -t * 0.1 + mouse3d.x * 0.2

    wireframeMat.opacity = 0.3 + Math.sin(t * 0.8) * 0.08
    innerMat.opacity = 0.03 + Math.sin(t * 0.5) * 0.015

    const posArr = particleGeo.attributes.position.array
    for (let i = 0; i < particleCount; i++) {
      posArr[i * 3] += velocities[i].x + Math.sin(t + i) * 0.001
      posArr[i * 3 + 1] += velocities[i].y + Math.cos(t + i) * 0.001
      posArr[i * 3 + 2] += velocities[i].z

      const dx = posArr[i * 3]
      const dy = posArr[i * 3 + 1]
      const dz = posArr[i * 3 + 2]
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist > 4) {
        posArr[i * 3] *= 0.98
        posArr[i * 3 + 1] *= 0.98
        posArr[i * 3 + 2] *= 0.98
      }
    }
    particleGeo.attributes.position.needsUpdate = true
    particles.rotation.y = t * 0.02

    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    if (!container.clientWidth) return
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  })
}

// ═══════════════════════════════════════════
// Navigation
// ═══════════════════════════════════════════
function initNavbar() {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60)
  }, { passive: true })

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open')
    mobileMenu.classList.toggle('open')
  })

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open')
      mobileMenu.classList.remove('open')
    })
  })
}

// ═══════════════════════════════════════════
// Language Toggle
// ═══════════════════════════════════════════
function setLang(lang) {
  currentLang = lang
  const btnText = lang === 'en' ? '中' : 'EN'
  langToggle.textContent = btnText
  langToggleMobile.textContent = btnText
  renderAll()
}

function initLangToggle() {
  langToggle.addEventListener('click', () => {
    setLang(currentLang === 'en' ? 'zh' : 'en')
  })
  langToggleMobile.addEventListener('click', () => {
    setLang(currentLang === 'en' ? 'zh' : 'en')
  })
}

// ═══════════════════════════════════════════
// Hero Parallax
// ═══════════════════════════════════════════
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    document.querySelectorAll('.hero-line').forEach((line) => {
      const speed = parseFloat(line.dataset.parallax) || 0.1
      line.style.transform = `translateY(${scrollY * speed}px)`
    })
  }, { passive: true })
}

// ═══════════════════════════════════════════
// Intersection Observer — Reveal animations
// ═══════════════════════════════════════════
function initRevealObserver() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.reveal-text').forEach((el) => {
    const textRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, { threshold: 0.3 })
    textRevealObserver.observe(el)
  })

  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`
    revealObserver.observe(el)
  })

  document.querySelectorAll('.writing-row').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`
    revealObserver.observe(el)
  })

  document.querySelectorAll('.about-p').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`
    revealObserver.observe(el)
  })

  const contactSub = document.querySelector('.contact-subtitle')
  if (contactSub) revealObserver.observe(contactSub)

  document.querySelectorAll('.contact-btn').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`
    revealObserver.observe(el)
  })
}

// ═══════════════════════════════════════════
// Number Counter Animation
// ═══════════════════════════════════════════
function animateCounter(el, target, suffix) {
  const duration = 1800
  const start = performance.now()
  const numericTarget = parseInt(target, 10)

  if (isNaN(numericTarget)) {
    el.textContent = target
    return
  }

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4)
  }

  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutQuart(progress)
    const current = Math.round(numericTarget * easedProgress)

    el.textContent = current + suffix

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      el.textContent = target
      el.classList.add('counted')
    }
  }

  requestAnimationFrame(update)
}

function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number')

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true'
        const raw = entry.target.dataset.target
        const match = raw.match(/^(\d+)(.*)$/)
        if (match) {
          animateCounter(entry.target, raw, match[2])
        } else {
          entry.target.textContent = raw
        }
      }
    })
  }, { threshold: 0.5 })

  statNumbers.forEach((el) => counterObserver.observe(el))
}

// ═══════════════════════════════════════════
// Render Functions
// ═══════════════════════════════════════════
function wrapWordsForReveal(text) {
  return text
    .split(' ')
    .map((word) => `<span class="reveal-word"><span class="reveal-word-inner">${word}</span></span>`)
    .join(' ')
}

function renderHero() {
  const data = content.hero[currentLang]

  document.querySelector('.hero-pre').textContent = data.preLabel

  data.h1.forEach((line, i) => {
    const el = document.querySelector(`.hero-line[data-line="${i}"] .hero-line-inner`)
    if (el) el.textContent = line
  })

  document.querySelector('.hero-subtitle').textContent = data.subtitle

  const descriptorsEl = document.getElementById('heroDescriptors')
  descriptorsEl.innerHTML = data.descriptors
    .map((d) => `<span class="descriptor-pill">${d}</span>`)
    .join('')

  document.querySelector('.hero-cta').textContent = data.cta
}

function renderProjects() {
  const data = content.projects[currentLang]

  document.getElementById('projectsTitle').innerHTML =
    data.title.map((line) => `<span>${line}</span>`).join('')

  const list = document.getElementById('projectsList')
  list.innerHTML = data.items
    .map((item, i) => {
      const inner = `
        <div class="project-card-header">
          <div>
            <div class="project-name">${item.name}</div>
            ${item.nameSub ? `<div class="project-name-sub">${item.nameSub}</div>` : ''}
          </div>
          <span class="project-status">${item.status}</span>
        </div>
        <p class="project-desc">${item.desc}</p>
        ${item.image ? `<img src="${item.image}" alt="${item.name}" class="project-thumb" onclick="event.preventDefault();event.stopPropagation();openProjectImage(this.src)">` : ''}
        <div class="project-tags">
          ${item.tags.map((t) => `<span class="project-tag">${t}</span>`).join('')}
        </div>`
      if (item.url) {
        return `<a href="${item.url}" target="_blank" class="project-card project-card-link" style="transition-delay: ${i * 0.08}s">${inner}</a>`
      }
      return `<div class="project-card" style="transition-delay: ${i * 0.08}s">${inner}</div>`
    })
    .join('')
}

function renderWriting() {
  const data = content.writing[currentLang]

  document.getElementById('writingTitle').innerHTML =
    data.title.map((line) => wrapWordsForReveal(line)).join('<br>')

  const list = document.getElementById('writingList')
  list.innerHTML = data.items
    .map((item) => `
      <div class="writing-row">
        <div class="writing-info">
          <h3 class="writing-title">${item.title}</h3>
          <p class="writing-desc">${item.desc}</p>
        </div>
        <div class="writing-meta">
          <span class="writing-date">${item.date}</span>
          <span class="writing-lang">${item.lang}</span>
        </div>
      </div>
    `)
    .join('')
}

function renderAbout() {
  const data = content.about[currentLang]

  document.getElementById('aboutTitle').innerHTML =
    data.title.map((line) => wrapWordsForReveal(line)).join('<br>')

  const statsGrid = document.getElementById('statsGrid')
  statsGrid.innerHTML = data.stats
    .map((stat) => `
      <div class="stat-card">
        <div class="stat-number" data-target="${stat.number}">0</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `)
    .join('')

  const paragraphs = document.getElementById('aboutParagraphs')
  paragraphs.innerHTML = data.paragraphs
    .map((p) => `<p class="about-p">${p}</p>`)
    .join('')

  const tags = document.getElementById('toolchainTags')
  tags.innerHTML = data.toolchain
    .map((t) => `<span class="tool-tag">${t}</span>`)
    .join('')
}

function renderContact() {
  const data = content.contact[currentLang]

  document.getElementById('contactTitle').innerHTML =
    data.title.map((line) => wrapWordsForReveal(line)).join('<br>')

  document.querySelector('.contact-subtitle').textContent = data.subtitle

  const links = document.getElementById('contactLinks')
  links.innerHTML = data.links
    .map((link) => `
      <a href="${link.url}" class="contact-btn" target="_blank" rel="noopener">
        ${link.platform}
        <span class="contact-handle">${link.handle}</span>
      </a>
    `)
    .join('')
}

function renderNav() {
  const data = content.nav[currentLang]
  document.querySelectorAll('[data-i18n="nav.projects"]').forEach((el) => { el.textContent = data.projects })
  document.querySelectorAll('[data-i18n="nav.writing"]').forEach((el) => { el.textContent = data.writing })
  document.querySelectorAll('[data-i18n="nav.about"]').forEach((el) => { el.textContent = data.about })
  document.querySelectorAll('[data-i18n="nav.contact"]').forEach((el) => { el.textContent = data.contact })
}

function renderFooter() {
  const data = content.footer[currentLang]
  document.querySelector('.footer-copy').textContent = data.copyright
  document.querySelector('.footer-top').textContent = data.backToTop
}

function renderAll() {
  renderNav()
  renderHero()
  renderProjects()
  renderWriting()
  renderAbout()
  renderContact()
  renderFooter()

  requestAnimationFrame(() => {
    initRevealObserver()
    initCounters()
    initCardTilt()
  })
}

// ═══════════════════════════════════════════
// Smooth scroll for anchor links
// ═══════════════════════════════════════════
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]')
    if (!anchor) return
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

// ═══════════════════════════════════════════
// 3D Card Tilt Effect (from Version A)
// ═══════════════════════════════════════════
function initCardTilt() {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -6
      const rotateY = ((x - centerX) / centerX) * 6

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`

      const percentX = (x / rect.width) * 100
      const percentY = (y / rect.height) * 100
      card.style.setProperty('--mouse-x', `${percentX}%`)
      card.style.setProperty('--mouse-y', `${percentY}%`)
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = ''
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s var(--ease-out), background 0.4s'
    })

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease-out, background 0.4s'
    })
  })
}

// ═══════════════════════════════════════════
// Init
// ═══════════════════════════════════════════
function init() {
  renderAll()
  initCursor()
  initThreeScene()
  initNavbar()
  initLangToggle()
  initParallax()
  initSmoothScroll()
  initCardTilt()
}

document.addEventListener('DOMContentLoaded', init)
