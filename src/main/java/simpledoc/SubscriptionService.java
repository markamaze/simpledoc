package simpledoc;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.exceptions.StorageErrorException;

public class SubscriptionService extends Thread {
	
	private static StorageControl storage;
	private static ServiceLoader loader;

	public SubscriptionService(StorageControl _storage, ServiceLoader _loader) {
		storage = _storage;
		loader = _loader;
	}

	@Override
	public void run() {

		
		
		List<String> subscription_queue = Collections.emptyList();
		//initializeSubscriptionQueue;
		//initializeSubscriptionListener;

		//this needs to be in a seperate thread 
		while(true) {
			try {
				if(subscription_queue.isEmpty()) continue;
				
				String current_subscription = subscription_queue.remove(0);
				
				ServiceFunction subscription_service = loader.load(new ArrayList<String>(), null);
				ResourceRequest request = null;
				ResourceResponse response;
			
				response = subscription_service.run(current_subscription, storage);
			
				if(response.responseCode() == 1) {
					//subscription state after running service is reconciled
					//the subscription should be dropped from the queue
				}
				else{
					//return the subscription to the end of the queue
				}

			} catch (StorageErrorException | ServiceErrorException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
	}

}
