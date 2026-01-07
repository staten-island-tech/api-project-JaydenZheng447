import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

/* document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter")); */

//use tailwind css for this project
let apiInput = "4";
const URLz = `https://dragonball-api.com/api/characters/${apiInput}`;

async function getData(URLz) {
  try {
    const response = await fetch(URLz);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json(); //makes the data into JSON object we can use
      console.log(data);
      document.getElementById("api-response").insertAdjacentHTML(
        "afterend",
        `<div class="card">
       <h3>${data.name} and ${data.id}</h3>
      </div>`
      );
    }
  } catch (error) {
    console.log(error);
    console.log("no bueno");
  }
}

const userInput = document.getElementById("userInput");
const userInputButton = document.getElementById("userInputButton");
userInputButton.addEventListener("click", function () {
  apiInput = document.getElementById("userInput");
  console.log("Input recieved");
  console.log(apiInput);
});

/* 
document.getElementById("api-response").insertAdjacentHTML(
  "afterend",
  `<div class="card" >
       <h3>${data.name} and ${data.id}</h3>
      </div>`
); */

getData(URLz);

async function fetchDataInParallel() {
  const parameters = [
    "name",
    "id",
    "ki",
    "race" /* Add more parameters here */,
  ];
  // Map each parameter to an API call with the corresponding index
  const promises = parameters.map(
    (param, index) => getData(param, index + 1) // Pass the API number to track which API we're calling
  );
  try {
    // Wait for all the promises to resolve
    const results = await Promise.all(promises);
    // Process the results and log each response
    results.forEach((result, index) => {
      console.log(`API ${index + 1} Response:`, result);
    });
  } catch (error) {
    console.error("Error during fetching:", error);
  }
}

function othername() {
  var input = document.getElementById("userInput").value;
  alert(input);
  console.log(input);
}
fetchDataInParallel(URLz);
/* 
getData(URL);
getData(URLz);
getData(URL);
getData(URL);
function zootData(x) {
  for (let i = 0; i < x; i++) {
    getData(URL);
  }
}
zootData(5); */
