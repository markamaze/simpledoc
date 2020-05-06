CREATE TABLE agency.user (
  id UUID,
  username text,
  password text,
  property_values TEXT[],
  assigned_agent_ids UUID[]
);



CREATE OR REPLACE PROCEDURE agency.create_user (
  _id UUID,
  _username TEXT,
  _password TEXT,
  _property_values TEXT[],
  _assigned_agent_ids UUID[] )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.user (
    id,
    username,
    password,
    property_values,
    assigned_agent_ids
  )
  VALUES ( _id, _username, _password, _property_values, _assigned_agent_ids );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_user (
  _id UUID,
  _username TEXT,
  _password TEXT,
  _property_values TEXT[],
  _assigned_agent_ids UUID[] )
LANGUAGE sql
AS $procedure$
UPDATE
  agency.user
SET
  username = _username,
  password = _password,
  property_values = _property_values,
  assigned_agent_ids = _assigned_agent_ids
WHERE
  id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_user (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.user
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_user_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  username text,
  password text,
  property_values TEXT[],
  assigned_agent_ids UUID[] )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    username,
    password,
    property_values,
    assigned_agent_ids
  ) FROM agency.user

$function$;



CREATE OR REPLACE FUNCTION agency.query_user_resource( resource_id UUID )
RETURNS agency.user
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.user WHERE id=resource_id
$function$;
