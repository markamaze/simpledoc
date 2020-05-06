CREATE TABLE agency.agent (
  id UUID,
  agent_user_id UUID,
  node_id UUID,
  assignment_id UUID
);



CREATE OR REPLACE PROCEDURE agency.create_agent (
  _id UUID,
  _agent_user_id UUID,
  _node_id UUID,
  _assignment_id UUID
)
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.agent (
    id,
    agent_user_id,
    node_id,
    assignment_id )
  VALUES ( _id, _agent_user_id, _node_id, _assignment_id );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_agent (
  _id UUID,
  _agent_user_id UUID,
  _node_id UUID,
  _assignment_id UUID )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.agent
  SET
    agent_user_id = _agent_user_id,
    node_id = _node_id,
    assignment_id = _assignment_id
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_agent (_id UUID)
LANGUAGE sql
AS $procedure$
  DELETE FROM agency.agent
    WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_agent_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS setof agency.agent
LANGUAGE sql STABLE
AS $function$
  SELECT
    id,
    agent_user_id,
    node_id,
    assignment_id
  FROM agency.agent
$function$;



CREATE OR REPLACE FUNCTION agency.query_agent_resource( resource_id UUID )
RETURNS agency.agent
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.agent WHERE id=resource_id
$function$;
