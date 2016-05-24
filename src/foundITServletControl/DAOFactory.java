package foundITServletControl;

import foundITServletControl.IUserDAO;
import foundITServletControl.UserDAOProxy;


public class DAOFactory {
	public static IUserDAO getIUserDAOInstance(){
		return new UserDAOProxy() ;
	}

}