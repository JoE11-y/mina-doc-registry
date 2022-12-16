import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import { AppProps } from 'next/app';
import { MinaProvider } from '../lib/context/minaWeb3';
import Head from 'next/head';
import favicon from 'lib/assets/registry.png';

function App({ Component, pageProps }: AppProps) {
  return (
    <MinaProvider>
      <Head>
        <title>Mina Doc Registry</title>
        <link rel="icon" type="image/png" href={favicon.src} />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </MinaProvider>
  )
}

export default App;

