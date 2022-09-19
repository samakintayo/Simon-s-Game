var userClickedPattern = [];
var gamePattern = []

var buttonColors= ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;


//Detect Keypress

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


//check user response

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over!, Press any key to restart ");
        //start game all over
        startOver();
    }

}


//Listen for button click event
$(".btn").on("click", function(){

    //GET THE ID OF THE BUTTON THAT WAS CLICKED
    var userChosenColour =  $(this).attr("id");

    //update/add the button that was clicked to the user click pattern array
    userClickedPattern.push(userChosenColour)

    // plays a sound and animate button press
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});    



//play a sound function 
function playSound(name){
    this.name;
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

//Add Animation to button pressed

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout (function(){
        $("#" + currentColour).removeClass("pressed");

    }, 100)
};




//Sequence function
function nextSequence() {

    userClickedPattern = [];
    level ++;
    
    $("#level-title").text("Level " + level);

    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    // Choose a random button color
    var randomChosenColor = buttonColors[randomNumber];
    
    //add chosen colour to empty gamePattern array
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //play sound and animate
    playSound(userChosenColour);
    animatePress(userChosenColour);
}





function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}