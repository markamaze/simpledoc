CREATE OR REPLACE PROCEDURE agency.create_agent(
    agent_id text, 
    agent_label text, 
    agent_link text, 
    agent_security text, 
    agent_data_structure text, 
    agent_data text)
LANGUAGE sql
AS $procedure$
INSERT INTO agency.agent_objects (
            agent_id,
            agent_label,
            agent_link,
            agent_security,
            agent_data_structure,
            agent_data )
        VALUES (
            agent_id, 
            agent_label,
            agent_link,
            agent_security,
            agent_data_structure,
            agent_data );
$procedure$;









CREATE OR REPLACE PROCEDURE agency.create_category(
    category_id text, 
    category_label text, 
    category_behavior text, 
    category_security text, 
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
    definition_id text, 
    definition_label text, 
    category_id text, 
    definition_security text, 
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







CREATE OR REPLACE PROCEDURE agency.query_resource_collection(
    resource_path text[], 
    query text[])
LANGUAGE sql
AS $procedure$

$procedure$;








CREATE OR REPLACE PROCEDURE agency.query_single_resource(
    resource_path text[], 
    query text[])
LANGUAGE sql
AS $procedure$

$procedure$;
