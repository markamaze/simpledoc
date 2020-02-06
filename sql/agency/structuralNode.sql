CREATE TABLE agency.structuralNode (
  id UUID,
  structuralNode_label TEXT,
  structuralNode_parent_id UUID,
  structuralNode_dataTag_ids UUID[],
  property_values JSON,
  active_assignments JSON
);



CREATE OR REPLACE PROCEDURE agency.create_structuralNode (
  _id UUID,
  _structuralNode_label TEXT,
  _structuralNode_parent_id UUID,
  _structuralNode_dataTag_ids UUID[],
  _property_values JSON,
  _active_assignments JSON )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.structuralNode (
    id,
    structuralNode_label,
    structuralNode_parent_id,
    structuralNode_dataTag_ids,
    property_values,
    active_assignments )
  VALUES ( _id, _structuralNode_label, _structuralNode_parent_id, _structuralNode_dataTag_ids, _property_values, _active_assignments);
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_structuralNode (
  _id UUID,
  _structuralNode_label TEXT,
  _structuralNode_parent_id UUID,
  _structuralNode_dataTag_ids UUID[],
  _property_values JSON,
  _active_assignments JSON )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.structuralNode
  SET
    structuralNode_label = _structuralNode_label,
    structuralNode_parent_id = _structuralNode_parent_id,
    structuralNode_dataTag_ids = _structuralNode_dataTag_ids,
    property_values = _property_values,
    active_assignments = _active_assignments
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_structuralNode (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.structuralNode
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_structuralNode_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  structuralNode_label TEXT,
  structuralNode_parent_id UUID,
  structuralNode_dataTag_ids UUID[],
  property_values JSON,
  active_assignments JSON )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    structuralNode_label,
    structuralNode_parent_id,
    structuralNode_dataTag_ids,
    property_values,
    active_assignments
  ) FROM agency.structuralNode

$function$;



CREATE OR REPLACE FUNCTION agency.query_structuralNode_resource( resource_id UUID )
RETURNS agency.structuralNode
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.structuralNode WHERE id=resource_id
$function$;
