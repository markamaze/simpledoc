CREATE TABLE forms.forms (
  id UUID,
  label TEXT,
  section_ids UUID[],
  completion_rules JSON,
  security_settings JSON
);



CREATE OR REPLACE PROCEDURE forms.create_form (
  _id UUID,
  _label TEXT,
  _section_ids UUID[],
  _completion_rules JSON )
LANGUAGE SQL
AS $PROCEDURE$
  INSERT INTO forms.forms(
    id, label, section_ids, completion_rules
  )
  VALUES (_id, _label, _section_ids, _completion_rules);
$PROCEDURE$;



CREATE OR REPLACE PROCEDURE forms.update_form (
  _id UUID,
  _label TEXT,
  _section_ids UUID[],
  _completion_rules JSON
)
LANGUAGE sql
AS $procedure$
  UPDATE
    forms.forms
  SET
  id = _id,
  label = _label,
  section_ids = _section_ids,
  completion_rules = _completion_rules
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE forms.delete_form (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM forms.forms
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION forms.query_forms_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  label TEXT,
  section_ids UUID[],
  completion_rules JSON
)
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id, label, section_ids, completion_rules
  ) FROM forms.forms

$function$;



CREATE OR REPLACE FUNCTION forms.query_forms_resource( resource_id UUID )
RETURNS forms.forms
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM forms.forms WHERE id=resource_id
$function$;
