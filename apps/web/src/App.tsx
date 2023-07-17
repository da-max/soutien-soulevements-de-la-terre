import '@unocss/reset/tailwind.css'
import './styles/index.css'

import { Footer } from './components/Partials/Footer'
import { hashIntegration, Route, Router, Routes } from '@solidjs/router'
import { Index } from './pages/Index'
import { About } from './pages/About'
import { Callback } from './pages/Callback'
import { MatchFilters } from '@solidjs/router/dist/types'
import { setTokenAxiosHeader } from './utils'
import axios from 'axios'
import { SourceType } from '@soutien-soulevements-de-la-terre/utils'

const filters: MatchFilters = {
    type: Object.values(SourceType),
}

export const App = () => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL
    setTokenAxiosHeader()

    return (
        <Router source={hashIntegration()}>
            <Routes>
                <Route path={'/'} component={Index} />
                <Route path={'/about'} component={About} />
                <Route
                    path={'/callback/:type'}
                    matchFilters={filters}
                    component={Callback}
                />
                <Route path={'/twitter'} component={Callback} />
            </Routes>
            <Footer
                class={'grid-row-start-8 grid-col-start-1 grid-col-end-5'}
            />
        </Router>
    )
}
