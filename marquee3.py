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

x = 'CCL'
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

request_url = "https://api.marquee.gs.com/v1/assets/data"

request = session.get(url=request_url, headers = headers, params = params)
results = json.loads(request.text)
if results['totalResults'] != 0:
    a = (results['results'][0]['gsid'])
    request_url1 = "https://api.marquee.gs.com/v1/data/USCANFPP_MINI/query"
    request_query = {
                    "where": {
                        "gsid": [a],
                    },
                    "startDate": "2017-01-15",
                    "endDate":"2018-01-15"
               }


    request1 = session.post(url=request_url1, json=request_query)
    results1 = json.loads(request1.text)

    resultlist = []
    part = results1['data']
    buffer = []
    buffer1 = []
    buffer2 = []
    buffer3 = []
    for i in part:
        buffer.append(i['financialReturnsScore'])
        buffer1.append(i['growthScore'])
        buffer2.append(i['integratedScore'])
        buffer3.append(i['multipleScore'])
    resultlist.append(sum(buffer)/len(buffer))
    resultlist.append(sum(buffer1)/len(buffer1))
    resultlist.append(sum(buffer2)/len(buffer2))
    resultlist.append(sum(buffer3)/len(buffer3))
    print('financialReturnsScore ' + str(resultlist[0]))
    print('growthScore ' + str(resultlist[1]))
    print('integratedScore ' + str(resultlist[2]))
    print('multipleScore ' + str(resultlist[3]))
else:
    print('Error: not found')
