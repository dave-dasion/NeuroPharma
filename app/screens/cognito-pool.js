import {CognitoUserPool} from 'amazon-cognito-identity-js';
import { CLIENT_ID, USER_POOL_ID } from './awsconfig';
const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
};
export const cognitoPool = new CognitoUserPool(poolData);