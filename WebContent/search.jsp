<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<html>
<head><title>User Login</title></head>
<%
String logout=request.getParameter("flag");
if(logout !=null && logout.equals("logout")){
	session.setAttribute("flag",false);
	out.println("<h1>Logout successful!</h1>");
	response.setHeader("refresh","1;URL=/res/index.html");	
}
Boolean flag=(Boolean) session.getAttribute("flag");
%>
<script>

function validate(f){
	/*
	if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(f.email.value))){
			alert("Wrong Email address or Email should more than 3 letters.") ;
			f.userid.focus() ;
			return false ;
		}
		if(!(/^\w{3,15}$/.test(f.userpass.value))){
			alert("Password should between 3~15.") ;
			f.userpass.focus() ;
			return false ;
		}
	}
	*/
	return true;
</script>

<style>
.div-center{position:absolute;top:30%;left:40%;margin-top:-50px;width:300px;height:130px;border:1px solid #000}
</style>

<body>
<div class="div-center">
<form action="http://localhost:8080/FoundITService/jobPosting/search" method="get" onSubmit="return validate(this)">
	<br>
	&nbsp;Search: <input type="text" name="jobDsp" size="30"><p>

			<input type="submit" value="Login">
			<input type="reset" value="Reset">

</form>
</div>


<div>
<form action="http://localhost:8080/FoundITService/CompanyProfile" method="post" onSubmit="return validate(this)">
	<br>
	&nbsp;name: <input type="text" name="name" size="30"><p>
	&nbsp;email: <input type="text" name="email" size="30"><p>
				<input type="hidden" name="SecurityKey" value="i-am-foundit"><p>
				<input type="hidden" name="ShortKey" value="app-manager"><p>
			<input type="submit" value="Login">
			<input type="reset" value="Reset">

</form>
<%
	List<String> info = (List<String>) request.getAttribute("info") ;
	if(info != null){	// have return info
		Iterator<String> iter = info.iterator() ;
		while(iter.hasNext()){
%>
			<h4><%=iter.next()%></h4>
<%
		}	
	}
		if(flag !=null && flag.equals(true)){
			out.println("Redirecting after 3 seconds,if not redirect please click here: <h2><a href='index.jsp'>UserList</a><h2>");
			response.setHeader("refresh","3;URL=index.jsp");
		}
		
		/*
		else{
			session.setAttribute("flag", false);
			response.setHeader("refresh","3URL=login.jsp");
		}	
		*/	
		
%>
</div>

</body>
</html>
