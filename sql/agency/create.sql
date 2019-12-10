CREATE OR REPLACE PROCEDURE agency.create_agent (
  id UUID,
  linkId UUID,
  templateId UUID,
  assigned_userId UUID,
  isActive BOOLEAN,
  dataTagIds UUID[]
)
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.agents (
    id,
    structuralNode_link_id,
    agentTemplate_id,
    assigned_user_id,
    agent_is_active,
    agent_dataTag_ids )
  VALUES ( id, linkId, templateId, assigned_userId, isActive, dataTagIds );
$procedure$;




CREATE OR REPLACE PROCEDURE agency.create_agentTemplate (
  id UUID,
  label TEXT,
  security CHAR(4),
  dataTags UUID[] )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.agentTemplates (
    id,
    agentTemplate_label,
    agentTemplate_security,
    agentTemplate_dataTag_ids )
  VALUES ( id, label, security, dataTags );
$procedure$;




CREATE OR REPLACE PROCEDURE agency.create_structuralNode (
  id UUID,
  label TEXT,
  parentId UUID,
  agentAssignments TEXT,
  dataTagIds UUID[] )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.structuralNodes (
    id,
    structuralNode_label,
    structuralNode_parent_id,
    agent_assignments,
    structuralNode_dataTag_ids )
  VALUES (id, label, parentId, agentAssignments, dataTagIds);
$procedure$;




CREATE OR REPLACE PROCEDURE agency.create_dataTag (
  id UUID,
  label TEXT,
  tagForAgent BOOLEAN )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.dataTags (
    id,
    dataTag_label,
    dataTag_for_agent
  )
  VALUES ( id, label, tagForAgent );
$procedure$;




CREATE OR REPLACE PROCEDURE agency.create_user (
  id UUID,
  username TEXT,
  password TEXT )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.users (
    id,
    username,
    password
  )
  VALUES ( id, username, password );
$procedure$;
