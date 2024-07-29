// Fonction pour réinitialiser le localStorage et les éléments de la page
function resetGame() {
   localStorage.removeItem("pseudo");
   localStorage.removeItem("score");
   
   document.getElementById("pseudo").style.display = "block";
   document.getElementById("save-pseudo").style.display = "block";
   document.getElementById("label").style.display = "block";
   document.getElementById("app").style.display = "none";
   document.getElementById("player-name").textContent = "";
   document.getElementById("score").textContent = "Score: 0";
   document.getElementById("player-choice").textContent = "Vous avez choisi: ";
   document.getElementById("bot-choice").textContent = "Le bot a choisi: ";
   document.getElementById("game-result").textContent = "Résultat: ";
}

// Ajouter l'événement au bouton de réinitialisation
document.getElementById("reset-button").addEventListener("click", resetGame);


// Vérifier si un pseudo est déjà enregistré
function checkPseudo() {
   const savedPseudo = localStorage.getItem("pseudo");
   if (savedPseudo) {
       document.getElementById("player-name").textContent = savedPseudo;
       document.getElementById("pseudo").style.display = "none";
       document.getElementById("save-pseudo").style.display = "none";
      document.getElementById("label").style.display = "none";
       document.getElementById("app").style.display = "block";
   }
}

// Enregistrer le pseudo
document.getElementById("save-pseudo").addEventListener("click", function() {
   const pseudo = document.getElementById("pseudo").value;
   if (pseudo) {
       localStorage.setItem("pseudo", pseudo);
       document.getElementById("player-name").textContent = pseudo;
       document.getElementById("pseudo").style.display = "none";
       document.getElementById("save-pseudo").style.display = "none";
   document.getElementById("label").style.display = "none";
       document.getElementById("app").style.display = "block";
   }
});

// Fonction pour générer le choix aléatoire du bot
function getBotChoice() {
   const choices = ["pierre", "feuille", "ciseaux"];
   const randomIndex = Math.floor(Math.random() * choices.length);
   return choices[randomIndex];
}

// Fonction pour déterminer le gagnant
function determineWinner(playerChoice, botChoice) {
   if (playerChoice === botChoice) {
       return "Égalité!";
   }

   if (
       (playerChoice === "pierre" && botChoice === "ciseaux") ||
       (playerChoice === "feuille" && botChoice === "pierre") ||
       (playerChoice === "ciseaux" && botChoice === "feuille")
   ) {
       return "Vous avez gagné!";
   } else {
       return "Vous avez perdu!";
   }
}

// Fonction pour jouer le jeu
function playGame(playerChoice) {
   const botChoice = getBotChoice();

   document.getElementById("player-choice").textContent = `Vous avez choisi: ${playerChoice}`;
   document.getElementById("bot-choice").textContent = `Le bot a choisi: ${botChoice}`;
   
   const result = determineWinner(playerChoice, botChoice);
   document.getElementById("game-result").textContent = `Résultat: ${result}`;

   updateScore(result);
}

// Fonction pour mettre à jour le score
function updateScore(result) {
   let score = parseInt(localStorage.getItem("score")) || 0;
   if (result === "Vous avez gagné!") {
       score += 1;
      document.getElementById("score").textContent = `Score: ${score}`;
   }
   localStorage.setItem("score", score);
   document.getElementById("player-score").textContent = `Score de ${localStorage.getItem("pseudo")}: ${score}`;
}

// Ajouter les événements aux boutons
document.getElementById("pierre").addEventListener("click", function() {
   playGame("pierre");
});

document.getElementById("feuille").addEventListener("click", function() {
   playGame("feuille");
});

document.getElementById("ciseaux").addEventListener("click", function() {
   playGame("ciseaux");
});

// Vérifier le pseudo et le score au chargement de la page
window.onload = function() {
   checkPseudo();
   let score = localStorage.getItem("score") || 0;
   document.getElementById("score").textContent = `Score: ${score}`;
};