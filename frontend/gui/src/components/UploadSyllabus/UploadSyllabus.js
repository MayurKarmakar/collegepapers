import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Base_Api_Path} from '../../urlPaths'

export default class UploadSyllabus extends Component {
    state={
        coursename:'',
        file:null,
        notes:null,
        submitted:false
    }
    
    inputHandler=(e)=>{
        this.setState({
            [e.target.id]:e.target.value,
        })
    }
    imageInputHandler=(e)=>{
        this.setState({
            file: e.target.files[0]
        })
    }
    notesInputHandler=(e)=>{
        this.setState({notes:e.target.files[0]})
    }
    submitHandler=(e)=>{
        e.preventDefault()
        let url =Base_Api_Path+'/app/syllabus/'
        let form_data = new FormData()
        form_data.append('coursename',this.state.coursename)
        form_data.append('file',this.state.file,this.state.file.name)
        form_data.append('notes',this.state.notes)
        JSON.stringify(form_data)
        axios.post(url,form_data,{
            'accept':'application/json',
            'content-type':'multipart/form-data'
        }).then(res=>{alert('Your Content Uploaded Successfully');this.setState({submitted:true})}).catch(err=>console.log(err),alert('Hmm...an error occured while uploading your file.'))


    }
    render() {
        let redirect = null
        if(this.state.submitted){
            redirect = <Redirect to='/syllabus'/>
        }
        return (
            <div className='container' style={{'margin':'0 auto','marginLeft':'35%','marginTop':'5rem'}}>
                <form onSubmit={this.submitHandler} encType='multipart/form-data' style={{"boxShadow":"0px 15px 15px 0px #888888",'padding':'10px 20px 20px 20px',"borderRadius":"2rem",'background':"url('https://cdn2.vectorstock.com/i/1000x1000/86/01/abstract-wave-line-form-background-vector-13538601.jpg')",'width':'45%'}}>
                    <div className="form" style={{'padding':'10px 20px 20px 20px'}}>
                        <div className="form-group">
                            <label htmlFor="inputEmail4">Course</label>
                            <input type="text" onChange={this.inputHandler} className="form-control" id="coursename" required/>
                        </div>
                        <div className="form-group">
                            <div className="custom-file">
                                <input type="file" onChange={this.imageInputHandler}  accept=".pdf" className="custom-file-input" id="file" name='inputGroupFile01' aria-describedby="inputGroupFileAddon01" required/>
                                <label className="custom-file-label" htmlFor="inputGroupFile01"><small className="form-text text-muted">Only (.pdf) files must and can be uploaded</small></label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-file">
                                <input type="file" onChange={this.notesInputHandler}  accept=".pdf,.txt,.doc,.docx| image/png, image/jpg, image/jpeg" className="custom-file-input" id="file" name='inputGroupFile01' aria-describedby="inputGroupFileAddon01"/>
                                <label className="custom-file-label" htmlFor="inputGroupFile01"></label>
                                <small className="form-text text-muted">Only (.pdf, .txt, .doc, .docx, .jpg, .jpeg, .png) files must and can be uploaded</small>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{'margin':'0 auto','marginLeft':'12rem'}}>Upload</button>
                    {redirect}
                </form>
            </div>
        )
    }
}
