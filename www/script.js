// Select global elements
const burgerButtons = document.querySelectorAll('.burger');
const overlay = document.getElementById('overlay');
const overlayClose = document.getElementById('overlay-close');
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
    overlay.classList.toggle('active', open);
}

// Attach event handlers to burgers
burgerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const isOpen = overlay.classList.contains('active');
        toggleMenu(!isOpen);
    });
});

// Close button and clicking on overlay background
if (overlayClose) {
    overlayClose.addEventListener('click', () => toggleMenu(false));
}
// Close if user clicks outside the nav content (but not when clicking links)
overlay.addEventListener('click', event => {
    if (event.target === overlay) {
        toggleMenu(false);
    }
});

// Helper to navigate with loader
function navigateWithLoader(href) {
    // Close menu if open and show loader
    toggleMenu(false);
    loader.classList.remove('hidden');
    setTimeout(() => {
        window.location.href = href;
    }, 600);
}

// Set up nav link behaviour
navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        // Mark as disabled when it points to the current page
        link.classList.add('disabled');
    } else {
        // Attach loader and navigation handler
        link.addEventListener('click', event => {
            event.preventDefault();
            navigateWithLoader(href);
        });
    }
});

// Set up logo behaviour
logoLinks.forEach(logo => {
    const href = logo.getAttribute('href');
    if (href === currentPage) {
        // Mark the logo as disabled on its own page
        logo.classList.add('disabled');
    } else {
        logo.addEventListener('click', event => {
            event.preventDefault();
            navigateWithLoader(href);
        });
    }
});

// Fluid trailing cursor
document.addEventListener('DOMContentLoaded', () => {
    // Create the cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    // Variables for mouse and cursor positions
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Update mouse position on mousemove
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate the cursor position gradually towards the mouse position
    function animateCursor() {
        // Ease factor (smaller number = slower, more fluid trailing)
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        // Continue animation
        requestAnimationFrame(animateCursor);
    }

    animateCursor();
});

function toggleMenu(open) {
    burgerButtons.forEach(btn => {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.classList.toggle('open', open);
    });
    overlay.classList.toggle('active', open);

    // Add or remove a class on <body> to reflect menu state
    if (open) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
}

