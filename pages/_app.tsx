/**
 * Created 
 * Created by kagiso eugen sebogodion 22/09/03.
 *
 */

/**
 * @author Kagiso Eugene Sebogodi
 *@Organization chameleon-techie pty
 */
import { SessionProvider } from "next-auth/react"
import {Container} from 'react-bootstrap'
import '../style/index.css'

import type { AppProps } from "next/app"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
