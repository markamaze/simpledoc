CREATE TABLE agency.template (
  id UUID,
  label TEXT,
  tag_ids UUID[]
);



CREATE OR REPLACE PROCEDURE agency.create_template (
  _id UUID,
  _label TEXT,
  _tag_ids UUID[] )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.template (
    id,
    label,
    tag_ids )
  VALUES ( _id, _label, _tag_ids );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_template (
  _id UUID,
  _label TEXT,
  _tag_ids UUID[]  )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.template
  SET
    label = _label,
    tag_ids = _tag_ids
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_template (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.template
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_template_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  label TEXT,
  tag_ids UUID[] )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    label,
    tag_ids
  ) FROM agency.template

$function$;



CREATE OR REPLACE FUNCTION agency.query_template_resource( resource_id UUID )
RETURNS agency.template
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.template WHERE id=resource_id
$function$;
