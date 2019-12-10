# get data from src/test/data/http_request_samples

curl --header "Content-Type: application/json" --request PUT \
--data @src/test/data/http_request_samples/agency_agent_update.json \
localhost:3000/Agency
