package simpledoc;

import java.util.stream.Stream;

public class ResourceResponse {

	private boolean operation_success_flag = false;
	private boolean db_success_flag = false;

	public void setDbSuccessFlag(boolean db_operation) { this.db_success_flag = db_operation; }
	public boolean getDbSuccessFlag() { return this.db_success_flag; }


	public void setBody(Stream<Object> map) {
		// TODO Auto-generated method stub
		
	}

	public int responseCode() {
		// TODO Auto-generated method stub
		return 0;
	}

	public long bodyLength() {
		// TODO Auto-generated method stub
		return 0;
	}

	public byte[] writableBody() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setOperationSuccessFlag(boolean b) { this.operation_success_flag  = b; }
	public boolean getOperationSuccessFlag() { return this.operation_success_flag; }

	
	
	public void setErrorMessage(String string) {
		// TODO Auto-generated method stub
		
	}



}
