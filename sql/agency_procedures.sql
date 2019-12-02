CREATE OR REPLACE PROCEDURE agency.create_agentTemplate (
  id UUID,
  label TEXT,
  secuirity CHAR(4),
  dataTags UUID[],
  dataStructure TEXT )
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.agentTemplates (
    agentTemplate_id,
    agentTemplate_label,
    agentTemplate_secuirty,
    agentTemplate_dataTags,
    agentTemplate_data_structure )
  VALUES ( id, label, secuirity, dataTags, dataStructure );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.create_agent (
  id UUID,
  linkId UUID,
  templateId UUID,
  assigned_userId UUID,
  isActive BOOLEAN,
  dataStructure TEXT
)
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.agents (
    agent_id,
    agent_link_id,
    agent_template_id,
    assigned_user_id,
    is_active,
    agent_data_structure
  )
  VALUES ( id, linkId, templateId, assigned_userId, isActive, dataStructure );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.create_structuralNode (
  id UUID,
  label TEXT,
  dataTags UUID[],
  parentId UUID,
  agentAssignments TEXT,
  dataStructure TEXT
)
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.structuralNodes (
    structuralNode_id,
    structuralNode_label,
    structuralNode_dataTags,
    structuralNode_parent_id,
    agent_assignments,
    structuralNode_data_structure
  )
  VALUES (id, label, dataTags, parentId, agentAssignments, dataStructure);
$procedure$;



CREATE OR REPLACE PROCEDURE agency.create_dataTag (
  id UUID,
  label TEXT,
  tagFor ENUM(["STRUCTURAL", "AGENT"])
)
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.dataTags (
    dataTag_id,
    dataTag_label,
    dataTag_for
  )
  VALUES ( id, label, tagFor );
$procedure$;



CREATE OR REPLACE PROCEDURE agency.create_user (
  id UUID,
  username TEXT,
  password TEXT
)
LANGUAGE sql
AS $procedure$
  INSERT INTO agency.users (
    user_id,
    username,
    password
  )
  VALUES ( id, username, password );
$procedure$;
