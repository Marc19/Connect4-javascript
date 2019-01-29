var gameModeGL = 'start'; //start, playing, end

var player1GL;
var player2GL;
var currentPlayerGL;
var gameGridGL;

function Player(name, color){
    this.name = name;
    this.color = color;
}

function GameGrid(rows, columns){
    this.rows = rows;
    this.columns = columns;

    this.columnsObj = {};

    for(var i=0; i<columns; i++){
        this.columnsObj["column"+i] = [];
    }
}

function didPressStart(){
    var p1Name = $("#p1Name");
    var p2Name = $("#p2Name");
    var numOfRows = $("#numOfRows");
    var rowErrorMsg = $("#rowErrorMsg");
    var numOfColumns = $("#numOfColumns");
    var columnErrorMsg = $("#columnErrorMsg");

    var isValid = true;

    if(p1Name.val().trim().length == 0){
        p1Name.addClass("form-control is-invalid");
        isValid = false;
    }
    else{
        p1Name.removeClass("form-control is-invalid")
    }

    if(p2Name.val().trim().length == 0){
        p2Name.addClass("form-control is-invalid");
        isValid = false;
    }
    else{
        p2Name.removeClass("form-control is-invalid");
    }

    if(isNaN(numOfRows.val()) || numOfRows.val() - 0  < 1 || numOfRows.val() - 0 > 11 ){
        numOfRows.addClass("form-control is-invalid");
        rowErrorMsg.empty();
        rowErrorMsg.append("Please Enter a number between 1 and 11");
        isValid = false;
    }  
    else{
        numOfRows.removeClass("form-control is-invalid");
        rowErrorMsg.empty();
    }  

    if(isNaN(numOfColumns.val()) || numOfColumns.val() - 0  < 1 || numOfColumns.val() - 0 > 12 ){
        numOfColumns.addClass("form-control is-invalid");
        columnErrorMsg.empty();
        columnErrorMsg.append("Please Enter a number between 1 and 12");
        isValid = false;
    }  
    else{
        numOfColumns.removeClass("form-control is-invalid");
        columnErrorMsg.empty();
    }

    if(isValid){
        prepareGame(p1Name.val(), p2Name.val(), numOfRows.val() - 0, numOfColumns.val() - 0);
    }
}

function prepareGame(p1Name, p2Name, numOfRows, numOfColumns){
    player1GL = new Player(p1Name, 'red');
    player2GL = new Player(p2Name, 'yellow');
    currentPlayerGL = player1GL;

    gameGridGL = new GameGrid(numOfRows, numOfColumns);

    gameModeGL = "playing";

    draw();
}

function draw(){
    if(gameModeGL == "start"){
        
    }
    else if(gameModeGL == "playing"){
        hideStartMenu();
        drawGameGrid();
        startGame();        
    }
    else if(gameModeGL == "end"){
        
    } 
}

function startGame(){
    displayPlayersName();
    bindEventListeners();
}

function bindEventListeners(){
    $(".chipHolder").on("click", function(e){
        var clickedColumn = e.currentTarget.id[e.currentTarget.id.length-1]-0;

        playChip(clickedColumn);
    });
}

function playChip(column){
    var theColumn = gameGridGL.columnsObj["column"+column];

    if(theColumn.length < gameGridGL.rows){ // can insert
        theColumn.push(currentPlayerGL.color);
        redrawGrid();
        checkIfWinner();
        switchTurns();
    }
    // console.log(gameGridGL.columnsObj);
}

function checkIfWinner(){
    //TODO: connect 4 rules
}

function switchTurns(){
    if(currentPlayerGL === player1GL){
        currentPlayerGL = player2GL;
    }
    else{
        currentPlayerGL = player1GL;
    }
    displayPlayersName();
}
