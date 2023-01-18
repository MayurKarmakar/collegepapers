import React from 'react'
import classes from './ServerErrorModal.css'
import Backdrop from '../Backdrop/Backdeop'
import { withRouter } from 'react-router-dom'

const ServerErrorModal = (props) => {

    if(props.status >= 500){
        setTimeout(()=>{
            this.props.history.push('/')
        },2000)
    }

    return (
        <React.Fragment>
            <Backdrop showBackdrop={true} />
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-flex justify-content-center align-self-center'>
                            <div className="shadow-lg vw-25 vh-50 p-3 mb-5 text-center bg-white rounded" id={classes.ServerErrorModal}>
                                <h4>Currently we are facing some technical issues. Technical team is working on it.</h4>
                                <h5>Be back here in some time. Thanks for your cooperation.</h5>
                                <p className='pt-2'>You will be redirected to homepage automatically.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(ServerErrorModal)