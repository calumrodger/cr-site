import localFont from 'next/font/local'
 
// Font files can be colocated inside of `app`
const myFont = localFont({src: '../../public/fonts/LeagueSpartan-VF.ttf', weight: ['100','400','900']})

import '../styles/globals.scss'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}