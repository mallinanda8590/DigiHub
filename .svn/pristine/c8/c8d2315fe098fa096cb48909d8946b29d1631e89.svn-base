import UserContext from '../components/GolbalContext'
import {fetchBusinessCaseMetaData, fetchAllEngagementForStudent} from './../util/api';
import { serviceEndPoint } from './../util/serviceEndPoint';


export function validateContact(name , contact) {
    
    if(name == "secondaryContactNumber" && contact == "")
    {
        return "";
    }

    if(contact.match(/^\d{10}$/))
    {
        return "";
    }
    else
    {
        return "Must be exactly 10 digits";
    }

}


export function validateGrossSal(name ) {
    
if(name == "grossSal" )
{
    return "";
}

if(name.match(/^\d{5}$/))
{
    return "";
}
else
{
    return "Must be exactly 5 digits";
}

}



export function validateEmail(name , email) {

    if(name == "secondaryEmailId" && email == "")
    {
        return "";
    }
    if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    {
        return "";
    }
    else
    {
        return "Not A valid email";
    }

}
export function validateNames(name) {


    if(name.match(/^[a-zA-Z0-9 !^&*(),.:{}|<>]*$/))
    
    if(name.match(/^[a-zA-Z][a-zA-Z\s]*$/))
    {
        return "";
    }
    else
    {
      return "Must start only with a letter and contain letters or spaces";
    }

}


export function validateBatchDescription(name) {
    

    if(name.match(/^[0-9a-zA-Z]+$/))
    {
        return "";
    }
    else
    {
        return "Please input alphanumeric characters only";
    }

}
   
export function validateAadhar(name) {

    if(name.match(/^\d{12}$/))
    {
        return "";
    }
    else
    {
        return "Must be exactly 12 digits";
    }

}


export function validateStartDate(value) {
    
   // alert("sys date");
   
    let startDate= document.getElementById("startDate").value;
   
    let ToDate = new Date();
    

    
    if (new Date(startDate).getTime()  < ToDate.getTime()) {
        //alert("The Date must be Bigger or Equal to today date");
        return "The Start Date must be Bigger than today's date";
   }else{
    return "";
   }
  
   
  

}


export function validateOJTDates(value) {
    
        let startDate= document.getElementById("startDate").value;
        let endDate=document.getElementById("endDate").value;
        let ojtStartDate= document.getElementById("ojtStartDate").value;
        
        if ((Date.parse(ojtStartDate) <= Date.parse(startDate)  )) {
         return "OJT date should be greater than Start date and Less than Batch End Date";
        }else{
          
            return "";
        }
      

}
export function validateDates(value) {
    //checkMandatory(name);

   
        
        let startDate= document.getElementById("startDate").value;
        let endDate=document.getElementById("endDate").value;
        let ojtStartDate= document.getElementById("ojtStartDate").value;
        if ((Date.parse(endDate) <= Date.parse(startDate))) {
         return "End date should be greater than Start date";
        }else{
          
            return "";
        }
        
      

}

export function validatePincode(pincode) {

    if(pincode.match(/^\d{6}$/))
    {
        return "";
    }
    else
    {
        return "Must Be exactly 6 digits";
    }

}

export function roleBasedReadonly()
{
    var svgTags = document.getElementsByClassName("css-qcwa5y");
      if(UserContext.roleName == 'Principal')
      {
        document.getElementById("roleBasedDisable").setAttribute("disabled", "disabled");
        for(let i = 0 ; i < svgTags.length ; i++)
        {
          svgTags[i].setAttribute("hidden" , "true");
        }
      }
      else
      {
        document.getElementById("roleBasedDisable").removeAttribute("disabled");
        for(let i = 0 ; i < svgTags.length ; i++)
        {
          svgTags[i].removeAttribute("hidden");
        }
      }
}


export function isPasswordsSame(newPassword,confirmPassword)
{
    var flag=false;
   if(newPassword==confirmPassword){
     flag=true;
   }
return flag;
}

export function validateBirthDate(birthDate)
{
    var birthYear = (new Date(birthDate)).getFullYear();
    var currentYear = (new Date()).getFullYear();
    if((currentYear - birthYear) < 18)
    {
        return "Age cannot be less than 18 years";
    }
    else
    {
        return "";
    }
}
export function validatePassingYear(passingYear,dob,qual)
{
    if(qual == "")
    {
        return "Please enter highest qualification";
    }
    else if (qual == "1")
    {
        document.getElementById("passingYear").setAttribute("disabled" , true);
    }
    else{
        document.getElementById("passingYear").removeAttribute("disabled");
            if(dob == "")
            {
                return "Please enter Birth date";
            }
            else
            {
                var birthYear = (new Date(dob)).getFullYear();
                if(passingYear <= birthYear)
                {
                    return "Passing year must be greater than Birth Year";
                }
                else
                {
                    return "";
                }
            }
    
    }
}

export function checkButton(errors)
      {
        
        var json = errors;
        let f = 0;
        Object.keys(json).forEach(function(key) {
        if(json[key].label != "")
        {
         f = 1 ; 
        }
      })
        if(f == 1)
        {
            return false;
        }
        else
        {
            return true;
        }
      
    }

    export function checkButtonForArray(errors)
    {
     
      let f = 0;
      errors.map((item) => {

        Object.keys(item).forEach(function(key) {
            if(item[key].label != "")
            {
             f = 1 ; 
            }
          })

      })
      
      if(f == 1)
      {
          return false;
      }
      else
      {
          return true;
      }
    
  }
  export function hasFatherMotherDetails(rows)
  {
   
    let f = 0;
    rows.map((item) => {

        if(item.relationship_id == "Father" && item.relationship_id == "Mother" )
        {
           // alert("validate");
            f = 1;
            
        }

        
    })
    
    if(f == 1)
    {
        return true;
    }
    else
    {
        return false;
    }
  
}

export function hasFatherDetails(rows)
{
 
  let f = 0;
  rows.map((item) => {

      if(item.relationship_id == "Father" )
      {
          //alert("validate mother");
          f = 1;
      }

      
  })
  
  if(f == 1)
  {
      return true;
  }
  else
  {
      return false;
  }

}






export function hasMotherDetails(rows)
{
 
  let f = 0;
  rows.map((item) => {

      if(item.relationship_id == "Mother" )
      {
          //alert("validate mother");
          f = 1;
      }

      
  })
  
  if(f == 1)
  {
      return true;
  }
  else
  {
      return false;
  }

}

export function passwordStrength(newPassword)
{
    const atLeastOneNumber = /[0-9]/;
    const atLeastOneLowercase = /[a-z]/;
    const atLeastOneUppercase = /[A-Z]/;
    const atLeastSpecialCharacter = /[@#$%^&+=]/;
    if(newPassword.length<8){return "password min 8 characters";}
    else if(newPassword.length>15){return "password max 15 characters";}
    else if(!atLeastOneNumber.test(newPassword)) {return "password must contain at least one number (0-9)!";}
    else if(!atLeastOneLowercase.test(newPassword)) {return "password must contain at least one lowercase letter (a-z)!";}
    else if(!atLeastOneUppercase.test(newPassword)) {return  "password must contain at least one uppercase letter (A-Z)!";}
    else if(!atLeastSpecialCharacter.test(newPassword)) {return  "password must contain at least one special character (@#$%^&+=)!";}
    return "";
}

export function isNotEmpty(value){
  return  value.length == 0 ? 'Please fill out this field!' : '';
}


export function validateAssessorName(name , state) 
{
    if(name.match(/^[a-zA-Z\s,'-]*$/))
    {
        let res = "";
        state.map((item) => {
            if(item.assessorName == name)
            {
                res = "Cannot repeat Assessor Name";
            }
        })
        return res;
    }
    else
    {
        return "Must contain only characters";
    }
}


export function getBasicDetails(engId,dbUserId)
{
    let jsonobjects;
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "validate" +'", "data" : [{"dbUserId" : ' + dbUserId + '}]}');
          return fetch(serviceEndPoint.studentServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
           }, 
          body: formData 
          }).then(response => response.json()).then((jsondata => jsondata.data ))
          .then(jsonobjects => jsonobjects == 'false' ? true:false)
            .catch(error => true);
}

export function getAddressData(engId,dbUserId)
{
    let jsonobjects;
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewAllAddressForEntity" +'", "data" : [{"entityId" : ' + dbUserId + ' , "entityType" : "S"}]}');
    return fetch(serviceEndPoint.addressServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json()).then((jsondata => JSON.parse(jsondata.data) ))
          .then(jsonobjects => jsonobjects.length < 1 ? true:false)
            .catch(error => true);
    }
export function getFamilyData(engId,dbUserId)
{
    let jsonobjects;
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "validate", "data" : [{"dbUserId" : ' + dbUserId + '}]}');
         return   fetch(serviceEndPoint.familyServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json()).then((jsondata => jsondata.data ))
          .then(jsonobjects => jsonobjects == 'false' ? true:false)
            .catch(error => true);
}


export function getExperienceDetails(engId,dbUserId)
{
    let jsonobjects;
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "validateExp", "data" : [{"dbUserId" : ' + dbUserId + '}]}');
         return   fetch(serviceEndPoint.experienceServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json()).then((jsondata => jsondata.data ))
          .then(jsonobjects => jsonobjects == 'false' ? true:false)
            .catch(error => true);
}
export function getObservationData(engId,dbUserId)
{
    let jsonobjects;
    let formData = new FormData();
    formData.append('data', '{"token" : "", "action" : "viewAllObservationsForUser", "data" : [{"engagementId":'+engId+'}]}');
        return fetch(serviceEndPoint.observationServiceEndPoint,{
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json()).then((jsondata => JSON.parse(jsondata.data) ))
          .then(jsonobjects => jsonobjects.length < 1 ? true:false)
            .catch(error => true);
    }
export function getBusinessCaseData(engId,dbUserId)
{
    let jsonobjects;
    let formData = new FormData();
    formData.append('data', '{"token" : "", "action" : "get", "data" : [{"engagementId":' + engId + '}]}');
    return fetch(serviceEndPoint.businessCaseEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: formData,
    }).then(response => response.json()).then((jsondata => JSON.parse(jsondata.data) ))
    .then(jsonobjects => jsonobjects.length < 10 ? true:false)
      .catch(error => true);
}
export function getBusinessCaseDocument(engId)
{
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "fetchDocumentDetailsByUserIdAndDocumentType", "data" : [{"engagementId":'+engId+',"documentType":"'+"Business Brief"+'","typeOfDocument":"'+"P"+'"}]}');
   return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json()).then((jsondata => JSON.parse(jsondata.data) ))
    .then(jsonobjects => jsonobjects == '' || jsonobjects == undefined ? true:false)
      .catch(error => true);
}
export function getInterestInventory(engId,dbUserId)
{
    let jsonobjects;
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "viewInterestInventoryByEngId", "data" : [{"engagementId":' + engId + '}]}');
     return fetch(serviceEndPoint.interestinventoryServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json()).then((jsondata => JSON.parse(jsondata.data) ))
    .then(jsonobjects => jsonobjects[0] == null ? true:false)
      .catch(error => true);
}
export function checkEligibleForShortlist(dbUserId)
{
 
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "checkEligibleForShortlist", "data" :[{"dbUserId"  : ' + dbUserId + ' }]}');
    return  fetch(serviceEndPoint.engagementServiceEndPoint, {
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json()).then((jsondata => jsondata.data ));
}

export function validateQualificationName(selectname , state) 
{
   
        let res = "";
        state.map((item) => {
            
            if(item.qualificationId == selectname)
            {
                
                res = "Cannot repeat Qualification";
            }
        })
      
        return res;
   
}
export function regenerateToken()
{
    let formData = new FormData();
        formData.append('data', '{"token" : "1234", "action" : "reactivate", "data" : [{"refreshToken":"'+UserContext.refreshToken+'","secret":"'+UserContext.secretKey+'"}]}');
          return fetch(serviceEndPoint.loginService, {
            method: "POST",
            body: formData
            }).then(response => response.json()).then((jsondata)=>{
                if(jsondata.appError[0]==null){      
                    let jsonobjects = JSON.parse(jsondata.data);
                    UserContext.userid = jsonobjects[1].id;
                    UserContext.firstName = jsonobjects[1].firstName;
                    UserContext.lastName = jsonobjects[1].lastName;  
                    UserContext.userName = jsonobjects[1].userName;   
                    UserContext.token = jsonobjects[0].token;   
                    //UserContext.refreshToken = jsonobjects[0].refreshToken;
                    var jwtTimeOut=new Date();
                    jwtTimeOut.setMinutes( jwtTimeOut.getMinutes() + 15);
                    UserContext.jwtTimeOut = jwtTimeOut;
                } 
             })
}