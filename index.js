const got = require("got")

const credentials = {
    client: {
        id: "48d117ad4e9045b8a4ae357972acf9dd",
        secret: "e14e42f89cb87deeb5eee6237ac7ebcb5bd935a9b27b838abcdf4307b326fe8d"
    },
    auth: {
        tokenHost: "https://idfs.gs.com",
        authorizePath: "/as/authorization.oauth2",
        tokenPath: "/as/token.oauth2?scope=read_product_data"
    }
};

const callApi = (t) => {
    const args = {
        "headers": {
            "Authorization": "Bearer " + t.token.access_token,
            "Content-Type": "application/json"
        },
        "json": true
    };

    got.get("https://api.marquee.gs.com/v1/assets/data", args)
            .then(response => console.log(response.body), console.error.bind(console))
};

const oauth2 = require("simple-oauth2").create(credentials);
oauth2.clientCredentials
      .getToken({})
      .then(r => oauth2.accessToken.create(r))
      .then(callApi)
      .then(console.log, console.error);
