const awsConfig = {
  Auth: {
    region: 'us-east-1', // your region
    userPoolId: 'us-east-1_bkRsb5IOe',
    userPoolWebClientId: '1ai007ht4u14lb5mk6fe7me0cd',
    oauth: {//https://us-east-1bkrsb5ioe.auth.us-east-1.amazoncognito.com
      domain: 'us-east-19wz4couvt.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'openid','phone'],
      redirectSignIn: 'http://localhost:5174', // or your app URL
      // redirectSignOut: 'http://localhost:5173',
      responseType: 'code',
    }
  }
};

export default awsConfig;
// 'https//:us-east-1bkrsb5ioe.auth.us-east-1.amazoncognito.com/oauth2/authorize?lang=es&response_type=code&client_id=58rmeaeu7fir1cnulk711njvh0&redirect_uri=http://localhost:5173'