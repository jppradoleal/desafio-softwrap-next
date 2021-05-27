import type {AppProps} from 'next/app';
import React from 'react';
import {AuthProvider} from '../utils/auth';
import GlobalStyle from '../styles/components/styles/globalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
