import { serviceEndPoint } from './../util/serviceEndPoint';
import UserContext from './../components/GolbalContext'
import {isSessionValid, isTokenValid} from './../util/session.js';
import { regenerateToken } from './validation';


export async function fetchMasterSalutation() {
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data', '{"token" : "' + "1234" + '", "action" : "findall" , "data" : [{}]}');
    return fetch(serviceEndPoint.salutationServiceEndPoint, {
        method: "POST",
        body: formData
    }).then(response => response.json());
}
return null;
}

export async function fetchAllCenter() {
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data', '{"token" : "' + "1234" + '", "action" : "findall" , "data" : [{}]}');
    return fetch(serviceEndPoint.centerServiceEndPoint, {
        method: "POST",
        body: formData
    }).then(response => response.json());
}
return null;
}

export async function fetchMasterGenderDetails() {
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data', '{"token" : "' + "1234" + '", "action" : "findall" , "data" : [{}]}');
    return fetch(serviceEndPoint.genderServiceEndPoint, {
        method: "POST",
        body: formData
    }).then(response => response.json());
}
return null;
}

export async function fetchPincodeData(pincode) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findpincode", "data" : [{"pincode":' + pincode + '}]}');
    return fetch(serviceEndPoint.cityVillageServiceEndPoint, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}


export async function businessCaseSaveOrUpdate(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "save", "data" : ' + data + '}');
   return fetch(serviceEndPoint.businessCaseEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function fetchBusinessCaseMetaData(engagementId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "get", "data" : [{"engagementId":' + engagementId + '}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.businessCaseEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function fetchBusinessCaseQuestions() {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findall", "data" : []}');
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.businessCaseBriefMdmService, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function fetchUserDocuments(engagementId,documentType,typeOfDocument) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "fetchDocumentDetailsByUserIdAndDocumentType", "data" : [{"engagementId":'+engagementId+',"documentType":"'+documentType+'","typeOfDocument":"'+typeOfDocument+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}


export async function fetchBatchDetails(centerId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "getActiveBatches", "data" : [{"centerId":'+centerId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.batchDetailsServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null; 
}
export async function fetchBatchDetailsForBatchOwner(batchOwner,centerId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "getActiveBatchesForBatchOwner", "data" : [{"batchOwner":'+batchOwner+',"centerId":'+centerId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return  fetch(serviceEndPoint.batchDetailsServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;  
}



export async function fetcRoleDetails() {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "fetchAll", "data" : []}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.roleServiceEndPoint,{
     method: "POST",
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;   
}

export async function passwordReset(dbUserId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "passwordReset", "data" : [{"id":'+dbUserId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;    
}


export async function enrollStudent(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "enrolltobatch", "data" : [{'+data+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.enrollmentServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    },
     body: requestFormData,
     }).then(response => response.json());
    }
    return null; 
}


export async function changeStudentStatus(data) {
    if(isSessionValid()){
    try{
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "updateStatus", "data" : [{'+data+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.engagementServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    catch(e)
    {
        console.log(e);
    }
}
return null;
}

export async function fectEnrollmentDetails(engagementId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "fetchEnrollmentDetails", "data" : [{"engagementId":'+engagementId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return  fetch(serviceEndPoint.enrollmentServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}


export async function fectUserDetails(userId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "fetchUserDetails", "data" : [{"id" : ' + userId + '}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null; 
}

export async function fectUserNameFromId(userId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "fetchUserDetails", "data" : [{"id" : ' + userId + '}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json()).then((jsondata)=>{

        let jsonobjects = JSON.parse(jsondata.data);
        alert(jsonobjects[0].firstName);
        return jsonobjects[0].firstName;
           
         });
        }
        return null;     
}

export async function fectUserRoleDetails(roleId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "getRoleDetails", "data" : [{"id":"'+roleId+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.roleServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}


export async function fectAddressDetails(id) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "viewAllAddressForEntity", "data" : [{"entityId" : ' + id + ' , "entityType" : "U"}]}');
    if(!isTokenValid()) 
        await regenerateToken();

   return  fetch(serviceEndPoint.addressServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}
// address for placement
export async function fectAddressDetailsByAddressID(id) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "viewAddressById", "data" : [{"id" : ' + id + ' }]}');
    if(!isTokenValid()) 
        await regenerateToken();

   return  fetch(serviceEndPoint.addressServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}

export async function fetchAllStateDetails() {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "findall", "data" : [{}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.stateServiceEndPoint,{
     method: "POST",
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}


export async function changePassword(userId,newPassword) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "changePassword" +'", "data" : [{"id" : ' + userId + ',"password" : "' +newPassword + '"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;  
}


export async function fetchAddressDetailsBasedOnPincode(pincode) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "findpincode", "data" : [{"pincode":'+pincode+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.cityVillageServiceEndPoint,{
     method: "POST",
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;    
}

export async function saveUserDetails(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "saveUserDetails", "data" : ['+data+']}');
    if(!isTokenValid()) 
        await regenerateToken();
    return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null; 
}

export async function saveAddressDetails(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "updateAddress", "data" : ['+data+']}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.addressServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}

export async function sendResetPasswordLink(userName) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "resetPassword", "data" : [{"userName":"'+userName+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}

export async function fetchUsersByCenterId(centerId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "findUsersByCenterId", "data" : [{"centerId":'+centerId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}

export async function fetchUserDetailsById(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "fetchUserDetailsById", "data" : '+data+'}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}

export async function fetchUserDetails(id) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "fetchUserDetails", "data" : [{"id" : ' + id + '}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;   
}


export async function mapUserToRole(userId,centerId,roleId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "saveUserCenterRoleMapDetails", "data" : [{"userId":'+userId+',"centerId":'+centerId+',"roleId":'+roleId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
 return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;  
}


export async function fetchEnrollmentDetailsByBatchId(batchId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "fetchEnrollmentDetailsByBatchId", "data" : [{"batchId":'+batchId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return  fetch(serviceEndPoint.enrollmentServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;    
}
export async function fetchAllStudentDataByEngagementId(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "fetchAllStudentDataByEngagementId", "data" : '+data+'}');
    if(!isTokenValid()) 
        await regenerateToken();
  return  fetch(serviceEndPoint.engagementServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;   
}

export async function captureStudentEngagementDetails(dbUserId,centerId,userid) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "captureStudentEngagement", "data" :[{"dbUserId"  : ' + dbUserId + ' , "centerId" : ' + centerId + ', "createdBy" : ' + userid + ', "remarks" : "","status" : "mobilised"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
 return  fetch(serviceEndPoint.engagementServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;  
}

export async function captureStudentEngagementDetailsB(dbUserId,centerId,userid,engId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "captureStudentEngagement", "data" :[{"dbUserId"  : ' + dbUserId + ' , "centerId" : ' + centerId + ', "createdBy" : ' + userid + ',"linkedEngagementId" : ' + engId + ', "remarks" : "","status" : "mobilised"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
 return  fetch(serviceEndPoint.engagementServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;  
}


export async function isCurrentPasswordValid(userName,currentPassword) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "isCurrentPasswordValid", "data" :[{"userName"  : "' + userName + '" , "password":"'+currentPassword+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
     method: "POST",
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;  
}



export async function fetchBatchDetailsByBatchId(batchId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data','{"token" : "'+ "1234" +'", "action" : "getBatchDetailsByBatchId", "data" :[{"batchId"  : "' + batchId + '"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return  fetch(serviceEndPoint.batchDetailsServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}


export async function BusinessIdeaEvaluationSaveOrUpdate(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();
   requestFormData.append('data', '{"token" : "", "action" : "saveBusinessIdeaEvaluationDetails", "data" : ' + data + '}');
   if(!isTokenValid()) 
        await regenerateToken();
  return fetch(serviceEndPoint.businessCaseEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function FetchFinalScoreForBusinessIdea(engagementId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
   requestFormData.append('data', '{"token" : "", "action" : "calculateFinalScore", "data" : [{"engagementId":' + engagementId + '}]}');
   if(!isTokenValid()) 
        await regenerateToken();
  return fetch(serviceEndPoint.businessCaseEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function fetchBusinessIdeaEvaluationData(engagementId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "getBusinessIdeaEvaluationDetails", "data" : [{"engagementId":' + engagementId + '}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.businessCaseEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function fetchCourseDetails() {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findall", "data" : [{}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.courseServiceEndPoint, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}


export async function saveInterestInventoryCode(engagementId,finalScore,createdBy) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "captureInterestInventory", "data" : [{"engagementId":' + engagementId + ',"finalScore":"' + finalScore + '","createdBy":'+createdBy+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.interestinventoryServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}


export async function fetchInterestInventoryCode(engagementId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "viewInterestInventoryByEngId", "data" : [{"engagementId":' + engagementId + '}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.interestinventoryServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}



export async function fetchCentersOfUser(id) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "getAllUserScopes", "data" : [{"userId":'+UserContext.userid+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.userProfileServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}



export async function fetchCentersDetails(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findcenter", "data" : '+data+'}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.centerServiceEndPoint, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}



export async function fetchRoleDetails(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "getRoleDetails", "data" : '+data+'}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.roleServiceEndPoint, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}


export async function setDefaultSettings(userId,roleMapId,centerId,programId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "setDefaultSettings", "data" : [{"userId":'+userId+',"roleMapId":'+roleMapId+',"centerId":'+centerId+',"programId":'+programId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.userProfileServiceEndPoint, {
        method: "POST",
        body: requestFormData,
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
    }).then(response => response.json());
}
return null;
}


// export async function saveEducationDetails(data){
//     if(isSessionValid()){
//         let formData = new FormData();
//         formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "captureAllEducation" +'", "data" : ' + JSON.stringify(this.state.rows) + '}');
//         return fetch(serviceEndPoint.educationServiceEndPoint, {
//         method: "POST",
//         headers: {
//           'Authorization': 'Bearer '+Cookies.get('token')
//       },  
//         body: formData  
//         }).then(response => response.json());
//     }
//     return null;
//     }
   


export async function saveCounsellingDetails(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "save", "data" : ['+data+']}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.counsellingServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData
    }).then(response => response.json());
}
return null;
}


export async function fetchCounsellingDetails(engagementId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "get", "data" : [{"engagementId":'+engagementId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.counsellingServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData
    }).then(response => response.json());
}
return null;
}


export async function fetchCoursesByHollandCode(hollandCode) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findCoursesByHollandCode", "data" : [{"hollandcode":"'+hollandCode+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.interestinventoryServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData
    }).then(response => response.json());
}
return null;
}



export async function findByAadharNo(aadharNo) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "isAadharNoDuplicate", "data" : [{"aadharNo":"'+aadharNo+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.studentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData
    }).then(response => response.json());
    }
    return null;
}


export async function searchByAadharNo(aadharNo) {
  if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "searchByAadharNumber", "data" : [{"aadharNo":"'+aadharNo+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.studentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData
    }).then(response => response.json());
}
return null;
}


export async function searchByFirstNameAndLastNameAnddobAndPrimaryContactNumberAndPrimaryEmailId(firstName,lastName,dob,primaryContactNumber,primaryEmailId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "searchByFirstNameAndLastNameAnddobAndPrimaryContactNumberAndPrimaryEmailId", "data" : [{"firstName":"'+firstName+'","lastName":"'+lastName+'","dob":"'+dob+'","primaryContactNumber":"'+primaryContactNumber+'","primaryEmailId":"'+primaryEmailId+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return fetch(serviceEndPoint.studentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData
    }).then(response => response.json());
    }
    return null;
}



export async function fetchStudentDetailsByEngagementId(engagementId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "viewStudentEngagementById", "data" : [{"engagementId":'+engagementId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return fetch(serviceEndPoint.engagementServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData
    }).then(response => response.json());
}
return null;
}


export async function fetchNotCompletedBatchDetails(centerId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "getNotCompletedBatches", "data" : [{"centerId":'+centerId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return  fetch(serviceEndPoint.batchDetailsServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null; 
}



export async function login(token,action,email,password) {
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "'+token+'", "action" : "'+action+'", "data" : [{"userName":"'+email+'","password":"'+password+'"}]}');
    return  fetch(serviceEndPoint.loginService,{
     method: "POST",
     body: requestFormData,
     }).then(response => response.json()); 
}



export async function fetchUserScope(userid) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "getUserScope", "data" : [{"userId":"'+userid+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json()); 
    }
    return null;
}

export async function fetchBasicData(id)
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewBeneficiaryDetailsById" +'", "data" : [{"dbUserId" : ' + id + '}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.studentServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        },    
          body: formData 
          }).
          then(response => response.json())
}
return null;
}
export async function fetchAddressData(id)
{
    if(isSessionValid()){
    let formData2 = new FormData();
          formData2.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewAllAddressForEntity" +'", "data" : [{"entityId" : ' + id + ' , "entityType" : "S"}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.addressServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData2 
          }).then(response => response.json())
}
return null;
}


export async function subMitBasicData(action , data)
{
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" : [' + JSON.stringify(data) + ']}');
    if(!isTokenValid()) 
        await regenerateToken();
        return fetch(serviceEndPoint.studentServiceEndPoint, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer '+UserContext.token
      },  
        body: formData 
        }).then(response => response.json())
}
return null;
}

export async function submitAddressData(action, data)
{
    if(isSessionValid()){
    let formData = new FormData();
       formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" : [' + JSON.stringify(data) + ']}');
       if(!isTokenValid()) 
        await regenerateToken();
         return fetch(serviceEndPoint.addressServiceEndPoint, {
         method: "POST",
         headers: {
           'Authorization': 'Bearer '+UserContext.token
       },  
         body: formData 
         }).then(response => response.json())
}
return null;
}

export async function submitEducationData(action,data)
{
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" : ' + JSON.stringify(data) + '}');
    if(!isTokenValid()) 
        await regenerateToken();
        return fetch(serviceEndPoint.educationServiceEndPoint, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer '+UserContext.token
      },  
        body: formData  
        }).then(response => response.json())
}
return null;
}

export async function fetchEducationData(id)
{
    if(isSessionValid()){
    let formData = new FormData();
         formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewAllEducationForUser" +'", "data" : [{"dbUserId" : ' + id + '}]}');
         if(!isTokenValid()) 
        await regenerateToken();
         return fetch(serviceEndPoint.educationServiceEndPoint, {
         method: "POST",
         headers: {
           'Authorization': 'Bearer '+UserContext.token
       }, 
         body: formData 
         }).then(response => response.json())
}
return null;
}


export async function saveBatchDetails(action, data)
{
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" :[' + JSON.stringify(data) + ']}');
    if(!isTokenValid()) 
        await regenerateToken();
        return fetch(serviceEndPoint.batchDetailsServiceEndPoint, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer '+UserContext.token
      }, 
        body: formData 
        }).then(response => response.json())
}
return null;
}

export async function saveObservationDetails(action, data)
{
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" : ' + JSON.stringify(data) + '}');
    if(!isTokenValid()) 
        await regenerateToken();
        return fetch(serviceEndPoint.observationServiceEndPoint, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer '+UserContext.token
      }, 
        body: formData 
        }).then(response => response.json())
}
return null;
}

export async function fetchObservationdetails(engagementId)
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewAllObservationsForUser" +'", "data" : [{"engagementId":'+engagementId+'}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.observationServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json())
}
return null;
}

export async function fetchFamilydetails(dbUserId)
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewAllFamilyDetailsForUser" +'", "data" : [{"dbUserId":'+dbUserId+'}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.familyServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json())
}
return null;
}




export async function saveFamilyDetails(action, data)
{if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" : ' + JSON.stringify(data) + '}');
    if(!isTokenValid()) 
        await regenerateToken();
        return fetch(serviceEndPoint.familyServiceEndPoint, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer '+UserContext.token
      }, 
        body: formData 
        }).then(response => response.json())
}
return null;
}
export async function fetchFamilyDetails(id)
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewAllFamilyDetailsForUser" +'", "data" : [{"dbUserId" : ' + id + '}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.familyServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json())
}
return null;
}

export async function fetchPlacementDetailsByEngagementId(engagementId)
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewPlacementDetailsByEngagementId" +'",  "data" : [{"engagementId" : ' + engagementId + '}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.placementServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json())
}
return null;
}
export async function fetchExperienceDetails(id)
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewAllExperienceForUser" +'", "data" : [{"dbUserId" : ' + id + '}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.experienceServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json())
}
return null;
}

//Socio Details added ashish
export async function saveSocioDetails(action, data)
{
   
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" :[ ' + JSON.stringify(data) + ']}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.socioeconomicServiceEndPoint, {
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: formData 
     }).then(response => response.json())
}
return null;
}


export async function saveExpDetails(action, data)
{
   
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" :[ ' + JSON.stringify(data) + ']}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.experienceServiceEndPoint, {
 method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: formData 
     }).then(response => response.json())
}
return null;
}


export async function savePlacementDetails(data)
{
   
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "save" , "data" :[ ' + JSON.stringify(data) + ']}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.placementServiceEndPoint, {
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: formData 
     }).then(response => response.json())
}
return null;
}

//ashish new screen family
export async function saveFamilyDetailsNew(action, data)
{
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  action +'", "data" : [' + JSON.stringify(data) + ']}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.familyServiceEndPoint, {
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: formData 
     }).then(response => response.json())
}
return null;
}

export async function fetchExpDetails(id)
{
    if(isSessionValid()){
     let formData = new FormData();
     formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewAllExperienceForUser" +'", "data" : [{"dbUserId" : ' + id + '}]}');
     if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.experienceServiceEndPoint, {
       method: "POST",
       headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
       body: formData 
       }).then(response => response.json())
}
return null;
}

//ashish socio economic
export async function fetchSocioDetails(id)
{
    if(isSessionValid()){
     let formData = new FormData();
     formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "viewSocioEconomicById" +'", "data" : [{"dbUserId" : ' + id + '}]}');
     if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.socioeconomicServiceEndPoint, {
       method: "POST",
       headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
       body: formData 
       }).then(response => response.json())
}
return null;
}



export async function fetchEvaluationData(eng)
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "viewByEngagementId", "data" : [{ "engagementId" : ' + eng + '}]}');
          if(!isTokenValid()) 
        await regenerateToken();
         return fetch(serviceEndPoint.evaluationServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json())
}
return null;
}


export async function fetchKnackScore(id)
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "get", "data" : [{ "engagementId" : ' + id + '}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.knackServiceEndPoint, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json());
}
return null;
}
export async function saveEvaluationData(data)
{if(isSessionValid()){
    let formData = new FormData();
    formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "captureAllEvaluationDetails" +'", "data" : ' + JSON.stringify(data) + ' }');
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.evaluationServiceEndPoint, {
    method: "POST",
    headers: {
      'Authorization': 'Bearer '+UserContext.token
  }, 
    body: formData 
    }).then(response => response.json())
}
return null;

}


export async function fetchStudentDataForList(role)
{if(isSessionValid()){
    let requestFormData = new FormData();  
    if ( role=="Principal"){
      requestFormData.append('data', '{"token" : "", "action" : "viewAllByCenterAndMultipleStatus", "data" : [{"centerId":'+UserContext.centerId+'}]}');
    }
    else{
      requestFormData.append('data', '{"token" : "", "action" : "viewAllByCenter", "data" : [{"centerId":'+UserContext.centerId+'}]}');
    }
    if(!isTokenValid()) 
        await regenerateToken();
        return fetch(serviceEndPoint.engagementServiceEndPoint,{
            method: "POST",
            headers: {
              'Authorization': 'Bearer '+UserContext.token
          },
            body: requestFormData,
            }).then(response => response.json())
      
       
}
return null;
}

export async function calculatePercentile()
{
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "calculatePercentile", "data" : [{"createdBy":'+UserContext.userid+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
  return fetch(serviceEndPoint.evaluationServiceEndPoint,{
  method: "POST",
  headers: {
    'Authorization': 'Bearer '+UserContext.token
}, 
  body: requestFormData,
  }).then(response => response.json())
}
return null;
}


export async function findNumberOfBeneficiaryInCenterByStatus(centerId,studentEngagementStatus) {
    if(isSessionValid()){
      let requestFormData = new FormData();
      requestFormData.append('data', '{"token" : "", "action" : "NumberOfBeneficiaryInCenterByStatus", "data" : [{"centerId":"'+centerId+'","studentEngagementStatus":"'+studentEngagementStatus+'"}]}');
      if(!isTokenValid()) 
          await regenerateToken();
      return fetch(serviceEndPoint.dashboardService, {
          method: "POST",
          body: requestFormData
      }).then(response => response.json());
  }
  return null;
  }



  export async function fetchQualificationDetails() {
    if(isSessionValid()){
      let requestFormData = new FormData();
      requestFormData.append('data', '{"token" : "", "action" : "findall", "data" : [{}]}');
      if(!isTokenValid()) 
          await regenerateToken();
      return fetch(serviceEndPoint.qualificationServiceEndPoint, {
          method: "POST",
          body: requestFormData
      }).then(response => response.json());
  }
  return null;
  }


  export async function fetchUserDocumentsByEngagementId(engagementId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "fetchDocumentDetailsByEngagementId", "data" : [{"engagementId":'+engagementId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
  return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}



export async function fetchUserDocumentsByEngagementIdAndTypeOfDocument(engagementId,typeOfDocument) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "fetchDocumentDetailsByEngagementIdAndDocumentType", "data" : [{"engagementId":'+engagementId+',"typeOfDocument":"'+typeOfDocument+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
  return fetch(serviceEndPoint.documentServiceEndPoint, {
  
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function fetchUserDocumentsByUserIdAndTypeOfDocument(dbUserId,typeOfDocument) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "getDocumentDetailsByUserIdAndDocumentType", "data" : [{"dbUserId":'+dbUserId+',"typeOfDocument":"'+typeOfDocument+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
  return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function deleteDocumentById(basicDocId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "deleteDocument", "data" : [{"basicDocId":'+basicDocId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
  return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}




export async function fetchCenterCapacity() {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findall", "data" : [{}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.centerCapacity, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}




export async function fetchBusinessIdeaEvaluationQuestions() {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findall", "data" : [{}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.businessIdeaEvaluation, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}



export async function findAllObservationdetails()
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "findall" +'", "data" : [{}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.masterObservation, {
          method: "POST",
          body: formData 
          }).then(response => response.json())
}
return null;
}


export async function fetchCenterActiveCourses(centerId)
{
    if(isSessionValid()){
    let formData = new FormData();
          formData.append('data','{"token" : "'+ "1234" +'", "action" : "'+  "getActiveCourse" +'", "data" : [{"centerId" :'+centerId+'}]}');
          if(!isTokenValid()) 
        await regenerateToken();
          return fetch(serviceEndPoint.centerService, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer '+UserContext.token
        }, 
          body: formData 
          }).then(response => response.json())
}
return null;
}


export async function fetchCourseDetailsByIds(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findcourse", "data" :'+data+'}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.courseServiceEndPoint, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function uploadDocument(dbUserId,engagementId,documentType,typeOfDocument,documentName,document,documentNumber) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "captureDocDetails", "data" : [{"dbUserId":'+dbUserId+',"engagementId":'+engagementId+',"documentType":"'+documentType+'","typeOfDocument":"'+typeOfDocument+'","documentName":"'+documentName+'","base64File":"'+document+'","documentNo":"'+documentNumber+'"}]}');
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.documentServiceEndPoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        },
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}


export async function fetchMasterExistingBusiness() {
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data', '{"token" : "' + "1234" + '", "action" : "fetchAll" , "data" : [{}]}');
    return fetch(serviceEndPoint.mdmExistingBusiness, {
        method: "POST",
        body: formData
    }).then(response => response.json());
}
return null;
}

export async function saveExistingBusiness(data) {
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data', '{"token" : "' + "1234" + '", "action" : "saveExistingBusinessDetails" , "data" : '+data+'}');
    
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.existingBusiness, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        },
        body: formData,
    }).then(response => response.json());
}
return null;
}


export async function fetchExistingBusinessDetails(engagementId) {
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data', '{"token" : "' + "1234" + '", "action" : "fetchExistingBusinessDetails" , "data" :[{"engagementId":'+engagementId+'}]}');
    
    if(!isTokenValid()) 
        await regenerateToken();
    return fetch(serviceEndPoint.existingBusiness, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        },
        body: formData,
    }).then(response => response.json());
}
return null;
}

export async function fetchCenterCapacityByIds(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findCapacityByCenter", "data" :'+data+'}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.centerCapacity, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}


export async function fetchAllStudentEngagementForUser(dbUserId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "viewAllStudentEngagementForUser", "data" :[{"dbUserId":'+dbUserId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.engagementServiceEndPoint, {
        method: "POST",
        body: requestFormData,
        headers: {
            'Authorization': 'Bearer '+UserContext.token
        }
    }).then(response => response.json());
}
return null;
}



export async function fectEnrollmentDetailsByIds(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "fetchEnrollmentDetailsByEngagementId", "data" : '+data+'}');
    if(!isTokenValid()) 
        await regenerateToken();
    return  fetch(serviceEndPoint.enrollmentServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}



export async function fetchCenterProgramMapping(centerId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findCenterProgramMapping", "data" :[{"centerId":'+centerId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.centerProgramMapping, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function fetchProgram(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findprogram", "data" :'+data+'}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.programservice, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}



export async function fetchComponentsByProgramIdAndRoleId(programId,roleId) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "fetchByProgramIdAndRoleId", "data" :[{"programId":'+programId+',"roleId":'+roleId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.programrolecomponentmapping, {
        method: "POST",
         headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}


export async function fetchUsersByCenterIdAndRoleMapId(centerId,roleMapId) {
    if(isSessionValid()){
    let requestFormData = new FormData();  
    requestFormData.append('data', '{"token" : "", "action" : "findUsersByCenterIdAndRoleMapId", "data" : [{"centerId":'+centerId+',"roleMapId":'+roleMapId+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
   return  fetch(serviceEndPoint.userProfileServiceEndPoint,{
     method: "POST",
     headers: {
        'Authorization': 'Bearer '+UserContext.token
    }, 
     body: requestFormData,
     }).then(response => response.json());
    }
    return null;
}


export async function fetchEmployerDetails(accountStatus,typeOfRelationship) {
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data', '{"token" : "' + "1234" + '", "action" : "findByAccountStatusAndTypeOfRelationshipLike" , "data" : [{"accountStatus":"'+accountStatus+'","typeOfRelationship":"'+typeOfRelationship+'"}]}');
    return fetch(serviceEndPoint.employerservice, {
        method: "POST",
        body: formData
    }).then(response => response.json());
}
return null;
}


export async function getReports(pageNumber,pageSize,centerId,startDate,endDate,studentEngagementStatus,batchId) {
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data', '{"token" : "' + "1234" + '", "action" : "viewData" , "data" : [{"pageNumber":"'+pageNumber+'","pageSize":"'+pageSize+'","centerId":"'+centerId+'","startDate":"'+startDate+'","endDate":"'+endDate+'","studentEngagementStatus":"'+studentEngagementStatus+'","batchId":'+batchId+'}]}');
    return fetch(serviceEndPoint.reportservice, {
        method: "POST",
        body: formData
    }).then(response => response.json());
}
return null;
}


export async function downloadReports(pageNumber,pageSize,centerId,startDate,endDate,studentEngagementStatus,batchId) {
    if(isSessionValid()){
    let formData = new FormData();
    formData.append('data', '{"token" : "' + "1234" + '", "action" : "downloadExcel" , "data" : [{"pageNumber":"'+pageNumber+'","pageSize":"'+pageSize+'","centerId":"'+centerId+'","startDate":"'+startDate+'","endDate":"'+endDate+'","studentEngagementStatus":"'+studentEngagementStatus+'","batchId":'+batchId+'}]}');
    return fetch(serviceEndPoint.reportservice, {
        method: "POST",
        body: formData
    }).then(response => response.json());
}
return null;
}
