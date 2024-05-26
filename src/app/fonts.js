import { Lexend,  } from 'next/font/google'

import localFont from 'next/font/local'
 
export const lexend = Lexend({
    subsets: ['latin'],
    display: 'swap',
    variable: '--lexend'
})

export const goudy = localFont({
    src: '../../public/fonts/goudy_bookletter_1911-webfont.ttf',
    subsets: ['latin'],
    display: 'swap',
    variable: '--goudy'
})

export const teachers = localFont({
    src: '../../public/fonts/Teachers.ttf',
    subsets: ['latin'],
    display: 'swap',
    variable: '--teachers'
})
 
export const leagueSpartan = localFont({
    src: '../../public/fonts/LeagueSpartan-VF.ttf',
    subsets: ['latin'],
    display: 'swap',
    variable: '--league-spartan'
})

export const leagueScript = localFont({
    src: '../../public/fonts/LeagueScript.ttf',
    subsets: ['latin'],
    display: 'swap',
    variable: '--league-script'
})

