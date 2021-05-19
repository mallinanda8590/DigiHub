/*!

 copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

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
import DashboardPage from "../views/ChangeLeaderPage";






import DigiProfile from "../views/DigiProfile";
import Settings from "../views/Settings";
import BeneficiarySearchPage from "../views/BeneficiarySearchPage";


const PartnershipRoutes = [
  
  { 
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dashboard",
    status: false
  },
  { 
    path: "/digiProfile",
    name: "Digi-Profile",
    icon: Dashboard,
    component: DigiProfile,
    layout: "/dashboard",
    status: false
  },
  
  
  
  
 
 
 
  {
    path: "/settings",
    name: "Settings",
    icon: Store,
    component: Settings,
    layout: "/dashboard",
    status: false
  },
  {
    path: "/beneficiarySearchPage",
    name: "Beneficiary Search",
    icon: Store,
    component: BeneficiarySearchPage,
    layout: "/dashboard",
    status: true
  }
  // {
  //   path: "/contact",
  //   name: "Contact US",
  //   icon: Store,
  //   component: Contact,
  //   layout: "/dashboard",
  //   status: false
  // },
  // {
  //   path: "/contact",
  //   name: "Contact",
  //   icon: Store,
  //   component: Contact,
  //   layout: "/dashboard",
  //   status: false
  // }

];

export default PartnershipRoutes;
