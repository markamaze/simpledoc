CREATE TABLE agency.structuralNodes (
  id UUID,
  structuralNode_label TEXT,
  structuralNode_parent_id UUID,
  agent_assignments JSON,
  agent_assignments_implemented JSON,
  structuralNode_dataTag_ids UUID[],
  structuralNode_properties JSON
);



CREATE OR REPLACE PROCEDURE agency.create_structuralNode (
  id UUID,
  label TEXT,
  parentId UUID,
  agentAssignments JSON,
  agentAssignmentsImplemented JSON,
  dataTagIds UUID[],
  properties JSON )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.structuralNodes (
    id,
    structuralNode_label,
    structuralNode_parent_id,
    agent_assignments,
    agent_assignments_implemented,
    structuralNode_dataTag_ids,
    structuralNode_properties )
  VALUES (id, label, parentId, agentAssignments, agentAssignmentsImplemented, dataTagIds, properties);
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_structuralNode (
  _id UUID,
  _label TEXT,
  _parentId UUID,
  _agentAssignments JSON,
  _agentAssignmentsImplemented JSON,
  _dataTagIds UUID[],
  _properties JSON )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.structuralNodes
  SET
    structuralNode_label = _label,
    structuralNode_parent_id = _parentId,
    agent_assignments = _agentAssignments,
    agent_assignments_implemented = _agentAssignmentsImplemented,
    structuralNode_dataTag_ids = _dataTagIds,
    structuralNode_properties = _properties
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_structuralNode (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.structuralNodes
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
  agent_assignments JSON,
  agent_assignments_implemented JSON,
  structuralNode_dataTag_ids UUID[],
  structuralNode_properties JSON )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    structuralNode_label,
    structuralNode_parent_id,
    agent_assignments,
    agent_assignments_implemented,
    structuralNode_dataTag_ids,
    structuralNode_properties
  ) FROM agency.structuralNodes

$function$;



CREATE OR REPLACE FUNCTION agency.query_structuralNode_resource( resource_id UUID )
RETURNS agency.structuralNodes
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.structuralNodes WHERE id=resource_id
$function$;
