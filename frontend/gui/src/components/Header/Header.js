import React from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/auth'
import { withRouter } from 'react-router-dom'
import Brand_Logo from '../../Assets/images/LOGO/college_Papers_new_Green_croped.png'



class Header extends React.Component {
    state = {
        collapsedStatus: '',
        username:null,
        isMobile: null,
    }

    NavbarToggle = () =>{

       this.setState({collapsedStatus:'collapse navbar-collapse show'})

    }

    UserLogoutHandler = (e) => {
        this.props.logoutUser()
    }



    render() {

        const collapsed = this.state.collapsedStatus;
        let classOne = collapsed === '' ? 'collapse navbar-collapse justify-content-left' : collapsed;
        let rightMenuItem = null 
        if(this.props.isAuthenticated){
            rightMenuItem =  <ul className='navbar-nav ml-auto'>
                <li className='nav-item d-none d-lg-block d-xl-none d-none d-xl-block'>
                    <NavLink to='#'  className='nav-link'>Hello {localStorage.getItem('firstname')}</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to="#" onClick={this.UserLogoutHandler} className='nav-link active' style={{'color':'white'}}>Logout</NavLink>
                </li>

            </ul>
            // <NavLink className="nav-link" to="/user/login">Hello {localStorage.getItem('firstname')}</NavLink>
        }else{
            rightMenuItem = 
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <NavLink className="nav-link active" to={{
                        pathname: '/user/login',
                        state: {
                            prevRoute: this.props.location.pathname
                        }
                    }}><span className='border p-2 rounded'>Login</span></NavLink>
                </li>
                <li className='nav-item'> 
                    <NavLink className='nav-link active' to='/user/register'><span className='border rounded p-2'>Register</span></NavLink>
                </li>
            </ul>
        }


        return (
            <React.Fragment>
                <header>
                        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                            <NavLink className="navbar-brand" to="/">
                                <img src={Brand_Logo} width="80" height="40" alt="Collegepapers"/>
                            </NavLink>  
                            {/* {this.state.isMobile && this.props.isAuthenticated? <ul className='navbar-nav mr-md-5'>
                                <li className='nav-item'>
                                    <NavLink to='#' className='nav-link'>Hello {localStorage.getItem('firstname')}</NavLink>
                                </li>
                            </ul>:null} */}
                            <ul className='navbar-nav ml-auto'>
                                <li className='nav-item'>
                                    {this.props.isAuthenticated?<NavLink to='#' className='nav-link d-block d-lg-none d-none d-md-block mr-2'>Hello {localStorage.getItem('firstname')}</NavLink>:null}
                                </li>
                            </ul>
                            <button  className="navbar-toggler"   type="button" data-toggle='collapse' data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className={classOne} id="navbarNavDropdown" onClick={this.NavbarToggle}>
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <NavLink className="nav-link"  to="/informations/technologies">Technologies<span className="sr-only">(current)</span></NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle"    to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Downloads
                                        </NavLink>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <NavLink className="dropdown-item"  to="/downloads/question-papers">Question Papers</NavLink>
                                            <NavLink className="dropdown-item"  to="/downloads/notes">Course Notes</NavLink>
                                            <NavLink className="dropdown-item"  to="/downloads/syllabus">Course Syllabus</NavLink>
                                            {/* <NavLink className="dropdown-item" to="/downloads/question-papers">Question Papers Navlink</NavLink> */}
                                            {/* <NavLink className="dropdown-item" to="/uploadquestion">Upload Questions</NavLink> */}
                                            {/* <NavLink className="dropdown-item" to="/uploadsyllabus">Upload Syllabus</NavLink> */}
                                        </div>
                                    </li>          
                                </ul>
                            </div>
                            {/* <NavLink className="nav-item"  to="/contact">Feedback<span className="sr-only">(current)</span></NavLink> */}
                            <div className='collapse navbar-collapse w-100 order-3 dual-collapse2' id='navbarNavDropdown'>
                                <ul className='navbar-nav'>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active"  to="/contact">Feedback<span className="sr-only">(current)</span></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active"  to="/about/website">About<span className="sr-only">(current)</span></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        {/* <NavLink className="nav-link active"  to="/covid_tracker">Covid Tracker<span className="sr-only">(current)</span></NavLink> */}
                                    </li>
                                </ul>
                            </div>
                            <div className='collapse navbar-collapse w-100 order-3 dual-collapse2' id='navbarNavDropdown'>
                                {/* <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/user/login">Login</NavLink>
                                        {rightMenuItem}
                                    </li>
                                    <li className="nav-item">
                                        {!this.props.isAuthenticated ?
                                            <NavLink className="nav-link" to="/user/register">Register</NavLink>
                                        :null}
                                    </li>
                                </ul> */}
                                {rightMenuItem}
                            </div>
                        </nav>
                </header>
            </React.Fragment>
        )

    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.key !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: ()=> dispatch(actions.Logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));