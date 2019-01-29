var gameTitle = 'Connect 4';

var numberOfRows = 0;
var numberOfColumns = 0;

function Player(name){
    this.name = name;
}

function didPressStart(){
    var isValid = true;

    if($("#p1Name").val().trim().length == 0){
        $("#p1Name").addClass("form-control is-invalid");
        isValid = false;
    }

    if($("#p2Name").val().trim().length == 0){
        $("#p2Name").addClass("form-control is-invalid");
        isValid = false;
    }

    console.log($("#numOfRows").val())
    if($("#numOfRows").val() - 0  < 1 || $("#numOfRows").val() - 0 > 11 ){
        $("#numOfRows").addClass("form-control is-invalid");
        $("#rowErrorMsg").innerText = "Please Enter a number between 1 and 11"
    }    
}