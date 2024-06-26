// Font files can be colocated inside of `app`
import { lexend, leagueSpartan, leagueScript } from './fonts.js'
import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.scss'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{backgroudColor: "transparent"}}className={`${lexend.variable} ${leagueSpartan.variable} ${leagueScript.variable}`}>{children}</body>
      <Analytics />
    </html>
  )
}