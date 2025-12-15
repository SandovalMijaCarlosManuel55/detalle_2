const container = document.getElementById('lilyContainer');
const bookModal = document.getElementById('bookModal');
const book = document.getElementById('book');
const bookPage = document.getElementById('bookPage');
const scrollIndicator = document.getElementById('scrollIndicator');
const cloudTrack = document.getElementById('cloudTrack');

// Crear marquesina de nubes
const message = "♥♥♥ TE AMO NAT ♥♥♥♥♥";
const cloudSVG = `
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#fff5f9;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#ffe8f5;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#ffd4e8;stop-opacity:0.9" />
                    </linearGradient>
                    <filter id="cloudShadow">
                        <feDropShadow dx="2" dy="3" stdDeviation="4" flood-color="#ff69b4" flood-opacity="0.3"/>
                    </filter>
                </defs>
                <g transform="translate(0,512) scale(0.1,-0.1)" filter="url(#cloudShadow)">
                    <path d="M1695 4120 c-215 -50 -378 -140 -528 -293 -210 -215 -319 -525 -288
                    -818 6 -57 14 -116 17 -130 5 -24 3 -26 -53 -38 -235 -52 -457 -218 -577 -434
                    -19 -34 -50 -105 -67 -157 -32 -92 -33 -100 -33 -265 -1 -194 8 -239 79 -390
                    114 -243 323 -411 601 -482 65 -17 174 -18 1669 -18 1508 0 1605 1 1685 18
                    382 82 680 390 750 777 14 79 14 246 0 335 -49 306 -268 587 -557 714 -121 53
                    -215 73 -366 80 l-138 6 -32 75 c-102 234 -316 408 -572 465 -90 20 -287 16
                    -372 -7 l-52 -15 -12 30 c-27 65 -116 186 -193 263 -153 152 -324 244 -538
                    288 -107 22 -318 20 -423 -4z m440 -181 c254 -66 452 -230 572 -472 26 -51 53
                    -97 62 -104 25 -19 68 -15 145 14 63 24 85 27 196 27 102 1 138 -3 195 -21
                    200 -64 358 -225 421 -430 13 -44 32 -87 41 -95 12 -10 61 -13 202 -13 181 -1
                    188 -1 272 -31 140 -50 214 -96 319 -203 80 -81 103 -111 143 -191 62 -125 87
                    -227 88 -356 0 -117 -18 -216 -59 -311 -93 -222 -276 -385 -517 -460 l-90 -28
                    -1560 -3 c-1076 -2 -1582 1 -1630 8 -161 25 -279 85 -401 205 -218 215 -274
                    528 -143 804 109 231 317 378 577 409 127 15 145 42 111 163 -29 106 -37 320
                    -15 417 38 170 108 301 220 419 143 151 312 241 511 273 87 13 248 4 340 -21z" 
                    fill="url(#cloudGrad)" stroke="#ffb3d9" stroke-width="20"/>
                </g>
            </svg>
        `;

function createCloudMarquee() {
    const letters = message.split('');
    let cloudsHTML = '';

    // Crear dos copias para efecto continuo
    for (let i = 0; i < 2; i++) {
        letters.forEach(letter => {
            if (letter !== ' ') {
                cloudsHTML += `
                            <div class="cloud-letter">
                                ${cloudSVG}
                                <span>${letter}</span>
                            </div>
                        `;
            }
        });
    }

    cloudTrack.innerHTML = cloudsHTML;
}

createCloudMarquee();

function checkScroll() {
    if (bookPage) {
        const hasScroll = bookPage.scrollHeight > bookPage.clientHeight;
        const isAtBottom = bookPage.scrollTop + bookPage.clientHeight >= bookPage.scrollHeight - 10;

        if (hasScroll && !isAtBottom) {
            scrollIndicator.classList.add('visible');
        } else {
            scrollIndicator.classList.remove('visible');
        }
    }
}

if (bookPage) {
    bookPage.addEventListener('scroll', checkScroll);
}

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

const lilyColors = [
    {
        main: '#ff69b4',
        gradient1: '#ff1493',
        gradient2: '#ff85c1',
        gradient3: '#ffc0cb',
        center: '#ffeb3b'
    },
    {
        main: '#ff85d0',
        gradient1: '#ff4da6',
        gradient2: '#ffa8e0',
        gradient3: '#ffd4f0',
        center: '#fff176'
    },
    {
        main: '#ff6ec7',
        gradient1: '#ff1493',
        gradient2: '#ff8ad8',
        gradient3: '#ffb3e6',
        center: '#ffd54f'
    },
    {
        main: '#e91e63',
        gradient1: '#c2185b',
        gradient2: '#f06292',
        gradient3: '#f8bbd0',
        center: '#ffee58'
    },
    {
        main: '#ec407a',
        gradient1: '#d81b60',
        gradient2: '#f48fb1',
        gradient3: '#fce4ec',
        center: '#fff59d'
    }
];

function createLily() {
    const lily = document.createElement('div');
    lily.className = 'lily';

    const colorScheme = lilyColors[Math.floor(Math.random() * lilyColors.length)];
    const size = Math.random() * 60 + 80;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 12;
    const rotation = Math.random() * 360;
    const uniqueId = Date.now() + Math.random();

    lily.innerHTML = `
                <svg width="${size}" height="${size * 0.73}" viewBox="0 0 145 106" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <linearGradient id="grad1_${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:${colorScheme.gradient1};stop-opacity:1" />
                            <stop offset="50%" style="stop-color:${colorScheme.main};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${colorScheme.gradient2};stop-opacity:0.9" />
                        </linearGradient>
                        <linearGradient id="grad2_${uniqueId}" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:${colorScheme.gradient2};stop-opacity:0.95" />
                            <stop offset="100%" style="stop-color:${colorScheme.gradient3};stop-opacity:0.85" />
                        </linearGradient>
                        <radialGradient id="centerGrad_${uniqueId}">
                            <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.8" />
                            <stop offset="40%" style="stop-color:${colorScheme.center};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#f4a460;stop-opacity:0.9" />
                        </radialGradient>
                    </defs>
                    <g transform="translate(0,106) scale(0.1,-0.1) rotate(${rotation}, 725, 530)">
                        <path d="M657 925 c-54 -15 -69 -25 -48 -33 26 -9 77 -63 64 -69 -7 -2 -13 -13 -13 -23 0 -50 -11 -53 -51 -14 -23 22 -39 48 -39 61 0 13 -5 23 -10 23 -12 0 -16 -9 -24 -59 -6 -33 -6 -34 13 -17 11 10 22 13 25 8 3 -6 0 -12 -7 -15 -8 -3 -11 -19 -9 -46 4 -40 22 -49 22 -10 0 20 1 20 29 -3 25 -19 61 -73 61 -91 0 -7 -22 -3 -38 7 -10 6 -9 0 2 -22 19 -37 21 -51 4 -34 -7 7 -21 12 -32 12 -10 0 -16 -3 -12 -7 3 -4 -6 -12 -21 -19 -26 -12 -25 -12 29 -13 31 -1 60 -5 63 -11 3 -5 -1 -10 -10 -10 -8 0 -40 -20 -71 -45 -66 -54 -106 -59 -153 -19 -28 23 -31 24 -31 7 0 -28 46 -116 75 -143 l25 -23 0 22 c0 30 36 98 59 110 10 6 37 26 60 46 49 40 70 46 47 13 -18 -25 -20 -38 -8 -38 5 0 15 11 22 25 25 46 40 31 40 -40 0 -85 -18 -127 -69 -160 -23 -14 -41 -32 -41 -39 0 -39 173 -49 264 -16 107 41 133 85 76 133 -41 35 -81 42 -120 22 -39 -20 -54 -15 -80 27 -42 69 -15 116 59 105 33 -6 34 -5 17 8 -11 8 -17 17 -14 21 9 9 131 -16 156 -33 35 -22 65 -97 59 -145 -5 -38 -5 -38 12 -16 25 33 61 122 61 151 0 39 -21 50 -69 36 -34 -10 -47 -9 -86 6 -25 9 -61 17 -80 17 -41 0 -37 14 8 27 32 9 32 9 5 10 -34 1 -36 14 -5 37 l22 16 -27 -6 c-14 -3 -34 -9 -45 -12 -12 -4 -10 2 10 20 15 14 23 26 16 26 -6 0 -27 -16 -45 -36 -31 -33 -34 -34 -34 -13 0 13 9 33 21 45 l21 22 -29 -1 c-32 -2 -43 -13 -43 -44 0 -13 -4 -23 -10 -23 -5 0 -10 9 -10 20 0 11 -9 43 -20 72 -22 58 -27 96 -9 66 16 -28 27 -21 39 21 12 47 43 87 73 97 21 7 21 7 2 15 -30 11 -94 9 -148 -6z m-34 -167 c57 -77 60 -91 10 -38 -29 29 -53 57 -53 62 0 18 20 6 43 -24z m73 -43 c22 -53 16 -64 -11 -20 -27 44 -30 55 -14 55 5 0 17 -16 25 -35z" 
                              fill="url(#grad1_${uniqueId})" stroke="${colorScheme.gradient1}" stroke-width="8"/>
                        <path d="M943 833 c-7 -2 -15 -21 -19 -41 -8 -42 -22 -74 -38 -84 -6 -4 15 -4 46 -1 70 7 98 0 139 -34 l32 -27 -8 25 c-37 122 -96 185 -152 162z" 
                              fill="url(#grad2_${uniqueId})" stroke="${colorScheme.gradient2}" stroke-width="6"/>
                        <path d="M441 767 c-20 -33 -51 -110 -51 -129 0 -5 9 -4 19 2 28 15 122 12 154 -4 37 -20 34 -3 -5 28 -20 15 -41 46 -53 77 -11 29 -25 54 -32 56 -6 2 -20 -11 -32 -30z" 
                              fill="url(#grad2_${uniqueId})" stroke="${colorScheme.gradient2}" stroke-width="6"/>
                        
                        <!-- Centro del lirio -->
                        <ellipse cx="725" cy="530" rx="80" ry="80" fill="url(#centerGrad_${uniqueId})" opacity="0.9"/>
                        <ellipse cx="725" cy="520" rx="30" ry="30" fill="#ffffff" opacity="0.4"/>
                    </g>
                </svg>
            `;

    lily.style.left = `${left}%`;
    lily.style.top = `${Math.random() * 100}%`;
    lily.style.animationDelay = `${delay}s`;
    lily.style.animationDuration = `${duration}s`;

    container.appendChild(lily);

    setTimeout(() => {
        lily.remove();
    }, (duration + delay) * 1000);
}

function initLilies() {
    const isMobile = window.innerWidth <= 768;
    const lilyCount = isMobile ? 6 : 12;

    for (let i = 0; i < lilyCount; i++) {
        setTimeout(() => createLily(), i * 500);
    }
}

initLilies();

setInterval(() => {
    createLily();
}, 1500);