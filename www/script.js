// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Select global elements
    const burgerButtons = document.querySelectorAll('.burger');
    const overlay = document.getElementById('overlay');
    const loader = document.getElementById('loader');
    const navLinks = document.querySelectorAll('.overlay-nav .nav-link');
    const logoLinks = document.querySelectorAll('.logo');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const items = document.querySelectorAll('.scroll-item');
    const header = document.querySelector('.hobbies-header');

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

    function updateActiveItem() {
        const viewportMiddle = window.innerHeight / 2;
        let currentIndex = -1;

        items.forEach((item, idx) => {
            const rect = item.getBoundingClientRect();
            if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
                currentIndex = idx;
            }
        });

        if (currentIndex !== -1) {
            // Update the active class
            items.forEach(item => item.classList.remove('active'));
            items[currentIndex].classList.add('active');

            // Align the header: first two items -> right; last two -> left
            if (currentIndex < 2) {
                header.classList.add('align-right');
                header.classList.remove('align-left');
            } else {
                header.classList.add('align-left');
                header.classList.remove('align-right');
            }
        }
    }

    if (items.length > 0) {
        // Activate the first item on load
        items[0].classList.add('active');
        header.classList.add('align-right'); // initial alignment for the first two images

        // Set up scroll and resize listeners
        window.addEventListener('scroll', updateActiveItem);
        window.addEventListener('resize', updateActiveItem);

        // Run once on load in case the first item is already in view
        updateActiveItem();
    }

});
