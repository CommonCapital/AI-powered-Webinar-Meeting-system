"use client"

import * as React from 'react'
import { ThemeProvider as NextThemesProider} from 'next-themes'

export function ThemeProvider({children, ...props}: React.ComponentProps<typeof NextThemesProider>) {
    return <NextThemesProider {...props}>{children}</NextThemesProider>
}