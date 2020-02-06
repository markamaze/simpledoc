CREATE TABLE agency.dataTag (
  id UUID,
  dataTag_label TEXT,
  dataTag_tagType TEXT,
  dataTag_property_ids UUID[],
  dataTag_typeObject_ids UUID[]
);



CREATE OR REPLACE PROCEDURE agency.create_dataTag (
  _id UUID,
  _dataTag_label TEXT,
  _dataTag_tagType TEXT,
  _dataTag_property_ids UUID[],
  _dataTag_typeObject_ids UUID[] )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.dataTag (
    id,
    dataTag_label,
    dataTag_tagType,
    dataTag_property_ids,
    dataTag_typeObject_ids
  )
  VALUES ( _id, _dataTag_label, _dataTag_tagType, _dataTag_property_ids, _dataTag_typeObject_ids );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_dataTag (
  _id UUID,
  _dataTag_label TEXT,
  _dataTag_tagType TEXT,
  _dataTag_property_ids UUID[],
  _dataTag_typeObject_ids UUID[] )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.dataTag
  SET
    dataTag_label = _dataTag_label,
    dataTag_tagType = _dataTag_tagType,
    dataTag_property_ids = _dataTag_property_ids,
    dataTag_typeObject_ids = _dataTag_typeObject_ids
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_dataTag (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.dataTag
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
  dataTag_property_ids UUID[],
  dataTag_typeObject_ids UUID[] )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    dataTag_label,
    dataTag_tagType,
    dataTag_property_ids,
    dataTag_typeObject_ids
  ) FROM agency.dataTag

$function$;



CREATE OR REPLACE FUNCTION agency.query_dataTag_resource( resource_id UUID )
RETURNS agency.dataTag
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.dataTag WHERE id=resource_id
$function$;
