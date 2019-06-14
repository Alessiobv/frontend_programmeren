$(function(){
	$.mobile.pushStateEnabled = false;
	var welkomstMelding = "Welkom!";
	$('#homecontent').prepend(
		'<p class="melding">'+ welkomstMelding + '</p>');
	$('#homecontent').append('<p id="gratis">Gratis tickets!</p>');
	$('#homecontent').delete('<p id="gratis">');
}) // einde jQuery

$('body').bind('swipe',function(event){
	alert('Je hebt over het scherm geveegd');
});

$('body').bind('click',function(e){
	alert('Page coordinaten: ' + e.pageX + e.pageY);
});

$('body').unbind('click');
$('body').unbind('swipe');

$('body').taphold(function(){
	datum = new Date();
	uur = datum.getHours();
	if(uur <= 11){
		$('<p>Goedemorgen!</p>').prependTo('#homecontent');
	} else if(uur >= 12 && uur <= 17){
		$('<p>Goedemiddag!</p>').prependTo('#homecontent');
	} else if(uur >= 18 && uur <= 24){
		$('<p>Goedenavond!</p>').prependTo('#homecontent');
	}
});
$('body').trigger('taphold');

$('#mycanvas').bind('click', function(e){
	var mycanvas = document.getElementById('mycanvas');
	var ctx = mycanvas.getContent('2d');
	ctx.beginPath();
	ctx.moveTo(25,80);
	ctx.lineTo(200,80);
	ctx.stroke();
	var grd = ctx.createLinearGradient(200,70,200,110);
	grd.addColorStop(0, '#f55b5b');
	grd.addColorStop(1, '#3112a3');
	ctx.fillStyle=grd;
	ctx.fillRect(25,25,100,100);
	ctx.strokeRect(25,25,100,100);
	ctx.font = '40pt Georgia';
	ctx.shadowBlur = 5;
	ctx.shadowColor = 'rgb(0, 0, 0)';
	ctx.fillText('tekst',50,100);
	ctx.beginPath();
	var x = 220;
	var y = 100;
	var radius = 25;
	var beginhoek = 0;
	var eindhoek = (Math.PI/180)*360;
	var klok = false;
	ctx.arc(x,y,radius,beginhoek,eindhoek,klok);
	ctx.fill();
	ctx.stroke();
	ctx.save();
	ctx.beginPath();
	x = e.pageX - this.offsetLeft;
	y = e.pageY - this.offsetTop;
	radius = 15;
	ctx.arc(x,y,radius,beginhoek,eindhoek,klok);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	cirkelObj = {
		radius: 10, maxRadius: 100,
		x: e.pageX - this.offsetLeft,
		y: e.pageY - this.offsetTop
	}
	tekstObj = {
		size: 10,
		font: 'pt Georgia',
		maxSize: 50,
		x: e.pageX - this.offsetLeft,
		y: e.pageY - this.offsetTop
	}
	posterObj = {
		x: e.pageX - this.offsetLeft,
		y: e.pageY - this.offsetTop
	}
	ctx.lineWidth = 2;
	//load image
	newPosterObj = new Image();
	newPosterObj.src = 'shakiraposter.jpg';
	function animeren(){
		ctx.save();
		// canvas vegen
		ctx.clearRect(0,0,mycanvas.width, mycanvas.height);
		// teken poster in x,y klik coordinaten
		ctx.drawImage(newPosterObj,posterObj.x,posterObj.y);
		posterObj.x += 3;
		ctx.restore();
		// increase radius
		cirkelObj.radius += 2;
		ctx.beginPath();
		ctx.arc(
			cirkelObj.x,
			cirkelObj.y,
			cirkelObj.radius,
			0,
			2*Math.PI,
			false);
		ctx.stroke();
		ctx.font = tekstObj.size + tekstObj.font;
		ctx.fillText('FlashTix ',tekstObj.x,tekstObj.y,);
		// tekengrootte
		tekstObj.size += 2;
		ctx.restore();
	} // einde animeren
	setInterval(animeren,100);
});
// einde canvas

$('#lastminutecontent > ul > li > a > img').css(
	'border-radius','50%');

$('[href="#shakira-biopage"]').append('<p class ="melding">Uitverkocht!</p>');

datum = new Date();
if(datum.getDay()===6 || datum.getDay()===0){
	$('.rock').hide();
	$('#bruce-concert').hide();
}

$('#lopez-concert').hide();

$('nora-concert').after($('shakira-concert'));

$('lastminuteconcert li').each(function(){
	$(this).show();
});

$('<img class="poster" src="kylieposter.jpg" alt="pic" width="35%">')
.insertBefore('#lastminuteconcert > ul');

$('#twittercontent').socialist({
	networks: [ {name: 'twitter', id: 'shakira'}
] });

$('#submit').click(function(){
	var email = document.form.email.value;
	var concert = document.form.convert.value;
	$.ajax({
		type:'POST',
		url:'getEticket.php',
		data:({
			email: email,
			concert: concert
		}),
		cache: false,
		dataType: "text",
		success: onSuccess
	});
	. . .
});

$('log').ajaxError(function(event, request, settings, exception){
	$('log').html("Error: " + settings.url +
		"<br>HTTP Code: " + request.status);
});

function onSuccess(data){
	$('#form').append('<p>E-Ticket voor concert'+ concert +
		'</p><img src="'+ data + '" alt="pic" width="35%">');
	localStorage.setItem(concert,data);
}

if(localStorage.getItem('bruce')!== null){
	eticket = localStorage.getItem('bruce');
	$('#etickets').append(
	'<p>E-Ticket Concert Bruce Springsteen</p><img src="'+
	eticket + '" alt="pic" width="35%">');
}
if(localStorage.getItem('shakira')!== null){
	eticket = localStorage.getItem('shakira');
	$('#etickets').append(
	'<p>E-Ticket Concert Shakira</p><img src="'+
	eticket + '" alt="pic" width="35%">');
}

$('#add').bind('click',function(){
	$('#agendalijst').append('<li class="agendaitem">'+
		'<input class="itembox" type="checkbox">'+
		'<input type="date" value="" id="itemdate">'+
		'<input id="itemtext" type="textarea" '+
		'placeholder="to do ..."></li>');
})

$('#sav').bind('click',function(){
	localStorage.clear();
	var teller = 0;
	$('.agendaitem').each(function(){
		itemdate = $(this).children('input: eq(1)').val();
		itemtext = $(this).children('input: eq(2)').val();
		if(itemdate === null) return;
		teller++;
		obj = {
			id: teller,
			datum: itemdate,
			tekst: itemtext
		}
		localStorage.setItem(teller,JSON,stringify(obj));
	});
});

for(var i = 1; i <= localStorage.length; i++){
	if(localStorage.getItem(i)=== null){ continue;}
		read_obj = JSON.parse(localStorage.getItem(i));
		tekst = read_obj.tekst;
		datum = read_obj.datum;
		$('#agendalijst').append(
			'<li class="agendaitem">'+
			'<input class="itembox" type="checkbox">'+
			'<input type="date" value="'+
			datum + 'id"itemdate">'+
			'<input id="itemtext" type="textarea" '+
			'value="' + tekst + '"></li>');
};

var positie = new google.maps.LatLng(52.3622774,4.883945);
var mapOptions = {
	zoom: 4,
	center: positie
}
var map = new google.maps.Map(document.getElementById("gmap"), mapOptions);

var marker = new google.maps.Marker({
	position: positie,
	title:'Paradiso: Weteringschans 6,\n'+
		'1017 SG Amsterdam \n'+
		'Telefoon 020 222 22222'
});

// maak de market
marker.setMap(map);


