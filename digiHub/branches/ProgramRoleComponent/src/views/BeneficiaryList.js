

import React, { Component } from 'react';
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import UserContext from '../components/GolbalContext';
import { regenerateToken } from './../util/validation';
import { isTokenValid } from './../util/session';
import {
  BrowserRouter as Router,
  Link,
  
} from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';
import Card from "./../components/Card/Card.js";
import GridContainer from "./../components/Grid/GridContainer.js";
import GridItem from "./../components/Grid/GridItem.js";
import { serviceEndPoint } from './../util/serviceEndPoint';
import { fetchStudentDataForList } from '../util/api';

class BeneficiaryList extends Component {
  constructor() {
    super();
    
     // this.checkToken();
  
    this.state = {selectedIndex : [] , rowsSelected : {'dbUserId' : '', 'engagementId' : ''},
      info:[],roleid:UserContext.roleid,roleName:UserContext.roleName,name:''};
    this.fetchStudentDetails();
    
   // alert(UserContext.centerId);
    
}

componentDidCatch()
{
  window.location.pathname("/");
}
  


handleClick = () => {
  console.log("clicked on icon!");
}

fetchStudentDetails() {
    let studentInfo=[];
    fetchStudentDataForList(this.state.roleName).then((jsondata)=>{    
        let  studentDetails = JSON.parse(jsondata.data);  
              for(var i=0;i<studentDetails.length;i++){
              var  details =
              {    'student_id':studentDetails[i].dbUserId, 
                  'engagement_id':studentDetails[i].engagementId,
                  'linked_engagement_id':studentDetails[i].linkedEngagementId,
                  'name' :studentDetails[i].firstName+" "+studentDetails[i].lastName,
                  'status':studentDetails[i].status,
                  'dob':studentDetails[i].dob,
                  'action':<Link to={{
                    pathname: '/dashboard/updatebeneficiary',
                    state: { dbUserId: studentDetails[i].dbUserId ,status : studentDetails[i].status ,  engagementId :  studentDetails[i].engagementId , name : studentDetails[i].firstName + " " + studentDetails[i].lastName, tab : 0, status : studentDetails[i].status,linkedEngagementId:studentDetails[i].linkedEngagementId}
                  }}><EditIcon /></Link>
              }; 
              studentInfo.push(details);    
          }    
          this.setState({
              info: studentInfo
            });
       })
       
}

  checkToken()
{
  var currentDateTime=new Date();
    if(UserContext.jwtTimeOut.getTime() < currentDateTime.getTime()){
      regenerateToken();

    }

}

  
  render() {

   
   // let action=<Link to="/dashboard/updatebeneficiary"><EditIcon/></Link>
    const columns = [{label: 'Student Id', name: 'student_id', headerStyle: {color:'#FF9800'}},
    {label: 'Engagement Id', name: 'engagement_id',options : {
      sortDirection : 'desc'
    },headerStyle: {color:'#FF9800'}},
    {label: 'linked Engagement Id', name: 'linked_engagement_id',options : {
      sortDirection : 'desc',display: false
    },headerStyle: {color:'#FF9800'}},
    {label: 'Name', name: 'name',headerStyle: {color:'#FF9800'}},
    {label: 'Date Of Birth', name: 'dob',headerStyle: {color:'#FF9800'}},
    {label: 'Status', name: 'status',headerStyle: {color:'#FF9800'}},
    {label: 'Action', name: 'action',headerStyle: {color:'#FF9800'}}
     
   ]
   
    const options = {
      
      selectableRows : 'single',
    
      filterType: "dropdown",
      responsive: "stacked",
      sortDirection: "desc",
      disableToolbarSelect:true,
      rowsPerPage:10,
      selectableRowsOnClick: true,
     
      // textLabels: {
      //   body: {
      //     noMatch: <span style={{color:"blue"}}>Please wait data is loading...</span>
      //   }
      // },
      rowsSelected : this.state.selectedIndex,
      onRowsSelect: (allRows) => {
          let rows = this.state.selectedIndex;
          rows[0] = allRows[0].dataIndex;
          this.setState({
            rowsSelected : this.state.info[allRows[0].dataIndex],
            selectedIndex : rows,
            name:this.state.info[allRows[0].dataIndex].name
          }) // this is the row in your data source       
     },
    };
    if (this.state.roleid==3 && this.state.roleName=="Principal"){
    return ( 
      <form>
        
        <MUIDataTable  title={"Shortlisted Student list"} label={"List of Students"} data={this.state.info} columns={columns} options={options}
      />
        
<GridContainer>
            
    
           
    
            <GridItem xs={12} sm={6} md={3}>
              <Card>  
                <Button variant="contained" color="primary"  size="small" disabled={this.state.rowsSelected.engagement_id==null || this.state.rowsSelected.status !='Shortlisted'?true:false}>  
                <Link style = {{color : 'white'}}
                  //to="/dashboard/addobeneficiary" 
                  to={{pathname:"/dashboard/updatebeneficiary", state: { tab:12,dbUserId:this.state.rowsSelected.student_id,engagementId:this.state.rowsSelected.engagement_id,name:this.state.name,status : this.state.rowsSelected.status}}}>  Business Case Evalution </Link>
                </Button>
              </Card>                   
            </GridItem>
          </GridContainer>
    </form>
     
    );
   
    }
    else if (this.state.roleName=="Center Manager"){
      return(
            <form>
                <MUIDataTable title={"Beneficiary list"} label={"List of Students"} data={this.state.info} columns={columns} options={options}
            />
            
            <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
              <Card>  
                <Button variant="contained" color="primary" size="small" disabled={this.state.rowsSelected.engagement_id==null || this.state.rowsSelected.status !='Mobilised'?true:false}>  
                  <Link style = {{color : 'white'}}
                  //to="/dashboard/addobeneficiary" 
                  to={{pathname:"/dashboard/updatebeneficiary", state: { tab:10,status : this.state.rowsSelected.status , dbUserId:this.state.rowsSelected.student_id,engagementId:this.state.rowsSelected.engagement_id,name:this.state.name}}}>  Evaluate </Link>
                </Button>
              </Card>                   
            </GridItem>
    
            <GridItem xs={12} sm={6} md={3}>
              <Card>  
                <Button variant="contained" color="primary" size="small" disabled={this.state.rowsSelected.engagement_id!=null &&  (this.state.rowsSelected.status =='Shortlisted' || this.state.rowsSelected.status =='Enrolled')?false:true}>  
                <Link style = {{color : 'white'}}
                  //to="/dashboard/addobeneficiary" 
                  to={{pathname:"/dashboard/updatebeneficiary", state: { tab:11,status : this.state.rowsSelected.status, dbUserId:this.state.rowsSelected.student_id,engagementId:this.state.rowsSelected.engagement_id,name:this.state.name,status : this.state.rowsSelected.status}}}>  Enroll </Link>
                </Button>
              </Card>                   
            </GridItem>
          </GridContainer>
          </form>
            
      );
    }
    else if (UserContext.roleid==4){
      return(
      <form>
        <MUIDataTable  title={" Beneficiary Student list"}  data={this.state.info} columns={columns} options={options}
      />
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>  
            <Button variant="contained" color="primary" size="small" disabled={this.state.rowsSelected.engagement_id==null || this.state.rowsSelected.status !='Mobilised'?true:false}>  
              <Link style = {{color : 'white'}} 
              //to="/dashboard/addobeneficiary" 
              to={{pathname:"/dashboard/updatebeneficiary", state: { tab:6,status : this.state.rowsSelected.status, dbUserId:this.state.rowsSelected.student_id,engagementId:this.state.rowsSelected.engagement_id,name:this.state.name}}}> 
               Capture Observations </Link>
            </Button>
          </Card>                   
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>  
            <Button variant="contained" color="primary" size="small" disabled={this.state.rowsSelected.engagement_id==null || this.state.rowsSelected.status !='Mobilised'?true:false}>  
              <Link style={{ color: 'white' }}
                to={{pathname:"/dashboard/updatebeneficiary", state: { tab:8,status : this.state.rowsSelected.status,dbUserId:this.state.rowsSelected.student_id,engagementId : this.state.rowsSelected.engagement_id,name:this.state.name}}}> 
                 Capture Business Case Brief </Link>
            </Button>
          </Card>                   
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>  
            <Button variant="contained" color="primary" size="small" disabled={this.state.rowsSelected.engagement_id==null || this.state.rowsSelected.status !='Mobilised' ?true:false}>  
              <Link style = {{color : 'white'}}
                to={{pathname:"/dashboard/updatebeneficiary", state: { tab:9,status : this.state.rowsSelected.status , dbUserId:this.state.rowsSelected.student_id,engagementId:this.state.rowsSelected.engagement_id,name:this.state.name}}}> 
                 Recommend to Principal </Link>
            </Button>
          </Card>                   
        </GridItem>
        

        
      </GridContainer>
    </form>
     
    );
    }

    else{
      return(
        <form>
            <MUIDataTable label={"List of Students"} data={this.state.info} columns={columns} options={options}
        />
        </form>
      );
 }
  }
}

export default BeneficiaryList ;
