<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">
    
    <title>User Login</title>


    <!-- Bootstrap core CSS -->
    <link href="/res/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/res/css/signin.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="/res/js/jquery-1.11.3.min.js"></script>
    <script src="/res/js/common-utils.js"></script>
    <script src="/res/js/quick-table.js"></script>
    <script src="/res/js/mock-data.js"></script>
</head>
<%
String logout=request.getParameter("flag");
if(logout !=null && logout.equals("logout")){
	session.setAttribute("flag",false);
	session.setAttribute("profileid",0);
	out.println("<h1>Logout successful!</h1>");
	response.setHeader("refresh","1;URL=login.jsp");	
}
Boolean flag=(Boolean) session.getAttribute("flag");
Integer profileid = (Integer) session.getAttribute("profileid");
%>
<script>
	function validate(f){
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
</script>



<body>
   <div class="container">

      <form action="../../AdminLoginServlet" method="post" onSubmit="return validate(this)" id="log-in-form" class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Username or Email address</label>
        <input name="email" type="text" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input name="userpass" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <button id="log-in-btn" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
		<input type="hidden" name="flag" value="false">
		<input type="hidden" name="usertype" value="1">
      </form>

    </div> <!-- /container -->

    <script src="/res/js/login.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="/res/js/bootstrap.min.js"></script>
    
    

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
			request.getAttribute("profileid");
			out.println("The profileID IS: " + profileid.toString() + "Redirecting after 3 seconds,if not redirect please click here: <h2><a href='index.jsp'>UserList</a><h2>");
			out.println("<h1>The profileID IS: " + profileid.toString() +"</h1>");
			response.setHeader("refresh","3;URL=/res/html/index.jsp");
		}

		/*
		else{
			session.setAttribute("flag", false);
			response.setHeader("refresh","3URL=login.jsp");
		}	
		*/	
		
%>

</body>
</html>
