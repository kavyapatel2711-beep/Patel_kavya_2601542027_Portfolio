/**
 * Kavya Patel Portfolio — Interactive Scripts
 * Pure vanilla JavaScript: Zero external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark Neumorphic System)
  // ------------------------------------------------------------------------
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('kp_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(targetTheme);
    });
  }

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('kp_portfolio_theme', theme);
  }

  // ------------------------------------------------------------------------
  // 2. Dynamic Copyright Year
  // ------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 3. Header Scroll Effect & Active Section Spy
  // ------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveNav(id);
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  function updateActiveNav(activeId) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4. Mobile Menu Drawer Navigation
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', isExpanded);
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 5. Copy Email To Clipboard
  // ------------------------------------------------------------------------
  const copyBtn = document.getElementById('copy-email-btn');
  const emailAddressEl = document.getElementById('email-address');

  if (copyBtn && emailAddressEl) {
    copyBtn.addEventListener('click', () => {
      const email = emailAddressEl.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const copyTextEl = copyBtn.querySelector('.copy-text');
        const origText = copyTextEl ? copyTextEl.textContent : 'Copy';
        if (copyTextEl) copyTextEl.textContent = 'Copied!';
        copyBtn.classList.add('active');

        setTimeout(() => {
          if (copyTextEl) copyTextEl.textContent = origText;
          copyBtn.classList.remove('active');
        }, 2200);
      }).catch(err => {
        console.error('Copy failed: ', err);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. Expandable Experience Details
  // ------------------------------------------------------------------------
  const toggleExpBtns = document.querySelectorAll('.toggle-details-btn');
  toggleExpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      const collapsible = btn.nextElementSibling;
      if (collapsible && collapsible.classList.contains('collapsible-content')) {
        collapsible.classList.toggle('open');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 7. Project Category Filters
  // ------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 8. Project Detail Modal Data & Handling
  // ------------------------------------------------------------------------
  const projectData = {
    'stockflow': {
      title: 'StockFlow — Inventory Management Web Application',
      badge: 'Featured Internship Project',
      subtitle: 'Masterly Solutions • Angular, Python, FastAPI, SQL Server',
      content: `
        <div class="modal-section">
          <h4 class="modal-section-title">Overview</h4>
          <p class="modal-text">
            StockFlow is an inventory management web application developed during Kavya's Software Development Internship at Masterly Solutions (15 July 2026 – 30 October 2026). The application coordinates complete inventory workflows, multi-tiered user privileges, data analytics, and operational reporting.
          </p>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Verified Architecture &amp; Tech Stack</h4>
          <div class="modal-grid-2">
            <div class="modal-info-box">
              <div class="modal-info-label">Frontend</div>
              <div class="modal-info-val">Angular (Single Page Application)</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Backend</div>
              <div class="modal-info-val">Python + FastAPI (REST APIs)</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Database</div>
              <div class="modal-info-val">Microsoft SQL Server</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Security &amp; API Testing</div>
              <div class="modal-info-val">JWT Authentication, RBAC, Swagger</div>
            </div>
          </div>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Documented Functional Modules &amp; Scope</h4>
          <div class="modal-module-grid">
            <div class="modal-module-item">Dashboard Statistics &amp; Charts</div>
            <div class="modal-module-item">User &amp; Role Management</div>
            <div class="modal-module-item">Category &amp; Product Catalogs</div>
            <div class="modal-module-item">Suppliers &amp; Warehouses</div>
            <div class="modal-module-item">Inventory Tracking</div>
            <div class="modal-module-item">Stock Movement Workflows</div>
            <div class="modal-module-item">Purchase Orders Management</div>
            <div class="modal-module-item">Warehouse Transfers</div>
            <div class="modal-module-item">Search &amp; Multi-criteria Filtering</div>
            <div class="modal-module-item">Client/Server Form Validation</div>
            <div class="modal-module-item">Protected API Endpoints</div>
            <div class="modal-module-item">File-Upload Validation</div>
            <div class="modal-module-item">PDF &amp; Excel Operational Reports</div>
            <div class="modal-module-item">Admin, Manager &amp; Staff Roles</div>
          </div>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Key Engineering Contribution</h4>
          <p class="modal-text">
            Integrated frontend Angular components with protected FastAPI endpoints, engineered role-based view controls, executed Swagger-based API validation, and implemented SQL Server queries and data models for real-time inventory updates and exportable PDF/Excel summaries.
          </p>
        </div>
      `
    },
    'make-your-wish': {
      title: 'Make Your Wish — Event Reminder System',
      badge: 'GTU Internship Project',
      subtitle: 'GTU Python Web Development Internship (2024) • Python, Django, MySQL',
      content: `
        <div class="modal-section">
          <h4 class="modal-section-title">Overview</h4>
          <p class="modal-text">
            Developed during a 15-day Python Web Development Internship under the GTU Internship Program. Make Your Wish was created to explore Python and Django-based web development, structured database connectivity, and responsive user interfaces.
          </p>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Technical Architecture</h4>
          <div class="modal-grid-2">
            <div class="modal-info-box">
              <div class="modal-info-label">Backend Framework</div>
              <div class="modal-info-val">Python &amp; Django</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Database</div>
              <div class="modal-info-val">MySQL</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Frontend</div>
              <div class="modal-info-val">HTML, CSS, JavaScript</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Core Purpose</div>
              <div class="modal-info-val">Event Reminder Scheduling</div>
            </div>
          </div>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Confirmed Work Areas</h4>
          <div class="modal-module-grid">
            <div class="modal-module-item">Django application architecture</div>
            <div class="modal-module-item">Frontend templates with HTML/CSS</div>
            <div class="modal-module-item">JavaScript client interactions</div>
            <div class="modal-module-item">MySQL relational database integration</div>
            <div class="modal-module-item">Backend connectivity &amp; data routes</div>
          </div>
        </div>
      `
    },
    'chat-app': {
      title: 'Simple Chat Application',
      badge: 'GTU Internship Project',
      subtitle: 'GTU Full Stack Internship (2025) • React.js, Node.js, MongoDB',
      content: `
        <div class="modal-section">
          <h4 class="modal-section-title">Overview</h4>
          <p class="modal-text">
            Developed as part of a 45-day Full Stack Development Internship under the GTU Internship Program. The project provided practical, hands-on experience in modern JavaScript-based full-stack architecture, connecting interactive React components with a Node.js server and MongoDB.
          </p>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Technical Stack</h4>
          <div class="modal-grid-2">
            <div class="modal-info-box">
              <div class="modal-info-label">Frontend</div>
              <div class="modal-info-val">React.js</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Server</div>
              <div class="modal-info-val">Node.js</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Database</div>
              <div class="modal-info-val">MongoDB</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Environment</div>
              <div class="modal-info-val">Team Collaborative Workflow</div>
            </div>
          </div>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Confirmed Work Areas</h4>
          <div class="modal-module-grid">
            <div class="modal-module-item">React UI component hierarchy</div>
            <div class="modal-module-item">Node.js backend endpoints</div>
            <div class="modal-module-item">MongoDB data management</div>
            <div class="modal-module-item">Frontend/backend API integration</div>
            <div class="modal-module-item">Team-based agile development</div>
          </div>
        </div>
      `
    },
    'ordering-system': {
      title: 'Digital Ordering System',
      badge: 'Academic Project',
      subtitle: 'Internal Semester-Based Internship (2026) • NestJS, React.js, MongoDB',
      content: `
        <div class="modal-section">
          <h4 class="modal-section-title">Overview</h4>
          <p class="modal-text">
            Developed as part of an internal semester-based internship in 2026. The project involved end-to-end participation in requirement planning, component development, unit testing, and full implementation of a digital ordering application.
          </p>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Technical Stack</h4>
          <div class="modal-grid-2">
            <div class="modal-info-box">
              <div class="modal-info-label">Backend Architecture</div>
              <div class="modal-info-val">NestJS (Modular TypeScript Server)</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Frontend</div>
              <div class="modal-info-val">React.js</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Database</div>
              <div class="modal-info-val">MongoDB</div>
            </div>
            <div class="modal-info-box">
              <div class="modal-info-label">Lifecycle Scope</div>
              <div class="modal-info-val">Planning, Development, Testing, Implementation</div>
            </div>
          </div>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Confirmed Work Areas</h4>
          <div class="modal-module-grid">
            <div class="modal-module-item">Digital ordering workflow modeling</div>
            <div class="modal-module-item">NestJS controllers &amp; service providers</div>
            <div class="modal-module-item">React interactive UI state management</div>
            <div class="modal-module-item">MongoDB document schemas</div>
            <div class="modal-module-item">Functional and integration testing</div>
          </div>
        </div>
      `
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      modalBadge.textContent = data.badge;
      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalBody.innerHTML = data.content;

      modalOverlay.classList.add('open');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (modalCloseBtn) modalCloseBtn.focus();
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // ------------------------------------------------------------------------
  // 9. Contact Form Client-Side Validation
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput);
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showError(emailInput);
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        showError(subjectInput);
        isValid = false;
      } else {
        clearError(subjectInput);
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        showError(messageInput);
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (isValid) {
        // Construct mailto link as direct honest action without pretending fake backend delivery
        const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
        const body = encodeURIComponent(
          `Hi Kavya,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
        );

        if (formFeedback) {
          formFeedback.textContent = "Thank you! Opening your email client to send your message directly to Kavya...";
          formFeedback.className = "form-status-feedback success";
        }

        setTimeout(() => {
          window.location.href = `mailto:Kavyapatel2711@gmail.com?subject=${subject}&body=${body}`;
        }, 800);
      }
    });

    // Clear errors on input
    const inputs = contactForm.querySelectorAll('.neu-input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        clearError(input);
      });
    });
  }

  function showError(inputEl) {
    const group = inputEl.closest('.form-group');
    if (group) group.classList.add('has-error');
  }

  function clearError(inputEl) {
    const group = inputEl.closest('.form-group');
    if (group) group.classList.remove('has-error');
  }
});
