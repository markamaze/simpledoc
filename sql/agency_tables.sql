CREATE TABLE agency.agent_objects (
    agent_id character(36),
    agent_label text,
    agent_link character(36),
    agent_security character(4),
    agent_data_structure text,
    agent_data text
);


ALTER TABLE agency.agent_objects OWNER TO pqtafaszpcncjx;






CREATE TABLE agency.category_objects (
    category_id character(36),
    category_label text,
    category_behavior text,
    category_security character(4),
    category_data_structure text
);


ALTER TABLE agency.category_objects OWNER TO pqtafaszpcncjx;







CREATE TABLE agency.definition_objects (
    definition_id character(36),
    definition_label text,
    category_id text,
    definition_security character(4),
    definition_data_structure text
);


ALTER TABLE agency.definition_objects OWNER TO pqtafaszpcncjx;
