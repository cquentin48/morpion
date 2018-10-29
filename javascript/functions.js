﻿/**
 * Fonction pour déterminer qui est le prochain joueur
 */
function nextPlayer(){
    var player1Symbol, player2Symbol;
    player1Symbol = countElement("X");
    player2Symbol = countElement("O");
    if(player1Symbol<player2Symbol){
        console.log("Tour du joueur n°2");
        return "player2";
    }else{
        console.log("Tour du joueur n°1");
        return "player1";
    }
}

/**
 * Fonction de comptage du nombre d'éléments
 * @param {l'élement utilisé par le joueur} element 
 */
function countElement(element){
    console.log("Début du comptage de l'élément "+element+".");
    var elementsCounted = 0;
    for(var i =0; i<3;i++){
        for(var j=0; j<3; j++){
            if(document.getElementById("tictactoeTable").rows[i].cells[j].innerHTML == element){
                elementsCounted++;
            }
        }
    }
    return elementsCounted;
}

/**
 * Fonction de mise à jour de la table de jeu
 * @param {la cellule du tableau} cell 
 */
function updateGameTable(cell){
    if(this.innerHTML== "X" || this.innerHTML == "O"){
        Log.console.error("Erreur : case déjà rempli!");
        alert("Cette case a déjà été rempli!");
    }else{
        let player1SymbolCount = countElement("X");
        let player2SymbolCount = countElement("O");

        if(player1SymbolCount>player2SymbolCount){
            updateCell(cell.getAttribute('colTTT'), cell.getAttribute('cellTTT'),"O");
        }else{
            updateCell(cell.getAttribute('colTTT'), cell.getAttribute('cellTTT'),"X");
        }
    }
    checkforWinners();
}

/**
 * Mise à jour de la valeur dans la cellule
 * @param {Numéro de la ligne} colNumber 
 * @param {Numéro de la colonne} cellNumber 
 */
function updateCell(colNumber, cellNumber, symbol){
    console.log("Mise à jour de la cellule à l'index (x:"+colNumber+", y:"+cellNumber+"): "+symbol+".");
    document.getElementById("tictactoeTable").rows[colNumber].cells[cellNumber].innerHTML=symbol;
}

/**
 * Création d'un tableau représentant la table du jeu du morpion
 */
function createArrayFromGameTable(){
    var compteur = 0;
    console.log("Début de création du tableau javascript");
    var htmlGameArray = document.getElementById("tictactoeTable");
    let javascriptGameArray = new Array(9);
    for(var i = 0; i<3;i++){
        for(var j = 0;j<3;j++){
            console.log("Lecture de l'élément (x:"+i+", y:"+j+"):"+htmlGameArray.rows[i].cells[j].innerHTML+".");
            javascriptGameArray[compteur] = htmlGameArray.rows[i].cells[j].innerHTML;
            compteur = compteur + 1;
        }
    }
    console.log("Fin de création du tableau javascript");
    return javascriptGameArray;
}

/**
 * Recherche des gagnants
 */
function checkforWinners(){
    console.log("Début de recherche du gagnant...");
    var gameTable = createArrayFromGameTable();

    for(var i = 0; i<3; i++){
        var indexHorizontal = (3*i);
        var indexVertical = i;
        alert(gameTable[indexHorizontal]);
        alert(gameTable[indexHorizontal+1]);
        alert(gameTable[indexHorizontal+2]);
        if(gameTable[indexHorizontal] === gameTable[indexHorizontal+1]
        && gameTable[indexHorizontal+1] === gameTable[indexHorizontal+2]
        && gameTable[indexHorizontal] === "X"
        && gameTable[indexHorizontal] === "O"){
            console.log("Victoire par la ligne n°"+i);
            updateStatus(gameTable[0].innerHTML);
        }else if(gameTable[(3*0)+indexVertical] == gameTable[(3*1)+indexVertical]
              && gameTable[(3*2)+indexVertical]){
            console.log("Victoire par la colonne n°"+i);
            updateStatus(gameTable[0].innerHTML);
        }
    }

    if(gameTable[0] == gameTable[4] && gameTable[6] == gameTable[8]){
        console.log("Victoire par la diagonale");
        updateStatus(gameTable[0][0].innerHTML);
    }
    else if(gameTable[2] == gameTable[4] && gameTable[4] == gameTable[6]){
        console.log("Victoire par la diagonale renversée.");
        updateStatus(gameTable[0][2].innerHTML);
    }else{
        console.log("Pas de gagnant : suite de la partie");
    }
    console.log("Fin de recherche du gagnant!");
}

/**
 * Symbole du joueur
 * @param {Symbole du joueur} symbol 
 */
function updateStatus(symbol){
    if(symbol == "X"){
        document.getElementById("tictactoeStatus".innerHTML) == "Victoire du joueur 1!";
        console.log("Fin de partie : victoire du joueur n°1!");
        return true;
    }else if(symbol == "O"){
        document.getElementById("tictactoeStatus".innerHTML) == "Victoire du joueur 2!";
        console.log("Fin de partie : victoire du joueur n°2!");
        return true;
    }else{
        console.log("Aucun gagnant trouvé : suite de la partie")
        return false;
    }
}