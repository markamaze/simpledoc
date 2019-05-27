# get data from src/test/data/http_request_samples

curl --header "Content-Type: application/json" --request POST \
--data @src/test/data/http_request_samples/agency_definition.json \
localhost:3000/Agency
