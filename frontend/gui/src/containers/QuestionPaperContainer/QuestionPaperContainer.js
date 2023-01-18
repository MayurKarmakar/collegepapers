import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'



import QuestionPaper from '../../components/QuestionPaper/QuestionPaper'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import {Base_Api_Path} from '../../urlPaths'
// import ServerErrorResponse from '../../UI/ServerErroModal/ServerErrorModal'
import ServerErrorModal from '../../UI/ServerErroModal/ServerErrorModal'

const semesterList = [1,2,3,4,5,6,7,8]

class QuestionPaperContainer extends Component {
    state = {
        article:[],
        selectedCourse:'SelectOption',
        selectedSemister:'',
        activeDownloadLink:'',
        filteredArticles:[],
        showInfo:true,
        contentLoadStatus:false,
        hasErrors: null,
        reqStatusCode: null 
    }
    componentDidMount(){

        document.title = 'Question papers downloads'

        let getUrl = Base_Api_Path + '/app/question-papers/' 
        axios.get(getUrl).then(res=>{
            this.setState({article:res.data, contentLoadStatus:true, reqStatusCode: res.status})
        })
        .catch(err=>{
            if(err.response){
                this.setState(()=>{
                    return{
                        hasErrors: err.response,
                        reqStatusCode: err.response.status
                    }
                })
            }else if(err.request){
                this.setState(()=>{
                    return{
                        hasErrors: 'NETWORK_ERROR',
                        reqStatusCode: 0
                    }
                })
            }
        })
        setTimeout(()=>{
            if ((this.state.article.length !== 0) || (this.state.article.length === 0)){
                this.setState({showInfo:false})
            }
        },1000)
        
    }
    courseWiseFilter = (e) =>{
        let optCourse = e.target.value
        let filteredArticleList = [...this.state.article.filter((item)=>{
            return item.coursename===optCourse
        })]

        this.setState({selectedCourse:optCourse,filteredArticles:filteredArticleList,selectedSemister:'',showInfo:false})
    }
    
    semisterWiseFilter = (e)=>{
        let optSemister = parseInt(e.target.value,10)
        let currentCourse = this.state.selectedCourse
        this.setState({selectedSemister:optSemister})

        const articles = [...this.state.article]
        let filteredSemisterArticles = articles.filter(item=>{
            if((item.coursename===currentCourse)&&(item.semister===optSemister)){
                return item
            }else{
                null
            }
        })
        this.setState({filteredArticles:filteredSemisterArticles})
    }
    handleFocus =(e)=>{
        this.setState({selectedSemister:''})
    }
    semisterOptions = ()=>{

        let selectMenu = null;
        switch (this.state.selectedCourse) {
            case 'BTECH':
                selectMenu = semesterList.map((item)=>{
                    return <option key={item} value={item.toString()}> {item} </option>
                })
                break;
            case 'MCA':
            case 'MBA':
                selectMenu = semesterList.map((item)=>{
                    if(item<5){
                        return <option key={item} value={item.toString()}> {item} </option>
                    }
                })
                break;
            case 'BCA':
            case 'BBA':
            case 'BIOTECH':
                selectMenu = semesterList.map((item)=>{
                    if(item<7){
                        return <option key={item} value={item.toString()}> {item} </option>
                    }
                })
                break;        
            default:
                break;
        }
        return selectMenu;
    }   
    
    getQuestionPapers = ()=>{

        let articles = null;
        
        if((this.state.selectedCourse==='SelectOption')&&(this.state.selectedSemister==='')&&(this.state.article.length!==0)){
            articles = this.state.article.map((item)=>{
                return <QuestionPaper key={item.id}  coursename={item.coursename} fileid={item.id} filepath={item.files} subject={item.subject} semester={item.semister} />
            })
        }else if(this.state.filteredArticles.length !== 0){
            articles= this.state.filteredArticles.map(item=>{
                return <QuestionPaper key={item.id} coursename={item.coursename} fileid={item.id} filepath={item.files} subject={item.subject} semester={item.semister} />
            })
        }else if((this.state.filteredArticles.length !== 0)&&(this.state.selectedCourse==='SelectOption')){
            articles= this.state.article.map((item)=>{
                return <QuestionPaper key={item.id} coursename={item.coursename} fileid={item.id} filepath={item.files} subject={item.subject} semester={item.semister} />
            })
        }
        return articles;
    }
    showQuestionPapers = ()=>{
        let questionPapers = null

        if((this.state.showInfo === true )){
            questionPapers = <div className="text-center mt-5">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
        }else if(this.state.article.length === 0){
            questionPapers = <p className='alert alert-danger mt-4'>Sorry no data available. We'll be back with data soon.</p>
        }else if((this.state.selectedCourse !== 'SelectOption')&&(this.state.selectedSemister !== '')&&(this.state.filteredArticles.length === 0 )){
            questionPapers = <p className='alert alert-danger mt-4'>Sorry, no data available for the selected course and semester. We'll be back with contents soon.</p>
        }else if((this.state.selectedCourse !== 'SelectOption')&&(this.state.filteredArticles.length === 0)){
            questionPapers = <p className='alert alert-danger mt-4'>Sorry, no data available for the selected course. We'll be back with contents soon.</p>
        }else{
            questionPapers =  (
            <div>
                {this.state.selectedCourse==='SelectOption'?<h5 className='mt-sm-2 mt-lg-0 mt-3'>Showing downloads for all courses</h5>
                :<h5 className='mt-sm-2 mt-lg-0 mt-3'>Showing all downloads for {this.state.selectedCourse}</h5>}
                <table className="table table-hover">
                    <thead className="thead-dark w-25">
                    <tr>
                        <th scope="col" colSpan='2'>Details</th>
                        <th scope="col">Download Link</th>
                    </tr>
                    </thead>
                    {this.getQuestionPapers()}
                </table>
            </div>
            )
        }
        return questionPapers
    }
    
    render(){

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

        let semesters = this.semisterOptions
        
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
                                    <li className="breadcrumb-item active" aria-current="page">Question papers</li>
                                </ol>
                            </nav>

                            <br/>

                            <h3>Download Question Papers</h3>
                            <p>Select a course to
                                see
                                all its available contents and select the semester to refine contents semester-wise from the
                                selection menu.</p>
                            <hr/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-3'>
                            <h5>Courses</h5>
                            <select onChange={this.courseWiseFilter} className='form-control'>
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
                            <select onFocus={this.handleFocus} onChange={this.semisterWiseFilter} className='form-control'
                                    value={this.state.selectedSemister}>
                                <option value=''>All semesters</option>
                                {semesters()}
                            </select>
                        </div>
                        <div className='col-lg-9'>
                            {this.state.hasErrors === 'NETWORK_ERROR'? 
                            <h4 className='text-center text-danger mt-3'>Unable to fetch data. Connection error.</h4> :this.showQuestionPapers()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
            
        )
    }
}
export default QuestionPaperContainer