var view = {
   init: function(){
      this.gameDivTemplate = '<div id= "connect4Grid">%data%</div>';
      this.gameRowDivTemplate = '<div class="row" id="%id%">%data%</div>';
      this.gameColumnDivTemplate = '<div class="col px-0" id="%id%" align="center">%data%</div>';
      this.gameChipHolderDivTemplate = '<div class="chipHolder px-0 m-0" id="%id%"></div>';
      this.playerTurnH4Template = '<h4 id="playerTurnH4"></h4>';
      this.gameEndMenuDivTemplate = '<div id= "gameEndMenu" class= "p-xl-5 p-lg-4 p-md-3 p-sm-2 p-xs-1">%data%</div>';
      this.winnerH2Template = '<h2 id= "winnerH2">%data%</h2>'; 
      this.playAgainButtonTemplate = '<button type="button" id= "playAgainBtn" class="btn btn-dark">Play Again</button>';

      this.containerDiv= $('.container');
      this.gameStartMenuDiv= $("#gameStartMenu");
      this.p1Name = $("#p1Name");
      this.p2Name = $("#p2Name");
      this.numOfRows = $("#numOfRows");
      this.rowErrorMsg = $("#rowErrorMsg");
      this.numOfColumns = $("#numOfColumns");
      this.columnErrorMsg = $("#columnErrorMsg");
      this.startBtn= $("#startBtn");

      this.bindStartBtnListener();
      this.bindChipHolderListener();
      this.bindPlayAgainBtnListener();
   },

   bindStartBtnListener: function(){
      var self= this;
      this.startBtn.on('click', function(){
         self.didPressStart();
      });
   },

   bindChipHolderListener: function(){
      this.containerDiv.on('click', '#connect4Grid .row .col .chipHolder', function(e){
         var clickedColumn = e.currentTarget.id[e.currentTarget.id.length-1]-0;
         controller.playChip(clickedColumn);
      });
   },

   bindPlayAgainBtnListener: function(){
      this.containerDiv.on('click', '#gameEndMenu #playAgainBtn', function(e){
         controller.didPressPlayAgain();
      });
   },

   unbindChipHolderListener: function(){
      this.containerDiv.off('click', '#connect4Grid .row .col .chipHolder');
   },

   didPressStart: function(){
      var isValid = true;
  
      if(this.p1Name.val().trim().length == 0){
          this.p1Name.addClass("form-control is-invalid");
          isValid = false;
      }
      else{
          this.p1Name.removeClass("form-control is-invalid")
      }
  
      if(this.p2Name.val().trim().length == 0){
          this.p2Name.addClass("form-control is-invalid");
          isValid = false;
      }
      else{
          this.p2Name.removeClass("form-control is-invalid");
      }
  
      if(isNaN(this.numOfRows.val()) || this.numOfRows.val() - 0  < 4 || this.numOfRows.val() - 0 > 11 ){
          this.numOfRows.addClass("form-control is-invalid");
          this.rowErrorMsg.empty();
          this.rowErrorMsg.append("Please Enter a number between 4 and 11");
          isValid = false;
      }  
      else{
          this.numOfRows.removeClass("form-control is-invalid");
          this.rowErrorMsg.empty();
      }  
  
      if(isNaN(this.numOfColumns.val()) || this.numOfColumns.val() - 0  < 4 || this.numOfColumns.val() - 0 > 12 ){
          this.numOfColumns.addClass("form-control is-invalid");
          this.columnErrorMsg.empty();
          this.columnErrorMsg.append("Please Enter a number between 4 and 12");
          isValid = false;
      }  
      else{
          this.numOfColumns.removeClass("form-control is-invalid");
          this.columnErrorMsg.empty();
      }
  
      if(isValid){
          controller.prepareGame(this.p1Name.val(), this.p2Name.val(), this.numOfRows.val() - 0, this.numOfColumns.val() - 0);
      }
  },

   hideStartMenu: function(){
      this.gameStartMenuDiv.hide();
   },
  
   showStartMenu: function(){
      this.gameStartMenuDiv.show();
   },

   drawGameGrid: function(){ 
      var gameData = "";

      for(var i=0; i<controller.getGameGrid().rows; i++){
         var allColumnsOfOneRow = "";
         for(var j=0; j<controller.getGameGrid().columns; j++){

            var theChipHolderDiv = this.gameChipHolderDivTemplate.replace('%id%', "ch"+i+""+j);
            var columnDiv = this.gameColumnDivTemplate.replace("%id%", "c"+i+""+j).replace("%data%",theChipHolderDiv);

            allColumnsOfOneRow += columnDiv;
         }
         
         var rowDiv = this.gameRowDivTemplate.replace("%id%", "r"+i).replace("%data%",allColumnsOfOneRow);

         gameData += rowDiv;
      }
      
      var gameDivCopy = this.gameDivTemplate.replace("%data%", gameData);
      this.containerDiv.append(gameDivCopy);
      this.containerDiv.append(this.playerTurnH4Template);
      
      this.connect4GridDiv= $("#connect4Grid"); //cache game grid
      this.playerTurnH4= $("#playerTurnH4"); //cache the h4 tag
      this.displayPlayersName();
   },

   deleteGameGrid: function(){
      this.connect4GridDiv.remove();
      this.playerTurnH4.remove();
   },
  
   deleteEndMenu: function(){
      this.gameEndMenuDiv.remove();
   },

   displayPlayersName: function(){
      var currentplayerTurnH4 = this.playerTurnH4;
      currentplayerTurnH4.empty();
      currentplayerTurnH4.append(controller.getCurrentPlayer().name + "'s turn");
      
      currentplayerTurnH4.css("color", controller.getCurrentPlayer().color);
   },

   fillColor: function(clickedColumn){
      var theColumn = controller.getGameGrid().columnsObj["column"+clickedColumn];
  
      var color = theColumn[theColumn.length - 1];
      var rowNum = controller.getGameGrid().rows - (theColumn.length);
      var id = "ch" + rowNum + "" +  clickedColumn;
      
      $("#" + id).css("background-color", color);
   },
  
   drawEndGame: function(){
      var winnerIs = this.winnerH2Template.replace('%data%', 'The winner is: ' + controller.getCurrentPlayer().name);
      var gameEndMenu = this.gameEndMenuDivTemplate.replace('%data%', winnerIs + this.playAgainButtonTemplate);
      
      this.containerDiv.append(gameEndMenu);

      this.gameEndMenuDiv= $("#gameEndMenu"); //cache game end menu
      this.winnerH2 = $("#winnerH2");
   },

   changeTextToNoWinner: function(){
      this.winnerH2.empty();
      this.winnerH2.append("No Winner!")
   }
}