import React, { Component } from 'react';
import { render } from "react-dom";
import './../App.css';
import './../assets/css/login-style.css'
//import './../assets/css/login-style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SingleSelect } from "react-select-material-ui";
import callMerge from 'material-ui/svg-icons/communication/call-merge';
import UserContext from '../components/GolbalContext'
import { FormControl , InputLabel, Input, Grid , TextField}  from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {fetchEducationData, submitEducationData} from './../util/api';
import {checkButton ,validateQualificationName,  validateNames, roleBasedReadonly, checkButtonForArray} from './../util/validation';
import AlertDialog from './../util/AlertDialog';
import { serviceEndPoint } from './../util/serviceEndPoint';

const alertDialogOptions = {
  message: ''
}
class Education extends Component {
    
    constructor(props) {
        super(props);
         this.state = {
          qual : [
            { value: 'Uneducated', label: 'Uneducated' },
            { value: 'Below 5th Standard', label: 'Below 5th Standard' },
            { value: '5th Standard Passed', label: '5th Standard Passed' },
            { value: '7th Standard Passed', label: '7th Standard Passed' },
            { value: '8th Standard Failed', label: '8th Standard Failed' },
            { value: '8th Standard Passed', label: '8th Standard Passed' },
            { value: '9th Standard Passed', label: '9th Standard Passed' },
            { value: '10th Standard Passed', label: '10th Standard Passed' },
            { value: '12th Standard', label: '12th Standard' },
            { value: 'Below 12th Standard', label: 'Below 12th Standard' },
            { value: '12th Passed - science', label: '12th Passed - science' },
            { value: '12th Passed - Non-science', label: '12th Passed - Non-science' },
            { value: '12th Standard Passed', label: '12th Standard Passed' },
            { value: 'CSTI Certified', label: 'CSTI Certified' },
            { value: 'Diploma', label: 'Diploma' },
            { value: 'ITI', label: 'ITI' },
            { value: 'Professional', label: 'Professional' },
            { value: 'Degree', label: 'Degree' },
            { value: 'BSC - science', label: 'BSC - science' },
            { value: 'BSC - Non-science', label: 'BSC - Non-science' },
            { value: '2 Years Diploma', label: '2 Years Diploma' },
            { value: 'Bachelors Degree 2nd Year', label: 'Bachelors Degree 2nd Year' },
            { value: 'Bachelors Degree 3rd Year', label: 'Bachelors Degree 3rd Year' },
            { value: 'Bachelors Degree 4th Year', label: 'Bachelors Degree 4th Year' },
            { value: 'Bachelors Degree 5th Year', label: 'Bachelors Degree 5th Year' },
            { value: 'Graduate', label: 'Graduate' },
            { value: 'Masters Degree 1st Year', label: 'Masters Degree 1st Year' },
            { value: 'Masters Degree 2nd Year', label: 'Masters Degree 2nd Year' },
            { value: 'Post Graduate', label: 'Post Graduate' }
            ],
            
          passingYear : [
            { value: 2020, label: '2020' },
            { value: 2019, label: '2019' },
             { value: 2018, label: '2018' },
            { value: 2017, label: '2017' },
            { value: 2016, label: '2016' },
            { value: 2015, label: '2015' },
            { value: 2014, label: '2014' },
            { value: 2013, label: '2013' } ,
            { value: 2012, label: '2012' },
            { value: 2011, label: '2011' },
            { value: 2010, label: '2010' },
            { value: 2009, label: '2009' },
            { value: 2008, label: '2008' },
            { value: 2007, label: '2007' } ,
            { value: 2006, label: '2006' },
            { value: 2005, label: '2005' },
            { value: 2004, label: '2004' },
            { value: 2003, label: '2003' },
            { value: 2002, label: '2002' },
            { value: 2001, label: '2001' } ,
              { value: 2000, label: '2000' },
              { value: 1999, label: '1999' },
              { value: 1998, label: '1998' },
              { value: 1997, label: '1997' },
              { value: 1996, label: '1996' },
              { value: 1995, label: '1995' } ,
              { value: 1994, label: '1994' },
              { value: 1993, label: '1993' },
              { value: 1992, label: '1992' },
              { value: 1991, label: '1991' },
              { value: 1990, label: '1990' },
              { value: 1989, label: '1989' }  ,
              { value: 1988, label: '1988' },
              { value: 1987, label: '1987' },
              { value: 1986, label: '1986' },
              { value: 1985, label: '1985' },
              { value: 1984, label: '1984' }
             
                        
          ],
          disabled : false , flag : "0" , errors : [{}] , firstName : props.name , dbUserId : props.id,rows: [{"createdBy" : UserContext.userid ,   "updatedBy" : UserContext.userid, "isActive" : "Y" , "dbUserId" : props.id}],
          engagementId:props.engagementId , status : props.status, alertDialogFlag:false
         };
         this.handleChange = this.handleChange.bind(this);
         this.handleSelectChange = this.handleSelectChange.bind(this);
         if(props.id != null && props.id != undefined)
         {
          this.getEduData((props.id));
         
         }
         
     }
     componentDidMount()
    {
      roleBasedReadonly();
    }

      handleSelectChange(selectname, event, idx) {
        const errors = [...this.state.errors];
        const rows = [...this.state.rows];
        this.setState({
          "disabled" : false
        });
        if (errors[event] ==undefined){
          errors[event]={}
        }
        errors[event] [selectname] = {"label" : "" , "value" : false};
        if(selectname == "qualificationId")
      {
        
  
        let res = validateQualificationName(idx, rows);
        if (errors[event] ==undefined){
          errors[event]={}
        }
        errors[event] [selectname] = {"label" : res , "value" : res == "" ? false:true};
      }
        
        rows[event] [selectname] = idx;
        this.setState({
          rows,errors
        });
       // alert(JSON.stringify(this.state));
        
      }
      validateAll()
      {
        var errors = this.state.errors;
        this.state.rows.map((item,idx) => {
          Object.keys(item).forEach(function(key) {
            if((key != "splCourse") && (key != "remarks") && (key != "updatedBy") && (item[key] == undefined || item[key] == '' ))
            {
             // alert(key);
              let res = "Cannot be empty";
                errors[idx][key] = {
                    'label' : res , 
                    'value' : res == "" ? false : true 
                  }
           }
        });
        })
        
        this.state.errors = errors;
      }
      handleChange = idx => e => {
        const rows = [...this.state.rows];
        const errors = [...this.state.errors];
        const { name, value } = e.target;
        if (errors[idx] ==undefined){
          errors[idx]={}
        }
        errors[idx] [name] = {"label" : "" , "value" : false};
        this.setState({
          "disabled" : false
        });
        if(name == "instituteName" || name == "splCourse")
        {
          let res = validateNames(value);
          errors[idx] [name] = {"label" : res , "value" : res == "" ? false:true};
        }
        rows[idx] [name]= value;
        
        this.setState({
          rows,errors
        });
        
       // alert(JSON.stringify(this.state));
      };
      handleAddRow = (props) => {
        const item = {
          dbUserId : this.state.dbUserId,
          createdBy : UserContext.userid,
          updatedBy : UserContext.userid,
          isActive : "Y",
          qualificationId: "",
          passingYear: "",
          instituteName: "",
          marksPercentage: "",
          splCourse: ""
        };
        this.setState({
          rows: [...this.state.rows, item],
          errors : [...this.state.errors, {}],
        });
      };
      handleRemoveRow = () => {
        this.setState({
          rows: this.state.rows.slice(0, -1),
          errors : this.state.errors.slice(0, -1),
        });
      };
      handleRemoveSpecificRow = (idx) => () => {
        const rows = [...this.state.rows]
        const errors = [...this.state.errors]
        rows.splice(idx, 1)
        errors.splice(idx, 1)
        this.setState({ rows , errors })
      }
      mySubmitHandler = (event) => {
        event.preventDefault();
        this.validateAll();
      
        // authentication response and redirect to error or dashbaord page
        this.setState({
          errors : this.state.errors
        });
      //  alert(this.state.errors);
        if(checkButtonForArray(this.state.errors))
          {
          //  alert(this.state.errors);
            this.state.disabled = false;
            this.submitEduData();
          }
          else
          {
            this.state.disabled = true;
        }
       
    }


    submitEduData()
{
    this.setState({alertDialogFlag:false});
    let msg="";
    let action = "";
    const dbUserId = (this.state.dbUserId == '' || this.state.dbUserId == null);
      if (dbUserId) {
        action =  "captureAllEducation";
        msg="Education Details Saved Sucessfully";
       
      } else {
        action =  "updateAllEducation";
        msg="Education Details updated Sucessfully";
        
      }
   // alert("edudata submit"+JSON.stringify(this.state.rows));
       
        submitEducationData(action,this.state.rows).then((jsondata)=>{
            if(jsondata.appError==null){     
        
                let jsonobjects = JSON.parse(jsondata.data);
                console.log(jsonobjects); 
      
            alertDialogOptions.message=<span style={{color:"green"}}>{msg}</span>;
                this.setState({alertDialogFlag:true});
   
                if(action == 'captureAllEducation')
                {
                   // alert(action);
                   setTimeout(() => { this.props.history.push({
                    pathname: '/dashboard/addobeneficiary',
                    state: { dbUserId: jsonobjects[0].dbUserId ,  tab : 3 , engagementId : this.state.engagementId , status : this.state.status }
                  })},3000); 

                // this.props.history.push({
                //   pathname: '/dashboard/addobeneficiary',
                //   state: { dbUserId: jsonobjects[0].dbUserId ,  tab : 2 , engagementId : this.state.engagementId , status : this.state.status }
                // });
                }
                else 
                {
                  setTimeout(() => {this.props.history.push({
                    pathname: '/dashboard/updatebeneficiary',
                    state: { dbUserId: jsonobjects[0].dbUserId,engagementId:this.state.engagementId, status : this.state.status , tab : 3 }
                  })},3000); 

                  //  this.props.history.push({
                  //   pathname: '/dashboard/updatebeneficiary',
                  //   state: { dbUserId: jsonobjects[0].dbUserId,engagementId:this.state.engagementId, status : this.state.status , tab : 2 }
                  // });
                }
                 
            }  else{
                console.log("error");
            } 
         })
   
}


getEduData(id)
    {
        
      fetchEducationData(id).then((jsondata)=>{
              console.log(jsondata); 
           
              if(jsondata.appError==null){      
                  let jsonobjects = JSON.parse(jsondata.data);
                  console.log(jsonobjects); 
                  //alert( JSON.stringify(jsonobjects));
                
                  this.setState({
                    rows: jsonobjects
                   });
                  
                 
               //  alert(JSON.stringify(this.state.rows));
              
              }  else{
                  console.log("error");
              } 
           })

    }

      render() {
        const options = {
          responsive: "scroll"
        }
        const dbUserId = (this.state.dbUserId == '' || this.state.dbUserId == null);
        let button;

        if (dbUserId) {
            button =   <Button variant="contained" type="submit" size="small" color="primary" disabled = {this.state.disabled}>
            Save
        </Button>;
        } else {
            button = <Button type="submit" variant="contained" size="small" color="primary" disabled = {this.state.disabled}>Update</Button>;
        }

        return (
          <div>
            <div className="container">
              
              <div className="row clearfix">
                <div className="col-md-12 column">
                <form onSubmit={this.mySubmitHandler} method="post">
                <fieldset id = "roleBasedDisable">
                  <table
                    className="table table-bordered table-hover"
                    id="tab_logic"
                  >
                    <thead>
                      <tr>
                        <th className="text-center"> Qualification </th>
                        <th font-size= "6px" className="text-center"> Passing Year </th>
                        <th className="text-center"> Institute Name </th>
                        <th className="text-center"> Percentage Marks </th>
                        <th className="text-center"> Specialization </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.rows.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                          
                          <td width="25%">
                          <SingleSelect  onChange={this.handleSelectChange.bind(this, 'qualificationId',idx)} name="qualificationId" id="qualificationId"
                            value={this.state.rows[idx].qualificationId }
                            helperText = {this.state.errors[idx] != undefined && this.state.errors[idx].qualificationId != undefined ? this.state.errors[idx].qualificationId.label : '' } 
                               error = {this.state.errors[idx] != undefined && this.state.errors[idx].qualificationId != undefined ? this.state.errors[idx].qualificationId.value : '' }
                            options={this.state.qual} 
                            /> 
                          </td>
                          <td>
                          <SingleSelect  onChange={this.handleSelectChange.bind(this, 'passingYear',idx)} name="passingYear" id="passingYear"
                            value={this.state.rows[idx].passingYear || ''}
                            helperText = {this.state.errors[idx] != undefined && this.state.errors[idx].passingYear != undefined ? this.state.errors[idx].passingYear.label : '' } 
                               error = {this.state.errors[idx] != undefined && this.state.errors[idx].passingYear != undefined ? this.state.errors[idx].passingYear.value : '' }
                            options={this.state.passingYear} 
                            /> 
                          </td>
                          <td>
                            <TextField
                              type="text"
                              name="instituteName"
                              value={this.state.rows[idx].instituteName}
                              onChange={this.handleChange(idx)}
                              helperText = {this.state.errors[idx] != undefined && this.state.errors[idx].instituteName != undefined ? this.state.errors[idx].instituteName.label : '' } 
                               error = {this.state.errors[idx] != undefined && this.state.errors[idx].instituteName != undefined ? this.state.errors[idx].instituteName.value : '' }
                              className="form-control"
                            />
                          </td>
                          <td width="10%">
                            <TextField 
                              type="number"
                              name="marksPercentage"
                              value={this.state.rows[idx].marksPercentage}
                              onChange={this.handleChange(idx)}
                              onInput = {(e) =>{
                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)
                            }}
                              helperText = {this.state.errors[idx] != undefined && this.state.errors[idx].marksPercentage != undefined ? this.state.errors[idx].marksPercentage.label : '' } 
                               error = {this.state.errors[idx] != undefined && this.state.errors[idx].marksPercentage != undefined ? this.state.errors[idx].marksPercentage.value : '' }
                              className="form-control"
                            />
                          </td>
                          <td>
                            <TextField
                              type="text"
                              name="splCourse"
                              value={this.state.rows[idx].splCourse}
                              onChange={this.handleChange(idx)}
                              helperText = {this.state.errors[idx] != undefined && this.state.errors[idx].splCourse != undefined ? this.state.errors[idx].splCourse.label : '' } 
                               error = {this.state.errors[idx] != undefined && this.state.errors[idx].splCourse != undefined ? this.state.errors[idx].splCourse.value : '' }
                              className="form-control"
                            />
                          </td>
                          <td>
                            <Button variant="contained" type="button"
                             size="small" color="secondary" 
                              onClick={this.handleRemoveSpecificRow(idx)}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                 
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={3}>
                  <Button variant="contained" type="button"  onClick={this.handleAddRow} size="small" color="primary" >
            Add Row
        </Button></Grid><Grid item xs={12} sm={3}></Grid><Grid item xs={12} sm={3}></Grid>
        <Grid  item xs={12} sm={3} justify="flex-end" alignItems="flex-end">
        <Button justify="flex-end" alignItems="flex-end" variant="contained" type="button"  onClick={this.handleRemoveRow} size="small" color="secondary" >
            Delete Row
        </Button></Grid></Grid>
{/* <Input type = "button" onClick={this.handleAddRow} className="btn btn-primary btn-xs" size="small" value = "Add Row" /> */}
                  {/* <Input type = "button" onClick={this.handleRemoveRow} className="btn btn-danger float-right" value = "Delete Row" /> */}
                <div><br/><br/></div>
                  <div>{button}</div>
                  </fieldset>
                  </form>
                  { 
  (this.state.alertDialogFlag) && <AlertDialog   message={alertDialogOptions.message}></AlertDialog>
    }
                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default Education;