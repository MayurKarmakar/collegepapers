import React from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'



 class Notes extends React.Component{

    
    
    downloadHandler=(filePath,downloadTrigger)=>{
        let pathBreak = filePath.split("//")
        let convertedFileUrl = 'https://'+pathBreak[1]
        fetch(convertedFileUrl).then(res=>{
            res.blob().then(blob=>{
                
                let url = window.URL.createObjectURL(blob)
                let getTrigger = document.getElementById(downloadTrigger)
                getTrigger.setAttribute('href',url)
                getTrigger.setAttribute('download','download')
                getTrigger.click()
            })
        })
    }

    redirectHandler = (e, filepath) => {
        e.preventDefault()
        this.props.history.push({
            pathname: '/user/login',
            state: {
                prevRoute: this.props.match.url,
                file:   this.props.fileid
            }
        })
    }

    fileNameExtractor = () => {

        let fileName = null

        let fileNameArray = this.props.filepath.split("/")[5]

        let firstName = fileNameArray.substring(0,8)
        let lastName = fileNameArray.substring(fileNameArray.length-8)
        
        fileName = firstName+'...'+lastName

        return  fileName

    }


     render(){

         return (
             <tbody>
                <tr>
                    <td className='d-inline-flex flex-lg-column flex-md-column flex-sm-row'> <b>{this.props.courseName}  {this.props.subject}  Sem {this.props.semester} </b> </td>
                    <td>
                        {this.props.isAuthenticated? 
                            <a href={this.props.filepath} id={this.props.fileid} ><i className="fa fa-download mr-2" aria-hidden="true"></i>
                            {this.fileNameExtractor()}</a>
                        : <a onClick={(e)=>this.redirectHandler(e,this.props.fileid)} href={this.props.filepath} id={this.props.fileid} ><i className="fa fa-download mr-2" aria-hidden="true"></i>
                        {this.fileNameExtractor()}</a>
                        }
                    </td>
                </tr>
            </tbody>
         )
     }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.key !== null
    }
}



export default connect(mapStateToProps)(withRouter(Notes));
