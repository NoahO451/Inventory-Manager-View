import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './app';
import { Auth0Provider } from '@auth0/auth0-react';

import './index.css'



const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) { 
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      {/* 
        Refresh tokens and cacheLocation localstorage must both be enabled to 
        maintain auth between refreshes. We'll disable this in production once 
        we have a domain for first-party cookies. For now, tokens are stored 
        in local storage. 
        https://community.auth0.com/t/store-auth0-jwt-in-httponly-cookie/20314 */}
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        useRefreshTokens={true}
        cacheLocation='localstorage'
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        onRedirectCallback={(appState: any) => {
          window.history.pushState(
            {},
            document.title,
            appState?.returnTo || window.location.pathname
          );
        }}
      >
        <App />
      </Auth0Provider>
    </StrictMode>
  );
}