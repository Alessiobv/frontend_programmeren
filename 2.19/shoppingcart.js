// FUNCTION: bestellen
// PARAMETERS: Form Object
// RETURNS: Cookie met bestelling info...
// PURPOSE: cookie maken met info bestelde item

function bestellen(thisForm){
	productInfo =
	thisForm.id.value + '|' +
	thisForm.merk.value + '|' +
	thisForm.model.value + '|' +
	thisForm.prijs.value;

	maakCookie(thisForm.id.value, productInfo,1);

	notice = thisForm.aantal.value + ' ' +
		thisForm.merk.value +
		' in winkelwagen.';
		alert(notice);
}

// FUNCTION: cartWeergeven
// PARAMETERS: Null
// RETURNS: Productentabel
// PURPOSE: Geeft productentabel weer html
// formaat

function cartWeergeven(){
	tabelrij = '';
	for(i = 0; i <= 6; i++){
		dezeCookie = leesCookie(i);
		if(dezeCookie == null || dezeCookie == 'niet-gevonden')
			{continue;}
		velden = new Array();
		velden = dezeCookie.split('|');
		tabelrij += '<tr>'+
		'<td>' + velden[0] + '</td>' +
		'<td>' + velden[1] + '</td>' +
		'<td>' + velden[2] + '</td>' +
		'<td>' + velden[3] + '</td>' +
		'<td>' + velden[4] + '</td>' +
		'</tr>';
	}
	document.write(tabelrij);
}

// FUNCTION: verwijderAlleCookies
// PARAMETERS: Null
// RETURNS: Null
// PURPOSE: Alle cookies verwijderen

function verwijderAlleCookies(){
	for(i = 1; i <= 6; i++){
		verwijderCookie(i);
	}
}
