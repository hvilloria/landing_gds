// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
	mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
	link.addEventListener('click', () => {
		mobileMenu.classList.remove('active');
	});
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset;

	if (currentScroll > 50) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}

	lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		if (href !== '#') {
			e.preventDefault();
			const target = document.querySelector(href);
			if (target) {
				const headerHeight = header.offsetHeight;
				const targetPosition = target.offsetTop - headerHeight;

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		}
	});
});


// Intersection Observer for animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1';
			entry.target.style.transform = 'translateY(0)';
		}
	});
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.step-card, .benefit-card, .catalog-card, .contact-card-item').forEach(el => {
	el.style.opacity = '0';
	el.style.transform = 'translateY(20px)';
	el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
	observer.observe(el);
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
	const sections = document.querySelectorAll('section[id]');
	const scrollY = window.pageYOffset;

	sections.forEach(section => {
		const sectionHeight = section.offsetHeight;
		const sectionTop = section.offsetTop - 100;
		const sectionId = section.getAttribute('id');
		const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

		if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document.querySelectorAll('nav a').forEach(link => {
				link.style.color = '';
			});
			navLink.style.color = 'var(--red-primary)';
		}
	});
});


// ================== WhatsApp Floating Button ==================
(() => {
	const PHONE = "5491162044851";
	const DEFAULT_MESSAGE = "Hola GDS Repuestos, vengo de la web y tengo una consulta.";

	const btn = document.getElementById('waButton');
	const tip = document.getElementById('waTooltip');
	if (!btn || !tip) return;

	// Abrir WhatsApp
	const openWA = () => {
		const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	// Click simple
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		openWA();
	});

	// Tooltip en desktop
	const positionTooltip = () => {
		const r = btn.getBoundingClientRect();
		tip.style.left = (r.left - 8) + 'px';
		tip.style.top = (r.top - 8) + 'px';
	};

	btn.addEventListener('mouseenter', () => {
		positionTooltip();
		btn.setAttribute('data-hover', '1');
	});

	btn.addEventListener('mouseleave', () => {
		btn.removeAttribute('data-hover');
	});

	// Teclado accesible
	btn.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openWA();
		}
	});
})();


// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
	const faqItems = document.querySelectorAll('.faq-item');
	
	faqItems.forEach(item => {
		const question = item.querySelector('.faq-question');
		
		question.addEventListener('click', () => {
			const isActive = item.classList.contains('active');
			
			// Cerrar todos los items
			faqItems.forEach(otherItem => {
				otherItem.classList.remove('active');
				otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
			});
			
			// Abrir el item clickeado si no estaba abierto
			if (!isActive) {
				item.classList.add('active');
				question.setAttribute('aria-expanded', 'true');
			}
		});
	});
});
// Promo slider: auto-advancing banner carousel with dot navigation
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');

if (sliderTrack && sliderDots) {
	const slides = sliderTrack.querySelectorAll('.slide');
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const HOLD = 6000;
	let current = 0;
	let timer = null;

	const goTo = (index) => {
		current = (index + slides.length) % slides.length;
		sliderTrack.style.transform = `translateX(-${current * (100 / slides.length)}%)`;
		sliderDots.querySelectorAll('button').forEach((dot, i) => {
			dot.setAttribute('aria-selected', String(i === current));
			dot.setAttribute('tabindex', i === current ? '0' : '-1');
		});
	};

	const start = () => {
		if (reduceMotion) return;
		stop();
		timer = setInterval(() => goTo(current + 1), HOLD);
	};

	const stop = () => {
		if (timer) clearInterval(timer);
		timer = null;
	};

	slides.forEach((slide, i) => {
		const dot = document.createElement('button');
		dot.type = 'button';
		dot.setAttribute('role', 'tab');
		dot.setAttribute('aria-label', `Ver promoción ${i + 1} de ${slides.length}`);
		dot.addEventListener('click', () => {
			goTo(i);
			start();
		});
		sliderDots.appendChild(dot);
	});

	// Holding still while the visitor reads, or while the tab is hidden.
	sliderTrack.addEventListener('mouseenter', stop);
	sliderTrack.addEventListener('mouseleave', start);
	sliderDots.addEventListener('mouseenter', stop);
	sliderDots.addEventListener('mouseleave', start);
	document.addEventListener('visibilitychange', () => {
		document.hidden ? stop() : start();
	});

	goTo(0);
	start();
}

// Keep the footer year current without needing a yearly edit
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Report which WhatsApp button converted. Google already counts outbound
// clicks, but not which one, and that is the useful part.
document.addEventListener('click', (event) => {
	const link = event.target.closest('a[href*="wa.me"]');
	if (!link || typeof gtag !== 'function') return;
	gtag('event', 'whatsapp_click', {
		origin: link.dataset.wa || 'sin-identificar'
	});
});
