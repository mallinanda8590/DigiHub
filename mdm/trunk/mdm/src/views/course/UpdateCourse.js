import React, { Component } from 'react';
import './../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../assets/css/font-awesome.min.css'
import { BrowserRouter as Router, Link,} from 'react-router-dom';
import { FormControl,FormControlLabel , InputLabel , Switch, Input, Grid , TextField}  from '@material-ui/core';
import { SingleSelect } from "react-select-material-ui";
import Button from '@material-ui/core/Button';
import {fetchCourseDetails,updateCourseDetails} from './../../util/api.js'
import {isNotEmpty} from './../../util/validation';

class UpdateCourse extends Component {
    
    constructor(props) {
        super(props);   

        this.state = {courseDetails:[],id:props.history.location.state.id,
          errors: {description: '',fee:'',trainingHour: '',studentPerBatch:'',ojt:''}};
        fetchCourseDetails(this.state.id).then((jsondata)=>{  
        let jsonobject = JSON.parse(jsondata.data);
        this.setState({courseDetails:jsonobject[0]});
        })
      
      } 


handleInputChange(event) {
var value =event.target.value;
var name =event.target.name;
this.setState({
  courseDetails: {
    ...this.state.courseDetails,
    [name]: value
  }
})
this.validate(name,value)
}

validate = (name,value)=>{

  let errors = this.state.errors;
  switch (name) {
    case 'description': errors.description =isNotEmpty(value);
      break;
    case 'fee': errors.fee = isNotEmpty(value);
      break;
    case 'trainingHour': errors.trainingHour =  isNotEmpty(value);
      break;
    case 'studentPerBatch': errors.studentPerBatch =  isNotEmpty(value);
      break;
    case 'ojt':  errors.ojt =  isNotEmpty(value);
    break;
    default:
    break;
}
 this.setState({errors});
}


validateForm = (errors) => {
  const localCourseDetails=this.state.courseDetails;
  let localThis=this;
  Object.keys(localCourseDetails).forEach(function(key) {localThis.validate(key,localCourseDetails[key]);});
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


update = (event) => {
  event.preventDefault(); 
  if(this.validateForm(this.state.errors)){

    updateCourseDetails(JSON.stringify(this.state.courseDetails)).then((jsondata)=>{  
    alert("Details are saved sucessfully"); 
  })
}


}

    render() {
        return (
            <div style = {{ width : '100%' }}>
            <form method="post" onSubmit = {this.update}>
              <fieldset id = "roleBasedDisable">
           <Grid container spacing={2}>
            <Grid item xs={12}>
                  <FormControl>
                  <h5>Course Details</h5>
                    </FormControl>  
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl>
                    <TextField   type="text" name="name" id="name" label ="Course Name"  
                    value={this.state.courseDetails.name || ""}  onChange={this.handleInputChange.bind(this)} />
                  </FormControl>  
                </Grid>
                <Grid item xs={12} sm={3}>
                <FormControl> 
                    <TextField   type="text" name="description" id="description" label ="Description"  
                      value={this.state.courseDetails.description || ""} onChange={this.handleInputChange.bind(this)}
                   
                      error={this.state.errors.description==''?false:true}
                      helperText={this.state.errors.description}
                   
                   />
                  </FormControl>  
                </Grid>
                
                <Grid item xs={12} sm={3}>
                <FormControl>
                    <TextField   type="number" name="fee" id="fee" label = "fee"  
                      value={this.state.courseDetails.fee || ""} onChange={this.handleInputChange.bind(this)}
                      error={this.state.errors.fee==''?false:true}
                      helperText={this.state.errors.fee}
                   
                   
                   />
                  </FormControl>  
                </Grid>

                <Grid item xs={12} sm={3}>
                <FormControl>
                    <TextField   type="number" name="trainingHour" id="trainingHour" label = "Training Hour"  
                      value={this.state.courseDetails.trainingHour || ""} onChange={this.handleInputChange.bind(this)}
                      error={this.state.errors.trainingHour==''?false:true}
                      helperText={this.state.errors.trainingHour}
             
             
             />
                  </FormControl>  
                </Grid>

                <Grid item xs={12} sm={3}>
                <FormControl>
                    <TextField   type="number" name="studentPerBatch" id="studentPerBatch" label = "Student Per Batch"  
                      value={this.state.courseDetails.studentPerBatch || ""} onChange={this.handleInputChange.bind(this)}
                      error={this.state.errors.studentPerBatch==''?false:true}
                      helperText={this.state.errors.studentPerBatch}
      
      
      />
                  </FormControl>  
                </Grid>

                <Grid item xs={12} sm={3}>
                <FormControl>
                    <TextField   type="number" name="ojt" id="ojt" label = "ojt"  
                      value={this.state.courseDetails.ojt || ""} onChange={this.handleInputChange.bind(this)}
                      error={this.state.errors.ojt==''?false:true}
                      helperText={this.state.errors.ojt}       
             />
                  </FormControl>  
                </Grid>
              </Grid>

<br/><br/>

<Grid container direction="row" justify="flex-end" alignItems="flex-end">
    <Button  id = "save" type = "submit" variant="contained"  color="primary"   size="small" >
               Update
              </Button>
              </Grid> 
              </fieldset>
            </form>
            </div>
        




         );
}
}
export default UpdateCourse;