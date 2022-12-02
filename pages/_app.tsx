import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../Redux/store'
// import './../src/sass/index.sass'
import PopupProvider from '../common/Providers/PopupProvider'

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <PopupProvider />
    <Component {...pageProps} />
  </Provider>
}
