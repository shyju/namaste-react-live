import auth0 from 'auth0-js';
import { SHA256 } from 'crypto-js';
import { toast } from 'react-toastify';

const domain = process.env.AUTH_DOMAIN;
const clientId = process.env.AUTH_CLIENT_ID;
const redirectUri = process.env.AUTH_REDIRECT_URI
const logoutRedirectUri = process.env.AUTH_LOGOUT_REDIRECT_URI;

const auth = new auth0.WebAuth({
  clientID: clientId,
  domain,
  responseType: 'token id_token',
  scope: 'openid profile email offline_access',
  redirectUri
})

export const Authlogin = (username, password) => {
  const hashedPassword = SHA256(password).toString();
   auth.login({username, password: hashedPassword} , (err, response) => {
    if (err)  {
      toast.warn(`${err.error_description}`)
    } else {
      toast.success(`Login successful`);
      return response;
    }
  })
}

export const GoogleLogin = () => {
  auth.authorize({
    connection: 'google-oauth2'
  })
}

export const FacebookLogin = () => {
  auth.authorize({
    connection: 'facebook'
  })
}

export const AuthSignUp = (email, password) => {
  const hashedPassword = SHA256(password).toString();
  auth.signup({
    email,
    password: hashedPassword,
    connection: 'Username-Password-Authentication'
  }, (err, response) => {
    if (err?.statusCode === 400) {
      const {message, error} = err?.original?.response?.body;
      console.log(`err: ${JSON.stringify(err)}`)
      toast.warn(message ?? error);
      return;
    } 

    if (response) {
      toast.success('Done!! Now you can Login');
    }
  })
}

export const AuthLogout = () => {
  auth.logout({
      clientID: clientId,
      returnTo: logoutRedirectUri
  })
}

export const handleAuthentication = () => {
  return new Promise((resolve, reject) => {
    auth.parseHash((err, authResult) => {
      console.log('Result:', authResult);
      if (authResult && authResult.accessToken && authResult.idTokenPayload) {
        return resolve(authResult.idTokenPayload);
      } else {
        console.log(err);
        return reject(err);
      }
    })
  })
}

export const renewSession = () => {
  return new Promise((resolve, reject) => {
    auth.checkSession({}, (err, authResult) => {
      console.log('Renew:', authResult);
      if (authResult && authResult.accessToken && authResult.idTokenPayload) {
        return resolve(authResult.idTokenPayload);
      } else if (err) {
        return reject();
      }
    })
  })
}