const today = document.getElementById("today");
const search = document.getElementById("search");
const findBtn = document.getElementById("find");
const forecastBox = document.getElementById("forecast");

console.log(search);

const fetchingData = async () => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=5426bf25fb40406590853711240812&q=cairo&days=3`
    );
    if (!response.ok) {
      throw new Error("Bad Network Response ");
    }
    const data = await response.json();
    console.log(data);
  } catch {
    (error) => {
      console.error("Error Fetching data", error);
    };
  }
};

fetchingData();

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function Search(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5426bf25fb40406590853711240812&q=${city}&days=3`
  );
  if (response.ok && response.status !== 400) {
    let data = await response.json();
    displayCurrentDay(data.location, data.current);
    displayAnotherDays(data.forecast.forecastday);
  }
}

search.addEventListener("keyup", (a) => {
  Search(a.target.value);
});
function displayCurrentDay(locationData, curruntData) {
  var date = new Date(curruntData.last_updated);
  console.log(date);

  forecastBox.innerHTML = ` <div class="today forecast col-12 col-lg-4" id="today">
   <div class="forecast-header d-flex justify-content-between">
                <div class="day" id="day">
                  <span>${days[date.getDay()]}</span>
                </div>
                <div class="date" id="data">
                  <span> ${date.getDate()} ${
    monthNames[date.getMonth()]
  } </span>
                </div>
              </div>
              <div class="forecast-containt">
                <div class="location" id="city">${locationData.name}</div>
                <div
                  class="degree-temp d-flex align-items-center justify-content-between"
                >
                  <div class="num" id="temp-c">${
                    curruntData.temp_c
                  } <sup>o</sup>C</div>
                  <div class="forecast-icon">
                    <img
                      src="https:${curruntData.condition.icon}"
                      alt=""
                      width="90"
                    />
                  </div>
                </div>
                <div class="custom pb-5" id="condition">${
                  curruntData.condition.text
                }</div>

                <span>
                  <img src="./assets/icon-umberella.png" alt="umberella icon" />
                  20%
                </span>
                    <span>
                  <img src="./assets/icon-wind.png" alt="wind icon" /> ${
                    curruntData.wind_kph
                  }
                </span>
                <span>
                  <img src="./assets/icon-compass.png" alt="umberella icon" />
                  ${curruntData.wind_dir}
                </span>
            
              </div>
                  </div>`;
}

function displayAnotherDays(forecastdays) {
  let box = "";

  for (let i = 1; i < forecastdays.length; i++) {
    console.log(forecastdays[i]);
    var condition = forecastdays[i].day.condition;
    var date = new Date(forecastdays[i].date);
    console.log(date);
    box += `<div class="forecast col-12 col-lg-4 text-center">
              <div class="forecast-header">
                <div class="day"><span>${days[date.getDay()]}</span></div>
              </div>
              <!-- .forecast-header -->
              <div class="forecast-containt">
                <div class="forecast-icon mb-4">
                  <img
                    src="https:${condition.icon}"
                    alt=""
                    width="48"
                  />
                </div>
                <div class="degree">${
                  forecastdays[i].day.maxtemp_c
                }<sup>o</sup>C</div>
                <small>${forecastdays[i].day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${condition.text}</div>
              </div>
            </div>`;
  }
  forecastBox.innerHTML += box;
}

Search("cairo");
