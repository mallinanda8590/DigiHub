import { serviceEndPoint } from './../util/serviceEndPoint';
import UserContext from './../components/GolbalContext'
import {isSessionValid, isTokenValid} from './../util/session.js';
import { regenerateToken } from './validation';




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





export async function fetchAllCourseDetails() {
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


export async function fetchCourseDetails(id) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "findcourse", "data" : [{"id":'+id+'}]}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.courseServiceEndPoint, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}

export async function updateCourseDetails(data) {
    if(isSessionValid()){
    let requestFormData = new FormData();
    requestFormData.append('data', '{"token" : "", "action" : "update", "data" : ['+data+']}');
    if(!isTokenValid()) 
        await regenerateToken();
     return fetch(serviceEndPoint.courseServiceEndPoint, {
        method: "POST",
        body: requestFormData,
    }).then(response => response.json());
}
return null;
}