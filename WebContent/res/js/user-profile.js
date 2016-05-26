
//TODO: change get usrid from login page
document.cookie = "usrid=4";
var usrid = getCookie('usrid');

var usr_path = "http://localhost:8080/FoundITService/userProfile/";

ajaxSend(usr_path + usrid, "get", "", "app-candidate", null, function(d){
           fillUserInfo(d)
       }, function(){
    	   alert("no response..");
    	   document.getElementById("btn-save").setAttribute('method', 'post');
       });

function fillUserInfo(data) {
	
	if (data.length === 0){
		alert("no user");
		return false;
	}
		
	document.getElementById("usr_1").value = data.name;
	document.getElementById("usr_2").value = data.email;
	document.getElementById("usr_3").value = data.addr;
	document.getElementById("usr_4").value = data.telNum;
	document.getElementById("usr_5").value = data.curPos;
	document.getElementById("usr_6").value = data.education;
	document.getElementById("usr_7").value = data.skills;
	document.getElementById("usr_8").value = data.exp;
	document.getElementById("usr_9").value = data.perDsp;
	
}

$('#btn-save').click(function(){
	var method = document.getElementById("btn-save").getAttribute("method");
	if(method==="put"){
		var usr_fullpath = usr_path + usrid;
	}
	else{
		var usr_fullpath = usr_path; 
	}
	
	var data = {"name":document.getElementById("usr_1").value,
			    "email":document.getElementById("usr_2").value,
			    "addr":document.getElementById("usr_3").value,
			    "telNum":document.getElementById("usr_4").value,
			    "curPos":document.getElementById("usr_5").value,
			    "education":document.getElementById("usr_6").value,
			    "skills":document.getElementById("usr_7").value,
			    "experience":document.getElementById("usr_8").value,
			    "perDsp":document.getElementById("usr_9").value}
    
	//TODO: need to test for update(PUT) after Cloud modify the source code(should be changed like POST)
	ajaxSend(usr_fullpath, method, data, "app-candidate", null, function(d){
		alert("save success")
		document.getElementById("btn-save").setAttribute('method', 'put');
		//window.location.href = "./candidate.html"
    });
});

$('#btn-delete').click(function(){
	alert("delete")
	var method = document.getElementById("btn-save").getAttribute("method");
	alert(method);
	if(method==="put"){
		var usr_fullpath = usr_path + usrid;
		alert(usr_fullpath);

		ajaxSend(usr_fullpath, "delete", "", "app-candidate", null, function(d){
			alert("delete success")
			window.location.href = "./candidate.html"
		});
	}
	else{
		alert("There is no user profile to delete!")
	}
});

$('#btn-close').click(function(){
  window.location.href = "./candidate.html";
});