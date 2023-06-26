import '@unocss/reset/tailwind.css'

import { Footer } from './components/Partials/Footer'
import { Route, Router, Routes } from '@solidjs/router'
import { Index } from './pages/Index'
import { About } from './pages/About'

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path={'/'} component={Index} />
                <Route path={'/about'} component={About} />
            </Routes>
            <Footer
                class={'grid-row-start-8 grid-col-start-1 grid-col-end-5'}
            />
        </Router>
    )
}
