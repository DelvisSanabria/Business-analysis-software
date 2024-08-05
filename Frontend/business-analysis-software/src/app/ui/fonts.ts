import { Montserrat, Antonio, Pacifico } from "next/font/google"

export const montserrat = Montserrat({
    subsets: ['latin'],
})

export const antonio = Antonio({
    subsets: ['latin'],
})

export const pacifico = Pacifico(
    {
        subsets: ['latin'],
        weight: ["400"],
    }
)