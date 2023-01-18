import React, { Component } from 'react'
class QuestionPaper extends Component {



    downloadHandler=(filesPath,downloadLink)=>{
        let pathBreak = filesPath.split("//")
        let convertedUrlPath = 'https://'+pathBreak[1]
        fetch(convertedUrlPath).then(res=>{
            res.blob().then(blob=>{
                console.log(blob)
                let url = window.URL.createObjectURL(blob)
                let link = document.getElementById(downloadLink)
                link.setAttribute('href',url)
                link.setAttribute('download','download')
                link.click()
            })
        })
    }

    fileNameExtractor = () =>{

        let fileName = null

        let nameList = this.props.filepath.split('/')

        fileName = nameList[5].substring(0,20)


        return fileName

    }

    render() {



        return (
            <tbody>
                <tr>
                    <td scope='row'>{this.props.coursename}    {this.props.subject}    Sem {this.props.semester}</td>
                    <td><a href={this.props.filepath}><i className="fa fa-download mr-2" aria-hidden="true"></i>
                        {this.fileNameExtractor()}</a></td>
                    
                </tr>
            </tbody>

        )
    }
}
export default QuestionPaper;