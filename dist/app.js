(() => {
  'use strict';

  const root = document.documentElement;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionButton = document.querySelector('#motion-toggle');
  const motionLabel = document.querySelector('#motion-label');
  const tiltCards = [...document.querySelectorAll('.tilt-card')];
  let explicitMotion = null;

  try {
    const saved = localStorage.getItem('aura-reduce-motion');
    if (saved === 'true' || saved === 'false') explicitMotion = saved === 'true';
  } catch { /* The website also works without local storage. */ }

  const motionReduced = () => explicitMotion ?? motionPreference.matches;
  const resetTilt = (card) => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };
  const applyMotion = () => {
    const reduced = motionReduced();
    root.classList.toggle('reduce-motion', reduced);
    root.dataset.motion = reduced ? 'reduced' : 'full';
    if (motionButton) {
      motionButton.setAttribute('aria-pressed', String(reduced));
      motionButton.setAttribute('aria-label', reduced ? 'Enable animations' : 'Pause animations');
      motionButton.title = reduced ? 'Enable animations' : 'Pause animations';
    }
    if (motionLabel) motionLabel.textContent = reduced ? 'Animations off' : 'Animations on';
    if (reduced) {
      tiltCards.forEach(resetTilt);
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
    }
  };
  applyMotion();
  motionButton?.addEventListener('click', () => {
    explicitMotion = !motionReduced();
    try { localStorage.setItem('aura-reduce-motion', String(explicitMotion)); } catch { /* Optional preference. */ }
    applyMotion();
  });
  motionPreference.addEventListener?.('change', applyMotion);

  // Navigation remains ordinary anchor navigation when JavaScript is unavailable.
  const menuButton = document.querySelector('#menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const setMenu = (open, restoreFocus = false) => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.hidden = !open;
    if (restoreFocus) menuButton.focus();
  };
  menuButton?.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    setMenu(opening);
    if (opening) mobileNav?.querySelector('a')?.focus();
  });
  mobileNav?.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      setMenu(false, true);
    }
  });
  document.addEventListener('click', (event) => {
    if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
    if (event.target instanceof Node && !mobileNav?.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
  window.matchMedia('(min-width: 681px)').addEventListener?.('change', (event) => {
    if (event.matches) setMenu(false);
  });

  const revealElements = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !motionReduced()) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    revealElements.forEach((element) => revealObserver.observe(element));
    document.body.classList.add('js-ready');
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  tiltCards.forEach((card) => {
    let frame = 0;
    card.addEventListener('pointermove', (event) => {
      if (motionReduced() || !finePointer.matches || event.pointerType === 'touch') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (motionReduced()) return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
      });
    }, { passive: true });
    const clear = () => { cancelAnimationFrame(frame); resetTilt(card); };
    card.addEventListener('pointerleave', clear);
    card.addEventListener('pointercancel', clear);
  });

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projectCards = [...document.querySelectorAll('[data-category]')];
  const filterStatus = document.querySelector('#filter-status');
  const projectNumber = new Intl.NumberFormat('en-US');
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.setAttribute('aria-pressed', String(active));
      item.classList.toggle('active', active);
    });
    let visibleCount = 0;
    projectCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category?.split(' ').includes(filter);
      card.hidden = !show;
      if (show) {
        visibleCount += 1;
        card.classList.add('is-visible');
      }
    });
    if (filterStatus) filterStatus.textContent = `${projectNumber.format(visibleCount)} concept ${visibleCount === 1 ? 'project' : 'projects'} shown.`;
  }));

  const projects = {
    madar: {
      title: 'Madar — Beyond familiar boundaries',
      type: 'Concept / Brand strategy & identity',
      description: 'For this conceptual technology brand, connection becomes a visual language: continuous orbits, mint light and geometric typography. This design exploration creates a cohesive identity for a forward-looking brand. It is an independent concept, not a commissioned client project.',
      image: 'assets/madar.svg',
      alt: 'Madar brand identity concept with mint orbits on a dark background'
    },
    sobh: {
      title: 'Sobh — A brighter start',
      type: 'Concept / Creative campaign',
      description: 'A concept campaign celebrating the simple pleasure of a fresh start. Warm orange, playful compositions and distinctive packaging come together to tell the story of a coffee brand. It is an independent concept, not a commissioned client project.',
      image: 'assets/sobh.svg',
      alt: 'Sobh coffee campaign concept with orange and cream packaging'
    },
    rooyesh: {
      title: 'Rooyesh — A little closer to nature',
      type: 'Concept / Digital experience',
      description: 'An imagined digital presence for a lifestyle brand, with quiet colors, botanical forms and room to breathe. The design focuses on clear reading, intuitive discovery and a close connection between image and story. It is an independent concept, not a commissioned client project.',
      image: 'assets/rooyesh.svg',
      alt: 'Rooyesh brand concept with botanical compositions and sage green colors'
    }
  };
  const dialog = document.querySelector('#project-dialog');
  let projectTrigger = null;
  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };
  document.querySelectorAll('[data-project]').forEach((button) => button.addEventListener('click', (event) => {
    const project = projects[button.dataset.project];
    if (!project || !dialog || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    projectTrigger = button;
    setText('#project-title', project.title);
    setText('#project-type', project.type);
    setText('#project-description', project.description);
    const image = document.querySelector('#project-image');
    if (image) { image.src = project.image; image.alt = project.alt; }
    dialog.showModal();
    document.body.classList.add('dialog-open');
    document.querySelector('#dialog-close')?.focus();
  }));
  document.querySelector('#dialog-close')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog?.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    projectTrigger?.focus();
  });

  const form = document.querySelector('#brief-form');
  const formStatus = document.querySelector('#form-status');
  const briefOutput = document.querySelector('#brief-output');
  const field = (name) => form?.elements.namedItem(name);
  const fieldValue = (name) => String(field(name)?.value ?? '').trim();
  const announce = (message) => { if (formStatus) formStatus.textContent = message; };
  const validateBrief = () => {
    if (!form) return false;
    const nameField = field('name');
    const descriptionField = field('description');
    nameField?.setCustomValidity(fieldValue('name') ? '' : 'Please enter your name.');
    descriptionField?.setCustomValidity(fieldValue('description').length >= 12 ? '' : 'Please describe your project in at least 12 characters.');
    return form.reportValidity();
  };
  const makeBrief = () => {
    const serviceField = field('service');
    const service = serviceField?.selectedOptions?.[0]?.textContent?.trim() || fieldValue('service');
    return [
      'AURA | Project brief',
      '────────────────────────',
      `Name: ${fieldValue('name')}`,
      `Business: ${fieldValue('business') || 'Not specified'}`,
      `Service: ${service || 'Not specified'}`,
      `Preferred timeline: ${fieldValue('timeline') || 'Not specified'}`,
      '',
      'About the project:',
      fieldValue('description'),
      '',
      'This brief was created on your device and has not been sent to anyone.'
    ].join('\n');
  };
  form?.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) event.target.setCustomValidity('');
    announce('');
    if (briefOutput) briefOutput.hidden = true;
  });
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateBrief()) return;
    const text = makeBrief();
    const blob = new Blob(['\uFEFF', text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'aura-project-brief.txt';
    anchor.hidden = true;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    announce('Your project brief is ready to download. No message has been sent. Keep the file for your next conversation.');
  });
  document.querySelector('#copy-brief')?.addEventListener('click', async () => {
    if (!validateBrief()) return;
    const text = makeBrief();
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      announce('Project brief copied. You can now paste it wherever you need it.');
    } catch {
      if (briefOutput) {
        briefOutput.value = text;
        briefOutput.hidden = false;
        briefOutput.focus();
        briefOutput.select();
        announce('Your brief is ready. Copy it from the text box below.');
      } else {
        announce('Automatic copying is unavailable. Use Download project brief instead.');
      }
    }
  });

  const header = document.querySelector('#site-header');
  let scrollFrame = 0;
  const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
    scrollFrame = 0;
  };
  updateHeader();
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateHeader);
  }, { passive: true });
  const year = document.querySelector('#year');
  if (year) year.textContent = new Intl.DateTimeFormat('en-US-u-ca-gregory', { year: 'numeric', timeZone: 'Asia/Tehran' }).format(new Date());
})();
