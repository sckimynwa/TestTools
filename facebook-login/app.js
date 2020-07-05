const express = require('express');
const queryString = require('query-string');
const axios = require('axios');

const app = express();
async function getAccessTokenFromCode(code) {
    const { data } = await axios({
        url: 'https://graph.facebook.com/v4.0/oauth/access_token',
        method: 'get',
        params: {
            client_id: "331044621072978",
            client_secret: 's',
            redirect_uri: 'http://localhost:4000/auth/callback', 
            code,
        },
    });
    console.log(data);
    return data.access_token;
}


app.get('/login/facebook', function(req, res) {
    const stringifiedParams = queryString.stringify({
        client_id: "331044621072978",
        redirect_uri: 'http://localhost:4000/auth/callback',
        scope: ['email', 'user_friends'].join(','), // csv format
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
    });

    const facebookUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
    res.type('text/html').status(200).send(`
        <!DOCTYPE html>
        <html>
            <body>
            <a href={facebookUrl}>
                Login with Facebook
            </a>
            </body>
        </html>
    `);
});

app.get('/auth/callback', async(req, res) => {
    const access_token = await getAccessTokenFromCode(req.query.code);
    console.log(access_token);
    res.send("authentification success");
});

app.get('*', function(req, res) {
    res.send('hello world');
});

app.listen(4000, () => console.log('Now broswe to localhost:4000/graphql'));
