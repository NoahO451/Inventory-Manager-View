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
      <Auth0Provider
        domain={domain}
        clientId={clientId}
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