import UserContext from '../components/GolbalContext'
import {fetchBusinessCaseMetaData, fetchAllEngagementForStudent} from './../util/api';
import { serviceEndPoint } from './../util/serviceEndPoint';





    export function checkButtonForArray(errors)
    {
    // alert("inside check button");
      let f = 0;
      errors.map((item) => {
       // alert(JSON.stringify(item));
        Object.keys(item).forEach(function(key) {
            if(item[key].label != "")
            {
              //  alert(f);
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


export function getSocioEconomicData(engId,dbUserId)
{
    let jsonobjects;
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "validateSocio", "data" : [{"dbUserId" : ' + dbUserId + '}]}');
         return   fetch(serviceEndPoint.socioeconomicServiceEndPoint, {
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


export function getExistingBusiness(engId)
{
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "fetchExistingBusinessDetails", "data" : [{"engagementId":'+engId+'}]}');
   return fetch(serviceEndPoint.existingBusiness, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json()).then((jsondata => JSON.parse(jsondata.data) ))
    .then(jsonobjects => jsonobjects == '' || jsonobjects == undefined ? true:false)
      .catch(error => true);
}

