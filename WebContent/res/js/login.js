

$('#log-in-btn').click(function(){
   var d = $('form').serializeArray();
   var username = d[0].value;
   var password = d[1].value;
   document.cookie = "username=" + username + "; password=" + password;
   alert(getCookie('username'));
//    document.getElementById("log-in-form").submit();
   if(username == 'sunny@nicta.au'){
    window.location.href = "/res/html/employer.html";
   } else {
    window.location.href = "/res/html/candidate.html";
   };
});