import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/auth'
import GreetModal from '../../../UI/GreetModal/GreetModal'
import ServerErrorModal from '../../../UI/ServerErroModal/ServerErrorModal'

class RegistrationForm extends React.Component {

    state = {
        firstname: null,
        lastname: null,
        email: null,
        password1: null,
        password2: null,
        enableSubmit: false,
        passwordMatchError: false,
        passwordInputType: true,
        showModal:false,
        passError: null,
        emailError: null,
        formHasErrors: false,
        isNetworkError: false
    }

    componentDidMount = () => {
        document.title = 'Registration'
        this.setState(()=>{
            return{
                passError: null,
                emailError: null,
                isNetworkError: false,
            }
        })
    }

    enableSubmitHandler = (e) => {
        this.setState({enableSubmit: !this.state.enableSubmit})
    }


    inpurtHandler = (e) =>{
        this.setState({[e.target.id]:e.target.value})

    }


    formSubmitHandler = (e) => {
        e.preventDefault()
        let passErrorMsg = null
        let emailErrorMsg = null
        // this.validatePassword()
        this.props.registerUser(this.state.firstname, this.state.lastname, this.state.email, this.state.password1, this.state.password2)

        this.setState(()=>{
            return {
                formHasErrors: false,
                passError: null,
                emailError: null
            }
        })
        setTimeout(()=>{
            if(this.props.hasError !== 'NETWORK_ERROR'){
                setTimeout(()=>{
                    if(this.props.hasError){
                        if(this.props.hasError.status === 400){
                            for(let err in this.props.hasError.data){
                                if(err === 'password1' || err === 'non_field_errors'){
                                    passErrorMsg = this.props.hasError.data[err][0]
                                }else if(err === 'email'){
                                    emailErrorMsg = this.props.hasError.data[err][0]
                                }
                                this.setState(()=>{
                                    return {
                                        passError: passErrorMsg,
                                        emailError: emailErrorMsg,
                                        showModal: false,
                                        formHasErrors: true,
                                        isNetworkError: false,
                                    }
                                })
                            }
                        }
                    }else{
                        this.setState(()=>{
                            return{
                                passError: null,
                                emailError: null,
                                showModal: true,
                                formHasErrors: false,
                                isNetworkError: false
                            }
                        })
                        this.redirectOnSuccess()
                    }
                },1000)
            }else {
                this.setState(()=>{
                    return {
                        isNetworkError: true
                    }
                })
            }
        }, 1000)
    }

    toggleInputType = (e) => {
        this.setState(()=>{
            return {
                passwordInputType: !this.state.passwordInputType
            }
        })
    }

    redirectOnSuccess =() =>{
        if(this.props.hasError === null){
            setTimeout(()=>{
                this.props.history.push('/')
            },3000)
        }
    }

    componentWillUnmount = () => {
        this.setState({showModal: false, enableSubmit: false})
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state.formHasErrors !== prevState.formHasErrors){
            window.scrollTo(0, 0);
        }
    }
    // componentDidUpdate = (nextProps, nextState) => {
    //     let {hasError} = this.props
    //     let passErrorMsg = null
    //     let emailErrorMsg = null
    //     if(nextProps.hasError !== hasError){
    //         if(hasError !== null){
    //             for(let err in hasError){
    //                 if(err === 'password1' || err === 'non_field_errors'){
    //                     passErrorMsg = hasError[err]
    //                 }else if(err === 'email'){
    //                     emailErrorMsg = hasError[err]
    //                 }
    //             }
    //             this.setState(()=>{
    //                 return {
    //                     passError: passErrorMsg,
    //                     emailError: emailErrorMsg,
    //                     showModal: false
    //                 }
    //             })
    //         }else if(hasError === null){
    //             this.setState(()=>{
    //                 return {
    //                     passError: null,
    //                     emailError: null,
    //                     showModal: true
    //                 }
    //             })
    //             setTimeout(()=>{
    //                 this.props.history.push('/')
    //             },4000)
    //         }
    //     }
    // }



    render() {
        console.log(this.state.formHasErrors)
        let submitButton = null 

        let highLightPassError = null 
        let highLightEmailError = null 

        if(this.state.passError){
            highLightPassError = 'border-danger'
        } 
        if(this.state.emailError){
            highLightEmailError = 'border-danger'
        }

        if(this.state.enableSubmit){
            if(this.props.isLoading){
                submitButton = <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Submit
                                </button>
            }else{
                submitButton = <button className='btn btn-primary' ref={autoClick => this.autoClickHandler = autoClick} type='submit'>
                    Submit
                </button>
            }
        }else{
            submitButton = <button className='btn btn-primary' type='submit' disabled>
                Submit
            </button>
        }
        
        let passwordType = null
        this.state.passwordInputType ? passwordType = 'password' : passwordType ='text'

        let showPass = null
        this.state.passwordInputType ? showPass = "fa fa-eye-slash" : showPass = 'fa fa-eye'

        let passErrorMsg = this.state.passError
        let emailErrorMsg = this.state.emailError

        let isModalShow = this.state.showModal
        
        let serverErrorInfo = null

        if(this.props.hasError && this.props.hasError.status >= 500){
            serverErrorInfo = <ServerErrorModal status = {this.props.hasError.status}/>
        }

        let networkError = null
        let formErrorMsg = null

        if(this.state.formHasErrors){
            formErrorMsg = <p className='alert alert-danger text-center'>Form has some errors.Please correct them to proceed.</p>
            // window.scrollTo(0, 0)
        }

        if(this.state.isNetworkError === true){
            networkError = <div className="alert alert-danger text-center">Looks like you aren't connected to the internet. Check your connection and try again.</div>
            window.scrollTo(0, 0)
        }

        return (
            <React.Fragment>
                <Header/>
                {networkError}
                {serverErrorInfo}
                {isModalShow? <GreetModal firstname={this.state.firstname} lastname={this.state.lastname}/>: null}
                <div className='container border rounded mt-5'>
                    <div className='row'>
                        <div className='col p-lg-2 px-lg-4'>
                            <h2>Getting you Signed up.</h2>
                            <p className='pl-lg-2 pl-sm-1 '>Please fill up the below registration form.</p>
                            {formErrorMsg}
                            <hr/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 mt-3 d-none d-sm-block d-md-none d-block d-sm-none'>
                            <div className='alert alert-info'>
                                <h4>Registration Guide</h4>
                                <hr/>
                                <h5>Steps</h5>
                                <ol>
                                   <li>Enter your first and last name.</li> 
                                   <li>Enter a valid email id. Also required when you sign in.</li>
                                   <li>Enter a password that can be remembered by you easily.</li>
                                   <li>The password must contain atleast 8 characters and not more than 12 characters.</li>
                                   <li>The password must contain atleast a special character and a number.</li>
                                </ol>
                                <p>Note: We'll let you know about updates on your email id.</p>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12 col-md-6 p-lg-3 px-lg-4'>
                            <form onSubmit={this.formSubmitHandler}>
                                <div className='row'>
                                    <div className='col-lg-6 col-md-6 col-sm-6'>
                                        <div className="form-group">
                                            <label htmlFor="firstname">First Name</label>
                                            <input type="text" onChange={this.inpurtHandler} className="form-control" id="firstname" aria-describedby="InputFname" required/>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-6'>
                                        <div className="form-group">
                                            <label htmlFor="lastname">Last Name</label>
                                            <input type="text"  onChange={this.inpurtHandler} className="form-control" id="lastname" aria-describedby="InputFname" required/>
                                        </div>
                                    </div>                           
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="form-group">
                                            <label htmlFor="email">Email address</label>
                                            <input type="email"  onChange={this.inpurtHandler} className={["form-control",highLightEmailError].join(' ')} id="email" aria-describedby="Help" required/>
                                            {this.state.emailError?<small className='text-danger mt-2'>{emailErrorMsg}</small>:<small id="Help" className="form-text text-muted">We'll never share your email with anyone else.</small>}
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="password1">Password</label>
                                    <div className="input-group">
                                        <input type={passwordType}  onChange={this.inpurtHandler} className={["form-control",highLightPassError].join(" ")} id="password1" aria-describedby="inputPassword" required>
                                        </input>
                                        <div className='input-group-prepend'>
                                            <button onClick={this.toggleInputType} type='button'><i className={showPass}></i></button>
                                        </div>
                                    </div>
                                    {!this.state.passError? null:<small className='text-danger mt-2'>{passErrorMsg}</small>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2">Confirm Password</label>
                                    <input type={passwordType}  onChange={this.inpurtHandler} className={["form-control",highLightPassError].join(' ')} id="password2" required/>
                                    {this.state.passwordMatchError? <small className='text-danger'>*Passwords must match.</small>: null}
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                    <input className="form-check-input" onClick={this.enableSubmitHandler} type="checkbox" id="gridCheck" />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        I accept to receive promotional emails from collegepapers.in.
                                    </label>
                                    </div>
                                </div>
                                {/* {this.state.enableSubmit?
                                <button type='submit' className='btn btn-primary mb-2'>Submit</button>:
                                <button type='submit' className='btn btn-primary mb-2' disabled='disabled'>Submit</button>} */}
                                {submitButton}
                                <p className='pt-3'>Have an account? <Link to={{
                                    pathname: '/user/login/',
                                    state: {
                                        prevRoute: this.props.match.url
                                    }  
                                }}>Sign in</Link></p>
                                <br/>
                            </form>
                        </div>
                        <div className='col-lg-6 col-md-6 mt-3 d-none d-md-block d-lg-none d-lg-block d-xl-none d-none d-xl-block'>
                            <div className='alert alert-info'>
                                <h4>Registration Guide</h4>
                                <hr/>
                                <h5>Steps</h5>
                                <ol>
                                   <li>Enter your first and last name.</li> 
                                   <li>Enter a valid email id. Also required when you sign in.</li>
                                   <li>Enter a password that can be remembered easily.</li>
                                   <li>The password must containe atleast 8 characters and not more than 12 characters.</li>
                                   <li>The password must contain atleast a special character and a number.</li>
                                </ol>
                                <p>Note: We'll let you know about updates on your email id.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        )

    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser:   (firstname, lastname, email, password1, password2) => dispatch(actions.authRegistration(firstname, lastname, email, password1, password2))
    }
} 

const mapStateToProps = state => {
    return {
        isLoading: state.loading,
        hasError: state.regError,
        hasAuthError: state.error
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);