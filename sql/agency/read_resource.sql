CREATE OR REPLACE FUNCTION agency.query_agent_resource( resource_id UUID )
RETURNS agency.agents
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.agents WHERE id=resource_id
$function$;




CREATE OR REPLACE FUNCTION agency.query_agentTemplate_resource( resource_id UUID )
RETURNS agency.agentTemplates
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.agentTemplates WHERE id=resource_id
$function$;




CREATE OR REPLACE FUNCTION agency.query_structuralNode_resource( resource_id UUID )
RETURNS agency.structuralNodes
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.structuralNodes WHERE id=resource_id
$function$;




CREATE OR REPLACE FUNCTION agency.query_dataTag_resource( resource_id UUID )
RETURNS agency.dataTags
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.dataTags WHERE id=resource_id
$function$;




CREATE OR REPLACE FUNCTION agency.query_user_resource( resource_id UUID )
RETURNS agency.users
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.users WHERE id=resource_id
$function$;
