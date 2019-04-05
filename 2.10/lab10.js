var euro_dollarkoers = '1.36';
var dollarkoers_euro = '0.74';
var euro_roebelkoers = '48.40';
var roebel_eurokoers = '0.02';

function exchange(bedrag, conversie){

    bedrag = document.getElementById('bedrag').value;
    k = document.getElementById("keuze").value;

    if(k == "koers1"){
    return(bedrag * euro_dollarkoers);
}else if(k == "koers2") {
    return(bedrag * dollarkoers_euro);
}else if(k == "koers3") {
    return(bedrag * euro_roebelkoers);
}else if(k == "koers4") {
    return(bedrag * roebel_eurokoers);
}
}