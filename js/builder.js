function hideStartMenu(){
    $("#gameMenu").hide();
}

function drawGameGrid(){
    var gameData = "";

    for(var i=0; i<gameGridGL.rows; i++){
        var allColumnsOfOneRow = "";
        for(var j=0; j<gameGridGL.columns; j++){

            var chipHolderDiv = gameChipHolderDiv.replace('%id%', "ch"+i+""+j);
            var columnDiv = gameColumnDiv.replace("%id%", "c"+i+""+j).replace("%data%",chipHolderDiv);

            allColumnsOfOneRow += columnDiv;
        }
        
        var rowDiv = gameRowDiv.replace("%id%", "r"+i).replace("%data%",allColumnsOfOneRow);

        gameData += rowDiv;
    }
    var gameDivCopy = gameDiv.replace("%data%", gameData);

    $('.container').append(gameDivCopy);
}

function displayPlayersName(){
    if( $("#playerTurnH4").length == 0){
        $('.container').append(playerName);
    }

    var playerTurnH1 = $("#playerTurnH4");
    playerTurnH1.empty();
    playerTurnH1.append(currentPlayerGL.name + "'s turn");
    
    playerTurnH1.css("color", currentPlayerGL.color);
}

function redrawGrid(){
    //TODO: Color filled entries from model
}