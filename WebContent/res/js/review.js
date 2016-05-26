var heading = new Array();
    heading[0] = "Reviewer ID"
    heading[1] = "Reviewer Name"
    heading[2] = "Skills"

//TODO: need to get the cookie from login page 
document.cookie = "employer_cmpid=1";	
    
//TODO: need to get the cookie from application page 
document.cookie = "applicationID=2";	

var hir_path = "http://localhost:8080/FoundITService/hiringTeam";
var cmpid = getCookie('employer_cmpid');

var get_link = hir_path + "/get?" + "cmpID=" + cmpid;

ajaxSend(get_link, "get", "", "app-manager", null, function(d){
        addHiringTeamTable("hiring-table", heading, d, "#")
        }, function(){
     	   alert("no response..");
        });

function addHiringTeamTable(tableId, headings, table_data, baseUrl) {

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

    document.cookie = "reviewlink_post=" + table_data[0].links[0].href;
    document.cookie = "reviewlink_getApp=" + table_data[0].links[1].href;
 
    for (i = 0; i < table_data.length; i++) {
        var tr = document.createElement('tr');
        tableBody.appendChild(tr);

        var td = document.createElement('td')
        td.appendChild(document.createTextNode(table_data[i].userID));
        tr.appendChild(td);
        
        var td = document.createElement('td')
        td.appendChild(document.createTextNode(table_data[i].name));
        tr.appendChild(td);      
 
        var td = document.createElement('td')
        td.appendChild(document.createTextNode(table_data[i].skills));
        tr.appendChild(td);             
      
        //add buttons/operations in each row
        var btd = document.createElement('td');
        
        var urid = table_data[i].userID;
        	
        var set =  document.createElement('button');
        set.setAttribute('class', 'btn btn-primary');
        set.setAttribute('id', urid);
        set.setAttribute('onclick', 'onReviewSet("' + urid + '");' );
        set.appendChild(document.createTextNode("Set Reviewer"));
        
        btd.appendChild(set);
        tr.appendChild(btd)
    }
}

var curCount = 0;

//check current assigned reviewer of the application

var link = getCookie('reviewlink_getApp');
var review_fullpath = link + "?appID=2";
alert(review_fullpath);

ajaxSend(review_fullpath, "get", "", "app-manager", null, function(d){
checkcurCount(d)
});

function checkcurCount(data){
	curCount = data.length;
	//TODO: disable
   for (i = 0; i < curCount; i++) {
        document.getElementById(data[i].userID).disabled = true;
   }
}

function onReviewSet(uid){
		
	document.cookie = "reviewerID=" + uid;
	
	var appID = getCookie('applicationID');
	var review_fullpath = getCookie('reviewlink_post');
	
	alert(review_fullpath);
	alert(uid);
	
	var data = {"appID":appID,
		        "userID":uid,
		        "comment":"",
		        "reStatus":"0",
		        "magStatus":"",
		        }
	
	//TODO: need to show the error message from server
	if(curCount < 2){
		ajaxSend(review_fullpath, "post", data, "app-manager", null, function(d){
			alert("set success")
			//TODO: check set button disabled
			document.getElementById(uid).disabled = true;
			curCount += 1;
		}, function(){
     	   alert("Cannot set reviwer! Check the auto-check staus of the applicant.");
        });	
	}
	else{
		alert("Each application can have at most two reviwers.")
	}
}

