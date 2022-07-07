import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';
import NavButton from '../button/NavButton';

const Navbar = () => {
    const{isAuth, setIsAuth} = useContext(AuthContext)

    const logOut = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return(
        <div className='navbar'>
          <NavButton onClick={logOut}>
            Выйти
          </NavButton>
          <div className='navbar__items'> 
          <NavButton>
          <Link to='/about'>О сайте</Link>
          </NavButton>
          <NavButton>
          <Link to='/posts'>Посты</Link>
          </NavButton>
            
          </div>
        </div>
    )
}

export default Navbar;