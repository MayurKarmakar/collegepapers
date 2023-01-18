import React from 'react'
import classes from './WelcomeUser.css'
import BackDrop from '../Backdrop/Backdeop'

export default function WelcomeUser(props) {
    return (
        <React.Fragment>
            <BackDrop  showBackdrop={props.ShowBackDropHandler}/>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-flex justify-content-center align-self-center'>
                            <div className="shadow-lg vw-25 vh-50 p-3 mb-5 text-center bg-white rounded" id={classes.WelcomeUser}>
                                <h4>Welcome {props.userFirstName} {props.userLastName}</h4>
                                <h6>Please wait, we are getting you onboard</h6>
                                {/* <p className='pt-2'>Click the button to get redirected to the homepage.</p>
                                <button className='btn btn-primary mt-2' onClick={props.modalHandler}>Close</button> */}
                                <div className="spinner-border text-success" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
