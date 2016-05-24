package foundITDBConnection;

import java.sql.Connection;
import java.sql.DriverManager;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;


public class DBConnection_old {
	private static DBConnection_old factory = null;
	private Context initContext;
	private Context envContext;
	private DataSource ds = null;
	private Connection conn = null ;
	private String dbAddr ="jdbc:sqlite:" + "F:/Java/cs9322_Prac/workspace/FoundITAPP/WebContent/" + "foundITAPP.db";
	
	private DBConnection_old(){	
		try {
			/*
			initContext = new InitialContext();
			envContext  = (Context)initContext.lookup("java:/comp/env");
			ds = (DataSource) envContext.lookup("jdbc/comp9321");
			*/
	         //连接SQLite的JDBC  
				Class.forName("org.sqlite.JDBC");
	         //建立�?��数据库名employees.db的连接，如果不存在就在当前目录下创建�? 
				conn = DriverManager.getConnection(dbAddr);  
			}catch(Exception e){
			}				
	}
	
	private DataSource getDataSource(){
		return ds;
	}

	public static Connection getConnection() throws Exception{
		
		if(factory==null)
			factory = new DBConnection_old();
		Connection conn = factory.getDataSource().getConnection();		
		return conn;
	}	
}
