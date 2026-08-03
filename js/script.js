// ==========================================
// 1. DANE PRZYCZEP I SAMOCHODÓW
// ==========================================

// === DANE PRZYCZEP (WYNAJEM) ===
const przyczepy = [
    {img:["img/trailer/przyczepa12.jpg","img/trailer/przyczepa13.jpg"], opis:"Przyczepa laweta", dmc:"DMC 2000 kg nr 46", wymiary:"300x150cm<br>Przewóz minikoparek, quadów itd.", kategoria:"B+E", cena:"100zł"},
    {img:["img/trailer/przyczepa14.jpg","img/trailer/przyczepa141.jpg"], opis:"Przyczepa laweta", dmc:"DMC 2700 kg nr 56", wymiary:"510x210cm<br>Przewóz samochodów, wyciągarka elektryczna", kategoria:"B+E", cena:"150zł"},
    {img:["img/trailer/przyczepa1.jpg"], opis:"Przyczepa laweta dwuosiowa", dmc:"DMC 2700 kg nr 36", wymiary:"400x200x70 cm", kategoria:"B+E", cena:"100zł"},
    {img:["img/trailer/przyczepa2.jpg"], opis:"Przyczepa lekka dwuosiowa", dmc:"DMC 700 kg nr 35", wymiary:"250x135x160 cm", kategoria:"B", cena:"50zł"},
    {img:["img/trailer/przyczepa3.jpg"], opis:"Przyczepa lekka jednoosiowa", dmc:"DMC 700 kg nr 21", wymiary:"250x125x140 cm", kategoria:"B", cena:"50zł"},
    {img:["img/trailer/przyczepa41.jpg"], opis:"Przyczepa lekka jednoosiowa", dmc:"DMC 750 kg nr 22", wymiary:"350x180x180 cm", kategoria:"B", cena:"70zł"},
    {img:["img/trailer/przyczepa882.jpg","img/trailer/przyczepa881.jpg","img/trailer/przyczepa883.jpg","img/trailer/przyczepa884.jpg"], opis:"Przyczepa lekka dwuosiowa", dmc:"DMC 750 kg nr 88", wymiary:"250x140x35 cm <br> Plandeka kaptur", kategoria:"B", cena:"50zł"},
    {img:["img/trailer/przyczepa5.jpg"], opis:"Przyczepa lekka dwuosiowa", dmc:"DMC 750 kg nr 24", wymiary:"270x135x35 cm", kategoria:"B", cena:"50zł"},
    {img:["img/trailer/przyczepa10.jpg"], opis:"Przyczepa lekka dwuosiowa", dmc:"DMC 550 kg nr 40", wymiary:"300x150x185 cm", kategoria:"B", cena:"70zł"},
    {img:["img/trailer/przyczepa8.jpg"], opis:"Przyczepa lekka jednoosiowa motocyklowa", dmc:"DMC 300 kg nr 39", wymiary:"250x150x15 cm", kategoria:"B", cena:"50zł"},
    {img:["img/trailer/przyczepa9.jpg"], opis:"Przyczepa lekka dwuosiowa", dmc:"DMC 600 kg nr 30", wymiary:"600x105x25 cm", kategoria:"B", cena:"100zł"},
    {img:["img/trailer/przyczepa11.jpg"], opis:"Przyczepa lekka jednoosiowa", dmc:"DMC 750 kg nr 41", wymiary:"375x210", kategoria:"B", cena:"100zł"}
];

// === DANE PRZYCZEP DO SPRZEDAŻY (NOWE) ===
const sprzedaz = [
    {img:["img/sell/sell11.jpg","img/sell/sell12.jpg"], opis:"Przyczepa lekka jednoosiowa", dmc:"DMC 750kg", wymiary:"230x125x35 cm", kategoria:"B", cena:""},
    {img:["img/sell/sell21.jpg","img/sell/sell22.jpg"], opis:"Przyczepa lekka jednoosiowa", dmc:"DMC 750kg", wymiary:"245x125x128 cm", kategoria:"B", cena:""},
];

// === DANE PRZYCZEP DO SPRZEDAŻY (UŻYWANE) ===
const skup = [
    {img:["img/used/used1.jpg","img/used/used2.jpg","img/used/used3.jpg"], opis:"Przyczepa lekka dwuosiowa", dmc:"DMC 750kg", wymiary:"", kategoria:"B", cena:""},
];

// === DANE SAMOCHODÓW / AUTOLAWET ===
const samochody = [
    {
        img: ["img/cars/renault/2.jpg","img/cars/renault/3.jpg","img/cars/renault/4.jpg","img/cars/renault/5.jpg","img/cars/renault/6.jpg","img/cars/renault/7.jpg","img/cars/renault/8.jpg","img/cars/renault/9.jpg"],
        typ: "Autolaweta",
        nazwa: "Renault Master 2.3",
        wymiary: "Cena dotyczy jednej doby. <br> 300zł - Limit: 500 km <br> 400zł - Limit: 1000 km <br> 500zł - Limit: 1500 km <br> Za przekroczenie limitu, 50 gr za każdy kilometr. <br><br> Kaucja: 1000zł",
        kategoria: "B",
        cena: "300-500zł",
        opis: "DMC: 3500 kg - hak DMC: 3500 kg"
    },
];

// ==========================================
// 2. FUNKCJE GENERUJĄCE KARTY
// ==========================================

// === GENERUJ KARTY PRZYCZEP ===
function generujKartyPrzyczep(container, dane, typPrefix = 'przyczepa') {
    const lista = dane || przyczepy;

    lista.forEach((item, idx) => {
        // Unikalny prefix gwarantuje separację galerii GLightbox między podstronami
        const galleryId = `${typPrefix}-${idx}`;
        const extraLinks = item.img.slice(1).map(src =>
            `<a href="${src}" class="glightbox" data-gallery="${galleryId}" style="display:none"></a>`
        ).join('');

        // Dynamiczna etykieta ceny w zależności od przeznaczenia przyczepy
        let cenaLabel = 'Cena za dobę:';
        if (typPrefix === 'sprzedaz' || typPrefix === 'skup') {
            cenaLabel = item.cena ? 'Cena:' : 'Cena: do uzgodnienia';
        }
        const wyswietlanaCena = item.cena ? `<span>${item.cena}</span>` : '';

        const div = document.createElement('div');
        div.classList.add('przyczepa-container');
        div.innerHTML = `
            <a href="${item.img[0]}" class="glightbox" data-gallery="${galleryId}">
                <div class="przyczepa" style="background-image:url('${item.img[0]}')"></div>
            </a>
            ${extraLinks}
            <div class="dwa">
                <div class="opis">${item.opis}<br>${item.dmc}</div>
                <div class="wymiary">
                    Wymiary: ${item.wymiary}<br>
                    Kategoria prawa jazdy: <span>${item.kategoria}</span>
                </div>
                <div class="cena">${cenaLabel} ${wyswietlanaCena}</div>
            </div>
        `;
        container.appendChild(div);
    });
}

// === GENERUJ KARTY SAMOCHODÓW ===
function generujKartySamochodow(container) {
    samochody.forEach((item, idx) => {
        const galleryId = `samochod-${idx}`;
        const extraLinks = item.img.slice(1).map(src =>
            `<a href="${src}" class="glightbox" data-gallery="${galleryId}" style="display:none"></a>`
        ).join('');

        const div = document.createElement('div');
        div.classList.add('samochod-container');
        div.innerHTML = `
            <a href="${item.img[0]}" class="glightbox" data-gallery="${galleryId}">
                <div class="samochod" style="background-image:url('${item.img[0]}')"></div>
            </a>
            ${extraLinks}
            <div class="dwa samochod-info">
                <div class="opis">
                    <strong>${item.typ}</strong><br>${item.nazwa}<br>
                    <span style="font-size:16px;font-weight:normal;">Kliknij w obrazek, aby zobaczyć więcej zdjęć</span>
                </div>
                <div class="wymiary">
                    ${item.wymiary}<br><br>
                    ${item.opis}<br>
                    Kategoria prawa jazdy: <span>${item.kategoria}</span>
                </div>
                <div class="cena">Cena: <span>${item.cena}</span></div>
            </div>
        `;
        container.appendChild(div);
    });
}

// === GENERUJ DYMEK TELEFONU (FLOATING CALL BUTTON) ===
function generujDymekTelefonu() {
    if (document.querySelector('.phone-bubble')) return; // Zabezpieczenie przed podwójnym dodaniem

    const bubble = document.createElement('a');
    bubble.href = 'tel:608719311';
    bubble.className = 'phone-bubble';
    bubble.setAttribute('aria-label', 'Zadzwoń do nas');
    bubble.innerHTML = '<i class="fa-solid fa-phone"></i>';
    document.body.appendChild(bubble);
}

// ==========================================
// 3. OBSŁUGA INTERFEJSU (NAVBAR & MENU)
// ==========================================

// === NAVBAR – CHOWANIE / POKAZYWANIE ===
window.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    if (!nav) return;
    if (window.scrollY > 10) nav.classList.add('nav-hidden');
    if (window.scrollY > 20) document.body.classList.add('scrolled');
});

window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    const y = window.scrollY;
    if (nav) {
        if (y > 10) nav.classList.add('nav-hidden');
        if (y === 0) nav.classList.remove('nav-hidden');
    }
    document.body.classList.toggle('scrolled', y > 20);
});

// === HAMBURGER MENU ===
window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.classList.toggle('nav-menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.classList.remove('nav-menu-open');
        });
    });

    document.addEventListener('click', (e) => {
        const navContainer = document.getElementById('nav');
        if (navContainer && !navContainer.contains(e.target)) {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.classList.remove('nav-menu-open');
        }
    });
});

// ==========================================
// 4. INICJALIZACJA DANYCH I GALERII (DOM READY)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // Generujemy pływający dymek telefonu
    generujDymekTelefonu();

    const container = document.getElementById('container');
    if (container) {
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);
        const page = (segments[segments.length - 1] || '').toLowerCase();

        // Generujemy karty w zależności od podstrony
        if (page.includes('wynajem')) {
            generujKartySamochodow(container);
        } else if (page.includes('przyczepy')) {
            generujKartyPrzyczep(container, przyczepy, 'przyczepa');
        } else if (page.includes('sprzedaz')) {
            generujKartyPrzyczep(container, sprzedaz, 'sprzedaz');
        } else if (page.includes('skup')) {
            generujKartyPrzyczep(container, skup, 'skup');
        }
    }

    // Uruchomienie GLightbox z lekkim opóźnieniem dla stabilności renderowania DOM
    if (typeof GLightbox !== 'undefined') {
        setTimeout(() => {
            GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                zoomable: true,
                draggable: true,
            });
        }, 50);
    }
});