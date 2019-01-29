$(document).ready(function(){
    var body = '';

    body += gameTitleH1.replace('%data%', gameTitle);

    $('.container').append(body);
});