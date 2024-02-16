
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

    function sjekkFelter() {
    const navn = document.getElementById('navn').value;
    const telefon = document.getElementById('telefon').value;
    const epost = document.getElementById('epost').value;
    const antall = document.getElementById('antall').value;

    if (!navn || !telefon || !epost || !antall) {
    alert('Alle felt må fylles ut');
    return false;
}
    return true;
}

    document.getElementById('billett-form').addEventListener('submit', function (event) {
    event.preventDefault();

    if (sjekkFelter()) {
    const billett = {
    navn: document.getElementById('navn').value,
    telefon: document.getElementById('telefon').value,
    epost: document.getElementById('epost').value,
    antall: document.getElementById('antall').value
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

    const billetter = JSON.parse(localStorage.getItem('billetter')) || [];
    billetter.forEach(visBillett);

