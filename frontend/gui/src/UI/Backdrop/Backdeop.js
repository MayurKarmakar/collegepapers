import React from 'react'

import classes from './Backdrop.css'

const Backdeop = (props) => {
    return (
        props.showBackdrop?<div className={classes.Backdrop}>
            
        </div>:null
    )
}

export default Backdeop
