CREATE TABLE agency.node (
  id UUID,
  label TEXT,
  parent_id UUID,
  tag_ids UUID[],
  property_values TEXT[],
  assignments JSON[]
);



CREATE OR REPLACE PROCEDURE agency.create_node (
  _id UUID,
  _label TEXT,
  _parent_id UUID,
  _tag_ids UUID[],
  _property_values TEXT[],
  _assignments JSON[] )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.node (
    id,
    label,
    parent_id,
    tag_ids,
    property_values,
    assignments )
  VALUES ( _id, _label, _parent_id, _tag_ids, _property_values, _assignments);
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_node (
  _id UUID,
  _label TEXT,
  _parent_id UUID,
  _tag_ids UUID[],
  _property_values TEXT[],
  _assignments JSON[] )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.node
  SET
    label = _label,
    parent_id = _parent_id,
    tag_ids = _tag_ids,
    property_values = _property_values,
    assignments = _assignments
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_node (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.node
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_node_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  label TEXT,
  parent_id UUID,
  tag_ids UUID[],
  property_values TEXT[],
  assignments JSON[] )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    label,
    parent_id,
    tag_ids,
    property_values,
    assignments
  ) FROM agency.node

$function$;



CREATE OR REPLACE FUNCTION agency.query_node_resource( resource_id UUID )
RETURNS agency.node
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.node WHERE id=resource_id
$function$;
