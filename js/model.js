var model = {
    gameModeGL : 'start', //start, playing, end
    
    player1GL: {},
    player2GL: {},
    currentPlayerGL: {},
    gameGridGL: {},
    
    Player: function(name, color){
        this.name = name;
        this.color = color;
    },
    
    GameGrid: function(rows, columns){
        this.rows = rows;
        this.columns = columns;
        
        this.columnsObj = {};
        
        for(var i=0; i<columns; i++){
            this.columnsObj["column"+i] = [];
        }

        this.chipsPlayed = 0;
        this.isFullAndNoWinner = false;
    }
} 