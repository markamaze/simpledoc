CREATE TABLE agency.role (
  id UUID,
  role_label TEXT,
  security_code TEXT
);



CREATE OR REPLACE PROCEDURE agency.create_role (
  _id UUID,
  _role_label TEXT,
  _security_code TEXT )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.role (
    id,
    role_label,
    security_code
  )
  VALUES ( _id, _role_label, _security_code );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_role (
  _id UUID,
  _role_label TEXT,
  _security_code TEXT )
LANGUAGE sql
AS $procedure$
UPDATE
  agency.role
SET
  role_label = _role_label,
  security_code = _security_code
WHERE
  id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_role (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.role
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_role_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  role_label TEXT,
  security_code TEXT )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    role_label,
    security_code
  ) FROM agency.role

$function$;



CREATE OR REPLACE FUNCTION agency.query_role_resource( resource_id UUID )
RETURNS agency.role
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.role WHERE id=resource_id
$function$;
