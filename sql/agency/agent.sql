CREATE TABLE agency.agents (
  id UUID,
  structuralNode_link_id UUID,
  agentTemplate_id UUID,
  assigned_user_id UUID,
  agent_is_active BOOLEAN,
  agent_dataTag_ids UUID[]
);



CREATE OR REPLACE PROCEDURE agency.create_agent (
  id UUID,
  linkId UUID,
  templateId UUID,
  assigned_userId UUID,
  isActive BOOLEAN,
  dataTagIds UUID[]
)
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.agents (
    id,
    structuralNode_link_id,
    agentTemplate_id,
    assigned_user_id,
    agent_is_active,
    agent_dataTag_ids )
  VALUES ( id, linkId, templateId, assigned_userId, isActive, dataTagIds );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_agent (
  _id UUID,
  _linkId UUID,
  _templateId UUID,
  _assigned_userId UUID,
  _isActive BOOLEAN,
  _dataTagIds UUID[] )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.agents
  SET
    structuralNode_link_id = _linkId,
    agentTemplate_id = _templateId,
    assigned_user_id = _assigned_userId,
    agent_is_active = _isActive,
    agent_dataTag_ids = _dataTagIds
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_agent (_id UUID)
LANGUAGE sql
AS $procedure$
  DELETE FROM agency.agents
    WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_agent_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS setof agency.agents
LANGUAGE sql STABLE
AS $function$
  SELECT
    id,
    structuralNode_link_id,
    agentTemplate_id,
    assigned_user_id,
    agent_is_active,
    agent_dataTag_ids
  FROM agency.agents
$function$;



CREATE OR REPLACE FUNCTION agency.query_agent_resource( resource_id UUID )
RETURNS agency.agents
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.agents WHERE id=resource_id
$function$;
