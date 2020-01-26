CREATE TABLE forms.elements (
  id UUID,
  form_id UUID,
  section_id UUID,
  layout_id UUID,
  key TEXT,
  value_properties JSON,
  completion_rules JSON,
  security_settings JSON
)



CREATE OR REPLACE PROCEDURE forms.create_element (
  _id UUID,
  _form_id UUID,
  _section_id UUID,
  _layout_id UUID,
  _key TEXT,
  _value_properties JSON,
  _completion_rules JSON,
  _security_settings JSON )
LANGUATE SQL
AS $PROCEDURE$
  INSERT INTO forms.elements( id, form_id, section_id, layout_id, key, value_properties, completion_rules, security_settings )
  VALUES (_id, _form_id, _section_id, _layout_id, _key, _value_properties, _completion_rules, _security_settings);
$PROCEDURE$;



CREATE OR REPLACE PROCEDURE forms.update_element (
  _id UUID,
  _form_id UUID,
  _section_id UUID,
  _layout_id UUID,
  _key TEXT,
  _value_properties JSON,
  _completion_rules JSON,
  _security_settings JSON )
LANGUAGE sql
AS $procedure$
  UPDATE
    forms.elements
  SET
  id = _id,
  form_id = _form_id,
  section_id = _section_id,
  layout_id = _layout_id,
  key = _key,
  value_properties = _value_properties,
  completion_rules = _completion_rules,
  security_settings = _security_settings
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE forms.delete_element (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM forms.elements
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION forms.query_elements_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  form_id UUID,
  section_id UUID,
  layout_id UUID,
  key TEXT,
  value_properties JSON,
  completion_rules JSON,
  security_settings JSON
)
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id, form_id, section_id, layout_id, key, value_properties, completion_rules, secuirity_settings
  ) FROM forms.elements

$function$;



CREATE OR REPLACE FUNCTION forms.query_elements_resource( resource_id UUID )
RETURNS forms.elements
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM forms.elements WHERE id=resource_id
$function$;
