CREATE OR REPLACE PROCEDURE agency.update_agent (
  _id UUID,
  _linkId UUID,
  _templateId UUID,
  _assigned_userId UUID,
  _isActive BOOLEAN,
  _dataTagIds UUID[] )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.agents
  SET
    structuralNode_link_id = _linkId,
    agentTemplate_id = _templateId,
    assigned_user_id = _assigned_userId,
    agent_is_active = _isActive,
    agent_dataTag_ids = _dataTagIds
  WHERE
    id = _id;
$procedure$;




CREATE OR REPLACE PROCEDURE agency.update_agentTemplate (
  _id UUID,
  _label TEXT,
  _security CHAR(4),
  _dataTags UUID[],
  _properties JSON )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.agentTemplates
  SET
    agentTemplate_label = _label,
    agentTemplate_security = _security,
    agentTemplate_dataTag_ids = _dataTags,
    agentTemplate_properties = _properties
  WHERE
    id = _id;
$procedure$;




CREATE OR REPLACE PROCEDURE agency.update_structuralNode (
  _id UUID,
  _label TEXT,
  _parentId UUID,
  _agentAssignments JSON,
  _dataTagIds UUID[],
  _properties JSON )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.structuralNodes
  SET
    structuralNode_label = _label,
    structuralNode_parent_id = _parentId,
    agent_assignments = _agentAssignments,
    structuralNode_dataTag_ids = _dataTagIds,
    structuralNode_properties = _properties
  WHERE
    id = _id;
$procedure$;




CREATE OR REPLACE PROCEDURE agency.update_dataTag (
  _id UUID,
  _label TEXT,
  _tagType TEXT,
  _properties JSON,
  _typeObjects JSON )
LANGUAGE sql
AS $procedure$
  UPDATE
    agency.dataTags
  SET
    dataTag_label = _label,
    dataTag_tagType = _tagType,
    dataTag_properties = _properties,
    dataTag_typeObjects = _typeObjects
  WHERE
    id = _id;
$procedure$;




CREATE OR REPLACE PROCEDURE agency.update_user (
  _id UUID,
  _username TEXT,
  _password TEXT )
LANGUAGE sql
AS $procedure$
UPDATE
  agency.users
SET
  username = _username,
  password = _password
WHERE
  id = _id;
$procedure$;
