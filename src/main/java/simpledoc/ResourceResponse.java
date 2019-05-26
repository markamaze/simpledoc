package simpledoc;

import org.json.JSONStringer;
import java.util.Set;



public class ResourceResponse {

	private String response_body;
	private ResourceRequest request;

	public ResourceResponse(ResourceRequest request){
		this.request = request;

	}
	public ResourceResponse(String body, int response_code){
		// create a response with just the body and response code injected directly
		// typically this should be used for setting errors
	}

	public ResourceRequest responseTo() { return this.request; }


	public String body() { return this.response_body; }


	public ResourceResponse setResponse(Set<?> body, int status_code){
		String data_string = JSONStringer.valueToString(body);
		this.response_body = "{data:" + data_string + "}";

		return this;
	}

	public ResourceResponse setResponse(String body, int status_code){


		return this;
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
