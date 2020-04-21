CREATE TABLE forms.forms (
  id UUID,
  label TEXT,
  section_ids JSON,
  completion_rules JSON,
  security_settings JSON
);



CREATE OR REPLACE PROCEDURE forms.create_form (
  _id UUID,
  _label TEXT,
  _section_ids JSON,
  _completion_rules JSON,
  _security_settings JSON)
LANGUAGE SQL
AS $PROCEDURE$
  INSERT INTO forms.forms(
    id, label, section_ids, completion_rules, security_settings
  )
  VALUES (_id, _label, _section_ids, _completion_rules, _security_settings);
$PROCEDURE$;



CREATE OR REPLACE PROCEDURE forms.update_form (
  _id UUID,
  _label TEXT,
  _section_ids JSON,
  _completion_rules JSON,
  _security_settings JSON
)
LANGUAGE sql
AS $procedure$
  UPDATE
    forms.forms
  SET
  id = _id,
  label = _label,
  section_ids = _section_ids,
  completion_rules = _completion_rules,
  security_settings = _security_settings
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
  section_ids JSON,
  completion_rules JSON,
  security_settings JSON
)
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id, label, section_ids, completion_rules, security_settings
  ) FROM forms.forms

$function$;



CREATE OR REPLACE FUNCTION forms.query_forms_resource( resource_id UUID )
RETURNS forms.forms
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM forms.forms WHERE id=resource_id
$function$;
