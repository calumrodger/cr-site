import localFont from 'next/font/local'
 
// Font files can be colocated inside of `app`
import { Lexend } from 'next/font/google'

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
})
 
const myFont = localFont({src: '../../public/fonts/LeagueSpartan-VF.ttf'})

import '../styles/globals.scss'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lexend.className}>
      <body>{children}</body>
    </html>
  )
}