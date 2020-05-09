CREATE TABLE agency.role (
  id UUID,
  label TEXT,
  tag_ids UUID[],
  role_type TEXT
);



CREATE OR REPLACE PROCEDURE agency.create_role (
  _id UUID,
  _label TEXT,
  _tag_ids UUID[],
  _role_type TEXT )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.role (
    id,
    label,
    tag_ids,
    role_type )
  VALUES ( _id, _label, _tag_ids, _role_type );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_role (
  _id UUID,
  _label TEXT,
  _tag_ids UUID[],
  _role_type TEXT  )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.role
  SET
    label = _label,
    tag_ids = _tag_ids,
    role_type = _role_type
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
  label TEXT,
  tag_ids UUID[],
  role_type TEXT )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    label,
    tag_ids,
    role_type
  ) FROM agency.role

$function$;



CREATE OR REPLACE FUNCTION agency.query_role_resource( resource_id UUID )
RETURNS agency.role
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.role WHERE id=resource_id
$function$;
