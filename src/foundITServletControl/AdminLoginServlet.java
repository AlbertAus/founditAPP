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
		//req.setAttribute("flag", flag);
		req.getSession().setAttribute("flag", flag);
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
					req.getSession().setAttribute("profileid", user.getProfileID());
				} else {
					info.add("Fail!Wrong email or password.") ;
					flag=false;
					req.getSession().setAttribute("flag", flag);
				}
			}catch(Exception e){
				e.printStackTrace() ;
			}
		}
		req.setAttribute("info",info) ;
		req.getRequestDispatcher(path).forward(req,resp) ;
	}
	public void doPost(HttpServletRequest req,HttpServletResponse resp) throws ServletException,IOException{
		this.doGet(req,resp) ;
	}


}