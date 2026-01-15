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
  showAllButton.addEventListener("click", (e) => {
    e.preventDefault();
    getDataMassEffect(10);
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

async function getDataMassEffect(rInput) {
  const effectTxtMass = document.getElementById("effectTxtMass");
  effectTxtMass.innerHTML = "";
  for (let i = 1; i < rInput; i++) {
    try {
      const response = await fetch(
        `https://dragonball-api.com/api/characters/${i}`
      );
      if (response.status != 200) {
        throw new Error(response);
      } else {
        const data = await response.json(); //makes the data into JSON object we can use
        console.log(data);

        // class= "w-96 justify-center text-xl position: absolute bottom-0 text-black"
        effectTxtMass.insertAdjacentHTML(
          "afterend",
          `<div>
          <div>
            <h3><b>Name:</b> ${data.name} <b>Id:</b> ${data.id} <b>Race:</b> ${data.race} <b>Ki:</b> ${data.ki}</h3>
          </div>
          <img class = "size-100 mx-auto mb-24" src="${data.image}"/>
          </div>`
        );
        //prevents the form from refreshing the page(which is a very annoying feature)
        console.log("Input recieved");
      }
    } catch (error) {
      console.log(error);
      console.log("Something's wrong with this link");
    }
  }
}
