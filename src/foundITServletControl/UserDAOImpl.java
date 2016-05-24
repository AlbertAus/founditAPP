package foundITServletControl;

import java.sql.* ;
import java.util.ArrayList;
import java.util.List;


import foundITBean.User;
import foundITDBConnection.*;
import foundITServletControl.IUserDAO;
public class UserDAOImpl implements IUserDAO {
	private Connection conn = null ;
	private PreparedStatement pstmt = null ;
	public UserDAOImpl(Connection conn){
		this.conn = conn ;
	}
	public String dbAddr ="jdbc:sqlite:" + "F:/Java/cs9322_Prac/workspace/FoundITAPP/WebContent/" + "foundITAPP.db";
	public boolean findLogin(User user) throws Exception{

		boolean flag = false ;
		String sql = "SELECT email,password,usertype,profileID FROM tb_Account WHERE email=? AND password=? AND usertype=?" ;
		this.pstmt = this.conn.prepareStatement(sql) ;
		this.pstmt.setString(1,user.getEmail()) ;
		this.pstmt.setString(2,user.getPassword()) ;
		this.pstmt.setString(3,user.getUserType());
		ResultSet rs = this.pstmt.executeQuery() ;
		//ResultSet rs = ConnectDB.executeSQL(dbAddr,sql, new UserProfileParser());
		if(rs.next()){
			user.setEmail(rs.getString(1));	// If have the searching email
			user.setUserType(rs.getString(3));
			user.setProfileID(rs.getInt(4));
			flag = true ;
		}
		this.pstmt.close() ;
		return flag ;
	}
/*
	public List<User> findAll(String keyWord) throws Exception{
		List<User> all=new ArrayList<User>();
		String sql="SELECT * FROM tb_Account WHERE email LIKE ? OR email LIKE ? OR address LIKE ?";
		this.pstmt = this.conn.prepareStatement(sql);
		this.pstmt.setString(1, "%" + keyWord + "%");
		this.pstmt.setString(2, "%" + keyWord + "%");
		this.pstmt.setString(3, "%" + keyWord + "%");

		ResultSet rs =this.pstmt.executeQuery();
		User user=null;
		while(rs.next())
		{
			user =new User();
			user.setUserid(rs.getInt(1));
			user.setUserName(rs.getString(2));
			user.setPassword(rs.getString(3));
			user.setNickName(rs.getString(4));
			user.setFirstName(rs.getString(5));
			user.setLastName(rs.getString(6));
			user.setEmail(rs.getString(7));
			user.setPhone(rs.getString(8));
			user.setDate(rs.getDate(9));
			user.setAddress(rs.getString(10));
			user.setCreditnum(rs.getString(11));
			user.setTypeid(rs.getString(12));
			all.add(user);
		}
		this.pstmt.close();
		return all;
	}

	public List<User> findSingle(String keyWord) throws Exception{
		List<User> all=new ArrayList<User>();
		String sql="SELECT * FROM USER WHERE userid = ?";
		this.pstmt = this.conn.prepareStatement(sql);
		this.pstmt.setInt(1, Integer.parseInt(keyWord));

		ResultSet rs =this.pstmt.executeQuery();
		User user=null;
		while(rs.next())
		{
			user =new User();
			user.setUserid(rs.getInt(1));
			user.setUserName(rs.getString(2));
			user.setPassword(rs.getString(3));
			user.setNickName(rs.getString(4));
			user.setFirstName(rs.getString(5));
			user.setLastName(rs.getString(6));
			user.setEmail(rs.getString(7));
			user.setPhone(rs.getString(8));
			user.setDate(rs.getDate(9));
			user.setAddress(rs.getString(10));
			user.setCreditnum(rs.getString(11));
			user.setTypeid(rs.getString(12));
			all.add(user);
		}
		this.pstmt.close();
		return all;
	}	
	
	
	public String banUser(String keyWord) throws Exception{
		String banResult="";
		String sql="UPDATE USER SET typeid='0' WHERE userid = ?";
		this.pstmt = this.conn.prepareStatement(sql);
		this.pstmt.setString(1, keyWord);
		
		//Use executeUpdate to do the database UPDATE
		if(this.pstmt.executeUpdate()>0){
			banResult="Ban Succeed";
		}
		this.pstmt.close();

		return banResult;
	}
	
	public String modUser(User user) throws Exception{
		String modResult="";
		String sql="UPDATE user SET userid=?, username=?, password=?, nickname=?, firstname=?, lastname=?, email=?, phone=?, birthdate=?, address=?, creditnum=?, typeid=? WHERE userid=?";
		
		this.pstmt = this.conn.prepareStatement(sql);
		this.pstmt.setInt(1, user.getUserid());
		this.pstmt.setString(2,user.getUserName());
		this.pstmt.setString(3, user.getPassword());
		this.pstmt.setString(4, user.getNickName());
		this.pstmt.setString(5, user.getFirstName());
		this.pstmt.setString(6, user.getLastName());
		this.pstmt.setString(7, user.getEmail());
		this.pstmt.setString(8, user.getPhone());
		this.pstmt.setDate(9,new java.sql.Date(user.getBirthdate().getTime()));	//Becareful to add the getTime
		this.pstmt.setString(10, user.getAddress());
		this.pstmt.setString(11, user.getCreditnum());
		this.pstmt.setString(12, user.getTypeid());
		this.pstmt.setInt(13, user.getUserid());

			//Use executeUpdate to do the database UPDATE
			if(this.pstmt.executeUpdate() > 0){
				modResult="Mod Succeed";
			}			
		
		this.pstmt.close();
		return modResult;
	}
	*/	
} 