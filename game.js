var buttonColours = ["red", "blue", "green", "yellow"];
//console.log(buttonColours);
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level); 
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
   // console.log(randomNumber);
   // console.log(randomChosenColour); 
    $("#"+randomChosenColour).fadeOut(50).fadeIn();
    playSound(randomChosenColour); 
    
}

//console.log(gamePattern);
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   // console.log(userChosenColour);
   // console.log(userClickedPattern);
    playSound(userChosenColour); 
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
        },100);
}

$(document).keypress(function(){
    if(!started){
       $("#level-title").text("Level "+level);
       nextSequence();
       started = true; 
    }

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
       // console.log("succses");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        //console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
        startOver();
           }

}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}