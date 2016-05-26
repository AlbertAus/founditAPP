
//var curCmpID = getCookie("cmpID");
var curUserID = "1234";
var curAppId = getCookie("appId");
var curJobId = getCookie("jobID");
var curLink = getCookie("link");
var curRel = getCookie("rel");
var lastpage = getCookie("lastPage");

var curStatus = getCookie("autoStatus");
if(curLink != null && curRel != null&& lastpage== "application"  ){
	window.onload=function(){
		alert(curLink);
		alert("start load,"+curLink+","+curRel+","+curJobId);
		ajaxSend(curLink, curRel, {"jobID":curJobId,"userID":curUserID},"app-candidate", null, function (d){	
			document.getElementById("exampleTextarea").value = d[0].cvLetter;
			
		});
	}
	}


		
$('#btn-submit').click(function(){
	var curCv = document.getElementById("exampleTextarea").value;
	
	var lastpage = getCookie("lastPage");

	if (lastpage == "application"){
		alert(curAppId);
		var url = "http://localhost:8080/FoundITService/application/"+curAppId;
	    clear("task-table");
	    //addTable("task-table", heading, mockExecDAG)
	    
	    ajaxSend(url, "put", {
	    		"cvLetter":curCv,
	    		"autoStatus":"0"
	    		},  "app-candidate",null, function (d){
	    	if(d) alert("Submit Success!!!!!!!!!");
	});
		
	}
	if (lastpage == "jobPosting"){
		alert("post");
		var url = "http://localhost:8080/FoundITService/application/new";
		
	    clear("task-table");
	  
	    //addTable("task-table", heading, mockExecDAG)
	    ajaxSend(url, "post", {"jobID":curJobId,"userID":curUserID,"cvLetter":curCv},"app-candidate",  null, function (d){
	    	if(d) alert("Submit Success!!!!!!!!!");
	    
	   
	});
	}
  
});
$('#btn-close').click(function(){

		var url = "http://localhost:8080/FoundITService/application/"+curJobId;
		alert(curJobId);
	    clear("task-table");
	  
	    //addTable("task-table", heading, mockExecDAG)
	    ajaxSend(url, "delete", "", "app-candidate", null, function (d){
	    	if(d) alert("Submit Success!!!!!!!!!");
	    window.location.href = "./application.html";
	   
	});
});
$('#btn-back').click(function(){

	
    window.location.href = "./application.html";

});