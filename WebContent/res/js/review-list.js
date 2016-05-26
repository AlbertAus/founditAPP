var heading = new Array();
    heading[0] = "Reviewer ID"
    heading[1] = "Application ID"
    heading[2] = "User ID"
    heading[3] = "Comment"   
    heading[4] = "Status"   
    	

//TODO: need to get the cookie from login page 
document.cookie = "usrid=1";	
var usrid = getCookie('usrid');
var revid;
var appid;

var rev_path = "http://localhost:8080/FoundITService/review";

var get_link = rev_path + "/getReviewer?" + "userID=" + usrid;


ajaxSend(get_link, "get", "", "app-reviewer", null, function(d){
        addReviewTable("review-table", heading, d, "#")
        }, function(){
     	   alert("get review error!");
        });

function addReviewTable(tableId, headings, table_data, baseUrl) {

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
    oth.appendChild(document.createTextNode("Operation"));
    tr.appendChild(oth);

    //TABLE Body
    var tableBody = document.createElement('tbody')
    table.appendChild(tableBody);

    for (i = 0; i < table_data.length; i++) {
        var tr = document.createElement('tr');
        tableBody.appendChild(tr);

        var td = document.createElement('td')
        td.appendChild(document.createTextNode(table_data[i].revID));
        tr.appendChild(td);
        
        var td = document.createElement('td')
        td.appendChild(document.createTextNode(table_data[i].appID));
        tr.appendChild(td);      
 
        var td = document.createElement('td')
        td.appendChild(document.createTextNode(table_data[i].userID));
        tr.appendChild(td);             
      
        var td = document.createElement('td')
        td.appendChild(document.createTextNode(table_data[i].comment));
        tr.appendChild(td);             

        var td = document.createElement('td')
        if (table_data[i].reStatus === '0'){
        	td.appendChild(document.createTextNode('Open'));
        }
        else if (table_data[i].reStatus === '1'){
        	td.appendChild(document.createTextNode('Shortlisted'));
        } 
        else if (table_data[i].reStatus === '2'){
        	td.appendChild(document.createTextNode('Rejected'));
        } 
        	        
        tr.appendChild(td);            
        
        //add buttons/operations in each row
        var btd = document.createElement('td');
        
        var urid = table_data[i].userID;
        var rid = table_data[i].revID;
        var aid = table_data[i].appID;
        	
        var set =  document.createElement('button');
        set.setAttribute('class', 'btn btn-primary');
        set.setAttribute('id', urid);
        set.setAttribute('onclick', 'onUpdate("' + urid + '","' + rid + '","' + aid + '");' );
        set.appendChild(document.createTextNode("Update"));
        
        btd.appendChild(set);
        tr.appendChild(btd)
    }
}

function onUpdate(uid, rid, aid){

	if (uid != usrid){
		alert("You cannot review!");
		return false;
	}
	
	revid = rid;
	appid = aid;

	document.getElementById("btn-save").setAttribute('method', 'put');
		
	var fullpath = rev_path + "/get?revID=" + revid;
	ajaxSend(fullpath, "get", "", "app-reviewer", null, function(d){
	    document.getElementById("rev_1").value = d.comment;
		document.getElementById("rev_2").value = d.reStatus;    
    });
	
}

$('#btn-save').click(function(){
	
	var method = document.getElementById("btn-save").getAttribute("method");
	if (method === "post"){
		alert("Select a review to update first.");
		return false;
	}
	
	var rev_fullpath = rev_path + "/update?revID=" + revid;
	
	var data = {"revID":revid,
				"appID":appid,
			    "userID":usrid,
			    "comment":document.getElementById("rev_1").value,
			    "reStatus":document.getElementById("rev_2").value,
			    "magStatus":""}
	
	ajaxSend(rev_fullpath, "put", data, "app-reviewer", null, function(d){
		alert("save success");
		location.reload();
    });
});

