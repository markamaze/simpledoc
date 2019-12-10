CREATE OR REPLACE PROCEDURE agency.delete_agent (_id UUID)
LANGUAGE sql
AS $procedure$
  DELETE FROM agency.agents
    WHERE id = _id;
$procedure$;




CREATE OR REPLACE PROCEDURE agency.delete_agentTemplate (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.agentTemplates
  WHERE id = _id;
$procedure$;




CREATE OR REPLACE PROCEDURE agency.delete_structuralNode (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.structuralNodes
  WHERE id = _id;
$procedure$;




CREATE OR REPLACE PROCEDURE agency.delete_dataTag (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.dataTags
  WHERE id = _id;
$procedure$;




CREATE OR REPLACE PROCEDURE agency.delete_user (_id UUID)
LANGUAGE sql
AS $procedure$
DELETE FROM agency.users
  WHERE id = _id;
$procedure$;
