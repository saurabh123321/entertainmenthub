import React from 'react'
import Header from './components/Header';
import './App.css'
import {Container } from "@material-ui/core";

import {Route, Switch} from "react-router-dom"
import SimpleBottomNavigation from './components/MainNav';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies'
import Series from './Pages/Series/Series'
import Search from './Pages/Search/Search';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="app">        
       
      <Container>
          <Switch>
            <Route path='/' component={Trending} exact></Route>
            <Route path='/movies' component={Movies} ></Route>
            <Route path='/series' component={Series} ></Route>
            <Route path='/search' component={Search} ></Route>
          </Switch>
        </Container>
      </div>
      
      <SimpleBottomNavigation/>
    </BrowserRouter>
  )
}

export default App; 