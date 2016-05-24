package foundITDBConnection;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by yun Zhang on 2016/05/09
 */
public interface ResultSetParser <T> {

    List<T> parse(ResultSet res) throws SQLException;
}
