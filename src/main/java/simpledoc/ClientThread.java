package simpledoc;

import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import com.sun.net.httpserver.HttpExchange;

public class ClientThread extends Thread {

	public ClientThread(HttpExchange exchange, ServiceLoader loader) {
		System.out.println("ClientThread instance created");
		System.out.println(exchange.getRequestURI());
	}

//COMMENTED OUT WHILE SETTING UP ON HEROKU
	// private HttpExchange exchange;
	// private ServiceLoader services;
	//
	// public ClientThread(HttpExchange exchange, ServiceLoader loader) {
	// 	this.exchange = exchange;
	// 	this.services = loader;
	// 	try { this.join(); }
	// 	catch (InterruptedException e) { e.printStackTrace(); }
	// }
	//
	// @Override
	// public void run() {
	// 	switch(this.exchange.getRequestURI().getPath()) {
	// 		case "/":
	// 			loadFile("index.html");
	// 			break;
	// 		case "/simpledoc.bundle.js":
	// 			loadFile("simpledoc.bundle.js");
	// 			break;
	// 		default:
	// 			handleResourceRequest();
	// 			break;
	// 	}
	//
	// }
	//
	// private void handleResourceRequest() {
	//
	// 	ResourceRequest request = new ResourceRequest(
	// 									this.exchange.getRequestMethod(),
	// 									this.exchange.getRequestURI().getPath(),
	// 									this.exchange.getRequestURI().getQuery(),
	// 									this.exchange.getRequestBody());
	//
	// 	ResourceResponse response = this.services.load(request.module(), request.method())
	// 										.run(request);
	//
	// 	try {
	// 		this.exchange.sendResponseHeaders(  response.responseCode(),
	// 											response.bodyLength() );
	// 		OutputStream out = this.exchange.getResponseBody();
	// 		out.write(response.writableBody());
	// 		out.close();
	// 	} catch (IOException e) { e.printStackTrace(); }
	//
	// }
	//
	// private void loadFile(String directory) {
	// 	OutputStream out = null;
	// 	FileReader in = null;
	// 	String path = "/home/mark/code/portfolio/simpledoc/src/resources/dist/";
	//
	// 	try {
	// 		exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "[::1]:3333");
	// 		exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "POST");
	// 		exchange.sendResponseHeaders(200, 0);
	// 		out = exchange.getResponseBody();
	//
	// 		in = new FileReader(path + directory);
	// 		int i;
 	// 		while((i = in.read()) != -1) {
	// 			char character = (char)i;
	// 			out.write((byte) character);
	// 		}
	// 		in.close();
	// 		out.flush();
	// 		out.close();
	// 	} catch (IOException e) { e.printStackTrace(); }
	// }
}
