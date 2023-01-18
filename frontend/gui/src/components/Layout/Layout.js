import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'

import Jack from '../Jack/Jack'
import LandingPage from '../LandingPage/LandingPage'
import AboutWebsite from '../About/AboutWebsite'
import ContactUs from '../ContactUs/ContactUs'
import Downloads from '../DownloadContainer/DownloadContainer'
import QuestionPaperContainer from '../../containers/QuestionPaperContainer/QuestionPaperContainer'
import NotesContainer from '../../containers/NotesContainer/NotesContainer'
import SyllabusContainer from '../../containers/SyllabusContainer/SyllabusContainer'
import RegistrationForm from '../Forms/Registration/RegistrationForm'
import LoginForm from '../Forms/Login/LoginForm'
import ErrorHandler from '../../ErrorHandler/ErrorHandler'
// import Covid_Tracker from '../../containers/COVID_Tracker/covidTracker'

export default class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Route path='/' exact component={LandingPage}/>
                <Route path='/informations/technologies'  ><Jack /></Route>
                <Route path='/about/website' component={AboutWebsite} />
                <Route path='/contact' component={ContactUs}/>
                {/* <Route path='/covid_tracker' component={Covid_Tracker}/> */}
                <Route path='/downloads' exact component={Downloads}/>              
                <ErrorHandler>
                    <Route path='/user/register' exact component={RegistrationForm} />
                </ErrorHandler>
                <ErrorHandler>
                    <Route path='/user/login/' exact component={LoginForm} />
                </ErrorHandler>
                <Switch>
                    {/* <ErrorHandler> */}
                        <Route path='/downloads/question-papers' ><QuestionPaperContainer /></Route>
                    {/* </ErrorHandler> */}
                    {/* <ErrorHandler> */}
                        <Route path='/downloads/notes' ><NotesContainer /></Route>
                    {/* </ErrorHandler> */}
                    {/* <ErrorHandler> */}
                        <Route path='/downloads/syllabus' ><SyllabusContainer /></Route>
                    {/* </ErrorHandler> */}
                </Switch>
            </React.Fragment>
        )
    }
}
