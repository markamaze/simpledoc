CREATE OR REPLACE PROCEDURE agency.create_category(
  category_id uuid,
  category_label text,
  category_behavior text,
  category_security character(4),
  category_data_structure text)
LANGUAGE sql
AS $procedure$
INSERT INTO agency.category_objects (
  category_id,
  category_label,
  category_behavior,
  category_security,
  category_data_structure)
VALUES (
  category_id,
  category_label,
  category_behavior,
  category_security,
  category_data_structure);
$procedure$;




CREATE OR REPLACE PROCEDURE agency.create_definition(
  definition_id UUID,
  definition_label text,
  category_id UUID,
  definition_security character(4),
  definition_data_structure text)
LANGUAGE sql
AS $procedure$
INSERT INTO agency.definition_objects (
  definition_id,
  definition_label,
  category_id,
  definition_security,
  definition_data_structure)
VALUES (
  definition_id,
  definition_label,
  category_id,
  definition_security,
  definition_data_structure);
$procedure$;




CREATE OR REPLACE PROCEDURE agency.create_agent(
  agent_id UUID,
  agent_link_id UUID,
  definition_id UUID,
  agent_security character(4),
  agent_data_structure text,
  agent_data text)
LANGUAGE sql
AS $procedure$
INSERT INTO agency.agent_objects (
  agent_id,
  agent_link_id,
  definition_id,
  agent_security,
  agent_data_structure,
  agent_data )
VALUES (
  agent_id,
  agent_link_id,
  definition_id,
  agent_security,
  agent_data_structure,
  agent_data );
$procedure$;
