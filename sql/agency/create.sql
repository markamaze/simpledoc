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
  dataTags UUID[],
  properties JSON )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.agentTemplates (
    id,
    agentTemplate_label,
    agentTemplate_security,
    agentTemplate_dataTag_ids,
    agentTemplate_properties)
  VALUES ( id, label, security, dataTags, properties );
$procedure$;




CREATE OR REPLACE PROCEDURE agency.create_structuralNode (
  id UUID,
  label TEXT,
  parentId UUID,
  agentAssignments JSON,
  dataTagIds UUID[],
  properties JSON )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.structuralNodes (
    id,
    structuralNode_label,
    structuralNode_parent_id,
    agent_assignments,
    structuralNode_dataTag_ids,
    structuralNode_properties )
  VALUES (id, label, parentId, agentAssignments, dataTagIds, properties);
$procedure$;




CREATE OR REPLACE PROCEDURE agency.create_dataTag (
  id UUID,
  label TEXT,
  tagType TEXT,
  properties JSON,
  typeObjects JSON )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.dataTags (
    id,
    dataTag_label,
    dataTag_tagType,
    dataTag_properties,
    dataTag_typeObjects
  )
  VALUES ( id, label, tagType, properties, typeObjects );
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
