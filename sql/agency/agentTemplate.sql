CREATE TABLE agency.agentTemplates (
  id UUID,
  agentTemplate_label TEXT,
  agentTemplate_security CHAR(4),
  agentTemplate_dataTag_ids UUID[],
  agentTemplate_properties JSON
);



CREATE OR REPLACE PROCEDURE agency.create_agentTemplate (
  id UUID,
  label TEXT,
  security CHAR(4),
  dataTags UUID[],
  properties JSON )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.agentTemplates (
    id,
    agentTemplate_label,
    agentTemplate_security,
    agentTemplate_dataTag_ids,
    agentTemplate_properties)
  VALUES ( id, label, security, dataTags, properties );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.update_agentTemplate (
  _id UUID,
  _label TEXT,
  _security CHAR(4),
  _dataTags UUID[],
  _properties JSON )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.agentTemplates
  SET
    agentTemplate_label = _label,
    agentTemplate_security = _security,
    agentTemplate_dataTag_ids = _dataTags,
    agentTemplate_properties = _properties
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE agency.delete_agentTemplate (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.agentTemplates
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION agency.query_agentTemplate_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  agentTemplate_label TEXT,
  agentTemplate_security CHAR(4),
  agentTemplate_dataTag_ids UUID[],
  agentTemplate_properties JSON )
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id,
    agentTemplate_label,
    agentTemplate_security,
    agentTemplate_dataTag_ids,
    agentTemplate_properties
  ) FROM agency.agentTemplates

$function$;



CREATE OR REPLACE FUNCTION agency.query_agentTemplate_resource( resource_id UUID )
RETURNS agency.agentTemplates
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM agency.agentTemplates WHERE id=resource_id
$function$;
