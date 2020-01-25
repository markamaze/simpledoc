CREATE TABLE forms.formsSets (
  id UUID,
  label TEXT,
  form_ids UUID[],
  completion_rules JSON,
  security_settings JSON
)
