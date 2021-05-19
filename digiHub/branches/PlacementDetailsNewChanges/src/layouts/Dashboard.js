import React, { Component,useEffect, useState } from 'react';

import { Switch, Route, Redirect } from "react-router-dom";
import './../App.css';
import './../assets/css/login-style.css'
import './../assets/css/font-awesome.min.css'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

//import styles from "./adminStyle.js";
import styles from "./adminStyle.js";
import Navbar from "./../components/Navbars/Navbar.js";
import Sidebar from "./../components/Sidebar/Sidebar.js";
import Footer from "./../components/Footer/Footer.js";
import UserContext from './../components/GolbalContext'

import logo from "./../assets/images/tatastrivelogo.png";
import stanadrdroutes from "./../routes.js";
import principalroutes from "./../routes/principalroutes.js";
import changeleaderroutes from "./../routes/changeleaderroutes.js";
import assessorRoutes from "./../routes/assessorRoutes.js";
import nanoUniconRoutes from "./../routes/nanoUniconRoutes.js";
import corporateAdminRoutes from "./../routes/corporateAdminRoutes";
import {isSessionValid,clearAppData} from './../util/session.js';
import ContactUs from "./../components/Footer/ContactUs.js";
import Disclaimer from "./../components/Footer/Disclaimer.js";
import PrivacyPolicy from "./../components/Footer/PrivacyPolicy.js";
import ReactGA from 'react-ga';
import centerOpsRoutes from "./../routes/centerOpsRoutes.js";
import mobilizerRoutes from "./../routes/mobilizer.js";


const useStyles = makeStyles(styles);
let ps;




export default function Admin({ ...rest }) {

  
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
ReactGA.set({
  userId: UserContext.userid
  // any data that is relevant to the user session
  // that you would like to track with google analytics
})
ReactGA.pageview(window.location.pathname + window.location.search);


  const [routes, setRoutes] = useState(stanadrdroutes);
  const [loaded, setLoaded] = useState(true);

  const  sessionValidity = (props)=>{
   isSessionValid();
}

sessionValidity();


 if(UserContext.roleName === 'Principal' && (loaded || UserContext.defaultRoleId)){
  UserContext.defaultRoleId="";
    setRoutes( principalroutes);
    setLoaded(false);
  } 
else if(UserContext.roleName === 'Change leader/Facilitator' && (loaded || UserContext.defaultRoleId)){
  UserContext.defaultRoleId="";
    setRoutes(changeleaderroutes);
    setLoaded(false);

  } else if(UserContext.roleName === 'Center Manager' && (loaded || UserContext.defaultRoleId) ){
    if(UserContext.centerId == 760)
    {
    UserContext.defaultRoleId="";
   setRoutes(nanoUniconRoutes);
   setLoaded(false);
    }
    else{
    UserContext.defaultRoleId="";
       setRoutes(assessorRoutes);
       setLoaded(false);
    }
    
      
     } 

  
  else if(UserContext.roleName === 'Corporate Admin' && (loaded || UserContext.defaultRoleId)){
    UserContext.defaultRoleId="";
    setRoutes(corporateAdminRoutes);
    setLoaded(false);
  }
  
  else if(UserContext.roleName === 'Center Ops' && (loaded || UserContext.defaultRoleId)){
    UserContext.defaultRoleId="";
    setRoutes(centerOpsRoutes);
    setLoaded(false);
  }
  
  else if(UserContext.roleid === 19 && (loaded || UserContext.defaultRoleId)){
    UserContext.defaultRoleId="";
    setRoutes(mobilizerRoutes);
    setLoaded(false);
  }
  


  
  
  let displayRoutes1 = [];
  let count=0;
  let displayRoutes = (
        routes.map((prop)=>{ 
        if (prop.status) {
          displayRoutes1[count]=prop;
          count++;
        }
      }) 
  );

  let switchRoutes = (
      <Switch>
        {routes.map((prop, key) => {
          if (prop.layout === "/dashboard") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          }
          return null;
        })}

        <Route  path="/dashboard/ContactUs">
            <ContactUs />
        </Route>
        <Route  path="/dashboard/Disclaimer">
            <Disclaimer />
        </Route>
        <Route  path="/dashboard/privacypolicy">
            <PrivacyPolicy />
        </Route>
        <Redirect from="/dashboard" to="/dashboard/dashboard" />
      </Switch>
    );
    



    // styles
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    // states and functions

    const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
    };
    const resizeFunction = () => {
    if (window.innerWidth >= 960) {
        setMobileOpen(false);
    }
    };

// initialize and destroy the PerfectScrollbar plugin
React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

    
    return (
      
        <div className={classes.wrapper} id="popupContainer">
            <Sidebar
                handleDrawerToggle={handleDrawerToggle}    
                logo={logo}
                logoText={""}
                routes={displayRoutes1}
                open={mobileOpen}        
                {...rest}
            />
        
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />
                
                <div className={classes.content} >  
                    <div className={classes.container}>{switchRoutes}</div>                    
                </div>
                
                <Footer /> 
                
            </div>
        

           

        </div>
        
        


    );
    





}

