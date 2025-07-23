// import { useEffect } from "react";

// const AWS_COGNITO_LOGIN_URL = "https://us-east-19wz4couvt.auth.region.amazoncognito.com/login?client_id=ci9eipuin29bm62r5pcvdc3vr&response_type=code&scope=openid+profile&redirect_uri=https://yourdomain.com/callback";

// const CognitoLoginRedirect = () => {
//   useEffect(() => {
//     window.location.href = AWS_COGNITO_LOGIN_URL;
//   }, []);

//   return null;
// };

// export default CognitoLoginRedirect;
import React, { useEffect } from 'react';
import * as awsconfig from './aws-exports';

const CognitoLoginRedirect = () => {
  useEffect(() => {
    console.log('awsconfig:', awsconfig);
    console.log('awsconfig.Auth:', awsconfig.default.Auth);

    const { domain, redirectSignIn, responseType, scope } = awsconfig.default.Auth.oauth;
    const clientId = awsconfig.default.Auth.userPoolWebClientId;

    const url = new URL(`https://${domain}/login`);
    url.searchParams.append('client_id', clientId);
    url.searchParams.append('response_type', responseType);
    url.searchParams.append('scope', scope.join(' '));
    url.searchParams.append('redirect_uri', redirectSignIn);

    window.location.href = url.toString();
  }, []);

  return <div>Redirecting to Cognito login...</div>;
};

export default CognitoLoginRedirect;
