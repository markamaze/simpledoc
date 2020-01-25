CREATE TABLE forms.layouts (
  id UUID,
  label TEXT,
  form_id UUID,
  section_id UUID,
  element_ids UUID[],
  completion_rules JSON,
  display_settings JSON
)
