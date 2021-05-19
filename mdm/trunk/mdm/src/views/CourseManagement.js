import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../assets/css/font-awesome.min.css'
import logo from "./../assets/images/tatastrivelogo.png";
import UserContext from './../components/GolbalContext'
import {fetchAllCourseDetails} from '../util/api.js'
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import {
  BrowserRouter as Router,
  Link,
  
} from 'react-router-dom';

import Button from '@material-ui/core/Button'




class CourseManagement extends Component {
    
    constructor(props) {
        super(props);   
        this.state = {action:'login',courseDetails:[]};
        this.handleInputChange = this.handleInputChange.bind(this);  
    
        fetchAllCourseDetails().then((jsondata)=>{
            let jsonobjects = JSON.parse(jsondata.data);
             let courseDetails=[];
             for(var i=0;i<jsonobjects.length;i++){
                var  details =
                {   
                    'Name':jsonobjects[i].name, 
                    'Fee':jsonobjects[i].fee,
                    'Description':jsonobjects[i].description,
                    'isActive':jsonobjects[i].isActive,
                    'Training Hour' :jsonobjects[i].trainingHour,
                    'Action':<Link to={{
                      pathname: '/dashboard/updatecourse',
                      state: { id: jsonobjects[i].id}
                    }}><EditIcon /></Link>
                }; 
                courseDetails.push(details);    
            }
this.setState({courseDetails:courseDetails});
            })
        } 


    handleInputChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });    
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
    }


    render() {       
        const responseGoogle = (response) => {           
            this.setState({token:response.getAuthResponse().id_token}); 
            this.setState({action:'socialAccountLogin'});   
            this.callme();
        }

        const columns = ["Name","Fee","Description","isActive","Training Hour","Action"];
        return (
    <div>     

<Button variant="contained"  color="primary" size="small">
<Link style = {{color : 'white'}} to={{ pathname: '/dashboard/createcourse'  
}} > Add Course</Link>
  </Button>     

<br/><br/>

 <MUIDataTable
   title={"Course Management"}
   data={this.state.courseDetails}
   columns={columns} />
</div>                
         );
}
}
export default CourseManagement;