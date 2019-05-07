package simpledoc;


//can add handling of setting response headers in here when ready	
public class ResourceResponse {

	
	private String response_body = "";
	private boolean request_success = false;
	private boolean storage_op_success = false;
	private boolean response_success = false;

	
	public boolean getStorageOpFlag() { return this.storage_op_success; }
	public void setStorageOpFlag(boolean flag) { 
		this.storage_op_success = flag; 
		if(!flag) setResponseBody("Error in storage operation"); }

	
	public boolean getRequestOpFlag() { return this.request_success; }
	public void setRequestOpFlag(boolean flag) { 
		this.request_success  = flag; 
		if(!flag) setResponseBody("Error in processing received request"); }

	
	public boolean getResponseOpFlag() { return this.response_success; }
	public void setResponseOpFlag(boolean flag) { 
		this.response_success = flag; 
		if(!flag) setResponseBody("Error in building response"); }

	
	public String body() { return this.response_body; }
	public void setResponseBody(Object body) {
		this.response_body = ParseObject.writeJSONString(body);
	}

	
	public int responseCode() {
		/* possible states:
		 * 		request handled successfully
		 * 		problem with request
		 * 		problem with storage
		 * 		problem forming response
		 *
		 *	build a switch statement to handle
		 *	parsing the flags to determine which
		 *	code to return
		 *
		 *	for now, just return 200 by default
		 * */
		
		
		return 200;
	}
}
