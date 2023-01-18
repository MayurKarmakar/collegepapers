import React, { Component } from 'react'

import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import COVID_19_PRECAUTION from '../../Assets/images/MIsllenous/covid_19_3_800px.jpg'
import trident_1 from '../../Assets/images/College_university/trident_1.jpg'
import trident_2 from '../../Assets/images/College_university/trident_2.jpg'
import trident_3 from '../../Assets/images/College_university/trident_3.jpg'
import trident_4 from '../../Assets/images/College_university/trident_4.jpg'
import trident_5 from '../../Assets/images/College_university/trident_5.png'
import utkal_1 from '../../Assets/images/College_university/utkal_1.jpg'
import utkal_2 from '../../Assets/images/College_university/utkal_2.jpg'
import utkal_3 from '../../Assets/images/College_university/utkal_3.jpg'


class LandingPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                    <div className='container'>
                        <div className='row'>
                            <div className='col mt-4'>
                                <p className='alert alert-info text-center'>Due to the COVID-19 pandemic situation, all educational institutions in 
                                Odisha are closed till June 17th {new Date().getFullYear()}. (Odisha Govt.)</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col mt-3'>
                                <h2>Welcome</h2>
                                <br/>
                                <p><strong>Collegepapers.in</strong> serves you with all possible study materials confined to courses of various departments, taught in <strong>Trident College, Bhubaneshwar</strong> and the syllabus proposed by <strong>Utkal University</strong>. The course materials are categorised 
                                in sections: Previous year question papers, Notes and Syllabus. All contents are downloadable whenever needed, which makes the webapp a 
                                central place for serving all such contents. <strong>Collegepapers.in</strong> also keeps you updated with all college related informations and events.</p>
                                <p>Please visit our downloads section for the contents.<br/>
                                Also let us know about your experience in using <strong>Collegepapers.in</strong> in the Feedback section.</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col mt-3 d-none d-md-block d-lg-none d-lg-block d-xl-none d-xl-block'>
                                <h2>Image gallery</h2>
                                <hr/>
                                <div id="carouselExampleIndicators" className="carousel slide border rounded mt-2" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                    </ol>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img className="d-block w-100" src={trident_1} alt="First slide"/>
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" src={trident_2} alt="Second slide"/>
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" src={trident_3} alt="Third slide"/>
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" src={trident_4} alt="Third slide"/>
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" src={trident_5} alt="Third slide"/>
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" src={utkal_1} alt="Third slide"/>
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" src={utkal_2} alt="Third slide"/>
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" src={utkal_3} alt="Third slide"/>
                                        </div>
                                    </div>
                                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col mt-5'>
                                <h2>College Related Information</h2>
                                <hr />
                                <p>*Notes for BCA course and syllabus for courses are currently served here and are available in the downloads section.</p>
                                <p>*Online classes for respective courses are conducted through online medium, using the <strong>Microsoft Teams App</strong>. 
                                To download the app, visit <a href='https://www.microsoft.com/en-in/microsoft-365/microsoft-teams/download-app' target="_blank"><strong>here</strong>.</a>
                                </p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col mt-4'>
                                <h2>Stay home. Save life.</h2>
                                <hr/>
                            </div>      
                        </div>
                        <div className='row'>
                            <div className='col-lg-6 col-md-12 col-sm-12 d-none d-md-block d-lg-none'>
                                <img src={COVID_19_PRECAUTION} className="img-thumbnail" alt='Not found' style={{'height':'300px','width':'700px'}}/>   
                            </div>
                            <div className='col-lg-6 col-md-12 col-sm-12 pt-3'>
                                <h4>To prevent the spread of COVID-19:</h4>
                                <ul>
                                    <li>Clean your hands often. Use soap and water, or an alcohol-based hand rub.</li>
                                    <li>Maintain a safe distance from anyone who is coughing or sneezing.</li>
                                    <li>Don’t touch your eyes, nose or mouth.</li>
                                    <li>Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.</li>
                                    <li>Stay home if you feel unwell.</li>
                                    <li>If you have a fever, a cough, and difficulty breathing, seek medical attention. Call in advance.</li>
                                    <li>Follow the directions of your local health authority.</li>
                                </ul>
                                <div>
                                    <h4>Helplines:</h4>
                                    <ul>
                                        <li>All India: +91-11-23978046</li>
                                        <li>Toll Free: 1075</li>
                                        <li>Mail at: ncov2019@gov.in</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-12 col-sm-12 d-none d-xl-block d-none d-lg-block d-xl-none'>
                                <img src={COVID_19_PRECAUTION} className="img-thumbnail" alt='Not found'/>
                                
                            </div>
                        </div>
                    </div>
                <Footer/>
            </React.Fragment>
            
        )
    }
}


export default LandingPage;