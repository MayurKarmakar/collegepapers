import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <div className='bg-dark position-relative'>
                <div className='container-fluid'>
                    {/* <div className='row'>
                        <div className='col-lg-4 text-center text-lg-right col-md-3 col-sm-6 text-light pt-3'>
                            <h4 className='footer-text text-end'>About</h4>
                            <ul className='list-unstyled'>
                                <li><p><NavLink to='/about/website' className='text-white'>Website</NavLink></p></li>
                            </ul>
                        </div>
                        <div className='col-lg-4 text-center text-lg-center pt-3 col-md-3 col-sm-6'>
                            <NavLink to='/contact' className='text-white lead'><h4>Contact Us</h4></NavLink>
                        </div>
                        <div className='col-lg-4 text-center text-lg-left pt-3 col-md-3 col-sm-6'>
                            <h4 className='text-white'>Mail Us</h4>
                            <ul className='list-unstyled text-white'>
                                <li><i className='fa fa-envelope mr-2'></i><p>support@collegepapers.in</p></li>
                            </ul>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col text-white text-center'>
                            <p>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved.</p>
                        </div>
                    </div> */}
                    <div className='row text-white pt-3 px-auto ml-lg-4'>
                        <div className='col-lg-3 col-md-3 col-12'>
                            <h4 className='font-weight-bold'>College Papers</h4>
                            <p>This webapp lets students download study contents any time and from anywhere, which makes the webapp
                                a centeralized place for serving all those contents.
                            </p>
                        </div>
                        <div className='col-lg-3 col-md-3 col-6'>
                            <h4 className='font-weight-bold'>Downloads</h4>
                            <p><NavLink to='/downloads/question-papers' className='text-white'>Question Papers</NavLink></p>
                            <p><NavLink to='/downloads/notes' className='text-white'>Course Notes</NavLink></p>
                            <p><NavLink to='/downloads/syllabus' className='text-white'>Course Syllabus</NavLink></p>
                        </div>
                        <div className='col-lg-3 col-md-3 col-6'>
                            <h4 className='font-weight-bold'>Useful Links</h4>
                            <p><NavLink to='/about/website' className='text-white'>About us</NavLink></p>
                            <p><NavLink to='/contact' className='text-white'>Feedback</NavLink></p>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-6'>
                            <h4 className='font-weight-bold'>Contact us</h4>
                            <p><i className='fa fa-envelope mr-2'></i>support@collegepapers.in</p>
                            <p><i className='fa fa-phone mr-2'></i> + 91 7250622143</p>
                        </div>
                        <hr color='white'/>
                    </div>
                    <div className='row'>
                        <div className='col text-center text-white align-bottom'>
                            <hr color='white'/>
                            <p>Copyright &copy; {new Date().getFullYear()}. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
