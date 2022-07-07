import React from "react";
import classes from './NavButton.module.css'

const NavButton = ({children, ...props}) => {
    return(
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
}

export default NavButton;