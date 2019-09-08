import requests
import json
import pprint

auth_data = {
    "grant_type"    : "client_credentials",
    "client_id"     : "48d117ad4e9045b8a4ae357972acf9dd",
    "client_secret" : "e14e42f89cb87deeb5eee6237ac7ebcb5bd935a9b27b838abcdf4307b326fe8d",
    "scope"         : "read_product_data"
};

headers = {
    'Authorization': 'Bearer wcE2AOxMwfboasD5Z9yMmjTjsZmY',
    'Content-Type': 'application/json',
}

x = 'AA'
params = (
    ('ticker', x),
    ('exchange', 'NYSE'),
    ('asOfTime', '2017-02-28T16:29:00Z'),
    #('fields', 'id,name,gsid,ticker,bbid'),
    ('fields', 'gsid'),

)

session = requests.Session()

auth_request = session.post("https://idfs.gs.com/as/token.oauth2", data = auth_data)
access_token_dict = json.loads(auth_request.text)
access_token = access_token_dict["access_token"]

# update session headers with access token
session.headers.update({"Authorization":"Bearer "+ access_token})

request_url = "https://api.marquee.gs.com/v1/assets/data?gsid=" + gsid

request = session.get(url=request_url)
print(request["u\'results"][0][])
results = json.loads(request.text)

pprint.pprint(results)
