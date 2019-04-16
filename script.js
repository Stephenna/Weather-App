window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescriptionDiv = document.querySelector('.temperature-description');
    let temperatureDegreeDiv = document.querySelector('.temperature-degree');
    let locationTimezoneDiv = document.querySelector('.location-timezone');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{ // all of this get my location somehow someway
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/2ff489acc9821ca951b6f7017dd3fcbc/${lat},${long}`

            fetch(api)  
            .then(dataResponse =>{
                return dataResponse.json();
            })
            .then(data =>{
                const { temperature, summary, icon } = data.currently;
                //Set DOM Elements from the API
                temperatureDegreeDiv.textContent = temperature;
                temperatureDescriptionDiv.textContent = summary;
                locationTimezoneDiv.textContent = data.timezone; 
                // set icon()
                setIcons(icon, document.querySelector(".icon"));

                //
            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color : "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    };
});