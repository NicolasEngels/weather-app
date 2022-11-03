const button = document.getElementById('submit')

button.addEventListener('click', () => {
    document.getElementById('place').innerHTML="";
    fetch('./city.list.json')
    .then(response => response.json())
    .then(cities => {
        for (const city of cities){
            if(document.getElementById('city').value===city.name){
                const lon = city.coord.lon;
                const lat = city.coord.lat;
                fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid=91fdbdaf4673e7160a4cc9733787aacd&units=metric')
                    .then(response => response.json())
                    .then(json => {
                        const today = new Date();

                        const newLocation = document.createElement('div');
                        newLocation.innerHTML = `<h2>${city.name} - ${city.country}</h2>`;

                        const ajd = document.createElement('div');
                        ajd.innerHTML = `<h3>${today.getDate()} / ${today.getMonth()+1}</h3>`;

                        const ajd2 = document.createElement('div');
                        ajd2.innerHTML = `<h3>${today.getDate()+1} / ${today.getMonth()+1}</h3>`;

                        const ajd3 = document.createElement('div');
                        ajd3.innerHTML = `<h3>${today.getDate()+2} / ${today.getMonth()+1}</h3>`;

                        const ajd4 = document.createElement('div');
                        ajd4.innerHTML = `<h3>${today.getDate()+3} / ${today.getMonth()+1}</h3>`;

                        const ajd5 = document.createElement('div');
                        ajd5.innerHTML = `<h3>${today.getDate()+4} / ${today.getMonth()+1}</h3>`;

                        for (const i of json.list){
                            if(Number(i.dt_txt.charAt(8)+i.dt_txt.charAt(9))===today.getDate()){
                                console.log("et oui c'est ajd");

                                const newHour = document.createElement("p");
                                newHour.appendChild(document.createTextNode(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15) + " --> " + i.main.temp)); 
                                ajd.appendChild(newHour)

                            }else if(Number(i.dt_txt.charAt(8)+i.dt_txt.charAt(9))===today.getDate()+1){
                                console.log("et oui c'est demain")

                                const newHour = document.createElement("p");
                                newHour.appendChild(document.createTextNode(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15) + " --> " + i.main.temp)); 
                                ajd2.appendChild(newHour)
                            }else if(Number(i.dt_txt.charAt(8)+i.dt_txt.charAt(9))===today.getDate()+2){
                                console.log("et oui c'est après-demain")

                                const newHour = document.createElement("p");
                                newHour.appendChild(document.createTextNode(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15) + " --> " + i.main.temp)); 
                                ajd3.appendChild(newHour)
                            }else if(Number(i.dt_txt.charAt(8)+i.dt_txt.charAt(9))===today.getDate()+3){
                                console.log("et oui c'est après-après-demain")

                                const newHour = document.createElement("p");
                                newHour.appendChild(document.createTextNode(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15) + " --> " + i.main.temp)); 
                                ajd4.appendChild(newHour)
                            }else if(Number(i.dt_txt.charAt(8)+i.dt_txt.charAt(9))===today.getDate()+4){
                                console.log("et oui c'est après-après-après-demain")

                                const newHour = document.createElement("p");
                                newHour.appendChild(document.createTextNode(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15) + " --> " + i.main.temp)); 
                                ajd5.appendChild(newHour)
                            }
                        }

                        newLocation.appendChild(ajd);
                        newLocation.appendChild(ajd2);
                        newLocation.appendChild(ajd3);
                        newLocation.appendChild(ajd4);
                        newLocation.appendChild(ajd5);


                        document.getElementById('place').appendChild(newLocation);
                    })
                    .catch(error => {
                        console.log('There was an error!', error)
                    })
            }
        }
    })
    .catch(error => {
        console.log('There was an error!', error)
    })
})


