import { Lexend, Inter } from 'next/font/google'

import localFont from 'next/font/local'
 
export const lexend = Lexend({
    subsets: ['latin'],
    display: 'swap',
    variable: '--lexend'
})

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--inter'
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