import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/auth'
import ServerErrorModal from '../../../UI/ServerErroModal/ServerErrorModal'
import WelcomeUser from '../../../UI/WelcomeUser/WelcomeUser'


class LoginForm extends React.Component{

    state = {
        email: '',
        password: "",
        reqStatus: null,
        isNetworkError: false,
        showModal: false
    }

    EmailinputHandler = (e) => {
        const email = e.target.value
        this.setState((e)=>{
            return {
                    email: email
            }
        })
    }

    PasswordinputHandler = (e) => {
        const pass = e.target.value
        this.setState((e)=>{
            return {
                password: pass
            }
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.LoginUser(this.state.email, this.state.password)

        
        setTimeout(()=>{
            if(this.props.error !== null){
                if(this.props.error.status === 400){
                    this.setState(()=>{
                        return {
                            reqStatus: this.props.error.status
                        }
                    })
                }else if(this.props.error === 'NETWORK_ERROR'){
                    this.setState(()=>{
                        return {
                            isNetworkError: true
                        }
                    })
                }              
            }else{
                this.setState(()=>{
                    return {
                        showModal: true,
                    }
                })
            }
        },2000)
        
        setTimeout(()=>{
            if(this.props.error === null){
                if(this.props.location.state['prevRoute'] === '/user/register'){
                    this.props.history.push('/')
                }else{
                    this.props.history.push({
                        pathname: this.props.location.state['prevRoute'],
                        state: {
                            file: this.props.location.state['file']
                        }
                    })
                }
            }
        },3000)
        
    }

    componentDidMount = () => {
        document.title = 'Sign in'
    }

    render(){
        
        let errorMsg = null

        if(this.state.reqStatus === 400){
            errorMsg = <p className='alert alert-danger text-center'>Either username or password is incorrect.</p>
        }

        let submitButton = null
        if(this.props.isLoading){
            submitButton = <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Submit
                           </button>
        }else{
            submitButton = <button className='btn btn-primary' type='submit'>
                Submit
            </button>
        }

        let networkError = null
        if(this.state.isNetworkError === true){
            networkError = <div className="alert alert-danger text-center">Looks like you aren't connected to the internet. Check your connection and try again.</div>
            window.scrollTo(0, 0)
        }
        return (
            <React.Fragment>
                <Header />
                {networkError}
                {this.state.reqStatus >= 500? <ServerErrorModal status={this.state.reqStatus}/>: null}
                {this.state.showModal? <WelcomeUser ShowBackDropHandler={this.state.showModal} userFirstName = {localStorage.getItem('firstname')}
                userLastName = {localStorage.getItem('lastname')} />: null}
                <div className='container  mt-5'>
                    <div className='row'>
                        <div className='col-lg-3 col-md-3'>

                        </div>
                        <div className='col-lg-6 col-md-6 py-3 px-4 border rounded'>
                            {errorMsg}
                            <h2>Sign in</h2>
                            <p>Please input your email and password to Sign in.</p>
                            <hr/>
                            <form onSubmit={this.submitHandler}>
                                <div className='form-group'>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" onChange={this.EmailinputHandler}  id="email" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" onChange={this.PasswordinputHandler} id="password" required/>
                                </div>
                                {submitButton}
                                <p className='pt-3'>Don't have account? <Link to='/user/register'>Register</Link></p>
                            </form>
                        </div>
                        <div className='col-lg-3 col-md-3'>

                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
    
}

const mapDispatchToPtops = dispatch => {
    return {
        LoginUser: (email, password) => dispatch(actions.authLogin(email, password))
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.key !== null,
        isLoading: state.loading,
        error: state.error
    }
}


export default connect(mapStateToProps, mapDispatchToPtops) (withRouter(LoginForm));