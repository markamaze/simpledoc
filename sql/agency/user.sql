CREATE TABLE agency.users (
  id UUID,
  username text,
  password text
);



CREATE OR REPLACE PROCEDURE agency.create_user (
  id UUID,
  username TEXT,
  password TEXT )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.users (
    id,
    username,
    password
  )
  VALUES ( id, username, password );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_user (
  _id UUID,
  _username TEXT,
  _password TEXT )
LANGUAGE sql
AS $procedure$
UPDATE
  agency.users
SET
  username = _username,
  password = _password
WHERE
  id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_user (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.users
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_user_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  username text,
  password text )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    username,
    password
  ) FROM agency.users

$function$;



CREATE OR REPLACE FUNCTION agency.query_user_resource( resource_id UUID )
RETURNS agency.users
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.users WHERE id=resource_id
$function$;
