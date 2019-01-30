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
        deleteEndMenu();
        deleteGameGrid();
        showStartMenu();
    }
    else if(gameModeGL == "playing"){
        hideStartMenu();
        drawGameGrid();
        startGame();        
    }
    else if(gameModeGL == "end"){
        disableGame();
        drawEndGame();
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
        if(!checkIfWinner())
            switchTurns();
    }
    // console.log(gameGridGL.columnsObj);
}

function checkIfWinner(){
    if(checkVerticalWin() || checkHorizontalWin() || checkDiagonalWin()){
        gameModeGL = 'end';
        draw();
        return true;
    }
    return false;
}

function checkVerticalWin(){
    for(var i=0; i<gameGridGL.columns; i++){
        var theColumn = gameGridGL.columnsObj["column"+i];
        
        for(var j=0; j<theColumn.length -3 ; j++){
            
            if( typeof theColumn[j] !== 'undefined' && theColumn[j] === theColumn[j+1] && 
                theColumn[j] === theColumn[j+2] && theColumn[j] === theColumn[j+3]){
                    return true;
                }
        }
    }
    return false;
}

function checkHorizontalWin(){
    for(var i=0; i<gameGridGL.rows; i++){
        for(var j=0; j<gameGridGL.columns -3; j++){
            var col1 = gameGridGL.columnsObj["column"+j];
            var col2 = gameGridGL.columnsObj["column"+(j+1)];
            var col3 = gameGridGL.columnsObj["column"+(j+2)];
            var col4 = gameGridGL.columnsObj["column"+(j+3)];
            
            if( typeof col1[i] !== 'undefined' && col1[i] === col2[i] && 
                col1[i] === col3[i] && col1[i] === col4[i]){
                return true;
            }
        }
    }
    return false;
}

function checkDiagonalWin(){
    for(var i=0; i<gameGridGL.rows; i++){
        for(var j=0; j<gameGridGL.columns -3; j++){
            var col1 = gameGridGL.columnsObj["column"+j];
            var col2 = gameGridGL.columnsObj["column"+(j+1)];
            var col3 = gameGridGL.columnsObj["column"+(j+2)];
            var col4 = gameGridGL.columnsObj["column"+(j+3)];
            
            if( typeof col1[i] !== 'undefined' && col1[i] === col2[i+1] && 
                col1[i] === col3[i+2] && col1[i] === col4[i+3]){
                return true;
            }

            if( i<3 ){
                continue;
            }

            if( typeof col1[i] !== 'undefined' && col1[i] === col2[i-1] && 
            col1[i] === col3[i-2] && col1[i] === col4[i-3]){
                return true;
            }
        }
    }
    return false;
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

function didPressPlayAgain(){
    gameModeGL = 'start';
    draw();
}
