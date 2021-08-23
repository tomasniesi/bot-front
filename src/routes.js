import DashboardIcon from "@material-ui/icons/Dashboard";
import Assignment from "@material-ui/icons/Assignment";
import Settings from "@material-ui/icons/Settings";
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";
import DashboardPage from "views/DashboardPage";
import OrdersPage from "views/OrdersPage";
//import NotificationsPage from "views/NotificationsPage";
import FarmConfigurationPage from "views/FarmConfigurationPage";
//import ConsolePage from "views/ConsolePage";
//import ActionsPage from "views/ActionsPage";
import JumpSimulatorPage from "views/JumpSimulatorPage";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/orders",
    name: "Ordenes",
    icon: Assignment,
    component: OrdersPage,
    layout: "/admin"
  },
  {
    path: "/farm-configuration",
    name: "Configuración de Granja",
    icon: Settings,
    component: FarmConfigurationPage,
    layout: "/admin"
  },/*
  {
    path: "/notifications",
    name: "Notificaciones",
    icon: DashboardIcon,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/console",
    name: "Consola",
    icon: DashboardIcon,
    component: ConsolePage,
    layout: "/admin"
  },
  {
    path: "/actions",
    name: "Acciones",
    icon: DashboardIcon,
    component: ActionsPage,
    layout: "/admin"
  },*/
  {
    path: "/simulator",
    name: "Simulador Saltos",
    icon: PlayCircleFilled,
    component: JumpSimulatorPage,
    layout: "/admin"
  },
];

export default dashboardRoutes;
