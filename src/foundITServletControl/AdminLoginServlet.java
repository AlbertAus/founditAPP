package foundITServletControl;

import java.io.* ;
import java.util.* ;

import javax.servlet.* ;
import javax.servlet.http.* ;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpSession;

import foundITBean.*;
import foundITServletControl.DAOFactory;


public class AdminLoginServlet extends HttpServlet {
	public void doGet(HttpServletRequest req,HttpServletResponse resp) throws ServletException,IOException{
		String path = "login.jsp" ;
		Boolean flag=false; 	//Define whether login is successful.
		int profileid=0;
		//req.setAttribute("flag", flag);
		req.getSession().setAttribute("flag", flag);
		req.getSession().setAttribute("profileid", profileid);
		//System.out.println(req.toString());
		String email = req.getParameter("email") ;
		String userpass = req.getParameter("userpass") ;
		String usertype=req.getParameter("usertype");
		List<String> info = new ArrayList<String>() ;	//get error
		//System.out.println(username);
		if(email==null || "".equals(email)){
			info.add("Email can not be empty!") ;
		}
		if(userpass==null || "".equals(userpass)){
			info.add("Password can not be empty!") ;
		}
		if(info.size()==0){	// If nothing in the info.
			//User user = new User(0, username, null, null, null, null, null, null, null, userpass, null, null) ;
			User user = new User();
			user.setEmail(email);
			user.setPassword(userpass) ;
			user.setUserType(usertype);
			try{
				if(DAOFactory.getIUserDAOInstance().findLogin(user)){
					info.add("Welcome:" + user.getEmail() + " Login!,Now change to index page.") ;
					flag=true;
					//req.setAttribute("flag", flag);
					req.getSession().setAttribute("flag", flag);
					profileid=user.getProfileID();
					System.out.print("Profileid is: " + profileid + "\r\n");
					req.getSession().setAttribute("profileid",profileid);
				} else {
					info.add("Fail!Wrong email or password.") ;
					flag=false;
					req.getSession().setAttribute("flag", flag);
					req.getSession().setAttribute("profileid",profileid);
				}
			}catch(Exception e){
				e.printStackTrace() ;
			}
		}
		req.setAttribute("info",info) ;
		req.setAttribute("profileid",profileid);
		req.getRequestDispatcher(path).forward(req,resp) ;
	}
	public void doPost(HttpServletRequest req,HttpServletResponse resp) throws ServletException,IOException{
		this.doGet(req,resp) ;
	}


}