import React, {Suspense, lazy} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '@/pages/Home'))
const About = lazy(() => import(/* webpackChunkName: "Home" */ '@/pages/About'))

export default () => (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </Switch>
        </Suspense>
    </BrowserRouter>
)
