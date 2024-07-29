// Générer le choix aléatoire du bot
function getBotChoice() {
   const choices = ["pierre", "feuille", "ciseaux"];
   const randomIndex = Math.floor(Math.random() * choices.length);
   return choices[randomIndex];
}

// Déterminer le gagnant
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

// Jouer
function playGame(playerChoice) {
   const botChoice = getBotChoice();

   document.getElementById("player-choice").textContent = `Vous avez choisi: ${playerChoice}`;
   document.getElementById("bot-choice").textContent = `Le bot a choisi: ${botChoice}`;
   
   const result = determineWinner(playerChoice, botChoice);
   document.getElementById("game-result").textContent = `Résultat: ${result}`;
}

// Événements boutons
document.getElementById("pierre").addEventListener("click", function() {
   playGame("pierre");
});

document.getElementById("feuille").addEventListener("click", function() {
   playGame("feuille");
});

document.getElementById("ciseaux").addEventListener("click", function() {
   playGame("ciseaux");
});
