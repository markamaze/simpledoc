CREATE TABLE agency.agents (
  id UUID,
  structuralNode_link_id UUID,
  agentTemplate_id UUID,
  assigned_user_id UUID,
  agent_is_active BOOLEAN,
  agent_dataTag_ids UUID[]
);




CREATE TABLE agency.agentTemplates (
  id UUID,
  agentTemplate_label TEXT,
  agentTemplate_security CHAR(4),
  agentTemplate_dataTag_ids UUID[]
);




CREATE TABLE agency.structuralNodes (
  id UUID,
  structuralNode_label TEXT,
  structuralNode_parent_id UUID,
  agent_assignments TEXT,
  structuralNode_dataTag_ids UUID[]
);




CREATE TABLE agency.dataTags (
  id UUID,
  dataTag_label TEXT,
  dataTag_for_agent BOOLEAN
);




CREATE TABLE agency.users (
  id UUID,
  username text,
  password text
);
