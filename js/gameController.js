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

function playChip(clickedColumn){
    var theColumn = gameGridGL.columnsObj["column"+clickedColumn];

    if(theColumn.length < gameGridGL.rows){ // can insert
        theColumn.push(currentPlayerGL.color);
        fillColor(clickedColumn);
        if(!checkIfWinner(clickedColumn))
            switchTurns();
    }
}

function checkIfWinner(clickedColumn){
    if(checkVerticalWin(clickedColumn) || checkHorizontalWin(clickedColumn) ||
       checkDiagonalWin(clickedColumn)){
        gameModeGL = 'end';
        draw();
        return true;
    }
    return false;
}

function checkVerticalWin(clickedColumn){
    var theColumn = gameGridGL.columnsObj["column"+clickedColumn];
        
    var lastEntry = theColumn[theColumn.length -1];
    var lastEntryMinus1 = theColumn[theColumn.length -2];
    var lastEntryMinus2 = theColumn[theColumn.length -3];
    var lastEntryMinus3 = theColumn[theColumn.length -4];

    if(lastEntry === lastEntryMinus1 && lastEntry === lastEntryMinus2 &&
        lastEntry === lastEntryMinus3){
            return true;
        }
    
    return false;
}

function checkHorizontalWin(clickedColumn){
    var row = gameGridGL.columnsObj["column"+clickedColumn].length -1;

    var col1Left = gameGridGL.columnsObj["column"+(clickedColumn-3)];
    var col2Left = gameGridGL.columnsObj["column"+(clickedColumn-2)];
    var col3Left = gameGridGL.columnsObj["column"+(clickedColumn-1)];

    var col = gameGridGL.columnsObj["column"+clickedColumn];

    var col1Right = gameGridGL.columnsObj["column"+(clickedColumn+1)];
    var col2Right = gameGridGL.columnsObj["column"+(clickedColumn+2)];
    var col3Right = gameGridGL.columnsObj["column"+(clickedColumn+3)];

    var maxWithLeft = 1;

    if(typeof(col3Left) !== 'undefined' && col[row] === col3Left[row]){
        maxWithLeft++;
        if(typeof(col2Left) !== 'undefined' && col[row] === col2Left[row]){
            maxWithLeft++;
            if(typeof(col1Left) !== 'undefined' && col[row] === col1Left[row])
                maxWithLeft++;
        }
    }

    if(maxWithLeft == 4)
        return true;

    if(typeof(col1Right) !== 'undefined' && col[row] === col1Right[row]){
        maxWithLeft++;

        if( maxWithLeft == 4)
            return true;
        
        if(typeof(col2Right) !== 'undefined' && col[row] === col2Right[row]){
            maxWithLeft++;

            if( maxWithLeft == 4)
                return true;
                
            if(typeof(col3Right) !== 'undefined' && col[row] === col3Right[row]){
                maxWithLeft++;

                if( maxWithLeft == 4)
                    return true;
            }
        }
    }

    return false;
}

function checkDiagonalWin(clickedColumn){
    var row = gameGridGL.columnsObj["column"+clickedColumn].length -1;

    var col1Left = gameGridGL.columnsObj["column"+(clickedColumn-3)];
    var col2Left = gameGridGL.columnsObj["column"+(clickedColumn-2)];
    var col3Left = gameGridGL.columnsObj["column"+(clickedColumn-1)];

    var col = gameGridGL.columnsObj["column"+clickedColumn];

    var col1Right = gameGridGL.columnsObj["column"+(clickedColumn+1)];
    var col2Right = gameGridGL.columnsObj["column"+(clickedColumn+2)];
    var col3Right = gameGridGL.columnsObj["column"+(clickedColumn+3)];

    var maxWithLeftDown = 1;

    if(typeof(col3Left) !== 'undefined' && col[row] === col3Left[row-1]){
        maxWithLeftDown++;
        if(typeof(col2Left) !== 'undefined' && col[row] === col2Left[row-2]){
            maxWithLeftDown++;
            if(typeof(col1Left) !== 'undefined' && col[row] === col1Left[row-3])
                maxWithLeftDown++;
        }
    }

    if(maxWithLeftDown == 4)
        return true;

    if(typeof(col1Right) !== 'undefined' && col[row] === col1Right[row+1]){
        maxWithLeftDown++;

        if( maxWithLeftDown == 4)
            return true;
        
        if(typeof(col2Right) !== 'undefined' && col[row] === col2Right[row+2]){
            maxWithLeftDown++;

            if( maxWithLeftDown == 4)
                return true;
                
            if(typeof(col3Right) !== 'undefined' && col[row] === col3Right[row+3]){
                maxWithLeftDown++;

                if( maxWithLeftDown == 4)
                    return true;
            }
        }
    }

    var maxWithLeftUp = 1;

    if(typeof(col3Left) !== 'undefined' && col[row] === col3Left[row+1]){
        maxWithLeftUp++;
        if(typeof(col2Left) !== 'undefined' && col[row] === col2Left[row+2]){
            maxWithLeftUp++;
            if(typeof(col1Left) !== 'undefined' && col[row] === col1Left[row+3])
                maxWithLeftUp++;
        }
    }

    if(maxWithLeftUp == 4)
        return true;

    if(typeof(col1Right) !== 'undefined' && col[row] === col1Right[row-1]){
        maxWithLeftUp++;

        if( maxWithLeftUp == 4)
            return true;
        
        if(typeof(col2Right) !== 'undefined' && col[row] === col2Right[row-2]){
            maxWithLeftUp++;

            if( maxWithLeftUp == 4)
                return true;
                
            if(typeof(col3Right) !== 'undefined' && col[row] === col3Right[row-3]){
                maxWithLeftUp++;

                if( maxWithLeftUp == 4)
                    return true;
            }
        }
    }
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
