import axios from 'axios';
import Constants from 'expo-constants';

const expoHostUri = Constants.expoConfig?.hostUri;
const expoHost = expoHostUri
  ? new URL(`http://${expoHostUri}`).hostname
  : null;

const configuredApiBaseURL = process.env.EXPO_PUBLIC_API_URL;
const developmentApiBaseURL = expoHost
  ? `http://${expoHost}:3002/api`
  : 'http://localhost:3002/api';
const apiBaseURL =
  configuredApiBaseURL ||
  (__DEV__ ? developmentApiBaseURL : undefined);

if (!apiBaseURL) {
  throw new Error(
    'Set EXPO_PUBLIC_API_URL to the deployed API URL before building the production app.'
  );
}

if (!__DEV__ && new URL(apiBaseURL).protocol !== 'https:') {
  throw new Error(
    'EXPO_PUBLIC_API_URL must use HTTPS in production.'
  );
}

export default axios.create({
  baseURL: apiBaseURL,
  timeout: 15000,
});
