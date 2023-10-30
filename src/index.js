import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Amplify from 'aws-amplify';
import './i18n';

Amplify.configure({
  aws_cognito_region: "us-east-1", // (required) - Region where Amazon Cognito project was created   
  aws_user_pools_id:  "us-east-1_jWnKlle4V", // (optional) -  Amazon Cognito User Pool ID   
  aws_user_pools_web_client_id: "3okmbk5lpiih1rl29ak2qv2uh2", // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
