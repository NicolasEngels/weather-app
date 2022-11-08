const weatherForm = document.getElementById('cityName')

const weatherByDay = [[], [], [], [], []]

const container = document.querySelector('.container')

const getWeather = (cityName) =>{
	fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=APIKEY`)
	.then(response => response.json())
	.then((data) => {
		console.log(data[0].lat, data[0].lon)

		fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=APIKEY`)
		.then(response => response.json())
		.then((data) => {
			console.log(data)
			let i = 0
			let c = 0
			data.list.forEach((weatherEntry) => {
				if(i < 8){
					weatherByDay[c].push(weatherEntry)
				}else{
					c++
					weatherByDay[c].push(weatherEntry)
					i = 0
				}

				i++

				
			})
			console.log(weatherByDay)

			weatherByDay.forEach((day) => {
				let d = document.createElement('div')
				let title = document.createElement('h1')
				title.innerText = day[0].dt_txt
				d.append(title)
				container.append(d)
				day.forEach((temp) => {
					let desc = document.createElement('p')
					desc.innerText = temp.main.temp
					d.append(desc)
				})
			})
		})

	})
}



weatherForm.addEventListener('submit', (event) => {
	event.preventDefault()
	let formData = Object.fromEntries(new FormData(weatherForm));
	console.log(formData)
	getWeather(formData.city)
})