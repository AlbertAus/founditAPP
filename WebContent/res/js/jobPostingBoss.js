var heading = new Array();
	heading[0] = "jobID"
    heading[1] = "cmpID"
    heading[2] = "name"
    heading[3] = "salaryRate"
    heading[4] = "posType" 
    heading[5] = "location"
    heading[6] = "status" 
    heading[7] = "link"
    heading[8] = "jobDsp"

var mockExecDAG = new Array();


//var executionTag = "";

window.onload=function(){
	//var cmpID  = getCookie("cmpID");
	var cmpID  = "ABC";
	var url = "http://localhost:8080/FoundITService/jobPosting/search?1=1";
	if (cmpID) url =url + "&cmpID="+cmpID;
	
    clear("task-table");
  
    //addTable("task-table", heading, mockExecDAG)
    ajaxSend(url, "get", "", "admin", null, function (d){
    	//	alert(d)
    
    	addTableWithButton("task-table", heading, presentData(d))
    	
    });
    
}


$('#postJob-btn').click(function(){

	 window.location.href="./job-profile.html";
});

function presentData(arr) {
	var tableArr = new Array();
	
	for (var i =0; i< arr.length ; i++ ){
		var d = arr[i];
		var link = "";
		if(d.links) link = d.links[0].href;

		tableArr[i] = new Array(d.jobID, d.cmpID, d.name, d.salaryRate, d.posType,d.location, d.status, link,d.jobDsp);
	}    
	return tableArr;
}

    function addTableWithButton(tableId, headings, table_data, baseUrl) {

        var table = document.getElementById(tableId)

        //Create TABLE headings
        var tableHead = document.createElement('thead')
        table.appendChild(tableHead);
        var tr = document.createElement('TR');
        tableHead.appendChild(tr);
        for (i = 0; i < headings.length; i++) {
            var th = document.createElement('TH')
    //      th.width = '75';
            th.appendChild(document.createTextNode(headings[i]));
            tr.appendChild(th);

        }
        //create operation heading
        var oth = document.createElement('TH')
        oth.appendChild(document.createTextNode("Operations"));
        tr.appendChild(oth);

        //TABLE Body
        var tableBody = document.createElement('tbody')
        table.appendChild(tableBody);

        for (i = 0; i < table_data.length; i++) {
            var tr = document.createElement('tr');
            tableBody.appendChild(tr);
            for (j = 0; j < table_data[i].length; j++) {
                var td = document.createElement('td')
                td.appendChild(document.createTextNode(table_data[i][j]));
                tr.appendChild(td)
            }
            //add buttons/operations in each row
            var btd = document.createElement('td');
            
            var submit =  document.createElement('button');
            submit.appendChild(document.createTextNode("View Profile"));
            submit.setAttribute('type', 'button');
            submit.setAttribute('class', 'btn btn-info');
            submit.setAttribute('onclick', 'onView("' + table_data[i] + '");' );




            var del =  document.createElement('button');
            del.setAttribute('class', 'btn btn-danger');
            del.appendChild(document.createTextNode("Delete"));
            del.setAttribute('onclick', 'onDel("' + table_data[i] + '");' );
            
            var apply =  document.createElement('button');
            apply.appendChild(document.createTextNode("View application"));
            apply.setAttribute('type', 'button');
            apply.setAttribute('class', 'btn btn-primary');
            apply.setAttribute('onclick', 'onApply("' + table_data[i] + '");' );

            btd.appendChild(submit);
            btd.appendChild(apply);
            btd.appendChild(del);
            tr.appendChild(btd)
        }
    }

function onView(d){

  var res = d.split(",");
 window.location.href="./job-profile.html"
	 document.cookie = "jobID=" + res[0];
}
function onApply(d){
	alert("111111111111");
	var res = d.split(",");
	
	 window.location.href="./application.html";
	 document.cookie = "cmpID=" + res[1];
	 document.cookie = "lastPage=" + "jobPostingBoss";
	 //document.cookie = "cmpID=" + res[1];
	 //document.cookie = "name=" + res[2];
	 
}


function onUpdate(d) {
	
  alert(d[0])
  window.location.href = "http://google.com.au/?gws_rd=" + d[1];
}

function onDel(d){
	var res = d.split(",");
	
	var url = "http://localhost:8080/FoundITService/jobPosting/"+res[0];

    clear("task-table");
  
    //addTable("task-table", heading, mockExecDAG)
    ajaxSend(url, "delete", "", "admin", null, function (d){
    	if(d) alert("Submit Success!!!!!!!!!");
    	 clear("task-table");
    window.location.href = "./jobPostingBoss.html";
   
});
	}