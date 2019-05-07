package simpledoc;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONStringer;


//NOTE: uses external package for processing json,
//			but keep all in/out parameters as Strings or Collections of Strings

public class ResourceRequest {
	private String method;
	private List<String> url;
	private List<String> query;
	private List<Map<String, Object>> body_data;

	public ResourceRequest(String requestMethod, String url, String query, InputStream body) {
		this.method = requestMethod;
		List<String> temp_url = Arrays.asList(url.split("/"));
		this.url = temp_url.subList(1, temp_url.size());
//		this.query = Arrays.asList(query.split("?"));
		this.body_data = this.method.equalsIgnoreCase("GET") ? null : parseBody(body, "data");
	}



	@SuppressWarnings("unchecked")
	public List<Object> getBodyElementList(String key) { return (List<Object>) this.body_map.get(key); }
	//if needed, can add a getBodyElementMap() method if the value of a body element is a an object
	private void setBody(InputStream body) {
		if(this.method.equalsIgnoreCase("GET")) this.body_map = null;
		else this.body_map = ParseObject.readJSONMap(body);
	}

	public String method() { return this.method; }

	public String module() { return this.url.get(0); }

	public List<String> resource() { return this.url; }

	public List<String> query() { return this.query; }

	public List<Map<String, Object>> bodyData() { return this.body_data; }
}
