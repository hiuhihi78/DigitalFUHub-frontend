import React from 'react';
import config from '~/config';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';

import Routing from './routes/Routing';
import Auth from './routes/Auth';
import ContextContainer from './context/ContextContainer';
//import refreshToken from '~/api/refreshToken';

const GOOGLE_CLIENT_ID = config.googleClientId

function App() {
    return (
        <ContextContainer>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <AuthProvider
                    authType={'cookie'}
                    authName={'_auth'}
                    //refresh={refreshToken}
                    cookieDomain={window.location.hostname}
                    cookieSecure
                >
                    <Auth>
                        <ConfigProvider locale={viVN}>
                            <Router>
                                <Routing />
                            </Router>
                        </ConfigProvider>
                    </Auth>
                </AuthProvider>
            </GoogleOAuthProvider>
        </ContextContainer>
    );
}

export default App;
