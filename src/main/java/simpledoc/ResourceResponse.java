package simpledoc;

import org.json.JSONStringer;
import java.util.Set;



public class ResourceResponse {

	private String response_body;
	private int response_code;

	public ResourceResponse(){}
	public ResourceResponse(String body, int response_code){
		setResponse(body, response_code);
	}


	public String body() { return this.response_body; }


	public ResourceResponse setResponse(Set<?> body, int status_code){
		String data_string = JSONStringer.valueToString(body);
		this.response_body = "{data:" + data_string + "}";
		this.response_code = status_code;
		return this;
	}

	public ResourceResponse setResponse(String body, int status_code){
		if(status_code == 200) this.response_body = "{data:" + body + "}";
		else this.response_body = "{error:" + body + "}";

		this.response_code = status_code;

		return this;
	}


	public int responseCode() { return this.response_code; }

}
