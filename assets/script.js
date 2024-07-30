// Utilisation des variables pour les sélecteurs fréquemment utilisés
const pseudoInput = document.getElementById("pseudo");
const savePseudoButton = document.getElementById("save-pseudo");
const label = document.querySelector(".pseudo-label");
const app = document.getElementById("app");
const resultat = document.getElementById("resultat");
const playerName = document.getElementById("player-name");
const scoreDisplay = document.getElementById("score");
const gameResult = document.getElementById("game-result");
const resetButton = document.getElementById("reset-button");


function resetGame() {
   localStorage.removeItem("pseudo");
   localStorage.removeItem("score");
   toggleDisplay([pseudoInput, savePseudoButton, label], "block");
   toggleDisplay([app, resultat], "none");
   playerName.textContent = "";
   scoreDisplay.textContent = "Score: 0";
   gameResult.textContent = "";
   resetChoices();
}


function toggleDisplay(elements, displayStyle) {
   elements.forEach(element => element.style.display = displayStyle);
}


resetButton.addEventListener("click", resetGame);


function checkPseudo() {
   const savedPseudo = localStorage.getItem("pseudo");
   if (savedPseudo) {
      playerName.textContent = savedPseudo;
      toggleDisplay([pseudoInput, savePseudoButton, label], "none");
      toggleDisplay([app, resultat], "block");
   }
}


savePseudoButton.addEventListener("click", function () {
   const pseudo = pseudoInput.value;
   if (pseudo) {
      localStorage.setItem("pseudo", pseudo);
      playerName.textContent = pseudo;
      toggleDisplay([pseudoInput, savePseudoButton, label], "none");
      toggleDisplay([app, resultat], "block");
   }
});


function getBotChoice() {
   const choices = ["pierre", "feuille", "ciseaux"];
   return choices[Math.floor(Math.random() * choices.length)];
}


function determineWinner(playerChoice, botChoice) {
   if (playerChoice === botChoice) return "Égalité!";
   if ((playerChoice === "pierre" && botChoice === "ciseaux") ||
      (playerChoice === "feuille" && botChoice === "pierre") ||
      (playerChoice === "ciseaux" && botChoice === "feuille")) {
      return "Vous avez gagné!";
   } else {
      return "Vous avez perdu!";
   }
}


function updateBotChoiceImage(botChoice) {
   const images = {
      "pierre": "/assets/photos/pierre.png",
      "feuille": "/assets/photos/feuille.png",
      "ciseaux": "/assets/photos/ciseaux.png"
   };
   const imageSrc = images[botChoice] || "";
   const oldImgElement = resultat.querySelector("img");
   if (oldImgElement) resultat.removeChild(oldImgElement);
   const imgElement = document.createElement("img");
   imgElement.src = imageSrc;
   imgElement.alt = "choix du bot";
   imgElement.classList.add("bounce");
   resultat.appendChild(imgElement);
}


function resetChoices() {
   document.querySelector(".choices").style.animationPlayState = "running";
   document.querySelectorAll(".choice-button img").forEach(img => {
      img.classList.remove("selected", "deselected", "centered");
      img.style.opacity = "1";
   });
   gameResult.textContent = "";
   const botImg = resultat.querySelector("img");
   if (botImg) botImg.remove();
}


function playGame(playerChoice) {
   resetChoices();
   const botChoice = getBotChoice();
   const result = determineWinner(playerChoice, botChoice);
   gameResult.textContent = result;
   updateBotChoiceImage(botChoice);
   updateScore(result);

   document.querySelector(".choices").style.animationPlayState = "paused";
   document.querySelectorAll(".choice-button img").forEach(img => {
      if (img.parentElement.id === playerChoice) {
         img.classList.add("selected", "centered");
         img.style.opacity = "1";
      } else {
         img.classList.add("deselected");
         img.style.opacity = "0.5";
      }
   });
   setTimeout(resetChoices, 3000);
}

// updateScore
function updateScore(result) {
   let score = parseInt(localStorage.getItem("score")) || 0;
   if (result === "Vous avez gagné!") score += 1;
   localStorage.setItem("score", score);
   scoreDisplay.textContent = `Score: ${score}`;
}


["pierre", "feuille", "ciseaux"].forEach(choice => {
   document.getElementById(choice).addEventListener("click", () => playGame(choice));
});


document.querySelector(".choices").addEventListener("mouseover", () => {
   document.querySelector(".choices").style.animationPlayState = "paused";
});

document.querySelector(".choices").addEventListener("mouseout", () => {
   document.querySelector(".choices").style.animationPlayState = "running";
});


window.onload = function () {
   //  checkPseudo();
   //  const score = localStorage.getItem("score") || 0;
   //  scoreDisplay.textContent = `Score: ${score}`;
   resetGame();
};
