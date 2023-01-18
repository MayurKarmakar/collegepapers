import React from 'react'
import {Base_Api_Path} from '../../urlPaths'
import axios from 'axios'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import Modal from '../../UI/Modal/Modal'
import ServerErrorModal from '../../UI/ServerErroModal/ServerErrorModal'
// import FeedbackImage from '../../Assets/images/MIsllenous/feedback_edited.png'

export default class ContactUs extends React.Component {
    
    state = {
        name : '',
        branchname : '',
        email : '',
        feedback: '',
        submitStatus:null,
        showModal : false,
        hasErrors: null
    }

    componentDidMount = () =>{
        document.title = 'Contact us'
    }
    
    
    formSubmit=(e)=>{
        e.preventDefault()

        let url =Base_Api_Path+'/app/feedbacks/'
        let form_data = new FormData()
        form_data.append('name',this.state.name)
        form_data.append('branchname',this.state.branchname)
        form_data.append('email',this.state.email)
        form_data.append('feedback',this.state.feedback)
        JSON.stringify(form_data)
        axios.post(url,form_data)
        .then(res=>{res.status === 201? this.setState({showModal:true}):null})
        .catch(err=>{
            if(err.response){
                this.setState(()=>{
                    return {
                        hasErrors: err.response
                    }
                })
            }else if(err.request){
                this.setState(()=>{
                    return {
                        hasErrors: 'NETWORK_ERROR'
                    }
                })
            } 
        })
        // this.setState({showModal:true})
        
    }

    inputHandler = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    
    modalCloaseHandler = () =>{
        this.setState({showModal:false})
        this.props.history.push("/")
    }
    
    
    render(){

        let ServerErrorInfo = null
        let networkError = null

        if(this.state.hasErrors && this.state.hasErrors.status >= 500){
            ServerErrorInfo = <ServerErrorModal status = {this.state.hasErrors.status} />
        }
        if (this.state.hasErrors === 'NETWORK_ERROR'){
            networkError = <div className="alert alert-danger text-center">Looks like you aren't connected to the internet. Check your connection and try again.</div>
            window.scrollTo(0, 0)
        }
        
        
        return (
            <React.Fragment>
                <Header/>
                {/* <Modal name={this.state.name} ShowBackDropHandler={this.state.showModal} modalHandler = {this.modalCloaseHandler}  /> */}
                {networkError}
                {ServerErrorInfo}
                {this.state.showModal?<Modal name={this.state.name} ShowBackDropHandler={this.state.showModal} modalHandler = {this.modalCloaseHandler}  />:null}
                <div className='container mb-2'>
                    <div className='row'>
                        <div className='col mt-5'>
                            <h1>Contact Us</h1>
                            <hr />
                            <h3>For any queries you can contact us at:</h3>
                            <ul>
                                <li>Phone : +91 7250622143</li>
                                <li>Mail at: support@collegepapers.in</li>
                            </ul>
                            <br/>
                            <br/>
                            <h3>Have any feedback? Do let us know.</h3>
                            <p>Please fill up the below form quoting any feedback regarding the website.</p>
                        </div>
                    </div>
                    <br/>
                    <div className='row'>
                        <div className='col-lg-4 col-sm-12 col-md-6'>
                            <div className='offset-lg-2 offset-md-1  border p-3 alert alert-info rounded mt-1 d-none d-sm-block d-md-none d-block d-sm-none'>
                                <h3>Your feedback, matters to us.</h3>
                                <br/>
                                <h5>Your feedback upon the experience using <strong>Collegepapers.in</strong> is important to us. 
                                    We sincerely appreciate your insight because it helps us in making the webapp better and efficient enough to 
                                    provide you with the updates realated to course curriculums.</h5>
                                <br/>
                                <br />
                                <p>Note: We'll stay in touch with you through your email.</p>
                            </div>
                            <form onSubmit={this.formSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input type='text' className='form-control'  onChange={this.inputHandler} id='name' required placeholder='Enter your full name'></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='branchname'>Branch</label>
                                    <input type='text' className='form-control'  onChange={this.inputHandler} id='branchname' required placeholder='Enter your branch name (ex. BCA, BTECH)'></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' className='form-control'  onChange={this.inputHandler} id='email' required placeholder='Enter your email address' aria-describedby='useremail'></input>
                                    <small id='useremail' className='text-muted form-text'>We'll never share your email with anyone else.</small>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='feedback'>Feedback</label>
                                    <textarea id='feedback' className='form-control' onChange={this.inputHandler} rows='5'></textarea>
                                </div>
                                <button type='submit' className='btn btn-primary align-right justify-content-right'>Submit</button>
                            </form>
                        </div>
                        <div className = 'col-lg-8 col-sm-12 col-md-6'>
                        {/* d-sm-none d-md-block */}
                            <div className='offset-lg-2 offset-md-1 pt-3 border p-3 alert alert-info rounded mt-sm-3 mt-3 d-none d-lg-block d-xl-none d-md-block d-lg-none d-xl-block '>
                                <h3>Your feedback, matters to us.</h3>
                                <br/>
                                <h5>Your feedback upon the experience using <strong>Collegepapers.in</strong> is important to us. 
                                    We sincerely appreciate your insight because it helps us in making the webapp better and efficient enough to 
                                    provide you with the updates realated to course curriculums.</h5>
                                <br/>
                                <br />
                                <p>Note: We'll stay in touch with you through your email.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}
