CREATE TABLE forms.layouts (
  id UUID,
  label TEXT,
  form_id UUID,
  section_id UUID,
  element_ids UUID[],
  completion_rules JSON,
  display_settings JSON
);



CREATE OR REPLACE PROCEDURE forms.create_layout (
  _id UUID,
  _label TEXT,
  _form_id UUID,
  _section_id UUID,
  _element_ids UUID[],
  _completion_rules JSON,
  _display_settings JSON )
LANGUAGE SQL
AS $PROCEDURE$
  INSERT INTO forms.layouts( id, label, form_id, section_id, element_ids, completion_rules, display_settings )
  VALUES (_id, _label, _form_id, _section_id, _element_ids,_completion_rules, _display_settings);
$PROCEDURE$;



CREATE OR REPLACE PROCEDURE forms.update_layout (
  _id UUID,
  _label TEXT,
  _form_id UUID,
  _section_id UUID,
  _element_ids UUID[],
  _completion_rules JSON,
  _display_settings JSON )
LANGUAGE sql
AS $procedure$
  UPDATE
    forms.layouts
  SET
  id = _id,
  label = _label,
  form_id = _form_id,
  section_id = _section_id,
  element_ids = _element_ids,
  completion_rules = _completion_rules,
  display_settings = _display_settings
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE forms.delete_layout (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM forms.layouts
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION forms.query_layouts_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  label TEXT,
  form_id UUID,
  section_id UUID,
  element_ids UUID[],
  completion_rules JSON,
  display_settings JSON
)
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id, label, form_id, section_id, element_ids, completion_rules, display_settings
  ) FROM forms.layouts

$function$;



CREATE OR REPLACE FUNCTION forms.query_layouts_resource( resource_id UUID )
RETURNS forms.layouts
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM forms.layouts WHERE id=resource_id
$function$;
