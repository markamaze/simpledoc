CREATE TABLE forms.subscriptions (
  id UUID,
  subscriber_module TEXT,
  subscriber_url TEXT, --store url for retrieving from server the set of subscriber id's
  primary_relative_subscriber_url TEXT, --store url for getting info on other module objects to be included within this service module
  secondary_relative_subscriber_url TEXT, --allows modules to offer linking related id's within the subscribing module on primary & secondary levels

  -- instead of storing id's of the subscribers, store url's set by the subscribing module to get the id('s)
  -- implementing module can make use of primary & secondary relative subscribers, also accessed by url's set by subscriber
      -- example purpose: a form was created where a layout creates elements based on primary_relative_subscribers,
      --    such as the creating elements based on all the employees of the subscribing program,
      --    when something subscribes to that form, it prompts the subscriber to set the url for those relatives,
      --    the subscriber answers by providing a url which will return the set of relatives to the subscriber



)



CREATE OR REPLACE PROCEDURE forms.create_subscription ()
LANGUAGE SQL
AS $PROCEDURE$
  INSERT INTO forms.subscriptions ()
  VALUES ()
$PROCEDURE$;



CREATE OR REPLACE PROCEDURE forms.update_subscription ()
LANGUAGE SQL
AS $PROCEDURE$
  UPDATE forms.subscriptions
  SET
  WHERE
$PROCEDURE$;



CREATE OR REPLACE PROCEDURE forms.delete_subscription (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM forms.subscriptions
  WHERE id = _id;
$procedure$;




CREATE OR REPLACE FUNCTION forms.query_subscriptions(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE()
LANGUAGE sql STABLE
AS $function$

  SELECT ()
  FROM forms.subscriptions

$function$;



CREATE OR REPLACE FUNCTION forms.query_subscription_resource( resource_id UUID )
RETURNS forms.subscriptions
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM forms.subscriptions WHERE id=resource_id
$function$;
