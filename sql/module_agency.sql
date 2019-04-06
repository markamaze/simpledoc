DO $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_type) WHERE typname = 'agency.LINK_TYPE')
	THEN CREATE TYPE agency.LINK_TYPE AS ENUM (
	   'PARENT_OF', 'ASSIGNED_TO' );
	END IF;

	IF NOT EXISTS (SELECT 1 FROM pg_type) WHERE typname = 'agency.CATEGORY')
	THEN CREATE TYPE agency.CATEGORY AS ENUM (
	   'STRUCTURAL', 'ACTOR' );
	END IF;

	IF NOT EXISTS (SELECT 1 FROM pg_type) WHERE typname= 'agency.OBJECT_TYPE')
	THEN CREATE TYPE agency.OBJECT_TYPE AS ENUM (
	     'AGENT', 'AGENT_IMPL', 'AGENT_CATEGORY' );
	END IF;

	IF NOT EXISTS (SELECT 1 FROM pg_type) WHERE typname= 'agency.AGENCY_OBJECT')
	THEN CREATE TYPE agency.AGENCY_OBJECT (
	     object_id UUID,
	     object_type OBJECT_TYPE
	     object_data JSONB );
	END IF;
END$$;

--the data collected here by the agent object is meant
--  for use within the application, not business data
--  which would be collected by the documents module
--Can setup on front end to auto load certain info from
--  here into subscribed documents, ie: name, contact info
DROP TABLE IF EXISTS agency.agents_objects;
CREATE TABLE agency.agents (
       agent_id UUID,
       agent_impl_id UUID,
       agent_security INT(4),
       agent_data JSON
);

DROP TABLE IF EXISTS agency.agent_links;
CREATE TABLE agency.agent_links(
       agent_id UUID,
       linked_agent_id UUID,
       link_type LINK_TYPE
);

DROP TABLE IF EXISTS agency.agent_impls;
CREATE TABLE agency.agent_impls (
       agent_impl_id UUID,
       label TEXT,
       category_id UUID,
       data_definition JSONB,
       security_setting INT(4)
);

DROP TABLE IF EXISTS agency.category;
CREATE TABLE agency.category (
       category_id UUID,
       label TEXT,
       category_type CATEGORY,
       data_definition JSONB,
       security_setting INT(4)
);



DO$$
BEGIN

	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'agency.DATA_DEFINITION')
	THEN CREATE TYPE agency.DATA_DEFINITION AS (
	     data_definition_id UUID,
	     definition_label TEXT,
	     data_definition JSONB,
	     definition_security_setting INT(4),
	     category_label TEXT,
	     category_type CATEGORY,
	     category_definition JSONB,
	     category_security_setting INT(4)
	);

	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'agency.AGENT_LINK')
	THEN CREATE TYPE agency.AGENT_LINK AS (
	     agent_id UUID,
	     linked_agent_id UUID,
	     link_type LINK_TYPE
	);


	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'agency.AGENT_DATA')
	THEN CREATE TYPE agency.AGENT_DATA AS (
	     public_data JSONB,
	     protected_data JSONB,
	     private_data JSONB
	);

	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'agency.AGENT_SUBSCRIPTION')
	THEN CREATE TYPE agency.AGENT_SUBSCRIPTION AS (
	     subscribed_object_id UUID,
	     subscription_data JSONB
	);

	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'agency.AGENT_OBJECT')
	THEN CREATE TYPE agency.AGENT_OBJECT AS (
	     agent_id UUID,
	     security_setting INT(4),
	     agent_data AGENT_DATA,
	     linked_agents AGENT_LINK[],
	     data_definition DATA_DEFINITION,
	     agent_subscription AGENT_SUBSCRIPTION
	);

END$$;
 
 
CREATE OR REPLACE FUNCTION create_agent(new_agent_set agent_object[]) RETURNS BOOLEAN AS $operation_success$  
DECLARE  
   new_agent_set AGENT_OBJECT[];
   operation_success BOOLEAN;
   index integer := 1;
   link_index integer :=1;
BEGIN  
   WHILE index <= array_length(new_agent_set, 1) LOOP
      INSERT INTO agents (
      	     agent_id,
	     data_definition_id,
	     public_data,
	     protected_data,
	     private_data,
	     security_setting )
      VALUES (
      	     new_agent_set[index].agent_id,
	     new_agent_set[index].data_definition_id,
	     new_agent_set[index].public_data,
	     new_agent_set[index].protected_data,
	     new_agent_set[index].private_data,
	     new_agent_set[index].security_setting );


      WHILE link_index <= array_length(new_agent_set[index].linked_agents, 1) LOOP
      	    INSERT INTO agent_links(
	    	   agent_id,
		   linked_agent_id,
		   link_type)
	    VALUES (
	    	   new_agent_set[index].linked_agents[link_index].agent_id,
		   new_agent_set[index].linked_agents[link_index].linked_agent_id,
		   new_agent_set[index].linked_agents[link_index].link_type );
	    link_index := link_index + 1;
      END LOOP;

      index := index + 1;
      link_index := 1;
   END LOOP;
   operation_success := true;
   RETURN operation_success;
END;  
$operation_success$ LANGUAGE plpgsql;  
