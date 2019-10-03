console.log('Client side JS file loaded');
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

const lat = document.querySelector('#lat')
const lng = document.querySelector('#lng')
const info = document.querySelector('#info')

var mymap;
var mapBoxKey = 'MAPBOX KEY HERE'

lat.textContent = ''
lng.textContent = ''
info.textContent = ''

msg1.textContent = ''
msg2.textContent = ''

var text = ''


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = searchElement.value;
    const loc = replaceTRChars(location);
    console.log("Degisti: " + loc);
    var url = 'http://localhost:3000/weather?address='+loc;
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        console.log(data);

        var img = document.createElement("img");
        img.src = "/img/"+data.icon+".png";
        var icon = document.getElementById('icon');
        icon.innerHTML = '<img src="'+img.src+'" />'; 

        msg1.textContent = data.location
        msg2.textContent = data.forecast
        lat.textContent = data.lat
        lng.textContent = data.lng
        info.textContent = data.address
        if(!(lat.textContent === data.lat) ){
            console.log('EventListener');
    e.preventDefault();
    var container = L.DomUtil.get('map');
    if(container != null){
        container._leaflet_id = null;
    }
    mymap = L.map('map').setView([lat.textContent, lng.textContent], 9);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapBoxKey, {
        maxZoom: 15,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    L.marker([lat.textContent, lng.textContent]).addTo(mymap);
    
    var popup = L.popup()
    .setLatLng([lat.textContent, lng.textContent])
    .setContent(msg2.textContent)
    .openOn(mymap);
    //e.preventDefault()
    console.log(location);
        }
    }).catch(error => alert('Error! ') + error.message)
}).then(()=>{
    

 })})

 function replaceTRChars(input){
    var chars = input.split('');
    for(var i=0; i< chars.length; i++){
        if(chars[i] === "ğ"){
            chars[i] = "g";
        }
        else if(chars[i] === "ş" || chars[i] === "Ş"){
            chars[i] = "s";
        }
        else if(chars[i] === "İ" || chars[i] === "ı"){
            chars[i] = "i";
        }
        else if(chars[i] === "ç" || chars[i] === "Ç"){
            chars[i] = "c";
        }
        else if(chars[i] === "Ö" || chars[i] === "ö"){
            chars[i] = "o";
        }
        else if(chars[i] === "Ü" || chars[i]=== "ü"){
            chars[i] = "u";
        }
        
    }
    var string = "";
    for(var i=0; i<chars.length; i++){
        string = string+chars[i];
    }
    return string;
 }

 function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}