const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  greetingWrapper = document.querySelector('.greeting-name__wrapper'),
  wrapper = document.querySelector('.wrapper'),
  quote = document.querySelector('.quote'),
  figcaption = document.querySelector('.figcaption'),
  btnQuote = document.querySelector('.btn-quote'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city'),
  humidity = document.querySelector('.humidity'),
  wind = document.querySelector('.wind'),
  day = document.querySelector('.day');
// Options
let imgUrl = './assets/images/'
let currentTimePeriod = 'day'
let initialized = false

// Show Time
function showTime() {
  let options = {
    era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  let today = new Date(),
    day = today.toLocaleString("ru", options)
  day = day.substr(0, day.indexOf('2020'))
  hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  (today.toLocaleString("ru", options))

  time.innerHTML = `<span class = "day">${day}</span>${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`

  setTimeout(showTime, 1000)
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  let shouldUpdateImage = !initialized
  initialized = true

  if (hour >= 0 && hour < 6) {
    if (currentTimePeriod !== 'night') {
      shouldUpdateImage = true
    }
    currentTimePeriod = 'night'
    greeting.textContent = 'Доброй ночи, '

  } else if (hour >= 6 && hour < 12) {
    if (currentTimePeriod !== 'morning') {
      shouldUpdateImage = true
    }
    currentTimePeriod = 'morning'
    greeting.textContent = 'Доброе утречко, '

  } else if (hour >= 12 && hour < 18) {
    if (currentTimePeriod !== 'day') {
      shouldUpdateImage = true
    }
    currentTimePeriod = 'day'
    greeting.textContent = 'Добрый день, '

  } else if (hour >= 18 && hour < 24) {
    if (currentTimePeriod !== 'evening') {
      shouldUpdateImage = true
    }
    currentTimePeriod = 'evening'
    greeting.textContent = 'Добрый вечерочек, '
  }

  if (shouldUpdateImage) {
    getImage()
  }
}

// Get Name
function getName() {
  const storedName = localStorage.getItem('name')

  if (storedName) {
    name.value = storedName
    if (storedName.length > 13) {
      greetingWrapper.style.flexDirection = 'column'
      greetingWrapper.style.marginLeft = '0px'
      name.style.textAlign = 'center'
      name.style.width = '100%'
      return

    } else if (!storedName.length) {
      name.style.width = undefined
      greetingWrapper.style.marginLeft = '0px'
      return
    }
    greetingWrapper.style.flexDirection = 'row'
    name.style.textAlign = 'left'
    greetingWrapper.style.marginLeft = `50px`
    name.style.width = '250px'
  }
}

// Set Name
function setName(value) {
  const newName = value.target.value.trim()
  if (newName) {
    localStorage.setItem('name', newName)
    if (newName.length > 13) {
      greetingWrapper.style.flexDirection = 'column'
      greetingWrapper.style.marginLeft = '0px'
      name.style.textAlign = 'center'
      name.style.width = '100%'
      return
    }
    greetingWrapper.style.flexDirection = 'row'
    name.style.textAlign = 'left'
    greetingWrapper.style.marginLeft = `50px`
  
    if (newName.length) {
      name.style.width = '250px'
    } else {
      name.style.width = undefined
      greetingWrapper.style.marginLeft = '0px'
    }
  } else {
    return
  }
  
}

document.getElementById('name').onchange = setName

// Get Focus
function getFocus() {
  const storedFocus = localStorage.getItem('focus')
  if (storedFocus) {
    focus.value = storedFocus
    if (storedFocus.length > 20) {
      let width = storedFocus.length * 13
      focus.style.width = `${width}px`
    }
  }
}

// Set Focus
function setFocus(value) {
  if(value.trim()) {
    localStorage.setItem('focus', value)
    if (value.length > 20) {
      let width = value.length * 13
      focus.style.width = `${width}px`
    }
  } else {
    return
  }
}

function getCity() {
  const storedCity = localStorage.getItem('city')
  if (storedCity) {
    city.value = storedCity
    let width = ''
    if (storedCity.length > 10) {
      width = storedCity.length * 10
    } else {
      width = storedCity.length * 13
    }
    city.style.width = `${width}px`
  } else {
    getWeather()
  }
}

function setCity(value) {
  if (value.trim()) {
    localStorage.setItem('city', value)
    getWeather()
    let width = ''
  if (value.length > 10) {
    width = value.length * 10
  } else {
    width = value.length * 13
  }
  city.style.width = `${width}px`
  } else {
    getWeather()
  }
  
}

const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg']
const shuffledImages = images.slice(0).sort(() => Math.random() - 0.5)
let i = 0

function viewBgImage(data) {
  const src = data
  const img = document.createElement('img')
  img.src = src
  img.onload = () => {
    wrapper.style.backgroundImage = `url(${src})`
  }
}

function getImage() {
  console.log(shuffledImages)
  const index = i % shuffledImages.length
  const imageSrc = imgUrl + currentTimePeriod + '/' + shuffledImages[index]
  localStorage.setItem('img', imageSrc)
  viewBgImage(imageSrc)
  i++
  btn.disabled = true
  setTimeout(function () { btn.disabled = false }, 1000)
}

const btn = document.querySelector('.btn')
btn.addEventListener('click', getImage)

async function getQuote() {
  const url = `https://thesimpsonsquoteapi.glitch.me/quotes`
  const res = await fetch(url)
  const data = await res.json()
  quote.textContent = data?.[0].quote
  figcaption.textContent = data?.[0].character
}
document.addEventListener('DOMContentLoaded', getQuote)
btnQuote.addEventListener('click', getQuote)


async function getWeather() {
  const value = localStorage.getItem('city')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=ru&appid=0e896ec02a4091346471acdf4c5cfb71&units=metric`;
  try {
    const res = await fetch(url)
    const data = await res.json()
    weatherIcon.className = 'weather-icon owf'
    console.log(data.weather[0].id)
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`
    humidity.textContent = `влажность ${data.main.humidity}%`
    wind.textContent = `ветер ${data.wind.speed} m/c`
    weatherDescription.textContent = data.weather[0].description
  } catch(e) {
    alert("Город введен с ошибкой\nПожалуйста, введите город корректно\nв соответствии с правилами русского\nили английского языка\n----\nТакже возможно произошла ошибка на сервере")
    setCity('Минск')
  }
}



setInterval(getImage, 1000 * 60 * 60)

// Run
showTime()
setBgGreet()
getName()
getFocus()
getCity()
getWeather()
