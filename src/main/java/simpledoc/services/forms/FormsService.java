//package simpledoc.services.forms;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.stream.Stream;
//
//import simpledoc.ServiceFunction;
//import simpledoc.services.ServiceModule;
//
//public class FormsService extends ServiceModule<FormsObject> {
//
//	@Override
//	protected Map<String, ServiceFunction> defineServices() {
//		Map<String, ServiceFunction> services = new HashMap<String, ServiceFunction>();
//		
//		services.put("GET", request -> {
//			Stream<FormsObject> stream = Stream.empty();
//			//add logic for querying Agent Objects
//			//call query of another module for any subscribed objects
//			System.out.println("GET Forms Service Called");
//			return stream;
//		});
//		
//		services.put("POST", request-> {
//			Stream<FormsObject> stream = Stream.empty();
//			//add logic for creating Agent Objects
//			System.out.println("POST Forms Service Called");
//			return stream;
//		});
//		
//		services.put("PUT", request-> {
//			Stream<FormsObject> stream = Stream.empty();
//			//add logic for updating Agent Objects
//			System.out.println("PUT Forms Service Called");
//
//			return stream;
//		});
//		
//		services.put("DELETE", request-> {
//			Stream<FormsObject> stream = Stream.empty();
//			//add logic for deleting Agent Objects
//			System.out.println("DELETE Forms Service Called");
//
//			return stream;
//		});
//		
//		services.put("subscribe", request -> {
//			Stream<FormsObject> stream = Stream.empty();
//			//add logic for subscribing to this module
//			//provide services
//			System.out.println("subscribe Forms Service Called");
//
//			return stream;
//		});
//		
//		services.put("unsubscribe", request -> {
//			Stream<FormsObject> stream = Stream.empty();
//			//add logic for unsubscribeing from this module
//			System.out.println("unsubscribe Forms Service Called");
//
//			return stream;
//		});
//		
//		services.put("notify", request -> {
//			Stream<FormsObject> stream = Stream.empty();
//			//add logic here for handling of notifications from other modules
//			System.out.println("notify Forms Service Called");
//
//			return stream;
//		});
//		
//		return services;
//	}
//
//	@Override
//	public String moduleTitle() { return "Forms"; }
//
//
//}
