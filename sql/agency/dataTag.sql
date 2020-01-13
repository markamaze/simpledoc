CREATE TABLE agency.dataTags (
  id UUID,
  dataTag_label TEXT,
  dataTag_tagType TEXT,
  dataTag_properties JSON,
  dataTag_typeObjects JSON
);



CREATE OR REPLACE PROCEDURE agency.create_dataTag (
  id UUID,
  label TEXT,
  tagType TEXT,
  properties JSON,
  typeObjects JSON )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.dataTags (
    id,
    dataTag_label,
    dataTag_tagType,
    dataTag_properties,
    dataTag_typeObjects
  )
  VALUES ( id, label, tagType, properties, typeObjects );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_dataTag (
  _id UUID,
  _label TEXT,
  _tagType TEXT,
  _properties JSON,
  _typeObjects JSON )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.dataTags
  SET
    dataTag_label = _label,
    dataTag_tagType = _tagType,
    dataTag_properties = _properties,
    dataTag_typeObjects = _typeObjects
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_dataTag (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.dataTags
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_dataTag_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  dataTag_label TEXT,
  dataTag_tagType TEXT,
  dataTag_properties JSON,
  dataTag_typeObjects JSON )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    dataTag_label,
    dataTag_tagType,
    dataTag_properties,
    dataTag_typeObjects
  ) FROM agency.dataTags

$function$;



CREATE OR REPLACE FUNCTION agency.query_dataTag_resource( resource_id UUID )
RETURNS agency.dataTags
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.dataTags WHERE id=resource_id
$function$;
