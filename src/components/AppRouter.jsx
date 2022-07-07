import React, { useContext } from 'react';
import { Route, Routes, Redirect } from 'react-router-dom';
import { AuthContext } from '../context';
import Login from '../pages/Login';
import { publicRoutes, privateRoutes } from '../router';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    
    if(isLoading){
        return <Loader/>
    }

    return(
        isAuth
        ?
        <Routes>
            {privateRoutes.map(route =>
            <Route element={route.component} path={route.path} exact={route.exact} key={route.path}/>
            )} 
       </Routes>
        :
        <Routes>
            {publicRoutes.map(route =>
            <Route element={route.component} path={route.path} exact={route.exact} key={route.path}/>
            )} 
            <Route path="*" element={<Login/>}/>
        </Routes>
       
       
    )
}

export default AppRouter