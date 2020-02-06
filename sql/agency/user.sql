CREATE TABLE agency.user (
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
  INSERT INTO agency.user (
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
  agency.user
SET
  username = _username,
  password = _password
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
  password text )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    username,
    password
  ) FROM agency.user

$function$;



CREATE OR REPLACE FUNCTION agency.query_user_resource( resource_id UUID )
RETURNS agency.user
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.user WHERE id=resource_id
$function$;
