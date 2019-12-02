--for collection functions, will need to add functionality
--  to reduce the set by the query keys/values provided as an argument

CREATE OR REPLACE FUNCTION agency.query_agentTemplate_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  agentTemplate_id UUID,
  agentTemplate_label TEXT,
  agentTemplate_secuirty CHAR(4),
  agentTemplate_dataTags UUID[],
  agentTemplate_data_structure TEXT )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.agentTemplates

$function$;

CREATE OR REPLACE FUNCTION agency.query_structuralNode_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  structuralNode_id UUID,
  structuralNode_label TEXT,
  structuralNode_dataTags UUID[],
  structuralNode_parent_id UUID,
  agent_assignments TEXT,
  structuralNode_data_structure TEXT )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.structuralNodes

$function$;

CREATE OR REPLACE FUNCTION agency.query_user_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  user_id UUID,
  username text,
  password text )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.users

$function$;

CREATE OR REPLACE FUNCTION agency.query_dataTag_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  dataTag_id UUID,
  dataTag_label TEXT,
  dataTag_for ENUM(["STRUCTURAL", "AGENT"]) )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.dataTags

$function$;

CREATE OR REPLACE FUNCTION agency.query_agent_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  agent_id UUID,
  agent_link_id UUID,
  agent_template_id UUID,
  assigned_user_id UUID,
  agent_dataTags UUID[],
  is_active BOOLEAN,
  agent_data_structure TEXT )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.agents

$function$;
