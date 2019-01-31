function hideStartMenu(){
    $("#gameStartMenu").hide();
}

function showStartMenu(){
    $("#gameStartMenu").show();
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
    var playerNameTurn = playerName.replace("%data", player1GL.name);
    $('.container').append(gameDivCopy);
    $('.container').append(playerNameTurn);
}

function deleteGameGrid(){
    $("#connect4Grid").remove();
    $("#playerTurnH4").remove();
}

function deleteEndMenu(){
    $("#gameEndMenu").remove();
}

function disableGame(){
    $(".chipHolder").prop("onclick", null).off("click");
}

function displayPlayersName(){
    var playerTurnH1 = $("#playerTurnH4");
    playerTurnH1.empty();
    playerTurnH1.append(currentPlayerGL.name + "'s turn");
    
    playerTurnH1.css("color", currentPlayerGL.color);
}

function fillColor(clickedColumn){
    var theColumn = gameGridGL.columnsObj["column"+clickedColumn];

    var color = theColumn[theColumn.length - 1];
    var rowNum = gameGridGL.rows - (theColumn.length);
    var id = "ch" + rowNum + "" +  clickedColumn;
    
    $("#" + id).css("background-color", color);
}

function drawEndGame(){
    winnerIs = winnerH2.replace('%data%', currentPlayerGL.name);
    gameEndMenu = gameEndMenuDiv.replace('%data%',winnerIs+playAgainButton);
    
    $(".container").append(gameEndMenu);
}