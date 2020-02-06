CREATE TABLE agency.agentTemplate (
  id UUID,
  agentTemplate_label TEXT,
  agentTemplate_dataTag_ids UUID[]
);



CREATE OR REPLACE PROCEDURE agency.create_agentTemplate (
  _id UUID,
  _agentTemplate_label TEXT,
  _agentTemplate_dataTag_ids UUID[] )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.agentTemplate (
    id,
    agentTemplate_label,
    agentTemplate_dataTag_ids )
  VALUES ( _id, _agentTemplate_label, _agentTemplate_dataTag_ids );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_agentTemplate (
  _id UUID,
  _agentTemplate_label TEXT,
  _agentTemplate_dataTag_ids UUID[]  )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.agentTemplate
  SET
    agentTemplate_label = _agentTemplate_label,
    agentTemplate_dataTag_ids = _agentTemplate_dataTag_ids
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_agentTemplate (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.agentTemplate
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_agentTemplate_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  agentTemplate_label TEXT,
  agentTemplate_dataTag_ids UUID[] )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    agentTemplate_label,
    agentTemplate_dataTag_ids
  ) FROM agency.agentTemplate

$function$;



CREATE OR REPLACE FUNCTION agency.query_agentTemplate_resource( resource_id UUID )
RETURNS agency.agentTemplate
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.agentTemplate WHERE id=resource_id
$function$;
