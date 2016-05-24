package foundITBean;

import java.util.Date;

public class User {
	private int userid;
	private int  profileID;
	private String email;
	private String password;
	private String userType;
	public User(){
	}
	
	public User(int userid, 
			int  profileID, 
			String email,
			String password,
			String userType			
			){
		this.userid = userid ;
		this.profileID = profileID ;
		this.email = email ;
		this.password = password ;
		this.userType = userType ;
	}
//Define setter methods
	public void setUserid(int userid){
		this.userid = userid ;
	}
	public void setProfileID(int profileID){
		this.profileID =profileID;
	}
	public void setEmail(String email){
		this.email = email ;
	}
	public void setPassword(String password){
		this.password = password ;
	}
	public void setUserType(String userType){
		this.userType = userType ;
	}
	
	//Defined getter methods
	public int getUserid(){
		return this.userid ;
	}
	public int getProfileID(){
		return this.profileID ;
	}
	public String getEmail(){
		return this.email ;
	}
	public String getPassword(){
		return this.password ;
	}
	public String getUserType(){
		return this.userType ;
	}
}
