var dat;
var fetchjson = function(q) {
	fetch('question.json')
	  .then(response => {
	    return response.json()
	  })
	  .then(data => {

		 dat = data;
	    console.log(dat[q]);
	    document.getElementById('demo2').innerHTML = data[q].question
	    document.getElementById('option1').innerHTML = (data[q].options[0])
	    document.getElementById('option2').innerHTML = (data[q].options[1])
	    document.getElementById('option3').innerHTML = (data[q].options[2])
	    document.getElementById('option4').innerHTML = (data[q].options[3])
	  })
	  .catch(err => {
	   
	  })
}

function getCookie(ques) {
	  var question = ques + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i < ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(question) == 0) {
	      return c.substring(question.length, c.length);
	    }
	  }
	  return "";
}

function setCookie(ques,selected_opt,exdays) {
	  var d = new Date();
	  d.setTime(d.getTime() + (exdays*24*60*60*1000));
	  var expires = "expires=" + d.toGMTString();
	  document.cookie = ques + "=" + selected_opt + ";" + expires;
}

function checkCookie(ques, selected_opt) {
	setCookie(ques, selected_opt, 5);
}

var Store = function(q) {
	var opt = document.getElementsByName('option'); 
	var flag=0;
    var selected_opt;
    for(i = 0; i < opt.length; i++) { 
    	if(opt[i].checked) {
    		flag=1;
    		selected_opt = opt[i].value;
    	}
    }
    
    if(flag==1)
    	{
    checkCookie(q, selected_opt);
    	}
    else
    	{
    	alert("Select one option");
    	return false;
    	}
}

var Result = function(q) {
	Store(q);
	var count = 0;
	for(x in dat) {
		
		if( dat[x].answer == getCookie(x) ) {
			count++;
		}
	
	}
	setCookie("score", count, 30);
}

function displayResult() {
	var result = getCookie("score");
	/*if(result < 5 ){
		document.getElementById("congrats").innerHTML = "You could have done it better";
	}
	else if(result >= 5)
		{
		document.getElementById("congrats").innerHTML = "Congratulation";
		}*/
	document.getElementById("score").innerHTML = "Your Score is : " + result;
}


