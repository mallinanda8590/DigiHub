import { Component } from 'react';
// create context provider and consumer
class UserContext extends Component {

}

UserContext.propTypes = {
    userid: "",
    firstName:"",
    lastName:"",
    roleid:"",
    roleName:"",
    centerId:"",
    centerName:"",
    dbUserId:"",
    token:"",
    userName:"",
    defaultRoleId:"",
    sessionTime:"",
    refreshToken:"",
    secretKey : "",
    programId:"",
    programName:"",
    defaultProgramId:"",
    assessmentCenterId:""
  };

export default UserContext;