var curCmpID = getCookie("cmpID");
var lastpage = getCookie("lastPage");
var heading = new Array();
	heading[0] = "appID"
    heading[1] = "cvLetter"
    heading[2] = "autoStatus"
    heading[3] = "jobID"
    heading[4] = "link" 
    heading[5] = "rel" 
var mockExecDAG = new Array();
var executionTag = "";


	alert("from jobposting");
	window.onload=function(){
	var url = "http://localhost:8080/FoundITService/application/search?cmpID="+curCmpID;
	alert(curCmpID);
    clear("task-table");
  
    //addTable("task-table", heading, mockExecDAG)
    ajaxSend(url, "get", "", "app-manager", null, function (d){
    	addTableWithButton("task-table", heading, presentData(d))
    	},function(){
	   alert("no response..");});}


function presentData(arr) {
	var tableArr = new Array();
	
	for (var i =0; i< arr.length ; i++ ){
		var d = arr[i];
		var link = "";
		var rel = "";
		if(d.links){
			link = d.links[0].href;
			rel = d.links[0].rel;
		}
		

		tableArr[i] = new Array(d.appId,d.cvLetter,d.autoStatus,d.jobID, link,rel);

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
            submit.setAttribute('onclick', 'onView("' + table_data[i]+ '");' );

        

            
            var shortList =  document.createElement('button');
            shortList.setAttribute('class', 'btn btn-info');
            shortList.appendChild(document.createTextNode("ShortListed"));
            shortList.setAttribute('onclick', 'onShort("' + table_data[i]+ '");' );
            btd.appendChild(submit);
           
            btd.appendChild(shortList);
            tr.appendChild(btd)
        }
    }

function onView(d){

 var res = d.split(",");
var myPage = "application";
 document.cookie = "link=" +res[4];
 document.cookie = "rel=" +res[5];
 document.cookie = "appId=" +res[0];
 document.cookie = "jobID=" +res[3];
 document.cookie = "autoStatus=" +res[2];
 
 document.cookie =  "lastPage=" +myPage;
 
 alert(res[4]+res[5]+res[3]+myPage);
 window.location.href="./application-profile.html"
}



function onShort(d) {
	var res = d.split(",");
	var url = "http://localhost:8080/FoundITService/Review/Application/" + res[0];
	
	ajaxSend(url, "get", {
		"autoStatus" : "1"
	},"app-manager",  null, function(d){
		alert(d.length);
		var sucCount = 0;
		for(var i=0; i<d.length; i++ ){
			if(d[i].revStatus == "1"){
				sucCount += 1;
			}
		}
		alert(sucCount);
		if(sucCount >= 2) {
			updateState();
		}
		
	},function(){
		   alert("no response..");});

    function updateState(){
    	var url = "http://localhost:8080/FoundITService/application/" + res[0];
    	clear("task-table");
    	// addTable("task-table", heading, mockExecDAG)
    	ajaxSend(url, "put", {
    		"autoStatus" : "1"
    	}, "admin", null, function(d) {
    		window.location.reload(true);
    	}, function(){
    		window.location.reload(false);
    	});
    }

}
