// === DANE PRZYCZEP (strona główna) ===
const przyczepy = [
    {img:["img/trailer/przyczepa12.jpg","img/trailer/przyczepa13.jpg"], opis:"Przyczepa laweta", dmc:"DMC 2000 kg nr 46", wymiary:"300x150<br>Przewóz minikoparek, quadów itd.", kategoria:"B+E", cena:"100zł"},
    {img:["img/trailer/przyczepa1.jpg"], opis:"Przyczepa laweta dwuosiowa", dmc:"DMC 2700 kg nr 36", wymiary:"400x200x70 cm", kategoria:"B+E", cena:"100zł"},
    {img:["img/trailer/przyczepa2.jpg"], opis:"Przyczepa lekka dwuosiowa", dmc:"DMC 700 kg nr 35", wymiary:"250x135x160 cm", kategoria:"B", cena:"50zł"},
    {img:["img/trailer/przyczepa3.jpg"], opis:"Przyczepa lekka jednoosiowa", dmc:"DMC 700 kg nr 21", wymiary:"250x125x140 cm", kategoria:"B", cena:"50zł"},
    {img:["img/trailer/przyczepa4.jpg"], opis:"Przyczepa lekka jednoosiowa", dmc:"DMC 750 kg nr 22", wymiary:"350x180x180 cm", kategoria:"B", cena:"70zł"},
    {img:["img/trailer/przyczepa5.jpg"], opis:"Przyczepa lekka dwuosiowa", dmc:"DMC 750 kg nr 24", wymiary:"270x135x35 cm", kategoria:"B", cena:"50zł"},
    {img:["img/trailer/przyczepa10.jpg"], opis:"Przyczepa lekka dwuosiowa", dmc:"DMC 550 kg nr 40", wymiary:"300x150x185 cm", kategoria:"B", cena:"70zł"},
    {img:["img/trailer/przyczepa8.jpg"], opis:"Przyczepa lekka jednoosiowa motocyklowa", dmc:"DMC 300 kg nr 39", wymiary:"250x150x15 cm", kategoria:"B", cena:"50zł"},
    {img:["img/trailer/przyczepa9.jpg"], opis:"Przyczepa lekka dwuosiowa", dmc:"DMC 600 kg nr 30", wymiary:"600x105x25 cm", kategoria:"B", cena:"100zł"},
    {img:["img/trailer/przyczepa11.jpg"], opis:"Przyczepa lekka jednoosiowa", dmc:"DMC 750 kg nr 41", wymiary:"375x210", kategoria:"B", cena:"100zł"}

    
];

// === DANE SAMOCHODÓW / AUTOLAWET (strona wynajem.html) ===
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

// === GENERUJ KARTY PRZYCZEP ===
function generujKartyPrzyczep(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;

    przyczepy.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('przyczepa-container');
        div.innerHTML = `
            <div class="przyczepa" style="background-image:url('${item.img[0]}')" data-images='${JSON.stringify(item.img)}'></div>
            <div class="dwa">
                <div class="opis">${item.opis}<br>${item.dmc}</div>
                <div class="wymiary">
                    Wymiary: ${item.wymiary}<br>
                    Kategoria prawa jazdy: <span>${item.kategoria}</span>
                </div>
                <div class="cena">Cena: <span>${item.cena}</span></div>
            </div>
        `;
        container.appendChild(div);
    });
}

// === GENERUJ KARTY SAMOCHODÓW Z GALERIĄ ===
function generujKartySamochodow(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;

    samochody.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('samochod-container');
        div.dataset.index = index;
      div.innerHTML = `
    <div class="samochod" style="background-image:url('${item.img[0]}')" data-images='${JSON.stringify(item.img)}'></div>
    <div class="dwa samochod-info">
        <div class="opis">
            <strong>${item.typ}</strong><br>${item.nazwa}<br>
            <span style="font-size: 16px; font-weight: normal;">Kliknij w obrazek, aby zobaczyć więcej zdjęć</span>
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

// === LIGHTBOX Z PRZEWIJANIEM ===
function initLightbox(containerId, selector) {
    const container = document.getElementById(containerId);
    if(!container) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    let currentImages = [];
    let currentIndex = 0;
// Funkcja do blokowania przewijania (bardziej zaawansowana)
function disableScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Zapisz pozycję scrolla
    window.initialScrollPosition = { top: scrollTop, left: scrollLeft };
    
    // Zablokuj przewijanie
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.left = `-${scrollLeft}px`;
    document.body.style.width = '100%';
}

// Funkcja do odblokowania przewijania
function enableScroll() {
    // Odblokuj przewijanie
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    
    // Przywróć pozycję scrolla
    if (window.initialScrollPosition) {
        window.scrollTo(window.initialScrollPosition.left, window.initialScrollPosition.top);
    }
}
    container.querySelectorAll(selector).forEach(img => {
        img.addEventListener('click', () => {
            currentImages = JSON.parse(img.dataset.images);
            currentIndex = 0;
            lightboxImg.src = currentImages[currentIndex];
            lightbox.classList.remove('hidden');
            
            // Dodaj klasę do body aby pasek się chował
            document.body.classList.add('lightbox-open');
        });
    });

    function showImage(index){
        if(index < 0) index = currentImages.length - 1;
        if(index >= currentImages.length) index = 0;
        currentIndex = index;
        lightboxImg.src = currentImages[currentIndex];
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.classList.remove('lightbox-open');
    }

    if(closeBtn){
        closeBtn.addEventListener('click', () => closeLightbox());
        lightbox.addEventListener('click', e => { 
            if(e.target === lightbox) closeLightbox(); 
        });
    }

    if(prevBtn) prevBtn.addEventListener('click', e => { 
        e.stopPropagation(); 
        showImage(currentIndex - 1); 
    });
    
    if(nextBtn) nextBtn.addEventListener('click', e => { 
        e.stopPropagation(); 
        showImage(currentIndex + 1); 
    });

    // Zamknij lightbox klawiszem ESC
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });
}

// === Cień i rozmycie paska przy przewijaniu ===
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

// === PŁYNNE POJAWIANIE TEKSTU FOOTERA ===
window.addEventListener('scroll', () => {
  const footer = document.querySelector('footer');
  if (!footer) return;

  const windowHeight = window.innerHeight;
  const footerTop = footer.getBoundingClientRect().top;
  const triggerPoint = windowHeight - 100;

  if (footerTop < triggerPoint) {
    footer.classList.add('visible');
  }
});

// Aktywuj footer również przy ładowaniu strony jeśli jest widoczny
window.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer');
  if (!footer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(footer);
});

// === DOM READY ===
window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    if(!container) return;

    if(window.location.pathname.includes('wynajem.html')){
        generujKartySamochodow('container');
        initLightbox('container', '.samochod');
    } else {
        generujKartyPrzyczep('container');
        initLightbox('container', '.przyczepa');
    }
});


