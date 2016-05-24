<%@ page language="java"  import="java.util.*" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="org.w3c.dom.*"%>
<%@ page import="java.io.IOException"%>
<%@ page import="org.w3c.dom.*"%>
<%@ page import="org.xml.sax.SAXException"%>
<%@ page import="javax.xml.parsers.*"%>
<%@ page import="javax.xml.xpath.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head> 
    <title>FoundITAPP Index</title>
	
	<script>
		function validate() 
	    {
	    	if (document.form_search.search_info.value=="")
	    	{
	    		alert("Please enter search content.");
	    		document.form_search.search_info.focus();
	    	return false ;
	    	}
	    	return true;
	    }
	</script>
  </head>
 
 <body>
 <center>
 
The profileID IS: 
<%
HttpSession Session = request.getSession();
String profileID = (String) session.getAttribute("profileid");
%>
<h1>The profileID IS: <%=profileID%></h1>
 	
 	<table  border="1" width="80%">
 	
 		<tr>
 			<td colspan="2"><h2>Please enter the content you want to search</h2></td>
 		</tr>
 		<tr>
 			<td  align="center">
 			 <form action="search.jsp?pagenum=1" method="post" name="form_search" onsubmit="return validate()">
 				<input type="text" name="search_info" value="" size="60">
 				<select name="search_type">
					<option value="author">author</option>
					<option value="title">title</option>
					<option value="pages">pages</option>
					<option value="year">year</option>
					<option value="volume">volume</option>
					<option value="journal">journal</option>
					<option value="number">number</option>
					<option value="url">url</option>
					<option value="ee">ee</option>
					<option value="address">address</option>
				</select>
			<input type="submit" value="Search">
			<a href="advance.jsp?search_type=null&search_info=null&pagenum=1">Advance Search</a>
			 </form>
			   <a href="cart.jsp">View Shopping Cart</a>
 			</td>
 		</tr>
 		 
 
 	</table>


 
 
 <table border="1" width="80%">
 <tr>
 <td>
 <h2><font color="blue">Computer Science Bibliography</font></h2>
 </td>
 </tr>
 
 <tr>
 <td align="left">
 
<ol>
 <%  
/*    Document doc = domparser.getDocument(request.getRealPath("/") + "dblp.xml");
    //domparser.traverseTree(doc);
    out.print(domparser.getString());
*/
 %>
 </ol>
 </td>
 </tr>
 </table>
  </center>
  
  <!-- 
 <table border="1" width="80%">
 <tr>
 <td>Author</td>
 <td>Title</td>
 <td>Pages</td>
 <td>Year</td>
 <td>Volume</td>
 <td>Journal</td>
 <td>Number</td>
 <td>Url</td>
 <td>Ee</td>
 <td>Address</td>
 </tr> 
 </table> 
-->
 </body>
 </html> 
 

