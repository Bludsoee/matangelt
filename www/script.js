// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Select global elements
    const burgerButtons = document.querySelectorAll('.burger');
    const overlay = document.getElementById('overlay');
    const loader = document.getElementById('loader');
    const navLinks = document.querySelectorAll('.overlay-nav .nav-link');
    const logoLinks = document.querySelectorAll('.logo');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Helper to open/close the menu
    function toggleMenu(open) {
        burgerButtons.forEach(btn => {
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.classList.toggle('open', open);
        });

        if (open) {
            overlay.classList.add('active');
            document.body.classList.add('menu-open');
        } else {
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    // Attach click handlers to burger buttons
    burgerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isOpen = overlay.classList.contains('active');
            toggleMenu(!isOpen);
        });
    });

    // Close the menu when clicking outside content
    overlay.addEventListener('click', event => {
        if (event.target === overlay) {
            toggleMenu(false);
        }
    });

    // Navigation with loading spinner
    function navigateWithLoader(href) {
        toggleMenu(false);
        loader.classList.remove('hidden');
        setTimeout(() => {
            window.location.href = href;
        }, 600);
    }

    // Set up navigation links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('disabled');
        } else {
            link.addEventListener('click', event => {
                event.preventDefault();
                navigateWithLoader(href);
            });
        }
    });

    // Set up logo links
    logoLinks.forEach(logo => {
        const href = logo.getAttribute('href');
        if (href === currentPage) {
            logo.classList.add('disabled');
        } else {
            logo.addEventListener('click', event => {
                event.preventDefault();
                navigateWithLoader(href);
            });
        }
    });

    // Fluid trailing cursor
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    function animateCursor() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Scroll gallery effect for hobbies page
    const items = document.querySelectorAll('.scroll-item');
    if (items.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach(item => item.classList.remove('active'));
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.5 });
        items.forEach(item => observer.observe(item));
    }
});
