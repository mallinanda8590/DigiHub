/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================


* Coded by Ashish S 

=========================================================


*/

import React, { Component } from 'react';
import { render } from "react-dom";
import './../App.css';
import './../assets/css/login-style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SingleSelect } from "react-select-material-ui";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import callMerge from 'material-ui/svg-icons/communication/call-merge';
import UserContext from '../components/GolbalContext'
import { FormControl , InputLabel,FormControlLabel, Input, Grid , RadioGroup, Radio, TextField}  from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { roleBasedReadonly , checkButton } from '../util/validation';
import AlertDialog from '../util/AlertDialog';
import {fetchSocioDetails,saveSocioDetails,} from '../util/api';
import MUIDataTable from "mui-datatables";
import { Multiselect } from 'multiselect-react-dropdown';

import EditIcon from '@material-ui/icons/Edit';

import { serviceEndPoint } from '../util/serviceEndPoint';

const alertDialogOptions = {
  message: ''
}

class SocioEconomic extends Component {
    
  constructor(props) {
    super(props);
     
     this.state = {alertDialogFlag:false , disabled : false , flag : "0" , errors : {} , dbUserId : props.id,info:[], 
     socioEconomicData : {createdBy : UserContext.userid, updatedBy : UserContext.userid , dbUserId : props.id, physicallyChallenged : "",
     membersInHousehold : "" , brothersAndSisters : "" , maritalStatus : "", rooms:"",isActive:"Y",housingUnit:"", ownership : "", mediumOfCooking : "",
     sourceOfWater : "" , items:""
         },items:[],engagementId:props.engagementId,
        

        pcOptions:[ { value: "Yes", label: 'Yes' },
        { value: "No", label: 'No' }
        
        ],
         ownershipOptions:[ { value: "Owned", label: 'Owned' },
        { value: "Rented ", label: 'Rented' },
        { value: "Other (also include if staying at a relative's house)", label: 'Other (also include if staying at a relatives house) ' }
        ],
         
        msOptions:[ { value: "Married", label: 'Married' },
        { value: "Unmarried", label: 'Unmarried' }
        
        ],
        energyOptions:[ 
          { value: 'Electricity', label: 'Electricity' },
          { value: 'Gas', label: 'Gas' },
          { value: 'Kerosene', label: 'Kerosene' },
          { value: 'Solar', label: 'Solar' },
          { value: 'Firewood', label: 'Firewood' },
          { value: 'Cow dung', label: 'Cow dung' },
          { value: 'grass(reeds)', label: 'grass(reeds) ' },
          { value: 'Other', label: 'Other' }
        ],
        waterOptions :[
          { value: 'Piped water ', label: 'Piped water ' },
          { value: 'Well', label: 'Well' },
          { value: 'Tube Well', label: 'Tube Well' },
          { value: 'Hand Pump', label: 'Hand Pump' },
          { value: 'Pond', label: 'Pond' },
          {value :'Other',lable:'other'}

        ],

        housingUnitOptions :[
          { value: 'Kutcha ', label: 'Kutcha' },
          { value: 'Semi Pucca(rrof made of Grass)', label: 'Semi Pucca(rrof made of Grass)' },
          { value: 'Pucca', label: 'Pucca' },
          { value: 'Other', label: 'Other' }

        ],
       
        list :[
          { value: 'Refrigerator ', name: 'Refrigerator ' ,id :1},
          { value: 'Stove/gas burner', name: 'Stove/gas burner',id :2 },
          { value: 'Tube Well', name: 'Tube Well',id :3 },
          { value: 'Hand Pump', name: 'Hand Pump' ,id :4},
          { value: 'Pond', name: 'Pond' ,id :5},
          {value :'Other',name:'other',id :6}


        ]
        
        
        
        }
         
       
      this.handleSelectChange = this.handleSelectChange.bind(this);
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleChange=this.handleChange.bind(this);
     if(props.id != null && props.id != undefined )
     {
     UserContext.dbUserId = props.id;
       
       
     
     this.getSocioEconomicData((props.id));
     
      
     }
    
     
 }
 componentDidMount()
    {
      roleBasedReadonly();
    }

    // handleEditChange(obj){
    //   // alert(JSON.stringify(obj));
    //    this.setState({
    //     experienceData : obj 
    //    })
     
    //  }

    onSelect(selectedList, selectedItem) {

      this.setState({
        socioEconomicData: {
          ...this.state.socioEconomicData,
          [selectedList]: selectedItem
        }
      })

    
  }
   
  onRemove(selectedList, removedItem) {
      
  }

     handleChange = (event) => {
       this.setState({
        
          items : event

      });
    //  alert(JSON.stringify(this.state.items));
    
    };


    
    handleSelectChange(selectname, event) {
      let value = 0 ;
      let target = null;
      try {
        target = event.target;
        value =  target.value;
      }
     catch(e)
     {
      value =  event;
     }
      
        this.setState({
          "disabled" : false
        });

        this.setState({
            socioEconomicData: {
              ...this.state.socioEconomicData,
              [selectname]: event
            }
          })

         

          this.setState({
            errors: {
              ...this.state.errors,
              [selectname] : {
                'label' : "" , 
                'value' : false
              }
            }
        });
        

        
         
       
      
      }
 handleInputChange(event) {
     
     const target = event.target;
     let value =  target.value;
     const name = target.name;
     this.setState({
      "disabled" : false
    });

    this.setState({
      errors: {
        ...this.state.errors,
        [name] : {
          'label' : "" , 
          'value' : false
        }
      }
  });

  this.setState({
    socioEconomicData: {
      ...this.state.socioEconomicData,
       [name]: value
   
  // ...this.state.socioEconomicData
  
    }
// rVal: event.target.value
 });
 
   
     
   }


 
  
 mySubmitHandler = (event) => {
  // alert("check");
   event.preventDefault();
   this.state.disabled = true;
    this.validateAll();
    
    // authentication response and redirect to error or dashbaord page
    this.setState({
      errors : this.state.errors,
    });
    if(checkButton(this.state.errors))
    {
    //  alert("inside");
      this.submitSocioEconomic();
    
   
    }
    else
    {
      this.state.disabled = true;
  } 
 // alert(checkButton(this.state.errors));
 }
 validateAll() 
{
  var nonMandatoryFields = ["items"];
  var json = this.state.socioEconomicData;
  var errors = this.state.errors;
  Object.keys(json).forEach(function(key) {
      if((!nonMandatoryFields.includes(key)) && (json[key] == undefined || json[key] == '' ))
      {
        let res = "Please fill out this field";
          errors[key] = {
              'label' : res , 
              'value' : res == "" ? false : true 
            }
     }
  });
 // alert(JSON.stringify(this.state.errors));
  this.state.errors = errors;

}
 getSocioEconomicData(id)
 {

  fetchSocioDetails(id).then((jsondata)=>{
           console.log(jsondata); 
          // alert(JSON.stringify(jsondata));
           if(jsondata.appError==null){      
               let jsonobjects = JSON.parse(jsondata.data);
              // console.log(jsonobjects);
               if(jsonobjects[0] !== null && jsonobjects[0] !== undefined)
               {
                Object.keys(jsonobjects[0]).forEach(function(key) {
                  this.setState({
                   socioEconomicData: {
                      ...this.state.socioEconomicData,
                      [key]: jsonobjects[0][key].toString()
                    }
                  })
                }.bind(this));
               } 
               
              //alert(JSON.stringify(this.state));
           
           }  else{
               console.log("error");
           } 
        })
 }
 

submitSocioEconomic()
{
  let action = "";
  const dbUserId = (this.state.dbUserId == '' || this.state.dbUserId == null);
//  alert("idd"+dbUserId);
   if (dbUserId) {
     action =  "captureSocioEconomic";
   } else {
     action =  "updateSocioEconomic";
   }
  
  this.state.items.map((item) => {
    this.state.socioEconomicData.items = this.state.socioEconomicData.items + "," + item.value;
  })
  if(this.state.socioEconomicData.items !== "")
  {
    this.state.socioEconomicData.items = this.state.socioEconomicData.items.substring(1);
  }
 // alert(this.state.socioEconomicData.items);
        saveSocioDetails(action,this.state.socioEconomicData).then((jsondata)=>{
         if(jsondata.appError==null){   
           //alert(jsondata.appError);   
             let jsonobjects = JSON.parse(jsondata.data);
             console.log(jsonobjects); 
           
            // alert("Successfully Mobilized");
             //this.props.history.push('/dashboard');
             this.setState({alertDialogFlag:false});
             if(action == 'captureSocioEconomic')
             {
           
              alertDialogOptions.message=<span style={{color:"green"}}>SocioEconomic Details Saved Sucessfully</span>;
              this.setState({alertDialogFlag:true});
              setTimeout(() => {this.props.history.push({
              pathname: '/dashboard/addobeneficiary',
              state: { dbUserId: jsonobjects[0].dbUserId,tab : 2 , engagementId : this.state.engagementId , status : this.state.status}
            }) },3000)
             }
             else 
             {
              
              alertDialogOptions.message=<span style={{color:"green"}}>SocioEconomic Details Updated Sucessfully</span>;
              this.setState({alertDialogFlag:true});
              setTimeout(() => {this.props.history.push({
                pathname: '/dashboard/updatebeneficiary',
                state: { dbUserId: jsonobjects[0].dbUserId ,engagementId:this.state.engagementId,status : this.state.status , tab : 2 }
              }) },3000);
             }
             UserContext.dbUserId = jsonobjects[0].dbUserId;
             
            

         }  else{
             console.log("error");
         } 
      })

}




render()
{

let button;


  button = <Grid container direction="row" justify="flex-end"  id="btn" alignItems="flex-end">  <Button  variant="contained" type="submit"  size="small" color="primary">
  Save 
 </Button></Grid>
 

 return (
<div style = {{ width : '100%' }}>
 <form onSubmit={this.mySubmitHandler} method="post">

 <fieldset id = "roleBasedDisable">
 <Table  aria-label="simple table" style={{ width:"100%"}}>
        <TableHead>
          <TableRow>
            
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow >  

            <TableCell >
            Are you physically challenged ?
              </TableCell>         
            <TableCell >  
            
              
            <SingleSelect  name="physicallyChallenged" id="physicallyChallenged" 
      onChange={this.handleSelectChange.bind(this, 'physicallyChallenged')}
                            value={this.state.socioEconomicData.physicallyChallenged || ''}
                            helperText = {this.state.errors.physicallyChallenged != undefined ? this.state.errors.physicallyChallenged.label : '' } 
                            error = {this.state.errors.physicallyChallenged != undefined ? this.state.errors.physicallyChallenged.value : '' }  
                            options={this.state.pcOptions} 
                            /> 
            </TableCell>

            <TableCell >
             How many members are there in your household  ?
              </TableCell>         
            <TableCell >  
          
            <TextField   fullWidth={true} type="number" name="membersInHousehold" id="membersInHousehold" 
     onChange={this.handleInputChange} 
     value={this.state.socioEconomicData.membersInHousehold || ''}
         onInput = {(e) =>{
          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
      }}
         helperText = {this.state.errors.membersInHousehold != undefined ? this.state.errors.membersInHousehold.label : '' } 
        error = {this.state.errors.membersInHousehold != undefined ? this.state.errors.membersInHousehold.value : '' }  />       
            </TableCell>
            </TableRow>   
            <TableRow>   
            <TableCell >
            How many brothers and sisters do you have in total ?
              </TableCell>         
            <TableCell >  
          
            <TextField type="number" name="brothersAndSisters" id="brothersAndSisters" 
         onChange={this.handleInputChange} value={this.state.socioEconomicData.brothersAndSisters || ''}
         onInput = {(e) =>{
          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
      }}
      helperText = {this.state.errors.brothersAndSisters != undefined ? this.state.errors.brothersAndSisters.label : '' } 
      error = {this.state.errors.brothersAndSisters != undefined ? this.state.errors.brothersAndSisters.value : '' }  />
        
      
            </TableCell>
            <TableCell>Marital Status ?
</TableCell>
           <TableCell>
           <SingleSelect  name="maritalStatus" id="maritalStatus" 
      onChange={this.handleSelectChange.bind(this, 'maritalStatus')}
                            value={this.state.socioEconomicData.maritalStatus || ''}
                            helperText = {this.state.errors.maritalStatus != undefined ? this.state.errors.maritalStatus.label : '' } 
                            error = {this.state.errors.maritalStatus != undefined ? this.state.errors.maritalStatus.value : '' }  
                            options={this.state.msOptions} 
                            /> 


           </TableCell>
           
            </TableRow>
            <TableRow>
            <TableCell>How many rooms does this housing unit has ? </TableCell>
            <TableCell>
            <TextField type="number" name="rooms" id="rooms" label = " "
        onChange={this.handleInputChange} 
       value={this.state.socioEconomicData.rooms || ''}
         onInput = {(e) =>{
          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
      }}
      helperText = {this.state.errors.rooms != undefined ? this.state.errors.rooms.label : '' } 
      error = {this.state.errors.rooms != undefined ? this.state.errors.rooms.value : '' }  />
        
      
              
               </TableCell>

            <TableCell>What is the ownership status of your household ? </TableCell>
            <TableCell> 
            <SingleSelect  name="ownership" id="ownership" label=" "
      onChange={this.handleSelectChange.bind(this, 'ownership')}
                            value={this.state.socioEconomicData.ownership || ''}
                            helperText = {this.state.errors.ownership != undefined ? this.state.errors.ownership.label : '' } 
                            error = {this.state.errors.ownership != undefined ? this.state.errors.ownership.value : '' }  
                            options={this.state.ownershipOptions} 
                            /> 


            </TableCell>
            </TableRow> 


            
            <TableRow> 
      <TableCell>What is your household’s main source of fuel or energy for lighting ?</TableCell>
      <TableCell>
      <SingleSelect  name="mediumOfCooking" id="mediumOfCooking" 
       onChange={this.handleSelectChange.bind(this,'mediumOfCooking')}
                            value={this.state.socioEconomicData.mediumOfCooking || ''}
                            helperText = {this.state.errors.mediumOfCooking != undefined ? this.state.errors.mediumOfCooking.label : '' } 
                            error = {this.state.errors.mediumOfCooking != undefined ? this.state.errors.mediumOfCooking.value : '' }  
                            options={this.state.energyOptions} 

/>

      </TableCell>


      <TableCell>What type of housing unit do you and your household live in ? 
 
</TableCell>
      <TableCell>
      <SingleSelect  name="housingUnit" id="housingUnit" 
       onChange={this.handleSelectChange.bind(this, 'housingUnit')}
                            value={this.state.socioEconomicData.housingUnit || ''}
                            helperText = {this.state.errors.housingUnit != undefined ? this.state.errors.housingUnit.label : '' } 
                            error = {this.state.errors.housingUnit != undefined ? this.state.errors.housingUnit.value : '' }  
                            options={this.state.housingUnitOptions} 

/>
      </TableCell>
      </TableRow> 


      <TableRow>
            {/* <TableCell>Which of the following items do your household owns ?  </TableCell>
            <TableCell> 

            <Multiselect   name="items" id="items"
           //  onChange={this.handleChange}
          options={this.state.list} // Options to display in the dropdown
          onSelect={this.handleChange} // Function will trigger on select event
          onRemove={this.onRemove}

          helperText = {this.state.errors.items != undefined ? this.state.errors.items.label : '' } 
          error = {this.state.errors.items != undefined ? this.state.errors.items.value : '' }  
         // selectedValues={this.state.socioEconomicData.items}// Preselected value to persist in dropdown
            displayValue="name"/> 

            </TableCell> */}

            <TableCell> What is the source of drinking water in your household ?</TableCell>
            <TableCell> <SingleSelect  name="sourceOfWater" id="sourceOfWater" 
      onChange={this.handleSelectChange.bind(this, 'sourceOfWater')}
                            value={this.state.socioEconomicData.sourceOfWater || ''}
                            helperText = {this.state.errors.sourceOfWater != undefined ? this.state.errors.sourceOfWater.label : '' } 
                            error = {this.state.errors.sourceOfWater != undefined ? this.state.errors.sourceOfWater.value : '' }  
                            options={this.state.waterOptions}  />  </TableCell>
            </TableRow> 
            


        </TableBody>
      </Table>
      {button}
      </fieldset>
 </form>
      
 {/* <fieldset id = "roleBasedDisable">
<Grid  container spacing={3}>
 <Grid item xs={12}>
       <FormControl>
       <h5> SocioEconomic Details</h5>
         </FormControl>  
     </Grid>
     
     <Grid item xs={12}  sm={3} >
     <SingleSelect  name="physicallyChallenged" id="physicallyChallenged" label=" Are you physically challenged ?"
      onChange={this.handleSelectChange.bind(this, 'physicallyChallenged')}
                            value={this.state.socioEconomicData.physicallyChallenged || ''}
                            helperText = {this.state.errors.physicallyChallenged != undefined ? this.state.errors.physicallyChallenged.label : '' } 
                            error = {this.state.errors.physicallyChallenged != undefined ? this.state.errors.physicallyChallenged.value : '' }  
                            options={this.state.pc} 
                            /> 
     </Grid>
    
     <Grid item xs={12} sm={6}>
      
         <TextField   fullWidth={true} type="number" name="membersInHousehold" id="membersInHousehold" label = "How many members are there in your household  ?"
     onChange={this.handleInputChange} 
     value={this.state.socioEconomicData.membersInHousehold || ''}
         onInput = {(e) =>{
          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
      }}
         helperText = {this.state.errors.membersInHousehold != undefined ? this.state.errors.membersInHousehold.label : '' } 
        error = {this.state.errors.membersInHousehold != undefined ? this.state.errors.membersInHousehold.value : '' }  />
      
     </Grid>

</Grid>
<Grid>
     <Grid item xs={12} sm={6} id="">
   
         <TextField type="number" name="brothersAndSisters" id="brothersAndSisters" label = "How many brothers and sisters do you have in total ? "
         onChange={this.handleInputChange} value={this.state.socioEconomicData.brothersAndSisters || ''}
         onInput = {(e) =>{
          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
      }}
      helperText = {this.state.errors.brothersAndSisters != undefined ? this.state.errors.brothersAndSisters.label : '' } 
      error = {this.state.errors.brothersAndSisters != undefined ? this.state.errors.brothersAndSisters.value : '' }  />
        
      
     </Grid>


     <Grid item xs={12}  sm={4}>
     <SingleSelect  name="maritalStatus" id="maritalStatus" label="teste test6 ?"
      onChange={this.handleSelectChange.bind(this, 'maritalStatus')}
                            value={this.state.socioEconomicData.maritalStatus || ''}
                            helperText = {this.state.errors.maritalStatus != undefined ? this.state.errors.maritalStatus.label : '' } 
                            error = {this.state.errors.maritalStatus != undefined ? this.state.errors.maritalStatus.value : '' }  
                            options={this.state.ms} 
                            /> 
     
     <Grid item xs={12}>
        
     </Grid>
  
      <Grid item xs={12} sm={4} id="rooms">
       <FormControl>
       <TextField type="number" name="rooms" id="rooms" label = "teste test5 ? "
        onChange={this.handleInputChange} 
       value={this.state.socioEconomicData.rooms || ''}
         onInput = {(e) =>{
          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
      }}
        />
       </FormControl>
     </Grid>
      <Grid item xs={12} sm={4} id="">
       <FormControl>
       <SingleSelect  name="ownership" id="ownership" label="teste test6 ?"
      onChange={this.handleSelectChange.bind(this, 'ownership')}
                            value={this.state.socioEconomicData.ownership || ''}
                            helperText = {this.state.errors.ownership != undefined ? this.state.errors.ownership.label : '' } 
                            error = {this.state.errors.ownership != undefined ? this.state.errors.ownership.value : '' }  
                            options={this.state.ownershipOptions} 
                            /> 
       </FormControl>
     </Grid>
      <Grid item xs={12} sm={3}  id="sourceOfEnergy">
       <FormControl>
       <SingleSelect  name="sourceOfEnergy" id="sourceOfEnergy" label="teste test7?"
       onChange={this.handleSelectChange.bind(this, 'sourceOfEnergy')}
                            value={this.state.socioEconomicData.sourceOfEnergy || ''}
                            helperText = {this.state.errors.sourceOfEnergy != undefined ? this.state.errors.sourceOfEnergy.label : '' } 
                            error = {this.state.errors.sourceOfEnergy != undefined ? this.state.errors.sourceOfEnergy.value : '' }  
                            options={this.state.energyOptions} 
                            /> 
       </FormControl>
     </Grid>
      <Grid item xs={12} sm={3} id="">
       <FormControl>
       <SingleSelect  name="sourceOfWater" id="sourceOfWater" label="teste test8 ?"
      onChange={this.handleSelectChange.bind(this, 'sourceOfWater')}
                            value={this.state.socioEconomicData.sourceOfWater || ''}
                            helperText = {this.state.errors.sourceOfWater != undefined ? this.state.errors.sourceOfWater.label : '' } 
                            error = {this.state.errors.sourceOfWater != undefined ? this.state.errors.sourceOfWater.value : '' }  
                            options={this.state.waterOptions}  /> 
       </FormControl>
     </Grid>
     <Grid item xs={12} sm={3} id="">
            <Multiselect
        options={this.state.list} // Options to display in the dropdown
        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
        onSelect={this.onSelect} // Function will trigger on select event
        onRemove={this.onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        />
     </Grid>
   </Grid>
   <br></br>
   {button}
   </Grid>
   </fieldset> */}
  
 <br></br>

 { 
  (this.state.alertDialogFlag) && <AlertDialog   message={alertDialogOptions.message}></AlertDialog>
    }
 </div>

 );
}

}

export default SocioEconomic;