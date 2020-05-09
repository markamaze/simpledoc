CREATE TABLE agency.tag (
  id UUID,
  label TEXT,
  tag_type TEXT,
  tag_properties TEXT[]
);



CREATE OR REPLACE PROCEDURE agency.create_tag (
  _id UUID,
  _label TEXT,
  _tag_type TEXT,
  _tag_properties TEXT[] )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.tag (
    id,
    label,
    tag_type,
    tag_properties
  )
  VALUES ( _id, _label, _tag_type, _tag_properties )
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_tag (
  _id UUID,
  _label TEXT,
  _tag_type TEXT,
  _tag_properties TEXT[] )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.tag
  SET
    label = _label,
    tag_type = _tag_type,
    tag_properties = _tag_properties
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_tag (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.tag
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_tag_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  label TEXT,
  tag_type TEXT,
  tag_properties TEXT[] )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    label,
    tag_type,
    tag_properties
  ) FROM agency.tag

$function$;



CREATE OR REPLACE FUNCTION agency.query_tag_resource( resource_id UUID )
RETURNS agency.tag
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.tag WHERE id=resource_id
$function$;
