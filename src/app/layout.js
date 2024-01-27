import '../styles/globals.scss'

import localFont from 'next/font/local'
 
// Font files can be colocated inside of `app`
const myFont = localFont({
  src: './fonts/LeagueSpartan-VF.ttf',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.spartan}>
      <body>{children}</body>
    </html>
  )
}