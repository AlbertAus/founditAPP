
//TODO: need to get the cookie from login page 
document.cookie = "employer_cmpid=3";	
document.cookie = "employer_cmplink=" + "http://localhost:8080/FoundITService/companyProfile";
 
var cmpid = getCookie('employer_cmpid');
var companylink = getCookie('employer_cmplink');

var cmp_path = companylink + "/get?" + "cmpID=" + cmpid;

alert(cmp_path);

ajaxSend(cmp_path, "get", "", "app-manager", null, function(d){
           fillCompanyInfo(d)
       }, function(){
    	   alert("no response..");
    	   document.getElementById("btn-save").setAttribute('method', 'post');
       });

function fillCompanyInfo(data) {

	document.getElementById("cmp_1").value = data.name;
	document.getElementById("cmp_2").value = data.email;
	document.getElementById("cmp_3").value = data.addr;
	document.getElementById("cmp_4").value = data.telNum;
	document.getElementById("cmp_5").value = data.indType;
	document.getElementById("cmp_6").value = data.website;
	document.getElementById("cmp_7").value = data.cmpDsp;
	
}

$('#btn-save').click(function(){
	var method = document.getElementById("btn-save").getAttribute("method");
	if(method==="put"){
		var cmp_fullpath = companylink + "/update?cmpID=" + cmpid;
	}
	else{
		var cmp_fullpath = companylink; 
	}
	
	var data = {"name":document.getElementById("cmp_1").value,
			    "email":document.getElementById("cmp_2").value,
			    "addr":document.getElementById("cmp_3").value,
			    "telNum":document.getElementById("cmp_4").value,
			    "indType":document.getElementById("cmp_5").value,
			    "webSite":document.getElementById("cmp_6").value,
			    "cmpDsp":document.getElementById("cmp_7").value}
    
	ajaxSend(cmp_fullpath, method, data, "app-manager", null, function(d){
		alert("save success")
		document.getElementById("btn-save").setAttribute('method', 'put');
		//window.location.href = "./employer.html"
    });
});

$('#btn-delete').click(function(){
	alert("delete")
	var method = document.getElementById("btn-save").getAttribute("method");
	if(method==="put"){
		var cmp_fullpath = companylink + "/delete?cmpID=" + cmpid;
		alert(cmp_fullpath);
		
		ajaxSend(cmp_fullpath, "delete", "", "app-manager", null, function(d){
			alert("delete success");
			//TODO: check error! although delete is succeed, there is a error and no change the page
			window.location.href = "./employer.html";
		});
	}
	else{
		alert("There is no company profile to delete!")
	}
});

$('#btn-close').click(function(){
  window.location.href = "./employer.html";
});