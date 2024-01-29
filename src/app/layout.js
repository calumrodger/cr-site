// Font files can be colocated inside of `app`
import { lexend } from './fonts.js'

import '../styles/globals.scss'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className}>{children}</body>
    </html>
  )
}