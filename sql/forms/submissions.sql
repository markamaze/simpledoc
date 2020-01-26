CREATE TABLE forms.submissions (
  id UUID,
  form_id UUID,
  section_id UUID,
  layout_id UUID,
  element_id UUID,
  value TEXT,
  submitted_on DATE,
  submitted_by UUID
);



CREATE OR REPLACE PROCEDURE forms.create_submission (
  _id UUID,
  _form_id UUID,
  _section_id UUID,
  _layout_id UUID,
  _element_id UUID,
  _value TEXT,
  _submitted_on DATE,
  _submitted_by UUID )
LANGUAGE SQL
AS $PROCEDURE$
  INSERT INTO forms.submissions( id, form_id, section_id, layout_id, element_id, value, submitted_on, submitted_by )
  VALUES (_id, _form_id, _section_id, _layout_id, _element_id, _value, _submitted_on, _submitted_by);
$PROCEDURE$;


-- probably shouldn't have an update submission, but will leave for now
-- instead, create new submission as head of list linked to previous values
CREATE OR REPLACE PROCEDURE forms.update_submission (
  _id UUID,
  _form_id UUID,
  _section_id UUID,
  _layout_id UUID,
  _element_id UUID,
  _value TEXT,
  _submitted_on DATE,
  _submitted_by UUID
)
LANGUAGE sql
AS $procedure$
  UPDATE
    forms.submissions
  SET
  id = _id,
  form_id = _form_id,
  section_id = _section_id,
  layout_id = _layout_id,
  element_id = _element_id,
  value = _value,
  submitted_on = _submitted_on,
  submitted_by = _submitted_by
  WHERE
    id = _id;
$procedure$;


-- probably shouldn't delete submissions, but will leave for now
-- instead create new submission at head of linked list, with values empty?
CREATE OR REPLACE PROCEDURE forms.delete_submission (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM forms.submissions
  WHERE id = _id;
$procedure$;



CREATE OR REPLACE FUNCTION forms.query_submissions_collection(
  resource_path text[],
  query_keys text[],
  query_values text[] )
RETURNS TABLE(
  id UUID,
  form_id UUID,
  section_id UUID,
  layout_id UUID,
  element_id UUID,
  value TEXT,
  submitted_on DATE,
  submitted_by UUID
)
LANGUAGE sql STABLE
AS $function$

  SELECT (
    id, form_id, section_id, layout_id, element_id, value, submitted_on, submitted_by
  ) FROM forms.submissions

$function$;



CREATE OR REPLACE FUNCTION forms.query_submissions_resource( resource_id UUID )
RETURNS forms.submissions
LANGUAGE sql STABLE
AS $function$
  SELECT * FROM forms.submissions WHERE id=resource_id
$function$;
