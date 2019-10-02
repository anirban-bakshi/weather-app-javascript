window.addEventListener('load', ()=>{
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/3542b7e853e028b1f0092c016a22713d/${latitude},${longitude}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    
                    //set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //formula for celcius
                    let celcius = (temperature - 32) * (5/9);

                    //set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change temperature to celcius/farenheit
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });

        });
    } else {
        h1.textContent = "Please enable geolocation";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();

        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});