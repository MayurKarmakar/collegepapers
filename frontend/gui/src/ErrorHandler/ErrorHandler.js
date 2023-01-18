import React, { Component } from 'react'
import classes from './ErrorHandler.css'
import { withRouter } from 'react-router-dom'

class ErrorHandler extends Component {

    state = {
        hasErrors: false,
        error: null
    }

    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/')
        },2000)
    }

    componentDidCatch = (error, info) => {
        this.setState(()=>{
            return {
                hasErrors: true
            }
        })
        this.state.hasErrors? this.redirectUser(): null
        console.log(error, info)
    }

    render() {
        if (this.state.hasErrors){
            return (
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div className='d-flex justify-content-center align-self-center'>
                                <div className="shadow-lg vw-25 vh-50 p-3 mb-5 text-center alert alert-danger text-center rounded offset-lg-2 offset-md-1 pffset-sm-0" id={classes.ErrorHandler}>
                                    <h3>Sorry</h3>
                                    <h5>Looks like you aren't connected to the internet. Please make sure your internet connection is active and try again.</h5>
                                    <small className='text-left'>You will be automatically redirected to the homepage</small>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6'>

                        </div>
                    </div>
                </div>
            )
        }else{
            return this.props.children
        }
    }
}

export default withRouter(ErrorHandler)