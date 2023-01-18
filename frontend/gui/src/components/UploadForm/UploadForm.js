import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Base_Api_Path} from '../../urlPaths'
export default class UploadForm extends React.Component{
    state={
        coursename:'',
        subject:'',
        semister:'',
        file:null,
	submitted:false
    }
    inputHandler=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let sem = parseInt(this.state.semister,10)
        let form_data = new FormData()
        form_data.append('coursename',this.state.coursename)
        form_data.append('semister',sem)
        form_data.append('subject',this.state.subject)
        form_data.append('file',this.state.file,this.state.file.name)
        JSON.stringify(form_data)
        let url = Base_Api_Path+'/app/articlelist/'
        axios.post(url,form_data,{
            'accept':'application/json',
            'content-type':'multipart/form-data'
        }).then(res=>{alert('Uploaded Successfully');this.setState({submitted:true})})

    }
    fileHandler=(e)=>{
        this.setState({
            file: e.target.files[0]
        })
    }
    render(){
	let redirect = null
	if(this.state.submitted){
		redirect = <Redirect to='/questionList'/>
	}
        return (
            <div className='continer' style={{'width':'40%', 'margin':'0 auto','marginTop':'90px','border':'2px solid #798749','borderRadius':'1.5rem','boxShadow': '5px 10px 18px 5px #888888','marginLeft':'35rem'}}>
                <form style={{'padding':'40px 100px 40px 100px'}} encType='multipart/form-data' onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Course</label>
                        <input type="text" className="form-control" onChange={this.inputHandler} id="coursename" required />
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Subject</label>
                        <input type="text" className="form-control" onChange={this.inputHandler} id="subject" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Semister</label>
                        <input type="number" className="form-control" onChange={this.inputHandler} id="semister" placeholder="eg (1,2,3,..)" required />
                    </div>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file"  accept=".pdf, .doc, .docx | image/jpg, image/jpeg, image/png" onChange={this.fileHandler} className="custom-file-input" id="files" required  name='inputGroupFile01' aria-describedby="inputGroupFileAddon01"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile01"><small className="form-text text-muted">Only (.pdf) files must and can be uploaded</small></label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{'margin':'0 auto','marginLeft':'15rem','paddingTop':'5px'}}>Upload</button>
		    {redirect}
                </form>
            </div>
        )
    }
}
