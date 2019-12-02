CREATE TABLE agency.agentTemplates (
  agentTemplate_id UUID,
  agentTemplate_label TEXT,
  agentTemplate_secuirty CHAR(4),
  agentTemplate_dataTags UUID[],
  agentTemplate_data_structure TEXT
);

CREATE TABLE agency.agents (
  agent_id UUID,
  agent_link_id UUID,
  agent_template_id UUID,
  assigned_user_id UUID,
  agent_dataTags UUID[],
  is_active BOOLEAN,
  agent_data_structure TEXT
);

CREATE TABLE agency.structuralNodes (
  structuralNode_id UUID,
  structuralNode_label TEXT,
  structuralNode_dataTags UUID[],
  structuralNode_parent_id UUID,
  agent_assignments TEXT,
  structuralNode_data_structure TEXT
);

CREATE TABLE agency.dataTags (
  dataTag_id UUID,
  dataTag_label TEXT,
  dataTag_for ENUM(["STRUCTURAL", "AGENT"])
);

CREATE TABLE agency.users (
  user_id UUID,
  username text,
  password text
);
