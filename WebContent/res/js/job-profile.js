
var jobid = getCookie('jobid');
var cmpid = getCookie('cmpid');
var companylink = getCookie('cmplink');
var jobpostinglink = getCookie('joblink');

alert(companylink);

var cmp_path = companylink + "?" + "cmpID=" + cmpid;
var job_path = jobpostinglink + "?" + "jobID=" + jobid + "&" + "cmpID=" + cmpid;

ajaxSend(cmp_path, "get", "", "app-manager", null, function(d){
           fillCompanyInfo(d)
       });

alert(job_path)
ajaxSend(job_path, "get", "", "app-candidate", null, function(d){
    fillJobPostinginfo(d[0]);
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

function fillJobPostinginfo(data) {

	alert(data);
	
	document.getElementById("job_1").value = data.name;
	document.getElementById("job_2").value = data.salaryRate;
	document.getElementById("job_3").value = data.posType;
	document.getElementById("job_4").value = data.location;
	document.getElementById("job_5").value = data.jobDsp;
	
}

$('#btn-apply').click(function(){
	  window.location.href = "./application-profile.html";
	});

$('#btn-close').click(function(){
  window.location.href = "./candidate.html";
});