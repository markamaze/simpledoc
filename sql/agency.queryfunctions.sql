CREATE OR REPLACE FUNCTION agency.query_category_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  category_id uuid,
  category_label text,
  category_behavior text,
  category_security character(4),
  category_data_structure text )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.category_objects


$function$;




CREATE OR REPLACE FUNCTION agency.query_category_resource(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  category_id uuid,
  category_label text,
  category_behavior text,
  category_security character(4),
  category_data_structure text )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.category_objects


$function$;




CREATE OR REPLACE FUNCTION agency.query_definition_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  definition_id uuid,
  definition_label text,
  category_id uuid,
  definition_security character(4),
  definition_data_structure text )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.definition_objects


$function$;




CREATE OR REPLACE FUNCTION agency.query_definition_resource(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  definition_id uuid,
  definition_label text,
  category_id uuid,
  definition_security character(4),
  definition_data_structure text )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.definition_objects


$function$;




CREATE OR REPLACE FUNCTION agency.query_agent_resource(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  agent_id UUID,
  agent_link_id UUID,
  definition_id UUID,
  agent_security character(4),
  agent_data_structure text,
  agent_data text )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.agent_objects


$function$;




CREATE OR REPLACE FUNCTION agency.query_agent_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  agent_id UUID,
  agent_link_id UUID,
  definition_id UUID,
  agent_security character(4),
  agent_data_structure text,
  agent_data text )
LANGUAGE sql STABLE
AS $function$

  SELECT * FROM agency.agent_objects


$function$;
