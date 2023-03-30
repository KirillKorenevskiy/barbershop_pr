import AboutUs from "./pages/AboutUs"
import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import MasterPage from "./pages/MasterPage"
import Shop from "./pages/Shop"
import { ADMIN_ROUTE, BASKET_ROUTE, MASTER_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ABOUTUS_ROUTE } from "./utils/consts"

export const authRoutes = [
{
    path: BASKET_ROUTE,
    Component: Basket
},
]
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MASTER_ROUTE,
        Component: MasterPage
    },
    {
        path: ABOUTUS_ROUTE ,
        Component: AboutUs
    },
]