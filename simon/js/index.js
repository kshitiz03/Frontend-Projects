var box1 = $("#box1");
var box2 = $("#box2");
var box3 = $("#box3");
var box4 = $("#box4");

var restrictCheckbox = $("#restrict-checkbox");

var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

var audio = [audio1, audio2, audio3, audio4];

var log = $("#logger");

var start_button = $("#start_button");

var stepCount = {
  elem: $("#step_count"),
  value: 0
};

function logger(text){
  log.text(text);
}

var pattern ,inputFlag, inputCount, restrict, gameStarted;

function generateRandNum(){
  return (Math.floor(Math.random()*4) + 1).toString();
}

function getNumFromId(id){
  return id.split("box").pop();
}

function changeStepCount(change){
  if(change == "increase") {
    stepCount.count += 1;
  } else if(change == "decrease") {
    stepCount.count -= 1;         
  } else{
    stepCount.count = change; 
  }
  stepCount.elem.text(stepCount.count);
}

function init(){
  start_button.click(startGame);
  
  $(".box").click(handleBoxInput);
  
  changeStepCount(0);
  
  restrict = false;
  
  logger("Press start to start the game. You will win the game at 15th level.");
  
  gameStarted = false;
}

function reset(){
    pattern = [];
    changeStepCount(0);
    inputFlag = false;
    inputCount = 0;
    logger("Press start to start the game. You will win the game at 15th level.");
}

function startGame(){
  
  if(!gameStarted){
    gameStarted = true;
    reset();
  
  handlePattern();
  
  start_button.text("Stop");
    
    
  } else{
    gameStarted = false;
    
    reset();
    
    start_button.text("Start");
    
    
  }
  
}

function handlePattern(){
  
  if(pattern.length == 15){
    logger("Congrats!!! You did it!"); 
    return;
     }
  
  if(!gameStarted){
     return;
     }
  inputFlag = false;
  
  inputCount = 0;
  
  //TODO: check patterns length to stop the game at 20
  
  pattern.push(generateRandNum());
  
  changeStepCount(pattern.length);
  
  displayPattern();
  
  logger("Carefully see the pattern to remember it!");
  
}

function displayPattern(){
  if(!gameStarted){
     return;
     }
  
  blinkSquare(0);
  
}

function blinkSquare(item){
  if(item >= pattern.length && gameStarted){
    logger("Repeat the pattern");
    inputFlag = true;
    return;     
  }
  const boxno = pattern[item];
  $("#box"+boxno).addClass("blink");
  
  audio[Number(boxno) - 1].play();
  
  setTimeout(function(){
    $("#box"+boxno).removeClass("blink");
    item += 1;
    
    setTimeout(function(){blinkSquare(item);}, 300);
    
  }, 800);
}

function handleBoxInput(e){
  
  const id = getNumFromId(e.target.id);
  
  audio[Number(id) - 1].play();
  
  if(inputFlag){
    if(pattern[inputCount] == id){
       inputCount += 1;
      
      if(inputCount == pattern.length){
         
        setTimeout(function(){handlePattern();}, 2000);
         
        
         }
       } else{
         logger("You made a mistake.");
         setTimeout(handleError, 1000);
       }               
     }
}

function handleError(){
  inputCount = 0;
  inputFlag = false;
  if(restrict){
    pattern = [];
    reset();
    handlePattern();
  } else{
    logger("Carefully see the pattern to remember it!");
    displayPattern();
  }
}

restrictCheckbox.change(function(e){
  if(e.target.checked){
    restrict = true;
  } else{
    restrict = false;
  }
});



init();