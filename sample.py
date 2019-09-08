from datetime import date
from gs_quant.data import Dataset
from gs_quant.markets.securities import SecurityMaster, AssetIdentifier
from gs_quant.session import GsSession
client_id = '48d117ad4e9045b8a4ae357972acf9dd'
client_secret = 'e14e42f89cb87deeb5eee6237ac7ebcb5bd935a9b27b838abcdf4307b326fe8d'
# log in to Marquee
scopes = GsSession.Scopes.get_default()
GsSession.use(client_id=client_id, client_secret=client_secret, scopes=scopes)
# retrieve data for some GSIDs within a date range
ds = Dataset('USCANFPP_MINI')
# get a list of covered GSIDs
gsids = ds.get_coverage()['gsid'].values.tolist()
data = ds.get_data(date(2017, 1, 15), date(2018, 1, 15), gsid=gsids[0:5])
# peek at first few rows of data
print(data.head())
# retrieve asset metadata using Securities Master
for idx, row in data.iterrows():
    marqueeAssetId = row['assetId']
    asset = SecurityMaster.get_asset(marqueeAssetId, AssetIdentifier.MARQUEE_ID)
    data.loc[data['assetId'] == marqueeAssetId, 'assetName'] = asset.name

mprint(data.head())
