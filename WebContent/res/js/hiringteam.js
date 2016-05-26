var heading = new Array();
    heading[0] = "Reviewer ID"
    heading[1] = "Reviewer Name"
    heading[2] = "Skills"

//TODO: need to get the cookie from login page 
document.cookie = "employer_cmpid=1";	

var hir_path = "http://localhost:8080/FoundITService/hiringTeam";
var cmpid = getCookie('employer_cmpid');
var slected_reviewerid;

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
        
        var update =  document.createElement('button');
        update.setAttribute('class', 'btn btn-primary');
        update.setAttribute('id', 'update-btn');
        update.setAttribute('onclick', 'onUpdate("' + table_data[i].userID + '");' );
        update.appendChild(document.createTextNode("Update"));
        
        var btd = document.createElement('td');
        var del =  document.createElement('button');
        del.setAttribute('class', 'btn btn-danger');
        del.setAttribute('id', 'delete-btn');
        del.setAttribute('onclick', 'onDelete("' + table_data[i].userID + '","'+ table_data[i].cmpID + '");' );
        del.appendChild(document.createTextNode("Delete"));

        btd.appendChild(update);
        btd.appendChild(del);
        tr.appendChild(btd)
    }
}


function onUpdate(uid){
	
	selected_reviewerid = uid;
	document.getElementById("btn-save").setAttribute('method', 'put');
	
	var get_path = hir_path + "/getMember?cmpID=" + cmpid + "&userID=" + selected_reviewerid;
	ajaxSend(get_path, "get", "", "app-manager", null, function(d){
		document.getElementById("hir_1").value = d.userID;
		document.getElementById("hir_2").value = d.name;
		document.getElementById("hir_3").value = d.password;
		document.getElementById("hir_4").value = d.skills;
	});	
}

function onDelete(uid, id){

	var del_link = hir_path + "/delMember?" + "cmpID=" + id + "&userID=" + uid;
	
	alert(del_link)
	
	ajaxSend(del_link, "delete", "", "app-manager", null, function(d){
			alert("delete success")
			window.location.reload(true)
		}, function(){
			alert("delete failed.")
			window.location.reload(false)
			});
}

$('#btn-save').click(function(){

	var method = document.getElementById("btn-save").getAttribute("method");

	var liList = document.getElementById("hiring-table").getElementsByTagName("tr");
	if (method==="post" && liList.length === 6){
		alert("Hiring Team can have at most five members!");
		return false;
	}

	if(method==="put"){
		var hir_fullpath = hir_path + "/updateMember?cmpID=" + cmpid + "&userID=" + slected_reviewerid;
		var data = {"new_userID":document.getElementById("hir_1").value,
					"name":document.getElementById("hir_2").value,
			    	"password":document.getElementById("hir_3").value,
			    	"skills":document.getElementById("hir_4").value,
			    	"cmpID":cmpid}
	}
	else{
		var hir_fullpath = hir_path; 
		var data = {"userID":document.getElementById("hir_1").value,
					"name":document.getElementById("hir_2").value,
					"password":document.getElementById("hir_3").value,
					"skills":document.getElementById("hir_4").value,
					"cmpID":cmpid}
	}
	    
	ajaxSend(hir_fullpath, method, data, "app-manager", null, function(d){
		alert("save success")
		location.reload();
		document.getElementById("btn-save").setAttribute('method', 'put');
    });
});