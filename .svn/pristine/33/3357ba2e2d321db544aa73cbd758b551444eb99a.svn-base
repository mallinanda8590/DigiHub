import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {DropzoneArea} from 'material-ui-dropzone';
import { SingleSelect } from "react-select-material-ui";
import {TextField,Button,Grid}  from '@material-ui/core';
import './../assets/css/style.css';
  import { fetchUserDocumentsByUserIdAndTypeOfDocument,fetchUserProfileBydbUserIdAndTypeOfDocument,fetchAllStudentDetails,fetchAllStudentAssessmentDetails,fetchAllPostPlacementDetails} from './../util/api';
import Paper from '@material-ui/core/Paper';
import { serviceEndPoint } from './../util/serviceEndPoint';
import UserContext from '../components/GolbalContext'
import AlertDialog from './../util/AlertDialog';
const alertDialogOptions = {
  message: ''
}

export default class DigiProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state ={studentId:props.history.location.state.dbUserId,userId: UserContext.userid,
          dbUserId:props.history.location.state.dbUserId,
          name:props.history.location.state.name,dob:props.history.location.state.dob,
          highestQualification:props.history.location.state.highestQualification,studentData:[],studentData1:[],
          documents:[],profilePictureUrl:""}
     
      this.studentData();
      this.studentAssessmentData();
      this.studentPostPlacementData();
      this.getDocuments();
     // this.downloadProfilePicture();
      this.getProfilePicture();
      }

      
    studentData(){

        fetchAllStudentDetails(this.state.studentId).then((jsondata)=>{
              
              let jsonobjects = JSON.parse(jsondata.data);
            //alert(JSON.stringify(jsonobjects));
            this.setState({
              studentData: jsonobjects[0]
             });
          
      });                       
      }
  
      studentAssessmentData(){
  
          fetchAllStudentAssessmentDetails(this.state.dbUserId).then((jsondata)=>{
                
                let jsonobjects1 = JSON.parse(jsondata.data);
            //  alert(JSON.stringify(jsonobjects1));
              
              this.setState({
                studentData1: jsonobjects1[0]
               });
              
        });                       
        }
  
        studentPostPlacementData(){
  
          fetchAllPostPlacementDetails(this.state.id).then((jsondata)=>{
                
                let jsonobjects2 = JSON.parse(jsondata.data);
             // alert(JSON.stringify(jsonobjects2));
              this.setState({
                studentData2: jsonobjects2[0]
               });
            
        });                       
        }

getDocuments(){

fetchUserDocumentsByUserIdAndTypeOfDocument(this.state.dbUserId,'G').then((jsondata) => {   
let jsonobjects = JSON.parse(jsondata.data);          
this.setState({documents: [...this.state.documents,...jsonobjects]})    
});

}

getProfilePicture(){
//alert("img");
fetchUserProfileBydbUserIdAndTypeOfDocument(this.state.dbUserId,'G','Y','StudentPicture').then((jsondata) => {   
let jsonobjects = JSON.parse(jsondata.data);       
alert(JSON.stringify(jsonobjects));  
// var url=serviceEndPoint.downloadDocument+jsonobjects[0].documentPath+""; 
// this.setState({ profilePictureUrl:url}); 
this.setState({documents: [...this.state.documents,...jsonobjects]})    
});

}

    
    downloadDocuments = (value) => 
    {
    let formData = new FormData();
      formData.append('data', '{"token" : "", "action" : "downloadDocument", "data" : [{"basicDocId":'+value+'}]}');
      fetch(serviceEndPoint.documentServiceEndPoint, {
          method: 'post',
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData
      }).then(response => response.json()).then((jsondata)=>{
        let jsonobjects = JSON.parse(jsondata.data);
        var url=serviceEndPoint.downloadDocument+jsonobjects[0].documentPath+""; 
        window.open(url, "_blank");
       
    
      });
      }
    //   downloadProfilePicture = (value) => 
    //   {
    //   let formData = new FormData();
    //     formData.append('data', '{"token" : "", "action" : "downloadDocument", "data" : [{"basicDocId":'+value+'}]}');
    //     fetch(serviceEndPoint.documentServiceEndPoint, {
    //         method: 'post',
    //         headers: {
    //           'Authorization': 'Bearer '+UserContext.token
    //       }, 
    //         body: formData
    //     }).then(response => response.json()).then((jsondata)=>{
    //       let jsonobjects = JSON.parse(jsondata.data);
    //       var url=serviceEndPoint.downloadDocument+jsonobjects[0].documentPath+""; 
    //       this.setState({ profilePictureUrl:url});
         
      
    //     });
    //     }


  onFileChangeHandler = (files) => {this.setState({file: files[0]});}

  uploadDocuments = (e) => {
    e.preventDefault();
    var localThis=this;
   this.state.documentType.map(function(documentType){
    localThis.uploadDocument(documentType);
  });

  this.setState({documentNumber:''});
  this.setState({clearDropzoneArea: this.state.clearDropzoneArea + 1});
 // this.setState({typeOfDocument:null});
  this.setState({ documentType:[]});
    
  }

 

  render() {
    return (
        <div class="container-fluid">
               <Button variant="contained" color="primary" size="small" name="download" id="download" 
              onClick={() => window.print()}>Print</Button>
          
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-8 col-xs-12">
                <div class="tile">
                    <div class="wrapper">
                        <div class="header">Student Details</div>

                        <div class="banner-img">
                        <img src={this.state.documents.documentPath} />
                        </div>

                        <div class="dates">
                            <div class="start">
                                <strong>Student ID</strong> {this.state.dbUserId}
                                <span></span>
                            </div>
                            <div class="ends">
                                <strong>Student Name</strong> {this.state.salutation}{this.state.name}
                            </div>
                        </div>

                        <div class="stats">

                            <div>
                                <strong> Student DOB</strong> {this.state.dob}
                            </div>

                            <div>
                               
                            </div>

                            <div>
                                <strong>Highest Qualification</strong> {this.state.studentData.highestQualification}
                            </div>
                            <div>
                            <strong>Contact Number</strong> {this.state.studentData.primaryContactNumber}
                             
                            </div>

                        </div>

                                                    <div class="stats">

                            <div>
                            <strong>Father Name</strong> {this.state.studentData.fatherName}
                            </div>

                            <div>
                                <strong>Mother Name</strong> {this.state.studentData.motherName}
                            </div>

                            <div>
                                <strong>Email Id</strong> {this.state.studentData.primaryEmailId}
                            </div>

                            </div>

                        <div class="stats">

                            <div>
                                <strong>Village</strong> {this.state.studentData.permVillageName}
                            </div>

                            <div>
                                <strong>City</strong> {this.state.studentData.permCityName}
                            </div>

                            <div>
                                <strong>State</strong> {this.state.studentData.permState}
                            </div>

                        </div>

                       

                        
                    </div>
                </div> 
            </div>

            <div class="col-lg-12 col-md-12 col-sm-8 col-xs-12">
                <div class="tile">
                    <div class="wrapper">
                        <div class="header">Batch Details</div>

                        <div class="banner-img">
                           
                        </div>

                        <div class="dates">
                            <div class="start">
                            <strong>Center Name</strong> {this.state.studentData.centerName}
                               
                                <span></span>
                            </div>
                            <div class="ends">
                            <strong>Course Name</strong> {this.state.studentData.courseName}
                             
                            </div>
                           
                            
                        </div>


                        <div class="stats">

<div>
<strong>Batch Name</strong> {this.state.studentData.batchName}
</div>

<div>
    <strong>Batch Start Date</strong> {this.state.studentData.startDate}
</div>

<div>
    <strong>Batch End Date</strong>{this.state.studentData.endDate}
   
</div>

</div>
                        <div class="stats">

                            <div>
                                <strong>OJT Start Date</strong> {this.state.studentData.ojtStartDate}
                            </div>

                            <div>
                                <strong>OJT End Date</strong>{this.state.studentData.ojtEndDate}
                            </div>

                            <div>
                                <strong>Assessment Date</strong>{this.state.studentData.assessmentDate}
                            </div>

                        </div>

                        <div class="stats">

                            <div>
                            <strong>Engagement No.</strong>{this.state.studentData.engagementId}
                            </div>

                            <div>
                            <strong>Enrolled Date</strong> {this.state.studentData.enrolledDate}
                            </div>
                             
                             

                            <div>
                            <strong>INT.INV.Code</strong> {this.state.studentData.intInvFinalScore}
                           
                            </div>

                        </div>

                         <div class="stats">

                            <div>
                            <strong>Batch Owner</strong> {this.state.studentData.batchOwnerName} 
                            </div>

                            <div>
                                <strong>Assessment Date</strong> {this.state.studentData1.assessmentDate}
                                
                            </div>

                            <div>
                                <strong>Assessment Score</strong> {this.state.studentData1.assessmentScore}
                                
                            </div>

                        </div> 

                       
                    </div>
                </div> 
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="tile">
                    <div class="wrapper">
                        <div class="header">Placement Details </div>

                       

                         <div class="stats">

                         
                            <div>
                            <strong>Employer Name</strong> {this.state.studentData1.NameofEmployer}
                            </div>
                            <div>
                            <strong>Location of Joining</strong> {this.state.studentData1.LocationofJoining}
                            </div>
                            <div>
                            <strong>Position Offered</strong> {this.state.studentData1.PositionOffered}
                            </div>
                           

                        </div>

                        <div class="stats">

                            <div>
                            <strong>Offer date</strong> {this.state.studentData1.OfferDate}
                            </div>

                            <div>
                                <strong>Date of Joining</strong> {this.state.studentData1.DateofJoining}
                            </div>

                            <div>
                                <strong>Monthly Gross Salary</strong>{this.state.studentData1.MonthlyGrossSalary}
                            </div>

                        </div> 

                       
                    </div>
                </div> 
            </div>

            {/* for pp call */}

            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="tile">
                    <div class="wrapper">
                        <div class="header">Post Placement call 30</div>

                      

                       

                        <div class="stats">

                            <div>
                                <strong>Name of Employer</strong> {this.state.studentData1.pp_30_NameofEmployer}
                            </div>

                            <div>
                                <strong>Working Status</strong>  {this.state.studentData1.pp_30_WorkingStatus}
                            </div>

                            <div>
                                <strong>Monthly Salary</strong> {this.state.studentData1.pp_30_MonthlySalary}
                            </div>

                        </div>

                        <div class="stats">

                           
                        </div>

                       
                       
                    </div>
                </div> 
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="tile">
                    <div class="wrapper">
                        <div class="header">Post Placement call 60</div>

                      

                       

                        <div class="stats">

                        <div>
                                <strong>Name of Employer</strong> {this.state.studentData1.pp_60_NameofEmployer}
                            </div>

                            <div>
                                <strong>Working Status</strong>  {this.state.studentData1.pp_60_WorkingStatus}
                            </div>

                            <div>
                                <strong>Monthly Salary</strong> {this.state.studentData1.pp_60_MonthlySalary}
                            </div>

                        </div>

                        <div class="stats">

                         

                        </div>

                      
                       
                    </div>
                </div> 
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="tile">
                    <div class="wrapper">
                        <div class="header">Post Placement call 90</div>

                      

                        <div class="stats">

                        <div>
                                <strong>Name of Employer</strong> {this.state.studentData1.pp_90_NameofEmployer}
                            </div>

                            <div>
                                <strong>Working Status</strong>  {this.state.studentData1.pp_90_WorkingStatus}
                            </div>

                            <div>
                                <strong>Monthly Salary</strong> {this.state.studentData1.pp_90_MonthlySalary}
                            </div>

                        </div>

                        <div class="stats">

                           
                        </div>

                       

                       
                    </div>
                </div> 
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="tile">
                    <div class="wrapper">
                        <div class="header">Post Placement call 180</div>

                      

                       

                        <div class="stats">

                        <div>
                                <strong>Name of Employer</strong> {this.state.studentData1.pp_180_NameofEmployer}
                            </div>

                            <div>
                                <strong>Working Status</strong>  {this.state.studentData1.pp_180_WorkingStatus}
                            </div>

                            <div>
                                <strong>Monthly Salary</strong> {this.state.studentData1.pp_180_MonthlySalary}
                            </div>

                        </div>

                        <div class="stats">


                        </div>

                    
                       
                    </div>
                </div> 
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="tile">
                    <div class="wrapper">
                        <div class="header">Post Placement call 360</div>

                      

                       

                        <div class="stats">

                        <div>
                                <strong>Name of Employer</strong>
                            </div>

                            <div>
                                <strong>Working Status</strong> 
                            </div>

                            <div>
                                <strong>Monthly Salary</strong> 
                            </div>

                        </div>

                        <div class="stats">

                           

                        </div>

                       

                       
                    </div>
                </div> 
            </div>

            
           
        </div>





      { 
  (this.state.documents!="") &&

<Paper>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Created On</TableCell>
          <TableCell>Document Name</TableCell>
          <TableCell>File Name</TableCell>
          <TableCell >Download</TableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.documents.map(row => (
            <TableRow key={row.basicDocId}>
              <TableCell component="th" scope="row">
          
                {row.createdOn}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.documentName}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.documentPath.split("/")[1]}
              </TableCell>
            <TableCell >                 
              <Button variant="contained" color="primary" size="small" name="download" id="download" 
             
               onClick={this.downloadDocuments.bind(this,row.basicDocId)}
              >Download</Button>
            </TableCell>            

           

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>


          }
                   { 
  (this.state.alertDialogFlag) && <AlertDialog   message={alertDialogOptions.message}></AlertDialog>
    }
 

      </div>
    )
  }
}
