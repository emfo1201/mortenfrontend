import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './components/Auth/AuthContext';
import Home from './components/Home';
import Admin from './components/Admin/Admin';
import ListView from './components/ListView';
import PlayerView from "./components/PlayerView";
import Main from './components/Layout/Main';
import Login from './components/Auth/Login';
import PageNotFound from './components/PageNotFound';
import Players from './components/Players/Players';
import PlayerDetails from './components/PlayerDetails/PlayerDetails';
import { useDispatch } from "react-redux";
import { getCategory } from "./actions/menu";
import { getPlayer } from "./actions/players";

function App() {
    const dispatch = useDispatch();
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getPlayer());
        dispatch(getCategory());
    }, [currentPlayer, dispatch]);

    return (
        <AuthProvider>
                <Main>
                    <Routes>
                        <Route exact path="/" element={<Home />}/>
                        <Route exact path="/admin" element={<Admin /> }/>
                        <Route exact path="/login" element={<Login /> }/>
                        <Route path="/listview/:name" element={<ListView />} />
                        <Route exact path="/playerview" element={<PlayerView />}/>
                        <Route exact path="/404" element={<PageNotFound />} />
                        <Route exact path="/players/:category,:subCategory" element={<Players />} />
                        <Route exact path="/players/search" element={<Players />}/>
                        <Route exact path="/players/:id" element={<PlayerDetails />}/>
                    </Routes>
                </Main>
        </AuthProvider>
    );
}

export default App;