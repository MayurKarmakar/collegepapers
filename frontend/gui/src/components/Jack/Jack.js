import React, { Component } from 'react'
import {Link} from 'react-router-dom'


import python_logo from '../../Assets/images/TechnologyComponent/python_logo_100px.png'
import django_logo from '../../Assets/images/TechnologyComponent/django_logo_100px.png'
import angular_logo from '../../Assets/images/TechnologyComponent/angular_logo_100px.png'
import aps_core_logo from '../../Assets/images/TechnologyComponent/asp_net_core_logo_100px.png'
// import AI_logo from '../../Assets/images/TechnologyComponent/AI_revolution_resize_600px.jpg'
// import classes from './Jack.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'


export default class Jack extends Component {

    componentDidMount = () =>{
        document.title = 'Technologies'
    }


    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className='container'>
                    <div className='row'>
                        <div className='col mt-4'>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Technologies</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col mt-5 pt-2'>
                            <h2>Technologies around us</h2>
                            <blockquote className='blockquote text-center'>
                                <p className='mb-0'>
                                    <i>" Technology is just a tool. In terms of getting the kids working 
                                    together and motivating them, the teacher is the most important. "</i>
                                </p>
                                <footer className='blockquote-footer'>Bill Gates</footer>
                            </blockquote>
                        </div>
                    </div>
                    <hr/>
                    {/* <div className='row'>
                        <div className='col'>
                            <div className='col mt-4'>
                                <img alt='Not found' src={AI_logo} className="img-fluid"></img>
                                <h2 className={classes.AI_heading}>Artificial Intelligence </h2>
                            </div>
                        </div>
                    </div> */}
                    <div className='row'>
                        <div className='col-3 mt-5 '>
                            <img alt='Not found' src={python_logo} className='img-thumbnail'></img>
                        </div>
                        <div className='col-9 mt-5'>
                            <h3>Python</h3>
                            <p>Python is an interpreted, high-level, general-purpose programming language. 
                                Created by Guido van Rossum and first released in 1991, Python's design philosophy emphasizes code readability 
                                with its notable use of significant whitespace. Its language constructs and object-oriented approach aim to help 
                                programmers write clear, logical code for small and large-scale projects.</p>                    
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <img alt='Not found' src={django_logo} className='img-thumbnail' />
                        </div>
                        <div className='col-9'>
                            <h3>Django</h3>
                            <p>
                            Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. 
                            Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on 
                            writing your app without needing to reinvent the wheel. It’s free and open source.
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <img alt='Not found' src={angular_logo} className='img-thumbnail'></img>
                        </div>
                        <div className='col-9'>
                            <h3>Angular</h3>
                            <p>
                            AngularJS is a JavaScript-based open-source front-end web framework mainly maintained by Google 
                            and by a community of individuals and corporations to address many of the challenges encountered in 
                            developing single-page applications. It aims to simplify both the development and the testing of such applications 
                            by providing a framework for client-side model–view–controller (MVC) and model–view–viewmodel (MVVM) architectures, 
                            along with components commonly used in rich Internet applications.
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <img alt='Not found' src={aps_core_logo} className='img-thumbnail'></img>
                        </div>
                        <div className='col-9'>
                            <h3>Microsoft &reg; .NET Core</h3>
                            <p>
                            ASP.NET is a popular web-development framework for building web apps on the .NET platform.
                            </p>
                            <p>
                            ASP.NET Core is the open-source version of ASP.NET, that runs on macOS, Linux, and Windows. 
                            ASP.NET Core was first released in 2016 and is a re-design of earlier Windows-only versions of ASP.NET.
                            </p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}
