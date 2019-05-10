CREATE TABLE agency.category_objects (
    category_id UUID,
    category_label text,
    category_behavior text,
    category_security character(4),
    category_data_structure text
);




CREATE TABLE agency.definition_objects (
    definition_id UUID,
    definition_label text,
    category_id UUID,
    definition_security character(4),
    definition_data_structure text
);




CREATE TABLE agency.agent_objects (
    agent_id UUID,
    agent_link_id UUID,
    definition_id UUID,
    agent_security character(4),
    agent_data_structure text,
    agent_data text
);
