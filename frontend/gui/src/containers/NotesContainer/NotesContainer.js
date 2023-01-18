import React, { Component } from 'react'
import Notes from '../../components/SubjectNotes/Notes'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {Base_Api_Path} from '../../urlPaths'
import {NetworkErrorImg} from '../../Assets/images/MIsllenous/NETWORK_ERROR.png'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ServerErrorModal from '../../UI/ServerErroModal/ServerErrorModal'

const semesters = [1,2,3,4,5,6,7,8]

class NotesContainer extends Component {
    state = {
        notesList:[],
        selectedNotes:[],
        selectedCourse:'SelectOption',
        selectedSemester:'SelectOption',
        showInfo:true,
        showSignInModal:null,
        showBackdrop:false,
        hasErrors: null,
        reqStatusCode: null
    }
    componentDidMount(){
        document.title = 'Course notes downloads'
        let urlPath = Base_Api_Path+'/app/notes'
        axios.get(urlPath,).then(res=>{
            this.setState({
                notesList: res.data,
                showInfo:false,
                reqStatusCode: res.status
            })

        }).catch(err=>{
            
            if(err.response){
                this.setState(()=>{
                    return {
                        hasErrors: err.response,
                        reqStatusCode: err.response.status
                    }
                })
            }else if(err.request){
                this.setState(()=>{
                    return {
                        hasErrors: 'NETWORK_ERROR',
                        reqStatusCode: 0
                    }
                })
            }
        })
        setTimeout(()=>{
            if(this.state.notesList.length !== 0){
                this.setState({showInfo:false})
            }
        },1000)
    }


    selectionHandler=(e)=>{
        let optCourse = e.target.value
        let selectedItems=[...this.state.notesList.filter((item)=>{
            if(item.coursename===optCourse){
                return item
            }else{
                null
            }
        })]
        this.setState({selectedNotes:selectedItems,selectedCourse:optCourse,selectedSemester:'SelectOption'})
    }

    

    getNotes=()=>{
        let notes = null
        let currentCourse = this.state.selectedCourse
        let filteredSyllabus = [...this.state.selectedNotes]
        if((this.state.selectedCourse==='SelectOption')&&(this.state.notesList.length !== 0)){
            notes = this.state.notesList.map(item=>{
                return <Notes showSignInModal={this.showSignInHandler} fileid={item.id} id={item.id} filepath={item.file} semester={item.semester} key={item.id} subject={item.subject}  courseName={item.coursename}/>
            })
        }else if((currentCourse !== 'SelectOption') && (filteredSyllabus.length !==0)){
            notes = this.state.selectedNotes.map(item=>{
                return <Notes showSignInModal={this.showSignInHandler} fileid={item.id} id={item.id} filepath={item.file} semester={item.semester} key={item.id} courseName={item.coursename} subject={item.subject} />
            })
        }
        return notes;
    }

    showNotes = () => {

        let currentCourse = this.state.selectedCourse
        let currentSemester = this.state.selectedSemester
        let filterNotes = this.state.selectedNotes
        let info = this.state.showInfo

        let noteItems = null

        if(info){
            noteItems = <div className="text-center mt-5">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
        }else if (( currentCourse !== 'SelectOption') && (filterNotes.length === 0) && (currentSemester === 'SelectOption')){

            noteItems =     <p className='alert alert-danger mt-4'>Sorry, no data available for the selected 
                                course. We'll be back with contents soon.</p>

        }else if((currentCourse !== 'SelectOption') && (filterNotes.length === 0) && (currentSemester !== 'SelectOption')){

            noteItems =     <p className='alert alert-danger mt-4'>Sorry, no data available for the selected 
                                course and semester. We'll be back with contents soon.</p>

        }else{

            noteItems =  (

                <div>

                    {this.state.selectedCourse === 'SelectOption'?<h5 className='mt-sm-2 mt-lg-0 mt-3'>Showing downloads for all courses</h5>:
                    <h5 className='mt-sm-2 mt-lg-0 mt-3'>Showing all downloads for {this.state.selectedCourse}</h5>}
                    <table className="table table-hover">
                        <thead className="thead-dark vw-25">
                        <tr>
                            <th scope="col">Details</th>
                            {/* <th scope="col">Subject</th> */}
                            <th scope="col">Download Link</th>
                        </tr>
                        </thead>
                        {this.getNotes()}
                    </table>

                </div>

            )
        }
        return noteItems

    }

    semesterHandler = (e) =>{

        let semesterOpted =  parseInt(e.target.value,10)
        let currentCourse = this.state.selectedCourse

        let semesterWiseFilteredNotes = [...this.state.notesList.filter(item=>{
            if((item.coursename === currentCourse) && (item.semester === semesterOpted)){
                return item
            }else{
                null
            }
        })]

        this.setState(()=>{
            return {
                selectedSemester: semesterOpted,
                selectedNotes : semesterWiseFilteredNotes
            }
        })
    }

    getSemesters = () =>{

        let currentCourse = this.state.selectedCourse

        let semesterList = null

        if(currentCourse === 'BTECH'){
            semesterList = semesters.map(item=>{
                return <option key={item} value={item.toString()}>{item}</option>
            })
        }else if((currentCourse === 'BCA') || (currentCourse === 'BBA') || (currentCourse === 'BIOTECH')){
            semesterList = semesters.map(item=>{
                if(item<7){
                    return <option key = {item} value={item.toString()}>
                        {item}
                    </option>
                }
            })
        }else if((currentCourse === 'MCA') || (currentCourse === 'MBA')){
            semesterList = semesters.map(item=>{
                if(item<5){
                    return <option key={item} value={item.toString()}>
                        {item}
                    </option>
                }
            })
        }

        return semesterList

    }

    onFocusHandler = () =>{
        this.setState({selectedSemester: ''})
    }

    

    render() {

        let showSemesters = this.getSemesters

        let displayNotes = this.showNotes

        let ServerErrors = null

        let onNetworkError = null

        if(this.state.reqStatusCode !== null){
            if(this.state.reqStatusCode >= 500){
                ServerErrors = <ServerErrorModal status = {this.state.hasErrors.status} />
            }
        } 
        if(this.state.reqStatusCode === 0 && this.state.hasErrors === 'NETWORK_ERROR'){
            onNetworkError = <div className="alert alert-danger text-center">Looks like you aren't connected to the internet. Check your connection and try again.</div>
            window.scrollTo(0, 0)
        }

        return (
            <React.Fragment>
                <Header/>
                {onNetworkError}
                {ServerErrors}
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-12 mt-4">

                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/downloads">Downloads</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Course Notes</li>
                                </ol>
                            </nav>

                            <br/>

                            <h3>Download Course Notes</h3>
                            <p>Select a course to
                                see
                                all its available contents from selection menu and make download.</p>
                            <p className='alert alert-info text-center mt-4'>Currently course notes only for <b>BCA</b> course are available.</p>
                            <hr/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-3'>
                            <h5>Courses</h5>
                            <select onChange={this.selectionHandler} className='form-control'>
                                <option value='SelectOption'>All courses</option>
                                <option value='BTECH'>BTECH</option>
                                <option value='MCA'>MCA</option>
                                <option value='BCA'>BCA</option>
                                <option value='MBA'>MBA</option>
                                <option value='BBA'>BBA</option>
                                <option value='BIOTECH'>BIOTECH</option>
                            </select>
                            <br/>
                            <h5>Semesters</h5>
                            <select onFocus={this.onFocusHandler} value={this.state.selectedSemester} onChange={this.semesterHandler} className='form-control'>
                                <option value='SelectOption'>All semesters</option>
                                {showSemesters()}
                            </select>
                        </div>
                        <div className='col-lg-9'>
                            {this.state.hasErrors === 'NETWORK_ERROR'? 
                            <h4 className='text-danger mt-3 text-center'>Unable to fetch data. Connection error.</h4> 
                            :displayNotes()}
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
        isAuthenticated: state.key !== null,
    }
}


export default connect(mapStateToProps) (withRouter(NotesContainer));