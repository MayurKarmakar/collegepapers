import React from 'react'
import classes from './GreetModal.css'
import GreetModalBackdrop from '../Backdrop/GreetModalBackDrop'


export default function GreetModal(props) {
    return (
        <React.Fragment>
            <GreetModalBackdrop />
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-flex justify-content-center align-self-center'>
                            <div className="shadow-lg vw-25 vh-50 p-3 mb-5 text-center bg-white rounded" id={classes.greetModal}>
                                <h4>Thanks {props.firstname} {props.lastname}, for registering with us.</h4>
                                <h5>We'll take few minutes to get you on board.</h5>
                                <p className='pt-2'>You will get automatically redirected to the homepage.</p>
                                <div class="spinner-border text-primary text-center" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
