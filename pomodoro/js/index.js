$(document).ready(function(){
  var timer;
  var breakTimer;
  
  var sessGoing = true;
  var breakGoing = false;
  
  var clicked = false;
  var breakClick = true;
  
  /*if (sessGoing && clicked){
    $("#butt").html("Stop");
  }*/
  
  
  // controls for break length
  var min = $("#blclock");
    var minval = min.html();
    minval = parseInt(minval);
  // controls for session length
   var max = $("#slclock");
    var maxval = max.html();
    maxval = parseInt(maxval);
    
  // control for main session
    var sess = $("#mclock");
    var sessData = sess.html();
    var sarray = sessData.split(":");
    
  
  $("#bldec").on('click', function(){
    
    if (clicked == false){
    if (minval > 1){
      minval -= 1;
      min.html(minval);
    }
    }
  });
  
  $("#blinc").on('click', function(){
    
    if (clicked == false){  
    minval += 1;
      min.html(minval);
    }
  });
  
  $("#sldec").on('click', function(){
    
    if (clicked == false){if (maxval > 1){
      maxval -= 1;
      sarray[0] = maxval;
      sarray[1] = 0;
      sess.html(sarray[0]+ ":" + "00");
      max.html(maxval);
    }
                         }
  });
  
  $("#slinc").on('click', function(){
    
    if (clicked == false){
    sarray[0] = parseInt(sarray[0]);  
    maxval += 1;
      sarray[0] = maxval;
      sarray[1] = 0;
      sess.html(sarray[0]+ ":" + "00");
    
    max.html(maxval);
    }
  });
  
  $("#butt").on('click', function(){
      if (sessGoing){  
          //if (breakClick == false){
          if (clicked === false){ 
          timer  = setInterval(showSession, 1000); 
            var loc = $("#butt");
            loc.html("Stop");
            loc.addClass("btn-danger");
          }
          else {
            clearInterval(timer);
            var loc = $("#butt");
            loc.html("Continue");
            loc.removeClass("btn-danger");
          }

          clicked = !clicked;
      }
    else if (breakGoing){
        
      if (breakClick == false){
          breakTimer = setInterval(showBreak, 1000);
        var loc = $("#butt");
            loc.html("Stop");
            loc.addClass("btn-danger");
          }
      else{
        clearInterval(breakTimer);
        var loc = $("#butt");
            loc.html("Continue");
            loc.removeClass("btn-danger");
      }
      breakClick = !breakClick;
    }
  });
  
  function showSession(){
		
    if (sarray[0] == 0 && sarray[1] == 0) {
						clearInterval(timer);
            breakTimer = setInterval(showBreak, 1000);
            sessGoing = false;
            breakGoing = true;
          //  breakClick = true;
            sess.html(minval + ":" + "00");
            sessData = sess.html();
            sarray = sessData.split(":");
            var local = $("#name");
            local.html("Break Time!");
					}
    
    else if (parseInt(sarray[0]) >= 0){
				
						if (parseInt(sarray[1]) > 0){
							sarray[1] = sarray[1] - 1;
							if (sarray[1] < 10 && sarray[0] < 10){
								sess.html("0" + sarray[0] + ":" + "0" + sarray[1].toString());
							}
							else if (sarray[1] < 10 && sarray[0] >= 10){
								sess.html(sarray[0] + ":" + "0" + sarray[1]);
							}
							else if (sarray[1] > 10 && sarray[0] < 10){
								sess.html("0" + sarray[0] + ":" + sarray[1]);
							}
							else{
								sess.html(sarray[0] + ":" + sarray[1].toString());
							}
						}
						else{
							sarray[0] = sarray[0] - 1;
							sarray[1] = 59;
							if (sarray[0] < 10){
								sess.html("0" + sarray[0] + ":" + sarray[1]);
							}
							else{
							sess.html(sarray[0] + ":" + sarray[1]);
							}
						}
					}
					
				}
  
  function showBreak(){
    
    if (sarray[0] == 0 && sarray[1] == 0) {
						clearInterval(breakTimer);	
            timer = setInterval(showSession, 1000);
            sessGoing = true;
            breakGoing = false;
            //breakClick = false;
            sess.html(maxval + ":" + "00");
             sessData = sess.html();
            sarray = sessData.split(":");
            var local = $("#name");
            local.html("Session!");
					}
    
  				else if (parseInt(sarray[0]) >= 0){
				
						if (parseInt(sarray[1]) > 0){
							sarray[1] = sarray[1] - 1;
							if (sarray[1] < 10 && sarray[0] < 10){
								sess.html("0" + sarray[0] + ":" + "0" + sarray[1].toString());
							}
							else if (sarray[1] < 10 && sarray[0] >= 10){
								sess.html(sarray[0] + ":" + "0" + sarray[1]);
							}
							else if (sarray[1] > 10 && sarray[0] < 10){
								sess.html("0" + sarray[0] + ":" + sarray[1]);
							}
							else{
								sess.html(sarray[0] + ":" + sarray[1].toString());
							}
						}
						else{
							sarray[0] = sarray[0] - 1;
							sarray[1] = 59;
							if (sarray[0] < 10){
								sess.html("0" + sarray[0] + ":" + sarray[1]);
							}
							else{
							sess.html(sarray[0] + ":" + sarray[1]);
							}
						}
					}
					
				}
  
});