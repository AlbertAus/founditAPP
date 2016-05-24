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


var executionTag = "";

//    $('#ajax-btn').click(function(){
//        clear("task-table");
//        addTableWithButton("task-table", heading, mockExecDAG, "#")
////        ajaxSend("/service/execDAG/?executionTag=" + executionTag, "get", executionTag, "admin", null, function(d){
////            addTableWithButton("task-table", heading, mockExecDAG)
////        });
//    });

$('#ajax-btn').click(function(){

	var cmpName = document.getElementById("name").value;
	var cmpLoc = document.getElementById("location").value;
	var cmpType =  document.getElementById("posType").value;
	var cmpSalary =  document.getElementById("salaryRate").value;
	var cmpJobDsp =  document.getElementById("jobDsp").value;
	var url = "http://localhost:8080/FoundITService/jobPosting/search?1=1";
	if (cmpName) url =url + "&name="+cmpName;
	if (cmpLoc) url = url + "&location=" +cmpLoc;
	if (cmpType) url =url + "&posType="+cmpType;
	if (cmpSalary) url =url + "&cmpSalary="+cmpSalary;
	if (cmpJobDsp) url = url + "&jobDsp=" +cmpJobDsp;
    clear("task-table");
  
    //addTable("task-table", heading, mockExecDAG)
    ajaxSend(url, "get", "", "admin", null, function (d){
    	//	alert(d)
    
    	addTableWithButton("task-table", heading, presentData(d))
    	
    });
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

            var apply =  document.createElement('button');
            apply.appendChild(document.createTextNode("APPLY IT"));
            apply.setAttribute('class', 'btn btn-primary');
            apply.setAttribute('onclick', 'onApply("' + table_data[i] + '");' );


//            var del =  document.createElement('button');
//            del.setAttribute('class', 'btn btn-danger');
//            del.appendChild(document.createTextNode("Delete"));

            btd.appendChild(submit);
            btd.appendChild(apply);
          //  btd.appendChild(del);
            tr.appendChild(btd)
        }
    }

function onView(d){
 alert(d[0])
 window.location.href="./job-profile.html"
	 document.cookie = "jobID=" + res[0];
}
function onApply(d){
	var res = d.split(",");
	
	document.cookie = "link=" +res[7];
	
	 document.cookie = "jobID=" + res[0];
	 //document.cookie = "cmpID=" + res[1];
	 //document.cookie = "name=" + res[2];
	 document.cookie = "lastPage=" + "jobPosting";
  
	 window.location.href="./application-profile.html";
}


function onUpdate(d) {
  alert(d[0])
  window.location.href = "http://google.com.au/?gws_rd=" + d[1];


}