CREATE TABLE agency.assignment (
  id UUID,
  agentTemplate_id UUID,
  supervising_assignment_id UUID,
  supervisor_for_structuralNode_id UUID,
  assignment_for_structuralNode_id UUID
);


CREATE OR REPLACE PROCEDURE agency.create_assignment (
  _id UUID,
  _agentTemplate_id UUID,
  _supervising_assignment_id UUID,
  _supervisor_for_structuralNode_id UUID,
  _assignment_for_structuralNode_id UUID )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.assignment (
    id,
    agentTemplate_id,
    supervising_assignment_id,
    supervisor_for_structuralNode_id,
    assignment_for_structuralNode_id
  )
  VALUES ( _id, _agentTemplate_id, _supervising_assignment_id, _supervisor_for_structuralNode_id, _assignment_for_structuralNode_id );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_assignment (
  _id UUID,
  _agentTemplate_id UUID,
  _supervising_assignment_id UUID,
  _supervisor_for_structuralNode_id UUID,
  _assignment_for_structuralNode_id UUID )
LANGUAGE sql
AS $procedure$
UPDATE
  agency.assignment
SET
  agentTemplate_id = _agentTemplate_id,
  supervising_assignment_id = _supervising_assignment_id,
  supervisor_for_structuralNode_id = _supervisor_for_structuralNode_id,
  assignment_for_structuralNode_id = _assignment_for_structuralNode_id
WHERE
  id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_assignment (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.assignment
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_assignment_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  agentTemplate_id UUID,
  supervising_assignment_id UUID,
  supervisor_for_structuralNode_id UUID,
  assignment_for_structuralNode_id UUID )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    agentTemplate_id,
    supervising_assignment_id,
    supervisor_for_structuralNode_id,
    assignment_for_structuralNode_id
  ) FROM agency.assignment

$function$;



CREATE OR REPLACE FUNCTION agency.query_assignment_resource( resource_id UUID )
RETURNS agency.assignment
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.assignment WHERE id=resource_id
$function$;
