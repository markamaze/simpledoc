package simpledoc;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.sql.SQLException;

import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpServer;

public class Simpledoc {
	static StorageControl storage;
	static ServiceLoader loader;

	public static void main(String[] args) {
		String database_url = System.getenv("JDBC_DATABASE_URL");
		Integer port = Integer.parseInt(System.getenv("PORT"));


		try{
		  storage = new StorageControl(database_url);
		  loader = new ServiceLoader();

		  HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
		  HttpContext context = server.createContext("/");
		  context.setHandler(exchange -> {
			  System.out.println("client request incoming: " + exchange.getRequestMethod() + exchange.getRequestURI());
			  new ClientThread(exchange, storage, loader).start();
		  });

		  server.start();
		  System.out.println("Server running at: " + server.getAddress().toString());
		}catch(IOException e) {e.printStackTrace();} catch (SQLException e) {
			e.printStackTrace();
	  }
	}
}
