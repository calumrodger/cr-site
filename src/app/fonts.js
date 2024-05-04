import { Lexend } from 'next/font/google'

import localFont from 'next/font/local'
 
export const lexend = Lexend({
    subsets: ['latin'],
    display: 'swap',
})
 
export const leagueSpartan = localFont({
    src: '../../public/fonts/LeagueSpartan-VF.ttf',
    subsets: ['latin'],
    display: 'swap',
})