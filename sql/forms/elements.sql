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
