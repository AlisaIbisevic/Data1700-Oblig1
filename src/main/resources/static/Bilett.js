document.getElementById('billett-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const navn = document.getElementById('navn').value;
    const telefon = document.getElementById('telefon').value;
    const epost = document.getElementById('epost').value;
    const antall = document.getElementById('antall').value;

    if (!navn || !telefon || !epost || !antall) {
        alert('Alle felt må fylles ut');
        return;
    }

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

function sjekkFelter() {
    function sjekkFelter() {
        const navn = document.getElementById('navn').value;
        const telefon = document.getElementById('telefon').value;
        const epost = document.getElementById('epost').value;
        const antall = document.getElementById('antall').value;

        if (!navn) {
            alert('Navn må fylles ut');
            return false;
        }

        if (!telefon) {
            alert('Telefon må fylles ut');
            return false;
        }

        if (!epost) {
            alert('E-post må fylles ut');
            return false;
        }

        if (!antall) {
            alert('Antall billetter må fylles ut');
            return false;
        }

        // Sjekk at telefonenummeret er i riktig format
        const telefonRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
        if (!telefonRegex.test(telefon)) {
            alert('Telefonnummeret er ikke i riktig format');
            return false;
        }

        // Sjekk at e-posten er i riktig format
        const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!epostRegex.test(epost)) {
            alert('E-posten er ikke i riktig format');
            return false;
        }

        // Sjekk at antallet billetter er et gyldig tall
        const antallRegex = /^[1-9][0-9]*$/;
        if (!antallRegex.test(antall)) {
            alert('Antall billetter må være et gyldig tall');
            return false;
        }

        return true;
    }
}