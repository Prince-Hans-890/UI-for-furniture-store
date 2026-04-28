/* ── LOADER ── */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('heroSection').classList.add('loaded');
    }, 1900);
});

/* ── CUSTOM CURSOR ── */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});

(function animateRing() {
    rx += (mx - rx) * 0.10;
    ry += (my - ry) * 0.10;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
})();

document.addEventListener('mousedown', () => ring.classList.add('click'));
document.addEventListener('mouseup', () => ring.classList.remove('click'));

document.querySelectorAll('a, button, .cat-card, .product-card, .swatch, .ugc-item').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
});

/* ── SCROLL EFFECTS ── */
const nav = document.getElementById('mainNav');
const progress = document.getElementById('pageProgress');

window.addEventListener('scroll', () => {
    const st = window.scrollY;
    const dh = document.body.scrollHeight - window.innerHeight;
    progress.style.width = (st / dh * 100) + '%';
    nav.classList.toggle('scrolled', st > 80);

    // Parallax hero bg
    const heroBg = document.getElementById('heroBg');
    if (heroBg) heroBg.style.transform = `scale(1) translateY(${st * 0.25}px)`;
}, { passive: true });

/* ── REVEAL ON SCROLL ── */
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── COUNTER ANIMATION ── */
const counters = document.querySelectorAll('.stat-number[data-target]');
const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            const display = target >= 1000
                ? (Math.round(current / 100) / 10).toFixed(1) + 'K'
                : Math.round(current);
            el.textContent = display
                + (target >= 100 && target < 1000 ? (current >= target ? '+' : '') : '')
                + (target === 96 ? '%' : '');
            if (current >= target) clearInterval(timer);
        }, 16);
        counterObs.unobserve(el);
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

/* ── CONSULT DRAWER ── */
const drawer = document.getElementById('consultDrawer');
const overlay = document.getElementById('drawerOverlay');
const openBtn = document.getElementById('openDrawer');
const closeBtn = document.getElementById('closeDrawer');

function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeDrawerFn() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

openBtn.addEventListener('click', openDrawer);
document.getElementById('b2bBtn')?.addEventListener('click', e => { e.preventDefault(); openDrawer(); });
closeBtn.addEventListener('click', closeDrawerFn);
overlay.addEventListener('click', closeDrawerFn);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawerFn(); });

/* ── FILTER TABS ── */
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

/* ── MATERIAL SWATCHES ── */
const swatchData = {
    'Wood Finishes': [
        ['linear-gradient(135deg,#4a3728,#6b4c35)', 'Smoked Bourbon'],
        ['linear-gradient(135deg,#3d2b1f,#5c3d2e)', 'Dark Walnut'],
        ['linear-gradient(135deg,#c9a87c,#b8945f)', 'Natural Teak'],
        ['linear-gradient(135deg,#7a6b56,#9c8060)', 'Warm Oak'],
        ['linear-gradient(135deg,#1a1714,#2d2520)', 'Intense Black'],
        ['linear-gradient(135deg,#e8ddc8,#d4c9b0)', 'Aged Ivory'],
        ['linear-gradient(135deg,#8b6f47,#a07c50)', 'Honey Pine'],
        ['linear-gradient(135deg,#5c4a38,#7a6248)', 'Lava Brown'],
        ['linear-gradient(135deg,#a0896b,#b89b78)', 'Caramel Ash'],
        ['linear-gradient(135deg,#6b5a42,#897050)', 'Mango Wood'],
    ],
    'Fabrics': [
        ['linear-gradient(135deg,#b8a898,#c9bdb0)', 'Ivory Bouclé'],
        ['linear-gradient(135deg,#6b7b5e,#7d9168)', 'Olive Velvet'],
        ['linear-gradient(135deg,#8fa0b0,#a8b8c4)', 'Steel Blue'],
        ['linear-gradient(135deg,#c9a07a,#d4b090)', 'Warm Linen'],
        ['linear-gradient(135deg,#c4897a,#d4a090)', 'Blush Corduroy'],
        ['linear-gradient(135deg,#3a3830,#5a5848)', 'Charcoal Tweed'],
        ['linear-gradient(135deg,#d4cfc0,#e0dbd0)', 'Cream Textured'],
        ['linear-gradient(135deg,#5e6b58,#728068)', 'Forest Green'],
        ['linear-gradient(135deg,#c4a878,#d4bc90)', 'Camel Suede'],
        ['linear-gradient(135deg,#b0a8c0,#c0b8d0)', 'Lavender Velvet'],
    ],
    'Metal': [
        ['linear-gradient(135deg,#1a1714,#2d2520)', 'Matte Black'],
        ['linear-gradient(135deg,#a8955a,#c4ae6a)', 'Brushed Gold'],
        ['linear-gradient(135deg,#8a8a8a,#a0a0a0)', 'Chrome Silver'],
        ['linear-gradient(135deg,#6b4c28,#8a6235)', 'Copper Bronze'],
        ['linear-gradient(135deg,#4a4a48,#606060)', 'Gunmetal'],
        ['linear-gradient(135deg,#c0c0c0,#d8d8d8)', 'Stainless Steel'],
        ['linear-gradient(135deg,#7a6c50,#9a8860)', 'Antique Brass'],
        ['linear-gradient(135deg,#3a3028,#504038)', 'Oil Rubbed Bronze'],
    ]
};

window.switchTab = function (el) {
    document.querySelectorAll('.mat-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const key = el.textContent.trim();
    const grid = document.getElementById('swatchGrid');
    if (!swatchData[key]) return;
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(8px)';
    setTimeout(() => {
        grid.innerHTML = swatchData[key].map(([bg, name]) => `
      <div class="swatch">
        <div class="swatch-circle" style="background:${bg};"></div>
        <span class="swatch-name">${name}</span>
      </div>
    `).join('');
        grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
    }, 180);
};

/* ── DRAG-TO-SCROLL PRODUCTS ── */
const ps = document.getElementById('productsScroll');
let isDown = false, startX, scrollLeft;

ps.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - ps.offsetLeft;
    scrollLeft = ps.scrollLeft;
    ps.style.userSelect = 'none';
});
ps.addEventListener('mouseleave', () => isDown = false);
ps.addEventListener('mouseup', () => { isDown = false; ps.style.userSelect = ''; });
ps.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    ps.scrollLeft = scrollLeft - (e.pageX - ps.offsetLeft - startX) * 1.4;
});

/* ── NEWSLETTER ── */
document.getElementById('nlBtn')?.addEventListener('click', () => {
    const inp = document.getElementById('nlInput');
    if (inp.value) {
        inp.value = '';
        inp.placeholder = '✓  You\'re on the list!';
        inp.style.borderColor = '#4CAF50';
        setTimeout(() => {
            inp.placeholder = 'Your email address';
            inp.style.borderColor = '';
        }, 3500);
    }
});

/* ── HERO SCROLL ── */
document.getElementById('heroScroll')?.addEventListener('click', () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
});

/* ── WISHLIST TOGGLE ── */
document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const active = btn.textContent === '♥';
        btn.textContent = active ? '♡' : '♥';
        btn.style.color = active ? '' : 'var(--terracotta)';
    });
});
