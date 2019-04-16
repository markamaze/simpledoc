package simpledoc;

import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import com.sun.net.httpserver.HttpsExchange;

public class ClientThread extends Thread {

	 private HttpsExchange exchange;
	 private ServiceLoader services;

	 public ClientThread(HttpsExchange exchange, ServiceLoader loader) {
	 	this.exchange = exchange;
	 	this.services = loader;
	 	try { this.join(); }
	 	catch (InterruptedException e) { e.printStackTrace(); }
	 }

	 @Override
	 public void run() {
		 System.out.println("ClientThread running");
		 loadFile("index.html");
	 	// switch(this.exchange.getRequestURI().getPath()) {
	 	// 	case "/":
	 	// 		loadFile("index.html");
	 	// 		break;
	 	// 	case "/simpledoc.bundle.js":
	 	// 		loadFile("simpledoc.bundle.js");
	 	// 		break;
	 	// 	default:
	 	// 		handleResourceRequest();
	 	// 		break;
	 	// }

	 }

	 private void handleResourceRequest() {

	 	ResourceRequest request = new ResourceRequest(
	 									this.exchange.getRequestMethod(),
	 									this.exchange.getRequestURI().getPath(),
	 									this.exchange.getRequestURI().getQuery(),
	 									this.exchange.getRequestBody());

	 	ResourceResponse response = this.services.load(request.module(), request.method())
	 										.run(request);

	 	try {
	 		this.exchange.sendResponseHeaders(  response.responseCode(),
	 											response.bodyLength() );
	 		OutputStream out = this.exchange.getResponseBody();
	 		out.write(response.writableBody());
	 		out.close();
	 	} catch (IOException e) { e.printStackTrace(); }

	 }

	 private void loadFile(String directory) {
		 System.out.println("in loadFile");
	 	OutputStream out = null;
	 	FileReader in = null;
	 	String path = "./src/main/dist/";

	 	try {
	 		exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "[::1]:3333");
	 		exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "POST");
	 		exchange.sendResponseHeaders(200, 0);
	 		out = exchange.getResponseBody();

	 		in = new FileReader(path + directory);
	 		int i;
 	 		while((i = in.read()) != -1) {
	 			char character = (char)i;
	 			out.write((byte) character);
	 		}
	 		in.close();
	 		out.flush();
	 		out.close();
	 	} catch (IOException e) { e.printStackTrace(); }
	 }
}
