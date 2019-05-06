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

	//NOTE: this should be able to extract any 1st level property of a request body
	//			so far I only have "data" in 1st level and so that is all this handles.
	private List<Map<String, Object>> parseBody(InputStream body, String body_part) {
		String body_string = "";
		List<Map<String, Object>> data_item_list = new ArrayList<Map<String, Object>>();

		int i;
		try {
			while((i = body.read()) != -1) {
				char c = (char) i;
				body_string += c;
			}
		} catch(IOException e) { e.printStackTrace(); }

		
		new JSONArray(JSONStringer.valueToString( new JSONObject(body_string).get(body_part)))
			.forEach(item -> {data_item_list.add(new JSONObject(item.toString()).toMap());});

		return data_item_list;
	}

	public String method() { return this.method; }

	public String module() { return this.url.get(0); }

	public List<String> resource() { return this.url; }

	public List<String> query() { return this.query; }

	public List<Map<String, Object>> bodyData() { return this.body_data; }
}
