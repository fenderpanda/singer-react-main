import {OktaAuth} from "@okta/okta-auth-js";

const oktaAuth = new OktaAuth({
    clientId: 'You Okta client-id',
    issuer: 'You Okta issuer URI',
    redirectUri: `${window.location.origin + process.env.PUBLIC_URL}/login/callback`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    responseType: ['id_token', 'token']
});

export default oktaAuth;