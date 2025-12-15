// ==================================================
//  ELEMENTOS BASE
// ==================================================

const container = document.getElementById('lilyContainer');
const bookModal = document.getElementById('bookModal');
const book = document.getElementById('book');
const bookPage = document.getElementById('bookPage');
const scrollIndicator = document.getElementById('scrollIndicator');
const cloudTrack = document.getElementById('cloudTrack');

if (!container) {
    console.error('❌ No existe el contenedor #lilyContainer');
}

// ==================================================
//  CONFIGURACIÓN LIRIOS
// ==================================================

let lilySVGTemplate = '';
const LILY_COLOR = '#f4a6c1'; // 🌸 color global del lirio

// ==================================================
//  MARQUESINA DE NUBES
// ==================================================

const message = "♥♥♥ TE AMO NAT ♥♥♥♥♥";

const cloudSVG = `
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#fff5f9"/>
            <stop offset="50%" style="stop-color:#ffe8f5"/>
            <stop offset="100%" style="stop-color:#ffd4e8;stop-opacity:0.9"/>
        </linearGradient>
        <filter id="cloudShadow">
            <feDropShadow dx="2" dy="3" stdDeviation="4"
                flood-color="#ff69b4" flood-opacity="0.3"/>
        </filter>
    </defs>
    <g transform="translate(0,512) scale(0.1,-0.1)" filter="url(#cloudShadow)">
        <path d="M1695 4120 c-215 -50 -378 -140 -528 -293..."
              fill="url(#cloudGrad)"
              stroke="#ffb3d9"
              stroke-width="20"/>
    </g>
</svg>
`;

function createCloudMarquee() {
    const letters = message.split('');
    let html = '';

    for (let i = 0; i < 2; i++) {
        letters.forEach(l => {
            if (l !== ' ') {
                html += `
                <div class="cloud-letter">
                    ${cloudSVG}
                    <span>${l}</span>
                </div>`;
            }
        });
    }
    cloudTrack.innerHTML = html;
}

createCloudMarquee();

// ==================================================
//  LIBRO
// ==================================================

function checkScroll() {
    if (!bookPage) return;

    const hasScroll = bookPage.scrollHeight > bookPage.clientHeight;
    const isBottom =
        bookPage.scrollTop + bookPage.clientHeight >=
        bookPage.scrollHeight - 10;

    scrollIndicator.classList.toggle('visible', hasScroll && !isBottom);
}

if (bookPage) bookPage.addEventListener('scroll', checkScroll);

function openBook() {
    bookModal.classList.add('active');
    setTimeout(checkScroll, 100);
}

function closeBook() {
    bookModal.classList.remove('active');
    book.classList.remove('open');
}

function toggleBook() {
    book.classList.toggle('open');
    setTimeout(checkScroll, 1600);
}

// ==================================================
//  CARGA SVG BASE DEL LIRIO
// ==================================================

document.addEventListener('DOMContentLoaded', () => {
    fetch('lily.svg')
        .then(r => r.text())
        .then(svg => {
            lilySVGTemplate = svg;
            initLilies();
            startLilyLoop();
        })
        .catch(err => console.error('❌ Error cargando lily.svg', err));
});

// ==================================================
//  CREAR LIRIO
// ==================================================

function createLily() {
    if (!lilySVGTemplate) return;

    const lily = document.createElement('div');
    lily.className = 'lily';

    const size = Math.random() * 60 + 80;
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = Math.random() * 10 + 14;
    const rotation = Math.random() * 360;

    lily.style.width = `${size}px`;
    lily.style.left = `${left}%`;
    lily.style.top = `110%`;
    lily.style.animationDelay = `${delay}s`;
    lily.style.animationDuration = `${duration}s`;
    lily.style.transform = `rotate(${rotation}deg)`;

    lily.innerHTML = lilySVGTemplate;

    const svg = lily.querySelector('svg');
    if (svg) {
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.display = 'block';

        svg.querySelectorAll('path').forEach(p => {
            p.setAttribute('fill', LILY_COLOR);
        });
    }

    container.appendChild(lily);

    setTimeout(() => lily.remove(), (duration + delay) * 1000);
}

// ==================================================
//  INIT + LOOP
// ==================================================

function initLilies() {
    const count = window.innerWidth <= 768 ? 6 : 12;
    for (let i = 0; i < count; i++) {
        setTimeout(createLily, i * 500);
    }
}

function startLilyLoop() {
    setInterval(createLily, 300);
}
