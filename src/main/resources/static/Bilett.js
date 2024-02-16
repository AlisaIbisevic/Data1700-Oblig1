document.getElementById('billett-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const navn = document.getElementById('navn').value;
    const telefon = document.getElementById('telefon').value;
    const epost = document.getElementById('epost').value;
    const antall = document.getElementById('antall').value;

    const telefonRegex = /^\d{8}$/;
    const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const navnError = document.getElementById('navn-error');
    const telefonError = document.getElementById('telefon-error');
    const epostError = document.getElementById('epost-error');
    const antallError = document.getElementById('antall-error');

    navnError.textContent = '';
    telefonError.textContent = '';
    epostError.textContent = '';
    antallError.textContent = '';

    let valid = true;

    if (!navn) {
        navnError.textContent = 'Vennligst skriv inn navn';
        valid = false;
    }

    if (!telefon) {
        telefonError.textContent = 'Vennligst skriv inn telefonnummer';
        valid = false;
    } else if (!telefonRegex.test(telefon)) {
        telefonError.textContent = 'Ugyldig telefonnummer';
        valid = false;
    }

    if (!epost) {
        epostError.textContent = 'Vennligst skriv inn e-post';
        valid = false;
    } else if (!epostRegex.test(epost)) {
        epostError.textContent = 'Ugyldig e-post';
        valid = false;
    }

    if (!antall) {
        antallError.textContent = 'Vennligst skriv inn antall billetter';
        valid = false;
    }

    if (valid) {
        const billett = {
            navn: navn,
            telefon: telefon,
            epost: epost,
            antall: antall
        };

        lagreBillett(billett);
        visBillett(billett);

        document.getElementById('navn').value = '';
        document.getElementById('telefon').value = '';
        document.getElementById('epost').value = '';
        document.getElementById('antall').value = '';
    }
});

document.getElementById('slett-alle-billetter').addEventListener('click', function () {
    const billettListe = document.getElementById('billett-liste');
    while (billettListe.firstChild) {
        billettListe.removeChild(billettListe.firstChild);
    }
});

function lagreBillett(billett) {
    const billetter = JSON.parse(localStorage.getItem('billetter')) || [];
    billetter.push(billett);
    localStorage.setItem('billetter', JSON.stringify(billetter));
}

function visBillett(billett) {
    const billettListe = document.getElementById('billett-liste');
    const listeElement = document.createElement('li');
    listeElement.textContent = `Navn: ${billett.navn}, Telefon: ${billett.telefon}, E-post: ${billett.epost}, Antall: ${billett.antall}`;
    billettListe.appendChild(listeElement);
}

const billetter = JSON.parse(localStorage.getItem('billetter')) || [];
billetter.forEach(visBillett);



