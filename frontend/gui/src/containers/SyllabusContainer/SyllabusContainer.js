import React, { Component } from 'react'
import Syllabus from '../../components/Syllabus/Syllabus'
import {Link} from 'react-router-dom'

import axios from 'axios'
import { Base_Api_Path } from '../../urlPaths'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ServerErrorModal from '../../UI/ServerErroModal/ServerErrorModal'
import { connect } from 'react-redux'

const subjects = ['BTECH','MCA','BCA','MBA','BBA','BTECH']

class SyllabusContainer extends Component {

    state = {
        syllabus:[],
        selectedCourse:'SelectOption',
        filteredSyllabus:[],
        showInfo:false,
        hasErrors: null,
        reqStatusCode: null,
    }

    componentDidMount(){
        document.title = 'Syllabus downloads'
        axios.get(Base_Api_Path+'/app/syllabus').then(res=>{
            this.setState({syllabus:res.data,showInfo:true, reqStatusCode: res.status})

        })
        // axios.get('http://127.0.0.1:8000'+'/app/syllabus').then(res=>{
        //     this.setState({syllabus:res.data,showInfo:true, reqStatusCode: res.status})

        // })
        .catch(err=>{
            if(err.response){
                this.setState(()=>{
                    return {
                        reqStatusCode: err.response.status,
                        hasErrors: err.response
                    }
                })
            }else if(err.request){
                this.setState(()=>{
                    return {
                        reqStatusCode: 0,
                        hasErrors: 'NETWORK_ERROR'
                    }
                })
            }
        })
    }

    courseSelectHandler=(e)=>{
        let optCourse = e.target.value
        let syllabusList = [...this.state.syllabus]

        let filteredSyllabusList = [...syllabusList.filter(item=>{
            return item.coursename === optCourse
        })]

        this.setState({selectedCourse:optCourse,filteredSyllabus:filteredSyllabusList,showInfo:false})
    }

    courseSelector =()=>{
        const courses = (
            <select className='btn btn-sm col-sm-12' onChange={this.courseSelectHandler} style={{'border':'1px solid blue'}}>
                <option value=''>Select Option</option>
                {subjects.map((item)=>{
                    return <option key={item.id} value={item}>{item}</option>
                })}
            </select>
        )
        return courses
    }

    getSyllabus = ()=>{

        let syllabusItems = null


        if((this.state.syllabus.length !== 0) && (this.state.selectedCourse==='SelectOption')){
            syllabusItems =  this.state.syllabus.map(item=>{
                return <Syllabus key={item.id} courseName={item.coursename} filepath={item.file}/>
            })
        }else if((this.state.selectedCourse !== 'SelectOption') && (this.state.filteredSyllabus.length !== 0)){
            syllabusItems = this.state.filteredSyllabus.map (item=>{
                return <Syllabus key={item.id} courseName={item.coursename} filepath={item.file} />
            })
        }
        return syllabusItems
    }

    showSyllabus =() =>{

        let currentCourse = this.state.selectedCourse
        let syllabus = this.state.syllabus
        let syllabusFiltered = this.state.filteredSyllabus
        let syllabusList = null

        if((syllabus.length === 0) && (currentCourse === 'SelectOption')){
            syllabusList = <div className="text-center mt-5">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
            
        }else if((currentCourse!=='SelectOption') && (syllabusFiltered.length === 0) ){
            syllabusList = <p className='alert alert-danger mt-4'>Sorry, no data available for the selected 
                        course. We'll be back with contents soon.</p>
        }else{
            syllabusList = ( 
            <div>
                {currentCourse === 'SelectOption'?<h5>Showing downloads for all courses</h5>
                :<h5>Showing all downloads for {currentCourse}</h5>}
                <table className="table table-hover">
                    <thead className="thead-dark w-25">
                    <tr>
                        <th scope="col">Details</th>
                        <th scope="col">Download Link</th>
                    </tr>
                    </thead>
                    {this.getSyllabus()}
                </table>
            </div>
            )
        }
        return syllabusList

    }


    render() {

        let ServerErrors = null
        let networkError = null

        if(this.state.reqStatusCode !== null){
            if(this.state.reqStatusCode >= 500){
                ServerErrors = <ServerErrorModal status = {this.state.hasErrors.status} />
            }
        }
        if(this.state.reqStatusCode === 0){
            networkError = <div className="alert alert-danger text-center">Looks like you aren't connected to the internet. Check your connection and try again.</div>
            window.scrollTo(0, 0)
        }

        let courseContentInfo = null

        if(this.state.selectedCourse === 'BTECH'){
            courseContentInfo = <p className='alert alert-info text-lg-center text-md-center'>Syllabus for BTECH course is shown year wise. Each year contains syllabus for 2 consecutive semisters.</p>
        }

        return (
            <React.Fragment>
                <Header/>
                {networkError}
                {ServerErrors}
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-12 mt-4">

                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/downloads">Downloads</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Syllabus</li>
                                </ol>
                            </nav>

                            <br/>

                            <h3>Download Course Syllabus</h3>
                            <p>Select a course to
                                see the available syllabus and make download.</p>
                            <hr/>
                            {this.state.selectedCourse === 'BTECH'? courseContentInfo: null}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-3'>
                            <h5>Courses</h5>
                            <select onChange={this.courseSelectHandler} className='form-control'>
                                <option value='SelectOption'>All courses</option>
                                <option value='BTECH'>BTECH</option>
                                <option value='MCA'>MCA</option>
                                <option value='BCA'>BCA</option>
                                <option value='MBA'>MBA</option>
                                <option value='BBA'>BBA</option>
                                <option value='BIOTECH'>BIOTECH</option>
                            </select>
                            <br/>

                        </div>
                        <div className='col-lg-9'>
                            
                            {this.state.hasErrors === 'NETWORK_ERROR'? 
                            <h4 className='text-center text-danger mt-3'>Unable to fetch data. Connection error.</h4>
                            :this.showSyllabus()}
                            
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        otherError: state.error
    }
}

export default connect(mapStateToProps)(SyllabusContainer)