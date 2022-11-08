const button = document.getElementById('submit')



button.addEventListener('click', () => {
    document.getElementById('place').innerHTML="";
    let cityName = document.getElementById('city').value;

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=91fdbdaf4673e7160a4cc9733787aacd&units=metric`)
    .then(response => response.json())
	.then((data) => {
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+ data[0].lat +'&lon='+ data[0].lon +'&appid=91fdbdaf4673e7160a4cc9733787aacd&units=metric')
        .then(response => response.json())
        .then(json => {
            var xValues = [];
            var yValues = [];

            console.log(json)
            const today = new Date();

            const newLocation = document.createElement('div');
            const title = document.createElement('h2');
            title.textContent = `${cityName} - ${data[0].country}`;
            title.style.width = '100%';
            newLocation.appendChild(title)
            newLocation.style.borderRadius = '10px 10px 0 0';
            newLocation.style.backgroundColor = '#38434a';
            newLocation.style.display = 'flex';
            newLocation.style.flexWrap = 'wrap';
            newLocation.style.opacity = '0.9';

            const ajd = document.createElement('div');
            ajd.innerHTML = `<h3>${today.getDate()} / ${today.getMonth()+1}</h3>`;
            ajd.style.width = '15%';

            const ajd2 = document.createElement('div');
            ajd2.innerHTML = `<h3>${today.getDate()+1} / ${today.getMonth()+1}</h3>`;
            ajd2.style.width = '15%';

            const ajd3 = document.createElement('div');
            ajd3.innerHTML = `<h3>${today.getDate()+2} / ${today.getMonth()+1}</h3>`;
            ajd3.style.width = '15%';

            const ajd4 = document.createElement('div');
            ajd4.innerHTML = `<h3>${today.getDate()+3} / ${today.getMonth()+1}</h3>`;
            ajd4.style.width = '15%';

            const ajd5 = document.createElement('div');
            ajd5.innerHTML = `<h3>${today.getDate()+4} / ${today.getMonth()+1}</h3>`;
            ajd5.style.width = '15%';

            for (const i of json.list){
                xValues.push(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15));
                yValues.push(i.main.temp);
                if(Number(i.dt_txt.charAt(8)+i.dt_txt.charAt(9))===today.getDate()){

                    const newHour = document.createElement("p");
                    newHour.appendChild(document.createTextNode(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15) + " => " + i.main.temp + "°"));
                    ajd.appendChild(newHour)

                }else if(Number(i.dt_txt.charAt(8)+i.dt_txt.charAt(9))===today.getDate()+1){

                    const newHour = document.createElement("p");
                    newHour.appendChild(document.createTextNode(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15) + " => " + i.main.temp + "°")); 
                    ajd2.appendChild(newHour)
                }else if(Number(i.dt_txt.charAt(8)+i.dt_txt.charAt(9))===today.getDate()+2){

                    const newHour = document.createElement("p");
                    newHour.appendChild(document.createTextNode(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15) + " => " + i.main.temp + "°")); 
                    ajd3.appendChild(newHour)
                }else if(Number(i.dt_txt.charAt(8)+i.dt_txt.charAt(9))===today.getDate()+3){

                    const newHour = document.createElement("p");
                    newHour.appendChild(document.createTextNode(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15) + " => " + i.main.temp + "°")); 
                    ajd4.appendChild(newHour)
                }else if(Number(i.dt_txt.charAt(8)+i.dt_txt.charAt(9))===today.getDate()+4){

                    const newHour = document.createElement("p");
                    newHour.appendChild(document.createTextNode(i.dt_txt.charAt(11)+i.dt_txt.charAt(12)+i.dt_txt.charAt(13)+i.dt_txt.charAt(14)+i.dt_txt.charAt(15) + " => " + i.main.temp + "°")); 
                    ajd5.appendChild(newHour)
                }
            }

            newLocation.appendChild(ajd);
            newLocation.appendChild(ajd2);
            newLocation.appendChild(ajd3);
            newLocation.appendChild(ajd4);
            newLocation.appendChild(ajd5);

            console.log(xValues)
            console.log(yValues)

            new Chart("myChart", {
                type: "line",
                data: {
                  labels: xValues,
                  datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255,255,255,1.0)",
                    borderColor: "rgba(255,255,255,0.2)",
                    data: yValues
                  }]
                },
                options: {
                  legend: {display: false},
                  scales: {
                    yAxes: [{ticks: {min: -10, max:30}}],
                  }
                }
              });

            document.getElementById('place').appendChild(newLocation);
        })
        .catch(error => {
            console.log('There was an error!', error)
        })
    })
    .catch(error => {
        console.log('There was an error!', error)
    })

    fetch(`https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=YV1_eng4XAABHdpgQbX0kj4eeX2Z4aTNISyfNgaUlKs`)
    .then(response => response.json())
    .then((picture) => {
        // console.log(picture.results[2].links.download)
        document.body.style.backgroundImage = `url("${picture.results[2].links.download}")`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
    })
})



