# get data from src/test/data/http_request_samples

curl --header "Content-Type: application/json" --request POST \
--data '{"data": [{"id":"my_id", "type":"I_forget"}]}' \
localhost:3000/Agency