var side, cpu, cpuMovesCount, available,
    cpuStart,
    userMoves = [],
    cpuMoves = [],
    goForWin = [],
    blockList = [],
    blocksListNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
    abailableOps = blocksListNumbers,
    winState = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];



// push each block item to blockList array
for (var listCount = 0; listCount < blocksListNumbers.length; listCount++) {
  var ListItemId = blocksListNumbers[listCount];
  blockList.push(document.getElementById(ListItemId));
}

// declaring variables for choose side and repeat screens
var chooseSide = document.getElementById('choose-side'),
    repeat = document.getElementById('repeat'),
    overlay = document.getElementById('overlay'),
    again = document.getElementById('again'),
    changeSide = document.getElementById('change-side');

// declaring variables for blocks
var blocks = document.querySelectorAll('li'),
    choose = document.querySelectorAll('.choose'),
    clickable = true;

// determine if the user is x or o
Array.prototype.forEach.call(choose, function(selection) {
  selection.onclick = function(e) {
    side = this.id;
    reset();
    overlay.style.display = "none";
    chooseSide.style.display = "none";
  }
});

// fill every variable when user clicks on it
Array.prototype.forEach.call(blocks, function(l) {
  l.onclick = function() {
    if (clickable === true) {
      if (this.className !== "x" && this.className !== "o") {
        l.className = side;
        clickable = false;
        for (var j = 0; j < winState.length; j++) {
          if (blockList[(winState[j][0] - 1)].className === side &&
          blockList[(winState[j][1] - 1)].className === side &&
          blockList[(winState[j][2] - 1)].className === side) {
            blockList[(winState[j][0] - 1)].style.backgroundColor = "#74f135";
            blockList[(winState[j][1] - 1)].style.backgroundColor = "#74f135";
            blockList[(winState[j][2] - 1)].style.backgroundColor = "#74f135";
            var callRepeat = setTimeout(function(){
              showRepeat();
            }, (500));
            return;
          }
        }
        var delayMove = setTimeout(function(){
          cpuMove();
        }, (100));
      }
    }
  };
});

// show the choosing side screen
function showSelectSide() {
  overlay.style.display = "block";
  chooseSide.style.display = "block";
}

// function to fill the block by cpu
function cpuFill(item) {
  blockList[(item - 1)].className = cpu;
}

// check what block items are available
function checkAvaibale() {
  available = [];
  for (var i = 0; i < blockList.length; i++) {
    if (blockList[i].className !== "x" && blockList[i].className !== "o") {
      available.push(blockList[i]);
    }
  }
}

// generate a random spot for cpu
function cpuRandom() {
  var count = Math.floor(Math.random() * available.length);
  available[count].className = cpu;
}

// check if cpu or user can win and then fill the block
function canWin(i, item) {
  if (blockList[(winState[i][0] - 1)].className === item &&
    blockList[(winState[i][1] - 1)].className === item &&
    available.indexOf(blockList[(winState[i][2] - 1)]) >= 0) {
      cpuFill(winState[i][2]);
      return true;
  } else if (blockList[(winState[i][0] - 1)].className === item &&
    blockList[(winState[i][2] - 1)].className === item &&
    available.indexOf(blockList[(winState[i][1] - 1)]) >= 0) {
      cpuFill(winState[i][1]);
      return true;
  } else if (blockList[(winState[i][1] - 1)].className === item &&
    blockList[(winState[i][2] - 1)].className === item &&
    available.indexOf(blockList[(winState[i][0] - 1)]) >= 0) {
      cpuFill(winState[i][0]);
      return true;
  }
}

// find the next move so cpu can win
function availableMoves(i, item) {
  if (blockList[(winState[i][0] - 1)].className === item &&
  available.indexOf(blockList[(winState[i][1] - 1)]) >= 0 &&
  available.indexOf(blockList[(winState[i][2] - 1)]) >= 0) {
    goForWin.push(winState[i][1]);
    goForWin.push(winState[i][2]);
  } else if (blockList[(winState[i][1] - 1)].className === item &&
  available.indexOf(blockList[(winState[i][0] - 1)]) >= 0 &&
  available.indexOf(blockList[(winState[i][2] - 1)]) >= 0) {
    goForWin.push(winState[i][0]);
    goForWin.push(winState[i][2]);
  } else if (blockList[(winState[i][2] - 1)].className === item &&
  available.indexOf(blockList[(winState[i][0] - 1)]) >= 0 &&
  available.indexOf(blockList[(winState[i][1] - 1)]) >= 0) {
    goForWin.push(winState[i][0]);
    goForWin.push(winState[i][1]);
  }
}

// cpu takes a move
function cpuMove() {
  var end = false;
  goForWin = [];

  checkAvaibale();
  if (available.length < 1) {
    var callRepeat = setTimeout(function(){
      showRepeat();
    }, (500));
  }

  if (cpuMovesCount === 0 || cpuMovesCount === 1) {
    cpuRandom();
  } else if (cpuMovesCount > 1 && cpuMovesCount <= 4) {
    for (var i = 0; i < winState.length; i++) {
        if(canWin(i, cpu)) {end = true;}
    }
    if (end === false) {
      for (var i = 0; i < winState.length; i++) {
        if(canWin(i, side)) {end = true; break;}
        availableMoves(i, cpu);
      }
    }
    if (end === false && goForWin.length > 0) {
      var move = Math.floor(Math.random() * goForWin.length);
      cpuFill(goForWin[move]);
    } else if (end === false && goForWin.length <= 0) {
      cpuRandom();
    }
  }

  for (var j = 0; j < winState.length; j++) {
    if (blockList[(winState[j][0] - 1)].className === cpu &&
    blockList[(winState[j][1] - 1)].className === cpu &&
    blockList[(winState[j][2] - 1)].className === cpu) {
      blockList[(winState[j][0] - 1)].style.backgroundColor = "#f13535";
      blockList[(winState[j][1] - 1)].style.backgroundColor = "#f13535";
      blockList[(winState[j][2] - 1)].style.backgroundColor = "#f13535";
      var callRepeat = setTimeout(function(){
        showRepeat();
      }, (500));
      return;
    }
  }

  clickable = true;
  checkAvaibale();
  if (available.length < 1) {
    var callRepeat = setTimeout(function(){
      showRepeat();
    }, (500));
  }
  cpuMovesCount++;
}

// show the repeat screen
function showRepeat() {
  overlay.style.display = "block";
  repeat.style.display = "block";
}

// reset everything
function reset() {
  Array.prototype.forEach.call(blocks, function(l){
    l.className = "";
    l.style.backgroundColor = "transparent";
  });
  overlay.style.display = "none";
  repeat.style.display = "none";
  var end = false;
  goForWin = [];

  if (side === "o") {
    cpu = "x";
    cpuMovesCount = 0;
    cpuStart = true;
    clickable = false;
    var delayMove = setTimeout(function(){
      cpuMove();
    }, (100));
  } else if (side === "x") {
    cpu = "o";
    cpuMovesCount = 1;
    cpuStart = false;
    clickable = true;
  }
}

// show choosing side when window loads for the first time
// and when a user clicks on change side
window.onload = function() {
  showSelectSide();
  choose.onclick = function(e) { reset(); }
  again.onclick = function(e) { reset(); }
  changeSide.onclick = function(e) {
    showSelectSide();
  }
};