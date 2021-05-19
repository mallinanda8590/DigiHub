/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";

// core components/views for Admin layout
import DashboardPage from "./views/DashboardPage.js";
import CourseManagement from "./views/course/CourseManagement.js";
import UpdateCourse from "./views/course/UpdateCourse.js";
import CreateCourse from "./views/course/CreateCourse.js";



const dashboardRoutes = [
  
  { 
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dashboard",
    status: true
  },
  { 
    path: "/coursemanagement",
    name: "Course Management",
    icon: Dashboard,
    component: CourseManagement,
    layout: "/dashboard",
    status: true
  },
  { 
    path: "/updatecourse",
    name: "Update Course Details",
    icon: Dashboard,
    component: UpdateCourse,
    layout: "/dashboard",
    status: false
  },
  { 
    path: "/createcourse",
    name: "Create Course",
    icon: Dashboard,
    component: CreateCourse,
    layout: "/dashboard",
    status: false
  }



];
export default dashboardRoutes;