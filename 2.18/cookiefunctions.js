// function: maakCookie
// parameters: naam, waarde, dagen
// return:
// doel: een cookie maken
function maakCookie(naam, waarde dagen){
	if(dagen){
		var datum = new Date();
		datum.setTime(datum.getTime() + (dagen*24*60*60*1000));
		var verloopdatum = '; expires= ' + datum.toGMTString();
	} else{
		var verloopdatum = '';
	}
	document.cookie = naam + '='+waarde+verloopdatum + ';path=/';
}

// function: leesCookie
// parameters: naam
// return: waarde van de cookie
// doel: de waarde van een cokie retourneren
function leesCookie(naam){
	var naamCookie = naam + '=';
	var cookieArray = document.cookie.split(';');
	for(var i=0; i < cookieArray.length; i++){
		var dezeCookie = cookieArray[i];
		dezeCookie = dezeCookie.trim();
		if(dezeCookie.indexOf(naamCookie) == 0){
			return dezeCookie.substring(naamCookie.length,dezeCookie.length);
		}
	}
	return null;
}