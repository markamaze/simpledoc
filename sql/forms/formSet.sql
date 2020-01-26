CREATE TABLE forms.formsSets (
  id UUID,
  label TEXT,
  form_ids UUID[],
  completion_rules JSON,
  security_settings JSON
)



CREATE OR REPLACE PROCEDURE forms.create_formSet (
  _id UUID,
  _label TEXT,
  _form_ids UUID[],
  _completion_rules JSON,
  _security_settings JSON )
LANGUATE SQL
AS $PROCEDURE$
  INSERT INTO forms.formSets(
    id, label, form_ids, completion_rules, security_settings
  )
  VALUES (_id, _label, _form_ids, _completion_rules, _security_settings);
$PROCEDURE$;



CREATE OR REPLACE PROCEDURE forms.update_formSet (
  _id UUID,
  _label TEXT,
  _form_ids UUID[],
  _completion_rules JSON,
  _security_settings JSON
)
LANGUAGE sql
AS $procedure$
  UPDATE
    forms.formSets
  SET
  id = _id,
  label = _label,
  form_ids = _form_ids,
  completion_rules = _completion_rules,
  security_settings = _security_settings
  WHERE
    id = _id;
$procedure$;



CREATE OR REPLACE PROCEDURE forms.delete_formSet (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM forms.formSet
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION forms.query_formSets_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  label TEXT,
  form_ids UUID[],
  completion_rules JSON,
  security_settings JSON
)
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id, label, form_ids, completion_rules, security_settings
  ) FROM forms.formSets

$function$;



CREATE OR REPLACE FUNCTION forms.query_formSets_resource( resource_id UUID )
RETURNS forms.formSets
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM forms.formSets WHERE id=resource_id
$function$;
