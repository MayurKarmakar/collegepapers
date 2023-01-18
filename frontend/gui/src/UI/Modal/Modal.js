import React from 'react'
import Hoc from '../../hoc/hoc'
import Backdrop from '../Backdrop/Backdeop'
import classes from './Modal.css'

const  Modal = (props) => {
    return (
        <Hoc>
            <Backdrop showBackdrop={props.ShowBackDropHandler}/>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-flex justify-content-center align-self-center'>
                            <div className="shadow-lg vw-25 vh-50 p-3 mb-5 text-center bg-white rounded" id={classes.modal}>
                                <h4>Thanks {props.name}, for giving your valuable feedback.</h4>
                                <h5>We'll reach out to you soon.</h5>
                                <p className='pt-2'>Click the button to get redirected to the homepage.</p>
                                <button className='btn btn-primary mt-2' onClick={props.modalHandler}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Hoc>
    )
}

export default Modal
