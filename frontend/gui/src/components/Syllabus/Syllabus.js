import React from 'react'

export default class Notes extends React.Component{
    
    nameExtractor = () => {
        
        let fileName = null 
        let nameArray = this.props.filepath.split('/')

        if(nameArray[5].length > 20){
            fileName = nameArray[5].substring(0, 5)+"..."+nameArray[5].substring(nameArray[5].length-12)
        }else{
            fileName = nameArray[5].substring(0,24)
        }


        return fileName
    }


    render(){
        
        // this.nameExtractor()

        return (
            <tbody>
                <tr>
                    <td> {this.props.courseName} </td>
                    <td><a href={this.props.filepath}><i className="fa fa-download mr-2" aria-hidden="true"></i>
                        {this.nameExtractor()}</a></td>
                </tr>
            </tbody>
        )
    }
}
