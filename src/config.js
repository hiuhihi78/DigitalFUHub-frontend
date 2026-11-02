// App settings. In Docker they come from window._env_ (public/env-config.js, written from WEB_*
// variables when the container starts), so one image works in every environment.
// With `npm start` window._env_ is empty and the REACT_APP_* values from .env are used.
const runtime = window._env_ || {};

const config = {
    apiBaseUrl: runtime.API_BASE_URL || process.env.REACT_APP_API_BASE_URL,
    googleClientId: runtime.GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID,
    tokenExpiresTime: runtime.TOKEN_EXPIRES_TIME || process.env.REACT_APP_TOKEN_EXPIRES_TIME,
};

export default config;
