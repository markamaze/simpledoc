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




CREATE OR REPLACE FUNCTION agency.query_agentTemplate_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  agentTemplate_label TEXT,
  agentTemplate_security CHAR(4),
  agentTemplate_dataTag_ids UUID[] )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    agentTemplate_label,
    agentTemplate_security,
    agentTemplate_dataTag_ids
  ) FROM agency.agentTemplates

$function$;




CREATE OR REPLACE FUNCTION agency.query_structuralNode_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  structuralNode_label TEXT,
  structuralNode_parent_id UUID,
  agent_assignments TEXT,
  structuralNode_dataTag_ids UUID[] )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    structuralNode_label,
    structuralNode_parent_id,
    agent_assignments,
    structuralNode_dataTag_ids
  ) FROM agency.structuralNodes

$function$;



CREATE OR REPLACE FUNCTION agency.query_dataTag_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  dataTag_label TEXT,
  dataTag_for_agent BOOLEAN )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    dataTag_label,
    dataTag_for_agent
  ) FROM agency.dataTags

$function$;




CREATE OR REPLACE FUNCTION agency.query_user_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  username text,
  password text )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    username,
    password
  ) FROM agency.users

$function$;
