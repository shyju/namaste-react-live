import auth0 from 'auth0-js';
import { toast } from 'react-toastify';

// const domain = "dev-bitgs785.us.auth0.com";
// const clientId = "H2gTbJluqTTPIaPVnkMxlgKom3Uu8wry";
// const redirectUri = "http://localhost:1234"
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
   auth.login({username, password} , (err, response) => {
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
  auth.signup({
    email,
    password,
    connection: 'Username-Password-Authentication'
  }, (err, response) => {
    if (err?.statusCode === 400) {
      toast.warn('Email already exists. Try a different email');
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
    }, (err, response) => {
      if (err) {
        toast.warn('Logout unsuccessful')
      } else {
        toast.success('Logout successful')
      }
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
      if (authResult && authResult.accessToken && authResult.idToken) {
        return resolve({token: authResult.idToken});
      } else if (err) {
        // alert(`Could not get a new token (${err.error})`);
        return reject();
      }
    })
  })
}