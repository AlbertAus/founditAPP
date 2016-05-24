package foundITDBConnection;

import java.io.* ;
import java.util.* ;

import javax.servlet.* ;
import javax.servlet.http.* ;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpSession;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import org.sqlite.JDBC;
import org.sqlite.*;
import org.sqlite.SQLiteDataSource;

public class databaseConnection {
	private Context initContext;
	private Context envContext;
	private DataSource ds = null;
	private Connection conn = null ;
//	private String dbAddr="jdbc:sqlite:" + Struts2Util.getServletContext().getRealPath("/") + "foundITAPP.db";
	public String dbAddr ="jdbc:sqlite:" + this.getClass().getClassLoader().getResource("").getPath() + "foundITAPP.db";
//	public String dbAddr ="jdbc:sqlite:" + "f:/java/cs9322_prac/workspace/founditapp/webcontent/" + "founditapp.db";
	public databaseConnection() throws Exception{
		try{
			/*initContext = new InitialContext();
				envContext  = (Context)initContext.lookup("org.sqlite.JDBC");
				ds = (DataSource) envContext.lookup("jdbc/comp9321");			
				conn = ds.getConnection();
			*/	
	         //连接SQLite的JDBC  
			System.out.println("Test to here 1\n\r");
			Class.forName("org.sqlite.JDBC");
			System.out.println("Test to here 2\n\r");
	         //建立�?��数据库名employees.db的连接，如果不存在就在当前目录下创建�? 
	         conn = DriverManager.getConnection(dbAddr);  
	         System.out.println("dbAddr is "+dbAddr+"\n");
		}catch(Exception e){
			throw e ;
		}
	}
	public Connection getConnection(){
		return this.conn ;
	}
	public void close() throws Exception{
		if(this.conn != null){
			try{
				this.conn.close() ;
			}catch(Exception e){
				throw e ;
			}
		}
	}
}