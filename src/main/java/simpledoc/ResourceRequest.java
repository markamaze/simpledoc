package simpledoc;

import java.util.Collections;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.IOException;
import java.util.Set;
import java.io.InputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;



public class ResourceRequest {

	private String body;
	private String method;
	private List<String> url;
	private Map<String, String> query;



	public ResourceRequest(String method, String url, String query, InputStream body) {
		storeBodyAsString(body);
		setMethod(method);
		setURL(url);
		setQuery(query);
	}


	private void storeBodyAsString(InputStream body) {
		String json_string = "";
		try {
			int i;
			while((i = body.read()) != -1) {
				char c = (char) i;
				json_string += c;
			}
		} catch(IOException e) { e.printStackTrace(); }
		this.body = json_string;
	}


	public Set<RequestData> getDataSet() {
		Set<RequestData> data_set = new HashSet<RequestData>();
		JSONObject json_body = new JSONObject(body);
		JSONArray data_array = json_body.optJSONArray("data");

		data_array.forEach( item -> {
			JSONObject json_item = item instanceof JSONObject ? (JSONObject) item : null;
			String id = json_item.optString("id");
			String type = json_item.optString("type");
			Map<String, Object> data = json_item.optJSONObject("object_data").toMap();

			data_set.add(new RequestData(id, type, data));
		});

		return data_set;
	}


	public String method() { return this.method; }
	private void setMethod(String method) {	this.method = method;	}


	public String module() { return this.url.get(0); }
	public List<String> resource() { return this.url; }
	private void setURL(String url) {
		List<String> temp_url = Arrays.asList(url.split("/"));
		this.url = temp_url.subList(1, temp_url.size());
	}



	public Map<String, String> query() { return this.query; }
	private void setQuery(String query) {
		Map<String, String> temp_query = new HashMap<>();

		if (query == null) this.query = temp_query;
		else {
			Arrays.asList(query.split("?")).forEach( query_item -> {
				String[] split_item = query_item.split("=");
				temp_query.put(split_item[0], split_item[1]);
				});
			this.query = temp_query;
		}
	}
}
