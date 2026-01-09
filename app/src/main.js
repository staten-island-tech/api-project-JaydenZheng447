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

const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
  console.log(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try {
    resultDiv.innerHTML = "Fetching Data...";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();

    if (!data || !data.length) {
      resultDiv.innerHTML = `<p>Sorry, Word Not Found</p>`;
      return;
    }

    let definitions = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
            <h2><strong>Word:</strong> ${data[0].word}</h2>
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning:</strong> ${
              definitions.definition || "Not Found"
            }</p>
            <p><strong>Example:</strong> ${
              definitions.example || "Not Found"
            }</p>
            <p><strong>Antonyms:</strong></p>
        `;

    // Fetching antonyms
    if (!definitions.antonyms || definitions.antonyms.length === 0) {
      resultDiv.innerHTML += `<span>Not Found</span>`;
    } else {
      for (let i = 0; i < definitions.antonyms.length; i++) {
        resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
      }
    }

    // Adding read more button
    if (data[0].sourceUrls && data[0].sourceUrls.length > 0) {
      resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls[0]}" target="_blank">Read More</a></div>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p>Sorry, Word Not Found. Error: ${error.message}</p>`;
  }
};

/* 
const formField = document.getElementById("userInput");
const userInputButton = document.getElementById("userInputButton");
const formData = new FormData(formField, userInputButton);

userInputButton.addEventListener("click", function (e) {
  e.preventDefault(); //prevents the form from refreshing the page(which is a very annoying feature)
  apiInput = document.getElementById("userInput");
  console.log("Input recieved");
  console.log(apiInput);
});
 */

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
