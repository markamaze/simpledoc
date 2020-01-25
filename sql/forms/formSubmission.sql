CREATE TABLE forms.submissions (
  id UUID,
  form_id UUID,
  section_id UUID,
  layout_id UUID,
  element_id UUID,
  value TEXT,
  submitted_on DATE,
  submitted_by UUID
)
