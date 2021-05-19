import React, { Component, Fragment } from 'react';
import { useState } from 'react';
import './../App.css';
import './../assets/css/login-style.css'
import './../assets/css/font-awesome.min.css'
import underscore from 'underscore';
//import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Link,
  
} from 'react-router-dom';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
//import 'bootstrap/dist/css/bootstrap.min.css';
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Button from '@material-ui/core/Button';
  import { FormControl , InputLabel, Input, Grid , TextField}  from '@material-ui/core';
import styles from "../components/components.js"; 
import { CommunicationCallMerge } from 'material-ui/svg-icons';
import { SingleSelect } from "react-select-material-ui";
import callMerge from 'material-ui/svg-icons/communication/call-merge';
import UserContext from '../components/GolbalContext'
import InterestInventory from './InterestInventory'
import {fetchUserDocuments,fetchInterestInventoryCode,saveCounsellingDetails,fetchCounsellingDetails,
  fetchCoursesByHollandCode,fetchQualificationDetails} from './../util/api';
//import MasterData from './../components/MasterData.js'
import { serviceEndPoint } from './../util/serviceEndPoint';
import RefreshIcon from '@material-ui/icons/Refresh';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AlertDialog from './../util/AlertDialog';
const alertDialogOptions = {
    message: ''
  }

function setCode(str)
{
  alert(str);
}
class Counselling extends Component
{
    constructor(props) {
       super(props);
       //alert(props.history);
        this.myData = { 
            qual : []
          };
        this.state = {code :'' ,history : props.history , result : localStorage.getItem("result"), dbUserId : props.id, basicData : {createdBy : UserContext.userid,
          mobilizedBy : UserContext.userid }, address : {createdBy : UserContext.userid,'isActive' : 'Y','status' : 'Y','type' : 'H'},gameFlag:false,
          engagementId: props.engagementId,interestInventoryDocId:0,linkedEngagementId:props.linkedEngagementId,
          rating : [
            { value: 'StrongPositive', label: 'Strong Positive' },
            { value: 'Positive', label: 'Positive' } , 
            { value: 'Neutral', label: 'Neutral' } , 
            { value: 'Negative', label: 'Negative' } , 
            { value: 'StrongNegative', label: 'Strong Negative' }      
        ],
        coursesOfHollandCode:[],
        firstCounsellorComments:'',secondCounsellorComments:'',parentCounsellorComments:'',
        firstCounsellorRating:'',secondCounsellorRating:'',parentCounsellorRating:'',
        firstCounselorSuggestedCourse:'',secondCounselorSuggestedCourse:'',
        alertDialogFlag:false
        };
        this.updatedData = {firstName : ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        //alert(UserContext.userid);
        this.getMasters()
        this.getInterestInventoryDetails();
    }


    getInterestInventoryDetails=(event)=>{
      fetchUserDocuments(UserContext.centerId == 760 ? this.props.linkedEngagementId: this.props.engagementId,"InterestInventory",'P').then((jsondata) => { 
        let jsonobjects = JSON.parse(jsondata.data); 
        if(jsonobjects!=''){
        this.setState({interestInventoryDocId:jsonobjects[0].basicDocId});
        }
      });

      fetchInterestInventoryCode(UserContext.centerId == 760 ? this.state.linkedEngagementId: this.state.engagementId).then((jsondata) => { 
        let interestInventoryDetails = JSON.parse(jsondata.data);
        if(interestInventoryDetails[0]!=null){
        this.setState({code:interestInventoryDetails[0].finalScore});

        fetchCoursesByHollandCode(interestInventoryDetails[0].finalScore).then((jsonHollandCodeData) => { 
          let jsonHollandCodeObjects = JSON.parse(jsonHollandCodeData.data);     
          jsonHollandCodeObjects.map(item => { this.state.coursesOfHollandCode.push({label: (item.course).toString(), value: (item.course).toString()})});
        }); 
        }
      });

      fetchCounsellingDetails(UserContext.centerId == 760 ? this.state.linkedEngagementId: this.state.engagementId).then((jsondata) => { 
        let counsellingDetails = JSON.parse(jsondata.data);
        if(counsellingDetails[0]!=null){
         this.setState({firstCounsellorComments:counsellingDetails[0].firstCounselorComments});
         this.setState({firstCounsellorRating:counsellingDetails[0].firstCounselorRating});
         this.setState({secondCounsellorComments:counsellingDetails[0].secondCounselorComments});
         this.setState({secondCounsellorRating:counsellingDetails[0].secondCounselorRating});
         this.setState({parentCounsellorComments:counsellingDetails[0].parentCounsellingComments});
         this.setState({parentCounsellorRating:counsellingDetails[0].parentCounsellingRating});
         this.setState({firstCounselorSuggestedCourse:counsellingDetails[0].firstCounselorSuggestedCourse});
         this.setState({secondCounselorSuggestedCourse:counsellingDetails[0].secondCounselorSuggestedCourse});


        }
      });


    }


   
    handleInputChange(event) {
        
        const target = event.target;
        const value =  target.value;
        const name = target.name;
        this.setState({
          basicData: {
            ...this.state.basicData,
            [name]: value
          }
        })
        
      }
      handleSelectChange(selectname, event) {
        this.setState({
          basicData: {
            ...this.state.basicData,
            [selectname]: event
          }
        })
          //alert(JSON.stringify(this.state));
        
      }

      handleCounsellingFormInputChange = (event) =>{ 
        const target = event.target;  
        const value = target.value;  
        const name = target.name;  
        this.setState({[name]:value}); 
      }      

      handleCounsellingFormSelectChange(selectname, event) {
        this.setState({[selectname]: event});     
      }




      saveCounsellingDetails=(event)=>{
       event.preventDefault();
       this.setState({alertDialogFlag:false});
       let engagementId= UserContext.centerId == 760 ? this.props.linkedEngagementId: this.props.engagementId;
       let data='{"engagementId":'+engagementId+',"firstCounselorComments":"'+this.state.firstCounsellorComments+
                '","firstCounselorRating":"'+this.state.firstCounsellorRating+'","firstCounselorSuggestedCourse":"'+this.state.firstCounselorSuggestedCourse+'","firstCounselorName":"'+UserContext.userName+
                '","secondCounselorComments":"'+this.state.secondCounsellorComments+'","secondCounselorRating":"'+this.state.secondCounsellorRating+'","secondCounselorSuggestedCourse":"'+this.state.secondCounselorSuggestedCourse+
                '","secondCounselorName":"'+UserContext.userName+'","parentCounsellingComments":"'+this.state.parentCounsellorComments+
                '","parentCounsellingRating":"'+this.state.parentCounsellorRating+'","parentName":"'+UserContext.userName+'"}';
       
                saveCounsellingDetails(data).then((jsondata) => { 
        alertDialogOptions.message=<span style={{color:"green"}}>Counselling Comments Saved Successfully</span>;
            this.setState({alertDialogFlag:true});

      });
      }

     
    mySubmitHandler = (event) => {
        event.preventDefault();
        // authentication response and redirect to error or dashbaord page
        //alert(this.email)
        //this.submitEngagement();
        //this.props.history.push('/dashboard/mobilize')
    }

 getMasters(){      
          fetchQualificationDetails().then((jsondata)=>{
              console.log(jsondata); 
              if(jsondata.appError==null){     
                  let jsonobjects = JSON.parse(jsondata.data);    
                 jsonobjects.map(item => { this.myData.qual.push({label: item.qualification, value: (item.id).toString()})
                 })
              } 
              return (true);
           }).then(response => response);
  }

  goToGame() {
    
    window.open(<InterestInventory />, '_blank');

}

 

gameStart(){this.setState({gameFlag:true});}
gameStop(){
  this.setState({gameFlag:false});
  this.getInterestInventoryDetails();
}

downloadInterestInventoryDocument = (value) => 
{
let formData = new FormData();
  formData.append('data', '{"token" : "", "action" : "downloadDocument", "data" : [{"basicDocId":'+this.state.interestInventoryDocId+'}]}');
  fetch(serviceEndPoint.documentServiceEndPoint, {
      method: 'post',
      headers: {'Authorization': 'Bearer '+UserContext.token}, 
      body: formData
  }).then(response => response.json()).then((jsondata)=>{
    let jsonobjects = JSON.parse(jsondata.data);
    var url=process.env.REACT_APP_API_ENDPOINT+"Downloads/"+jsonobjects[0].documentPath+""; 
     window.open(url, "_blank");

  });
  }

  getInterestInventoryCode=(event)=>{
    this.getInterestInventoryDetails();

  }

render()
{
  
  const dbUserId = (this.state.dbUserId == '' || this.state.dbUserId == null);
  let button;

  if (dbUserId) {
    button =   <Button variant="contained" type="submit" color="primary">
    Mobilise
  </Button>;
  } else {
    button = <Button type="submit" variant="contained" color="secondary">Update</Button>;
  }
    return (
  <div style = {{ width : '100%' }}>
    <form onSubmit={this.mySubmitHandler} method="post">
    <Grid container spacing={2}>
    <Grid item xs={4} sm={3}>
          <FormControl>
            <InputLabel for="aadharNo">Interest Inventory</InputLabel>
            <Input type="text" name="code" id="code"  readonly onChange={this.handleInputChange} value={this.state.code || ''}/>     
          </FormControl>  
          <RefreshIcon color="primary" size="small" onClick={this.getInterestInventoryCode}></RefreshIcon>
      </Grid>

      <Grid item xs={4} sm={3}>
          <FormControl>
              <Button variant="contained" color="primary" size="small" onClick={this.gameStart.bind(this)}  disabled={UserContext.roleid==3?true:false}>Play Game</Button>
          </FormControl>  
      </Grid>


{this.state.interestInventoryDocId!=0 &&
      <Grid item xs={4} sm={6}>
          <FormControl>
          <Button variant="contained" color="primary" size="small"><span class="" onClick={this.downloadInterestInventoryDocument.bind(this)}>Download Interest Inventory Document</span></Button>
          </FormControl>  
      </Grid>
} 
    </Grid>
    </form>

{
this.state.gameFlag && 
<Fragment>
<InterestInventory dbUserId = {this.state.dbUserId} engagementId = {this.state.engagementId} name ={this.props.name}></InterestInventory>
<Button variant="contained" color="primary" size="small" onClick={this.gameStop.bind(this)}>
  Stop/End Game
</Button>
</Fragment>
}

<br/>
<div style = {{ width : '100%' }}>
      <form onSubmit={this.saveCounsellingDetails} method="post">
    <Paper >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Comments</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Course</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" style={{ width:100 }}>
              <sup>First counsellor Comments</sup>  
              <TextareaAutosize 
              name="firstCounsellorComments" id="firstCounsellorComments"
              value={this.state.firstCounsellorComments} maxLength="100"
              onChange={this.handleCounsellingFormInputChange}
              aria-label="empty textarea"  style={{width:"100%",height:"100px"}}/>
            </TableCell>                      
            <TableCell component="th" scope="row" style={{ width:100 }}>
              <sup>Rating</sup>  
              <SingleSelect  name="firstCounsellorRating" id="firstCounsellorRating" 
              value={this.state.firstCounsellorRating} onChange={this.handleCounsellingFormSelectChange.bind(this, 'firstCounsellorRating')}
              options={this.state.rating}/>
              </TableCell> 
              <TableCell component="th" scope="row" style={{ width:100 }}>
              <sup>Course</sup>  
              <SingleSelect  name="firstCounselorSuggestedCourse" id="firstCounselorSuggestedCourse" 
              value={this.state.firstCounselorSuggestedCourse} onChange={this.handleCounsellingFormSelectChange.bind(this, 'firstCounselorSuggestedCourse')}
              options={this.state.coursesOfHollandCode}/>
              </TableCell>                      
            </TableRow>  
            <TableRow>
              <TableCell component="th" scope="row" style={{ width:100 }}>
              <sup>Second counsellor Comments</sup>  
              <TextareaAutosize 
              name="secondCounsellorComments" id="secondCounsellorComments"
              value={this.state.secondCounsellorComments} maxLength="100"
              onChange={this.handleCounsellingFormInputChange} 
              aria-label="empty textarea"  style={{width:"100%",height:"100px"}}/>
            </TableCell>                      
            <TableCell component="th" scope="row" style={{ width:100 }}>
              <sup>Rating</sup>  
              <SingleSelect  name="secondCounsellorRating" id="secondCounsellorRating" 
                 value={this.state.secondCounsellorRating} onChange={this.handleCounsellingFormSelectChange.bind(this, 'secondCounsellorRating')}
              options={this.state.rating}/>  
               </TableCell> 
               <TableCell component="th" scope="row" style={{ width:100 }}>
              <sup>Course</sup>  
              <SingleSelect  name="secondCounselorSuggestedCourse" id="secondCounselorSuggestedCourse" 
                 value={this.state.secondCounselorSuggestedCourse} onChange={this.handleCounsellingFormSelectChange.bind(this, 'secondCounselorSuggestedCourse')}
              options={this.state.coursesOfHollandCode}/>  
               </TableCell> 
                                    
            </TableRow>  
            <TableRow>
              <TableCell component="th" scope="row" style={{ width:100 }}>
              <sup>Parent Counselling Comments</sup>  
              <TextareaAutosize 
              name="parentCounsellorComments" id="parentCounsellorComments"
              value={this.state.parentCounsellorComments} maxLength="100"
              onChange={this.handleCounsellingFormInputChange}
              aria-label="empty textarea"  style={{width:"100%",height:"100px"}}/>
            </TableCell>                      
            <TableCell component="th" scope="row" style={{ width:100 }}>
              <sup>Rating</sup>  
              <SingleSelect  name="parentCounsellorRating" id="parentCounsellorRating"
                 value={this.state.parentCounsellorRating} onChange={this.handleCounsellingFormSelectChange.bind(this, 'parentCounsellorRating')}
                 options={this.state.rating}/>
            </TableCell>                      
            <TableCell component="th" scope="row" style={{ width:100 }}>
            </TableCell>                      
           
            </TableRow>  

        </TableBody>

      </Table>
      <br/>
<Grid container direction="row" justify="flex-end" alignItems="flex-end">
<Button type="submit" size="small" variant="contained" color="primary" 
>Save</Button>
</Grid>

    </Paper>    
</form>
</div>

{ 
  (this.state.alertDialogFlag) && <AlertDialog   message={alertDialogOptions.message}></AlertDialog>
    }


    </div>

    );
}

}
export default Counselling;