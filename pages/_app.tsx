import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../Redux/store'
import './../src/sass/index.sass'
import PopupProvider from '../common/Providers/PopupProvider'
import Header from '../common/Header'
import SysMessagesProvider from '../common/Providers/SysMessagesProvider'

// TEMPORARY FUNCTION. DELETE
function logOut () {
  return ''
}

export default function App({ Component, pageProps, ...appRoutes }: AppProps) {
  
  if (appRoutes.router.pathname.includes('/auth')) return <Provider store={store}>
    <SysMessagesProvider>
        <PopupProvider />
        <Component {...pageProps} />
    </SysMessagesProvider>
  </Provider>
  

  return <Provider store={store}>
    <SysMessagesProvider>
        <Header logOut={logOut}></Header>
        <PopupProvider />
        <Component {...pageProps} />
    </SysMessagesProvider>
  </Provider>
}
