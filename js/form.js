(function () {
    const WORKER_URL = 'https://przyczepy.maciejownia2004.workers.dev';

    const MAX_FILES  = 5;
    const MAX_MB     = 10;
    let selectedFiles = [];

    const uploadArea  = document.getElementById('upload-area');
    const fileInput   = document.getElementById('file-input');
    const previewGrid = document.getElementById('photo-preview');
    const form        = document.getElementById('skup-form');
    const submitBtn   = document.getElementById('submit-btn');
    const msgBox      = document.getElementById('form-message');

    // Otwieranie dialogu pliku
    uploadArea.addEventListener('click', () => fileInput.click());

    // Drag & drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleFiles(Array.from(e.dataTransfer.files));
    });

    fileInput.addEventListener('change', () => {
        handleFiles(Array.from(fileInput.files));
        fileInput.value = '';
    });

    function handleFiles(files) {
        const imageFiles = files.filter(f => f.type.startsWith('image/'));
        imageFiles.forEach(file => {
            if (selectedFiles.length >= MAX_FILES) return;
            if (file.size > MAX_MB * 1024 * 1024) {
                alert(`Plik "${file.name}" jest za duży (max ${MAX_MB} MB).`);
                return;
            }
            selectedFiles.push(file);
            addThumb(file, selectedFiles.length - 1);
        });
    }

    function addThumb(file, idx) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const div = document.createElement('div');
            div.className = 'photo-thumb';
            div.dataset.idx = idx;
            div.innerHTML = `
                <img src="${e.target.result}" alt="Zdjęcie">
                <button type="button" class="remove-btn" title="Usuń"><i class="fa-solid fa-xmark"></i></button>
            `;
            div.querySelector('.remove-btn').addEventListener('click', () => {
                selectedFiles.splice(idx, 1);
                renderThumbs();
            });
            previewGrid.appendChild(div);
        };
        reader.readAsDataURL(file);
    }

    function renderThumbs() {
        previewGrid.innerHTML = '';
        selectedFiles.forEach((f, i) => addThumb(f, i));
    }

    // Walidacja i wysyłka
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const imie    = form.imie.value.trim();
        const telefon = form.telefon.value.trim();
        const opis    = form.opis.value.trim();

        if (!imie || !telefon || !opis) {
            showMessage('Wypełnij wymagane pola: Imię, Telefon i Opis przyczepy.', 'error');
            return;
        }

        setLoading(true);
        hideMessage();

        const fd = new FormData();
        fd.append('imie',    imie);
        fd.append('telefon', telefon);
        fd.append('email',   form.email.value.trim());
        fd.append('opis',    opis);
        selectedFiles.forEach(f => fd.append('photos', f, f.name));

        try {
            const resp = await fetch(WORKER_URL, { method: 'POST', body: fd });
            const data = await resp.json();

            if (data.ok) {
                showMessage('Zapytanie wysłane! Odezwiemy się wkrótce.', 'success');
                form.reset();
                selectedFiles = [];
                previewGrid.innerHTML = '';
            } else {
                showMessage('Błąd wysyłania. Spróbuj jeszcze raz lub zadzwoń do nas.', 'error');
                console.error(data);
            }
        } catch (err) {
            showMessage('Błąd połączenia. Sprawdź internet i spróbuj ponownie.', 'error');
            console.error(err);
        } finally {
            setLoading(false);
        }
    });

    function setLoading(on) {
        submitBtn.disabled = on;
        submitBtn.classList.toggle('loading', on);
    }

    function showMessage(text, type) {
        msgBox.textContent = text;
        msgBox.className = `form-message ${type}`;
    }

    function hideMessage() {
        msgBox.className = 'form-message';
    }
})();