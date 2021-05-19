import React, { Component } from 'react';
import { fetchBatchDetails,enrollStudent,changeStudentStatus,fectEnrollmentDetails,
  fetchBatchDetailsByBatchId,fetchNotCompletedBatchDetails } from './../util/api';
import { properties } from './../util/properties';
import UserContext from '../components/GolbalContext'
import {Button,Grid} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AlertDialog from './../util/AlertDialog';
import Box from '@material-ui/core/Box';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Link from '@material-ui/core/Link';

const alertDialogOptions = {
  message: ''
}

const customStyles = {
  BusinessAnalystRow: {
    '& td': {backgroundColor: "#FAA"}
  },
  NameCell: {
    fontWeight: 900
  },
};

class EnrollmentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {rows: [],dbUserId:'',selectedBatchId:0,alertDialogFlag:false,
                     enrollmentDetails:[],toggleButton:'none'};
       
    
        this.loadCourseDetails();
       

       if(props.id != null && props.id != undefined)
       {
          this.state.engagementId=props.engagementId;
          fectEnrollmentDetails(this.state.engagementId).then((jsondata) => { 
            let jsonobjects = JSON.parse(jsondata.data); 
     for (var i = 0; i < jsonobjects.length; i++) {     
            this.setState({selectedBatchId:jsonobjects[i].batchId},()=>{
              fetchBatchDetailsByBatchId(jsonobjects[i].batchId).then((jsondata) => { 
                let batchJsonObjects = JSON.parse(jsondata.data);
                if(jsonobjects!=null){
                  batchJsonObjects.map(item => { this.state.enrollmentDetails.push({batchName: item.batchName, startDate: item.startDate,
                  endDate:item.endDate,ojtStartDate:item.ojtStartDate,ojtEndDate:item.ojtEndDate,batchDescription:item.batchDescription})});
                }   
               });
            });               
            } 
            
            

      });

    }

   

    }
    getMuiTheme = () => createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#AAF",
          },
          paper: {
            boxShadow: "none",
          }
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF"
          }
        }
      }
    });


    loadCourseDetails = (event) => {
        let batchInfo = [];
        fetchNotCompletedBatchDetails(UserContext.centerId).then((jsondata) => {
                let batchDetails = JSON.parse(jsondata.data);
                for (var i = 0; i < batchDetails.length; i++) {                                        
                    var details =
                    {
                        'batchId':batchDetails[i].batchId,
                        'batchName': batchDetails[i].batchName,
                        'batchDescription': batchDetails[i].batchDescription,
                        'startDate': batchDetails[i].startDate,
                        'endDate': batchDetails[i].endDate,
                        'ojtStartDate': batchDetails[i].ojtStartDate,
                        'ojtEndDate': batchDetails[i].ojtEndDate
                    };
                    batchInfo.push(details);
                }
                this.setState({ rows: batchInfo });
            })
    }

    handleChange = event => {
     this.setState({selectedBatchId:event.target.value});
    };  

enroll = (event) => {

  alert(this.state.selectedBatchId);
    let enrollmentData='"engagementId":'+this.state.engagementId+',"batchId":'+this.state.selectedBatchId+'';
    let statusChangeData='"engagementId":'+this.state.engagementId+',"status":"enrolled","updatedBy":0';
      this.setState({alertDialogFlag:false});
    enrollStudent(enrollmentData).then((jsondata) => { 
        changeStudentStatus(statusChangeData).then((jsondata) => { 
          alertDialogOptions.message="Data Saved Sucessfully";
          this.setState({alertDialogFlag:true});
        });
    });
    }


    render() {      
        const columns = [
          //{label: 'Select A Batch', name: 'selectBatch' },
        { label: 'Batch Name', name: 'batchName' },
        { label: 'Batch Description', name: 'batchDescription' },
        { label: 'Start Date', name: 'startDate' },
        { label: 'End Date', name: 'endDate' },
        { label: 'OJT Start Date', name: 'ojtStartDate' },
        { label: 'OJT End Date', name: 'ojtEndDate' }
        ];

        const options = {
          filterType: "dropdown",
          responsive: "stacked",
          sortDirection: "desc",
          selectableRows:"single",
          rowsPerPage:20,
          selectableRowsOnClick: true,
          disableToolbarSelect:true,
          textLabels: {
            body: {
              noMatch: <span style={{color:"blue"}}>Please wait data is loading</span>
            }
          },
          onRowsSelect: (currentRowsSelected,allRows) => {
            var index=currentRowsSelected[0].dataIndex;
            this.state.selectedBatchId=this.state.rows[index].batchId;
         },
         setRowProps: (row) => {
for(var i=0;i<this.state.enrollmentDetails.length;i++){
  return {         
    className: classnames(
      {[this.props.classes.BusinessAnalystRow]: row[0] === this.state.enrollmentDetails[i].batchName
      }),
  };
}
        },
        };

        const ToggleHistoricalBatchDetails = event =>
        { event.preventDefault();
          let value='none';
          if(this.state.toggleButton=='none'){
           value='block';
           this.setState({toggleButton:value});}
           else{this.setState({toggleButton:value});}
        }

   
        return (
            <div>

<Grid container direction="row" justify="flex-end" alignItems="flex-end">
<Link href="#" onClick={ToggleHistoricalBatchDetails}>
    View/Hide Enrolled Batch Details
  </Link>
  </Grid>
{/* 
<ToggleButton
  size="small"
  value="View Enrolled Batch Details"
  selected={this.state.toggleButton}
  onChange={() => {
  let value='hidden';
   if(this.state.toggleButton=='hidden'){
    value='visible';
    this.setState({toggleButton:value});}
    else{this.setState({toggleButton:value});}
  }}> View/Hide Enrolled Batch Details</ToggleButton>  */}

<br/>
    <Box component="div"  style={{display:this.state.toggleButton}}
    //visibility={this.state.toggleButton}
    >
    <Paper >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Batch Name</TableCell>
            <TableCell>Batch Description</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>OJT Start Date</TableCell>
            <TableCell>OJT End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.enrollmentDetails.map(row => (
            <TableRow >               
            <TableCell >   
            {row.batchName}
            </TableCell>
            <TableCell >   
            {row.batchDescription}
            </TableCell>
            <TableCell >   
            {row.startDate}
            </TableCell>
            <TableCell >   
            {row.endDate}
            </TableCell>
            <TableCell >   
            {row.ojtStartDate}
            </TableCell>
            <TableCell >   
            {row.ojtEndDate}
            </TableCell>
            </TableRow>
             ))}
        </TableBody>
      </Table>
    </Paper> 
    </Box>  
<br/>


{/* <MuiThemeProvider theme={this.getMuiTheme()}> */}
<MUIDataTable
       title={"List Of Active Batches"}
        data={this.state.rows} columns={columns} 
        options={options} 
        />

{/* </MuiThemeProvider> */}
               
    {/* <Paper >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Select Batch</TableCell>
            <TableCell>Batch Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>OJT Start Date</TableCell>
            <TableCell>OJT End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {this.state.rows.map(row => (
            <TableRow key={row.batchId}>             
              <TableCell >              
        <Radio
        checked={this.state.selectedBatchId == row.batchId}
        onChange={this.handleChange}
        value={row.batchId}
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />
            </TableCell>     
            <TableCell >   
            {row.batchName}
            </TableCell>
            <TableCell >   
            {row.startDate}
            </TableCell>
            <TableCell >   
            {row.endDate}
            </TableCell>
            <TableCell >   
            {row.ojtStartDate}
            </TableCell>
            <TableCell >   
            {row.ojtEndDate}
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper> */}
    
<br/>
                { 
  (UserContext.roleid!=4) &&         

                <Grid container direction="row" justify="flex-end" alignItems="flex-end">
<Button variant="contained" color="primary" size="small" onClick={this.enroll}>Enroll</Button>
</Grid>

}


{ 
  (this.state.alertDialogFlag) && <AlertDialog   message={alertDialogOptions.message}></AlertDialog>
    }


            </div>


        )
    }
}

export default withStyles(customStyles, {name: "EnrollmentDetails.js"})(EnrollmentDetails);