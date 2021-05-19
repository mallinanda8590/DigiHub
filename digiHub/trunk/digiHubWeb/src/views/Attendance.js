import React, { Component } from 'react';
import { Checkbox ,FormControl , InputLabel, Input, Grid , TextField,Button}  from '@material-ui/core';
import UserContext from '../components/GolbalContext'
import {saveAttendanceDetails,fetchAllStudentDataByEngagementId,fetchCentersDetails,fetchCentersOfUser,fetchRunningBatchDetails,fetchAttendanceDetailsByAttendanceDateAndBatchId,
  fetchEnrollmentDetailsByBatchId} from './../util/api';
import AlertDialog from './../util/AlertDialog';
import { SingleSelect } from "react-select-material-ui";
const alertDialogOptions = {
    message: ''
  }
export default class Attendance extends Component{
    constructor(props){
        super(props)
        this.state = {center: [],batchId:"",batchs:[],attendanceDate:"",attendanceDetails:[]};
        let centerId = [];
    let currentComponent = this;
    fetchCentersOfUser(UserContext.userid).then((jsondata) => {
      let userJsonObjects = JSON.parse(jsondata.data);
      currentComponent.setState({ userScope: userJsonObjects });
      userJsonObjects.forEach(user => {
        centerId.push({ "id": user.centerId });
      })
    }).then(function (result) {
      let centerDetails = [];
      fetchCentersDetails(JSON.stringify(centerId)).then((jsondata) => {
        let centerObjects = JSON.parse(jsondata.data);
        centerObjects.forEach(center => {
          centerDetails.push({ label: center.name, value: center.id });
        })
        currentComponent.setState({ center: centerDetails });
      });
    })       
    }
    handleCenterChange(selectname, event) {
      this.setState({[selectname]:event});
      fetchRunningBatchDetails(event).then((jsondata)=>{    
          let studentInfo=[];
        let  batchDetails = JSON.parse(jsondata.data);  
              for(var i=0;i<batchDetails.length;i++){
              var  details =
              {    
                'value':batchDetails[i].batchId,
                'label':batchDetails[i].batchName            
              }; 
              studentInfo.push(details);    
          }    
          this.setState({batchs: studentInfo });
       }) 
    }
    handleBatchChange(selectname,event) {
        this.setState({[selectname]:event});
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value})
        let currentComponent = this;
       fetchAttendanceDetailsByAttendanceDateAndBatchId(this.state.batchId,this.state.attendanceDate).then((jsondata) => {
     // fetchAttendanceDetailsByAttendanceDateAndBatchId(32,"2016-05-04").then((jsondata) => {
            let studentData =[];
            let objects = JSON.parse(jsondata.data);
          if(objects.length!=0){            
            
            objects.forEach(object => {
              let  engagementIds=[];
              engagementIds.push({ engagementId: object.engagementId });
              let  status=object.status;
              let  engagementId=object.engagementId;
              fetchAllStudentDataByEngagementId(JSON.stringify(engagementIds)).then((jsondata) => {
                let studentObjects = JSON.parse(jsondata.data);
                studentData.push({ name: studentObjects[0].firstName, status: status,engagementId:engagementId});
              }).then(function(result){
                currentComponent.setState({attendanceDetails: []},()=>{
                    currentComponent.setState({attendanceDetails:studentData});
                });
              });
              })
            }
              else {
              fetchEnrollmentDetailsByBatchId(this.state.batchId).then((jsondata) => {
                let objects = JSON.parse(jsondata.data);
                objects.forEach(object => {
                  let  engagementIds=[];
                  engagementIds.push({ engagementId: object.engagementId });
                  let  status=object.status;
                  let  engagementId=object.engagementId;
                  fetchAllStudentDataByEngagementId(JSON.stringify(engagementIds)).then((jsondata) => {
                    let studentObjects = JSON.parse(jsondata.data);
                    studentData.push({ name: studentObjects[0].firstName, status:"",engagementId:engagementId});
                  }).then(function(result){
                    currentComponent.setState({attendanceDetails: []},()=>{
                        currentComponent.setState({attendanceDetails:studentData});
                    });
                  });
                  })

              })
            }
          });     
      }

      handleChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
        var attendanceDetails = [...this.state.attendanceDetails];
        var index = attendanceDetails.findIndex(obj => obj.engagementId == name);
         if(attendanceDetails[index].status==="P"){
          attendanceDetails[index].status ="A";
        }
else {
  attendanceDetails[index].status ="P";
}       
        this.setState({attendanceDetails});
     }

saveAttendaces = (event) => {
saveAttendanceDetails(JSON.stringify(this.state.attendanceDetails)).then((jsondata)=>{ 
    this.setState({alertDialogFlag:false});   
    alertDialogOptions.message="Data Saved Sucessfully";
    this.setState({alertDialogFlag:true});
 }) 
}


  render(){
  return(
  <div style = {{ width : '100%' }}>
      <form  method="post">
       <Grid container spacing={2}>
      <Grid item xs={12}>
          </Grid>
          <Grid item xs={4}>
                <InputLabel shrink={true} >Center Name</InputLabel>
                <SingleSelect 
                  name="centerName" id="centerName"
                  options={this.state.center}
                  onChange={this.handleCenterChange.bind(this, 'centerId')}
                  value={this.state.centerId || '' } />
              </Grid>
  
          <Grid item xs={4}>
          <InputLabel shrink={true} >Batch Name</InputLabel>
            <SingleSelect 
                  name="batchId" id="batchId"
                  options={this.state.batchs}
                  onChange={this.handleBatchChange.bind(this, 'batchId')}
                  value={this.state.batchId || '' } />
          </Grid> 
          <Grid item xs={12} sm={3}>
              <TextField id="attendanceDate" name="attendanceDate" id="attendanceDate"
                label="Attendance Date"
                type="date"
                onChange={this.handleInputChange.bind(this)}
                InputLabelProps={{
                  shrink: true,
                }} 
                />
            </Grid>
        </Grid>


        <table style = {{ width : '100%' }}>
  <tr>
    <th>Action</th>
    <th>Name</th>
    <th>Engagement Id</th>
    <th>Status</th>
  </tr>

  
  {this.state.attendanceDetails.map(row => (
    <tr>
    <td><Checkbox
            checked={row.status==="P"?true:false}
            onChange={this.handleChange.bind(this)}
            name={row.engagementId}
            value={row.engagementId}
            color="primary"
          /></td>
    <td>{row.name}</td>
    <td>{row.engagementId}</td>
    <td>{row.status}</td>
  </tr>
))}
</table>
    <br/>    
    <Button variant="contained" type="submit" color="primary" onClick={this.saveAttendaces}>Save</Button> 
        
        
          </form>
          { 
    (this.state.alertDialogFlag) && <AlertDialog   message={alertDialogOptions.message}></AlertDialog>
      }
          </div>

          
  )

  }  
  
}