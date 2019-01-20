import { Auth } from 'aws-amplify';
import { GOOGLE_ID } from '../config/config';

export const createScript = () => {
    // load the Google SDK
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.onload = initGapi;
    document.body.appendChild(script);
  }

export const signIn = (history) => {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.signIn().then(
        googleUser => {
          console.log("google user---", googleUser);
            getAWSCredentials(googleUser, history);
        },
        error => {
            console.log(error);
        }
    );
  }
  
  async function getAWSCredentials(googleUser, history) {
    const { id_token, expires_at } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();
    let user = {
        email: profile.getEmail(),
        name: profile.getName()
    };
    
    const credentials = await Auth.federatedSignIn(
        'google',
        { token: id_token, expires_at },
        user
    );
    console.log('credentials', credentials);
    if(credentials)
        history.push('dashboard');
  }
  
  
  
export const initGapi = () => {
    // init the Google SDK client
    const g = window.gapi;
    g.load('auth2', function() {
        g.auth2.init({
            client_id: GOOGLE_ID,
            // authorized scopes
            scope: 'profile email openid'
        });
    });
}
  