var curJobId = getCookie("jobId");
alert(curJobId);
$('#btn-submit').click(function(){
	alert("pappafds");
		var url = "http://localhost:8080/FoundITService/jobPosting/";
		
	    clear("task-table");
	  
	    //addTable("task-table", heading, mockExecDAG)
	    ajaxSend(url, "post", {"jobID":curJobId}, "admin", null, function (d){
	    	//	alert(d)
	    
	    	addTableWithButton("task-table", heading, presentData(d))
	   
	});
  
});
$('#btn-close').click(function(){
  window.location.href = "./employer.html";
});