CREATE TABLE forms.sections (
  id UUID,
  label TEXT,
  form_id UUID,
  layout_ids UUID[],
  completion_rules JSON,
  security_settings JSON
);



CREATE OR REPLACE PROCEDURE forms.create_section (
  _id UUID,
  _label TEXT,
  _form_id UUID,
  _layout_ids UUID[],
  _completion_rules JSON,
  _security_settings JSON )
LANGUAGE SQL
AS $PROCEDURE$
  INSERT INTO forms.sections( id, label, form_id, layout_ids, completion_rules, security_settings )
  VALUES (_id, _label, _form_id, _layout_ids, _completion_rules, _security_settings);
$PROCEDURE$;



CREATE OR REPLACE PROCEDURE forms.update_section (
  _id UUID,
  _label TEXT,
  _form_id UUID,
  _layout_ids UUID[],
  _completion_rules JSON,
  _security_settings JSON )
LANGUAGE sql
AS $procedure$
  UPDATE
    forms.sections
  SET
  id = _id,
  label = _label,
  form_id = _form_id,
  layout_ids = _layout_ids,
  completion_rules = _completion_rules,
  security_settings = _security_settings
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE forms.delete_section (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM forms.sections
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION forms.query_sections_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  label TEXT,
  form_id UUID,
  layout_ids UUID[],
  completion_rules JSON,
  security_settings JSON
)
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id, label, form_id,layout_ids, completion_rules, security_settings
  ) FROM forms.sections

$function$;



CREATE OR REPLACE FUNCTION forms.query_sections_resource( resource_id UUID )
RETURNS forms.sections
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM forms.sections WHERE id=resource_id
$function$;
