package simpledoc.exceptions;

import java.sql.SQLException;


public class StorageErrorException extends SQLException{
    public StorageErrorException(String message) {
        super(message);
    }
}
