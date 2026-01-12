//whalen: "don't use global variables"
import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

//use tailwind css for this project
function minimizeGlobalVariableSillyRubricRequirement() {
  const form = document.querySelector("form");
  const resultDiv = document.querySelector(".result");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    getData(form.elements[0].value);
    /* getWordInfo(form.elements[0].value); */
    console.log(form.elements[0].value);
  });

  const showAllButton = document.getElementById("showAllButton");
  const showZFighterButton = document.getElementById("showZFighterButton");
  const showFriezaButton = document.getElementById("showFriezaButton");
  const showVillainButton = document.getElementById("showVillainButton");
  showAllButton.addEventListener("click", function (e) {
    for (let i = 1; i < 100; i++) {
      e.preventDefault();
      form.elements[0].value = i;
      console.log(form.elements[0].value);
      getDataMass(form.elements[0].value);
    }
  });
}
minimizeGlobalVariableSillyRubricRequirement();

async function getData(zInput) {
  try {
    const response = await fetch(
      `https://dragonball-api.com/api/characters/${zInput}`
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json(); //makes the data into JSON object we can use
      console.log(data);
      const cardHolderPrimary = document.getElementById("cardHolderPrimary");
      const effectTxt = document.getElementById("effectTxt");
      effectTxt.innerHTML = `<div class="card">
       <h3><b>Name:</b> ${data.name} <b>Id:</b> ${data.id} <b>Race:</b> ${data.race} <b>Ki:</b> ${data.ki}</h3>
      </div>`;
      const imgbox = document.getElementById("imgbox");
      imgbox.innerHTML = `<img class = "size-100 mx-auto" src="${data.image}"/>`;
      zInput.preventDefault(); //prevents the form from refreshing the page(which is a very annoying feature)
      console.log("Input recieved");
    }
  } catch (error) {
    console.log(error);
    console.log("Something's wrong with this link");
  }
}

async function getDataMass(zInput) {
  try {
    const response = await fetch(
      `https://dragonball-api.com/api/characters/${zInput}`
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json(); //makes the data into JSON object we can use
      console.log(data);
      const cardHolderPrimary = document.getElementById("cardHolderPrimary");
      const effectTxt = document.getElementById("effectTxt");
      effectTxt.insertAdjacentHTML =
        ("afterend",
        `<div class="card">
       <h3><b>Name:</b> ${data.name} <b>Id:</b> ${data.id} <b>Race:</b> ${data.race} <b>Ki:</b> ${data.ki}</h3>
      </div>`);
      effectTxt.insertAdjacentHTML =
        ("afterend", `<img class = "size-100 mx-auto" src="${data.image}"/>`);
      //prevents the form from refreshing the page(which is a very annoying feature)
      console.log("Input recieved");
    }
  } catch (error) {
    console.log(error);
    console.log("Something's wrong with this link");
  }
}

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
/* 
async function fetchDataInParallel() {
  const parameters = [
    "name",
    "id",
    "ki",
    "race" ,
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
fetchDataInParallel(URLz); */
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
