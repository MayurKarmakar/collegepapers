import React from 'react'
import {withRouter,Link} from 'react-router-dom'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const DownloadContainer = (props) => {
    console.log(props)

    const currentUrlPath = props.match.url

    return (
        <React.Fragment>
            <Header/>
            <div className='container'>
                <div className='row'>
                    <div className='col mt-4'>
                        <p className='alert alert-info text-center'>This pages contains a list of all the download pages which contains all relevant downloadable contents.</p>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item" aria-current="page"><Link to='/'>Home</Link></li>
                            <li className='breadcrumb-item active' aria-current='page'>Downloads</li>
                        </ol>
                        </nav>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <h2>Downloads</h2>
                        <hr/>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col'>
                        <h4>List of all download pages</h4>
                        <p>To navigate to any of the download page click on the below page name.</p>
                        <div className='mt-5'>
                            <Link to={currentUrlPath+'/question-papers'}><h5>Question Papers</h5></Link>
                            <ul>
                                <li>Contains the previous year question papers for subjects of courses.</li>
                                <li>Currently  not containing any question papers for any subject of any course.</li>
                            </ul>
                            <Link to={currentUrlPath+'/notes'}><h5>Course Notes</h5></Link>
                            <ul>
                                <li>Contains course notes for subjects of courses.</li>
                                <li>Course notes can be filtered both by course name and by corresponding semesters.</li>
                                <li>Currently contains course notes for sujects of <b>BCA</b> course (4th semester).</li>
                                <li>Course notes are provided by the corresponding faculties of releated subjects and courses.</li>
                                <li>This page serves those provided notes.</li>
                            </ul>
                            <Link to={currentUrlPath+'/syllabus'}><h5>Course Syllabus</h5></Link>
                            <ul>
                                <li>Contains course syllabus issued by Universities, proposed for subjects.</li>
                                <li>Currently contains syllabus for <b>MCA, BCA, BBA</b> courses issued by Utkal university.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col mt-3'>
                        <h4>Have any feedback? Write us <Link to='/contact'>here</Link>.</h4>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default withRouter(DownloadContainer)