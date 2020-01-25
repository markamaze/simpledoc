CREATE TABLE forms.sections (
  id UUID,
  label TEXT,
  form_id UUID,
  layout_ids UUID[],
  completion_rules JSON,
  security_settings JSON
)
