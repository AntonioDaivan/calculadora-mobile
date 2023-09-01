import { useState } from "react"
import { ThemeProvider } from "styled-components"

import { HomeComponent } from "./src/screens/Home.js"

import { dark, light } from "./src/themes/themes.js"

export default function App() {

    const [ theme, setTheme ] = useState(light)

    const toggleTheme = () => {
        setTheme(theme.title === 'light' ? dark : light)
    }

    return (
        <ThemeProvider theme={theme}>
            <HomeComponent toggleTheme={toggleTheme} />
        </ThemeProvider>
    )
}
