CREATE TABLE agency.property (
  id UUID,
  property_key TEXT,
  property_value_type TEXT
);



CREATE OR REPLACE PROCEDURE agency.create_property (
  _id UUID,
  _property_key TEXT,
  _property_value_type TEXT )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.property (
    id,
    property_key,
    property_value_type
  )
  VALUES ( _id, _property_key, _property_value_type );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_property (
  _id UUID,
  _property_key TEXT,
  _property_value_type TEXT )
LANGUAGE sql
AS $procedure$
UPDATE
  agency.property
SET
  property_key = _property_key,
  property_value_type = _property_value_type
WHERE
  id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_property (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.property
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_property_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  property_key TEXT,
  property_value_type TEXT )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    property_key,
    property_value_type
  ) FROM agency.property

$function$;



CREATE OR REPLACE FUNCTION agency.query_property_resource( resource_id UUID )
RETURNS agency.property
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.property WHERE id=resource_id
$function$;
