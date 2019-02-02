var controller = {
    init: function(){
        view.init();
    },

    getGameGrid: function(){
        return model.gameGridGL;
    },

    getCurrentPlayer: function(){
        return model.currentPlayerGL;
    },

    prepareGame: function(p1Name, p2Name, numOfRows, numOfColumns){
        model.player1GL = new model.Player(p1Name, 'red');
        model.player2GL = new model.Player(p2Name, 'yellow');
        model.currentPlayerGL = model.player1GL;
    
        model.gameGridGL = new model.GameGrid(numOfRows, numOfColumns);
    
        model.gameModeGL = "playing";
    
        this.draw();
    },

    draw: function(){
        if(model.gameModeGL == "start"){
            view.deleteEndMenu();
            view.deleteGameGrid();
            view.bindChipHolderListener();
            view.showStartMenu();
        }
        else if(model.gameModeGL == "playing"){
            view.hideStartMenu();
            view.drawGameGrid();
            view.displayPlayersName();        
        }
        else if(model.gameModeGL == "end"){
            view.drawEndGame();
            view.unbindChipHolderListener();

            if(model.gameGridGL.isFullAndNoWinner){
                view.changeTextToNoWinner();
            }
        } 
    },
    
    playChip: function(clickedColumn){
        var theColumn = model.gameGridGL.columnsObj["column"+clickedColumn];
    
        if(theColumn.length < model.gameGridGL.rows){ // can insert
            theColumn.push(model.currentPlayerGL.color);
            view.fillColor(clickedColumn);
            if(! this.checkIfWinner(clickedColumn))
                this.switchTurns();
        }
    },

    checkIfWinner: function(clickedColumn){
        if(this.checkVerticalWin(clickedColumn) || this.checkHorizontalWin(clickedColumn) ||
           this.checkDiagonalWin(clickedColumn)){
            model.gameModeGL = 'end';
            this.draw();
            return true;
        }
        return false;
    },
    
    checkVerticalWin: function(clickedColumn){
        var theColumn = model.gameGridGL.columnsObj["column"+clickedColumn];
            
        var lastEntry = theColumn[theColumn.length -1];
        var lastEntryMinus1 = theColumn[theColumn.length -2];
        var lastEntryMinus2 = theColumn[theColumn.length -3];
        var lastEntryMinus3 = theColumn[theColumn.length -4];
    
        if(lastEntry === lastEntryMinus1 && lastEntry === lastEntryMinus2 &&
            lastEntry === lastEntryMinus3){
                return true;
            }
        return false;
    },

    checkHorizontalWin: function(clickedColumn){
        var row = model.gameGridGL.columnsObj["column"+clickedColumn].length -1;
    
        var col1Left = model.gameGridGL.columnsObj["column"+(clickedColumn-3)];
        var col2Left = model.gameGridGL.columnsObj["column"+(clickedColumn-2)];
        var col3Left = model.gameGridGL.columnsObj["column"+(clickedColumn-1)];
    
        var col = model.gameGridGL.columnsObj["column"+clickedColumn];
    
        var col1Right = model.gameGridGL.columnsObj["column"+(clickedColumn+1)];
        var col2Right = model.gameGridGL.columnsObj["column"+(clickedColumn+2)];
        var col3Right = model.gameGridGL.columnsObj["column"+(clickedColumn+3)];
    
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
    },

    checkDiagonalWin: function(clickedColumn){
        var row = model.gameGridGL.columnsObj["column"+clickedColumn].length -1;
    
        var col1Left = model.gameGridGL.columnsObj["column"+(clickedColumn-3)];
        var col2Left = model.gameGridGL.columnsObj["column"+(clickedColumn-2)];
        var col3Left = model.gameGridGL.columnsObj["column"+(clickedColumn-1)];
    
        var col = model.gameGridGL.columnsObj["column"+clickedColumn];
    
        var col1Right = model.gameGridGL.columnsObj["column"+(clickedColumn+1)];
        var col2Right = model.gameGridGL.columnsObj["column"+(clickedColumn+2)];
        var col3Right = model.gameGridGL.columnsObj["column"+(clickedColumn+3)];
    
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
        return false;
    },

    switchTurns: function(){
        model.gameGridGL.chipsPlayed++;

        if(model.gameGridGL.chipsPlayed === (model.gameGridGL.rows * model.gameGridGL.columns)){
            model.gameGridGL.isFullAndNoWinner = true;
            model.gameModeGL = 'end'
            this.draw();
            return;
        }
        
        if(model.currentPlayerGL === model.player1GL){
            model.currentPlayerGL = model.player2GL;
        }
        else{
            model.currentPlayerGL = model.player1GL;
        }

        view.displayPlayersName();
    },
    
    didPressPlayAgain: function(){
        model.gameModeGL = 'start';
        this.draw();
    }
}

controller.init();