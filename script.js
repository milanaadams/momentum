// DOM elements
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const weekDay = document.querySelector('.weekDay');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const nextImg = document.querySelector('.nextImage');
const inner = document.querySelector('.inner');
let localMemory;
let currentBg;
let dailyImages;

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ['Sunday', 'Monday', 'Tuedsay', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const allImages = [
    ['night/1', 'night/2', 'night/3', 'night/4', 'night/5', 'night/6', 'night/7', 'night/8', 'night/9', 'night/10', 'night/11', 'night/12'],
    ['morning/1', 'morning/2', 'morning/3', 'morning/4', 'morning/5', 'morning/6', 'morning/7', 'morning/8', 'morning/9', 'morning/10', 'morning/11', 'morning/12'],
    ['afternoon/1', 'afternoon/2', 'afternoon/3', 'afternoon/4', 'afternoon/5', 'afternoon/6', 'afternoon/7', 'afternoon/8', 'afternoon/9', 'afternoon/10', 'afternoon/11', 'afternoon/12'],
    ['evening/1', 'evening/2', 'evening/3', 'evening/4', 'evening/5', 'evening/6', 'evening/7', 'evening/8', 'evening/9', 'evening/10', 'evening/11', 'evening/12'],
];

function getDailyImages(){
    let images = [];
    dailyImagesIds = getRandomNumbers();
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 6; j++){
            images.push(allImages[i][dailyImagesIds[j]]);
        }
    }
    return images;
}

function getRandomNumbers() {
    let randomSet = [];
    let i = 0;
    while (i < 6){
        let tempNum = Math.floor(Math.random()*12);
        if (randomSet.includes(tempNum)){
            continue;
        } else {
            randomSet.push(tempNum);
            i++;
        }
    }
    return randomSet;
}


// Show Time 

function showTime(){
    let today = new Date();
    let month = monthNames[today.getMonth()];
    let day = today.getDate();
    let week = dayNames[today.getDay()];
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    // AM or PM

/*     const amPm = hour >= 12 ? 'PM' : 'AM'; */

    // Output time
    weekDay.innerHTML = week;
    date.innerHTML = `${month}, ${day}`;
    time.innerHTML = `<span>${hour}</span>:<span>${addZero(min)}</span>:<span>${addZero(sec)}</span>`;
    
    if (min == 0 && sec == 0){
        updateBgGreeting();
    }

    setTimeout(showTime, 1000);
}

// Add zero to seconds

function addZero(num){
    return (parseInt(num, 10) < 10 ? '0' : '') + num;
}

// Set background and greeting message

function setBgGreeting(){
    dailyImages = getDailyImages();
    let today = new Date();
    let hour = today.getHours();

    let url = `assets/${dailyImages[hour]}.jpg`;
    let img = document.createElement('img');
    img.src = url;
    img.onload = () =>{
        document.body.style.backgroundImage = `url(${url})`;
    }

    if (hour >= 6 && hour < 12){
        greeting.textContent = 'Good Morning, ';
        inner.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    } else if (hour >=12 && hour < 18){
        greeting.textContent = 'Good Afternoon, ';
        inner.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    } else if (hour >= 18 && hour <= 23){
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
        inner.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
        greeting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
        inner.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }
}

// Get name 
function getName(){
    if (localStorage.getItem('name') === null){
        name.textContent = '[Enter your name]'
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Get focus

function getFocus(){
    if (localStorage.getItem('focus') === null){
        focus.textContent = '[Enter your focus here]'
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}
  
// Set Name

function setName(event){
    if (event.type === 'keypress'){
        if(event.which == 13 || event.keyCode == 13){
            localStorage.setItem('name', event.target.innerText);
            name.blur();
        }
    } else {
        if (event.target.innerText.trim() == ''){
            localStorage.setItem('name', localMemory);
            getName();
        } else {
            localStorage.setItem('name', event.target.innerText);
            name.blur();
        }   
    }
}

// Set Focus
function setFocus(event){
    if (event.type === 'keypress'){
        if(event.which == 13 || event.keyCode == 13){
            localStorage.setItem('focus', event.target.innerText);
            focus.blur();
        }
    } else {
        if (event.target.innerText.trim() == ''){
            localStorage.setItem('focus', localMemory);
            getFocus();
        } else {
            localStorage.setItem('focus', event.target.innerText);
            focus.blur();
        }   
    }
}

// Empty field on click

function emptyField(event){
    localMemory = event.target.innerText;
    event.target.innerHTML = '';
}

// Change Background image on button click

function imgChange(){
    nextImg.disabled = true;
    let today = new Date();
    let hour = today.getHours();
    let nextImage;
    if (currentBg === undefined){
        currentBg = dailyImages[hour];
    }
    if (dailyImages.indexOf(currentBg) === 23){
        nextImage = 0;
    } else {
        nextImage = dailyImages.indexOf(currentBg) + 1;
    }
    
    // Set right text color depending of the bg

    if (nextImage > 5 && nextImage < 18){
        document.body.style.color = 'black';
        inner.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    } else {
        document.body.style.color = 'white';
        inner.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    }
    let url = `assets/${dailyImages[nextImage]}.jpg`;
    let img = document.createElement('img');
    img.src = url;
    img.onload = () =>{
        document.body.style.backgroundImage = `url(${url})`;
        setTimeout(() => {nextImg.disabled = false;}, 1000)
        
    }
    
    currentBg = dailyImages[nextImage];

}

// Update background and greeting when hour changes
function updateBgGreeting() {
    let today = new Date();
    let hour = today.getHours();

    let url = `assets/${dailyImages[hour]}.jpg`;
    let img = document.createElement('img');
    img.src = url;
    img.onload = () =>{
        document.body.style.backgroundImage = `url(${url})`;
    }

    if (hour >= 6 && hour < 12){
        greeting.textContent = 'Good Morning, ';
        inner.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    } else if (hour >=12 && hour < 18){
        greeting.textContent = 'Good Afternoon, ';
        inner.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    } else if (hour >= 18 && hour <= 23){
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
        inner.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
        greeting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
        inner.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }
}

// Weather

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherType = document.querySelector('.weatherType');
const windSpeed = document.querySelector('.windSpeed');
const humidity = document.querySelector('.humidity');
let currentCity = city.textContent;



// Get city 
function getCity(){
    if (localStorage.getItem('city') == null){
        city.textContent = 'Minsk';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

function setCity(event){
    if (event.type === 'keypress'){
        if(event.which == 13 || event.keyCode == 13){
            if (event.target.innerText.trim() === ''){
                localStorage.setItem('city', localMemory);
                getCity();
                city.blur();
            } else{
                localStorage.setItem('city', event.target.innerText);
                getWeather();
                city.blur();
            }
            
        }
    } else {
        if (event.target.innerText.trim() === ''){
            localStorage.setItem('city', localMemory);
            getCity();
        } else {
            localStorage.setItem('city', event.target.innerText);
            getWeather();
            city.blur();
        } 
    }
}


async function getWeather(){
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&units=metric&appid=de19f2d788b9682b92b7827504abd25c`;
    const res = await fetch(url);
    const weatherData = await res.json();
    if (weatherData.cod != 200){
        localStorage.setItem('city', localMemory);
        getCity();
        alert('Incorrect city name');

    } else {
        weatherType.textContent = `${weatherData.weather[0].main}`;
        weatherType.textContent = `${weatherData.weather[0].main}`;
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
        temperature.textContent = `${weatherData.main.temp.toFixed(0)}°C`;
        windSpeed.textContent = `${weatherData.wind.speed} m/s`;
        humidity.textContent = `${weatherData.main.humidity}%`;
    }
}

// get quote

const blockquote = document.querySelector('.quoteText');
const figcaption = document.querySelector('.authorName');
const quoteBtn  = document.querySelector('.nextQuote');

async function getQuote(){
    const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
    const res = await fetch(url);
    const quoteData = await res.json();
    if (quoteData.quote.quoteText.length > 150) {
        getQuote();
    } else {
        blockquote.textContent = quoteData.quote.quoteText;
        figcaption.textContent = quoteData.quote.quoteAuthor; 
    }
       
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('DOMContentLoaded', getQuote);

city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

// Listen for Clicks

name.addEventListener('click', emptyField);
focus.addEventListener('click', emptyField);
nextImg.addEventListener('click', imgChange);
city.addEventListener('click', emptyField);
quoteBtn.addEventListener('click', getQuote);


// Run the program

showTime();
setBgGreeting();
getName();
getFocus();
getCity();

