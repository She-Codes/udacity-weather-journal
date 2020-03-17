/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "7ac846b1627ac681186c50292ce4d755";
const generateButton = document.getElementById("generate");
const zipCodeInput = document.getElementById("zip");
const feelingsArea = document.getElementById("feelings");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temp");
const contentEl = document.getElementById("content");

// Create a new date instance dynamically with JS
const d = new Date();
const date = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Handle GET and POST requests
const makeHTTPRequest = async (url, dataObj) => {
  let response;
  try {
    // If there is data passed in, make a POST request
    // otherwise make a GET request
    if (dataObj) {
      response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObj)
      });
    } else {
      response = await fetch(url);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("I'm sorry there was a problem.");
    console.log(error);
  }
};

// GET data from OpenWeather API
const fetchWeatherData = async (zip, baseUrl, apiKey) => {
  const data = await makeHTTPRequest(
    `${baseUrl}?zip=${zip}&units=imperial&appid=${apiKey}`
  );
  return data;
};

// Clear input, textarea, and rendered content
const clearElements = () => {
  zipCodeInput.value = "";
  feelingsArea.value = "";
  dateEl.innerHTML = "";
  tempEl.innerHTML = "";
  contentEl.innerHTML = "";
};

// Clear user feedback errors
const clearErrors = () => {
  const errorEls = document.querySelectorAll(".error");
  errorEls.forEach(errorEl => {
    errorEl.parentNode.removeChild(errorEl);
  });
};

// Render user feedback errors
const renderErrors = () => {
  const zipCode = zipCodeInput.value;
  const feelings = feelingsArea.value;

  if (!feelings) {
    feelingsArea.parentNode
      .querySelector("label")
      .insertAdjacentHTML(
        "afterend",
        '<p class="error">Please share your feelings.</p>'
      );
  }

  if (!zipCode) {
    zipCodeInput.parentNode
      .querySelector("label")
      .insertAdjacentHTML(
        "afterend",
        '<p class="error">Please enter your zipcode.</p>'
      );
  }
};

// Update UI with app data
const updateUI = async () => {
  const { date, temp, feelings } = await makeHTTPRequest("/getProjectData");
  clearElements();
  dateEl.innerHTML = `The date is: ${date}`;
  tempEl.innerHTML = `The temperature is: ${temp}`;
  contentEl.innerHTML = `You are feeling: ${feelings}`;
};

// Initialize HTTP requests
const handleGenerateButton = async () => {
  const zipCode = zipCodeInput.value;
  const feelings = feelingsArea.value;

  clearErrors();
  renderErrors();

  if (!feelings || !zipCode) return;

  const weatherData = await fetchWeatherData(zipCode, baseUrl, apiKey);
  const temp = weatherData.main.temp;
  // POST the weather data and the user data
  //debugger;
  await makeHTTPRequest("/addProjectData", { temp, feelings, date });
  // GET the recently saved data and render it to the UI
  updateUI();
};

// Handle value changes in form elements and remove any
// previously added errors
const handleInput = e => {
  const target = e.target;
  const parent = target.parentNode;
  const errorEl = parent.querySelector(".error");

  if (!errorEl) return;
  parent.removeChild(errorEl);
};

const setupEventListeners = () => {
  // This button initializes fetching data from the weather API,
  // POSTing user and weather data, and retrieving data from the server
  generateButton.addEventListener("click", handleGenerateButton);
  // When the value of either input changes,
  // remove any relevant error messages
  zipCodeInput.addEventListener("input", handleInput);
  feelingsArea.addEventListener("input", handleInput);
};

setupEventListeners();
