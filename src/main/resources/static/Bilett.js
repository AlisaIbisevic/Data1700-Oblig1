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
    oppdaterBillettListe();

    document.getElementById('navn').value = '';
    document.getElementById('telefon').value = '';
    document.getElementById('epost').value = '';
    document.getElementById('antall').value = '';
});

document.getElementById('slett-alle-billetter').addEventListener('click', function () {
    localStorage.removeItem('billetter');
    oppdaterBillettListe();
});

function lagreBillett(billett) {
    let billetter = hentBilletter();
    billetter.push(billett);
    lagreBilletter(billetter);
}

function hentBilletter() {
    const billetterJson = localStorage.getItem('billetter');
    return billetterJson ? JSON.parse(billetterJson) : [];
}

function lagreBilletter(billetter) {
    const billetterJson = JSON.stringify(billetter);
    localStorage.setItem('billetter', billetterJson);
}

function oppdaterBillettListe() {
    const billettListe = document.getElementById('billett-liste');
    billettListe.innerHTML = '';

    const billetter = hentBilletter();
    billetter.forEach(function (billett) {
        const listeElement = document.createElement('li');
        listeElement.textContent = `${billett.navn} (${billett.antall} billetter)`;
        billettListe.appendChild(listeElement);
    });
}

oppdaterBillettListe();