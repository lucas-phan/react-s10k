/* @flow */

import React from "react";

import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";
import Home from './components/home/';
//import list cat
import ListCat from './components/listcat/';
//import list products
import ListProducts from './components/ListProducts';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Contact from './components/Contact';
import SideBar from './components/sidebar';
import Promotions from './components/Promotions';
import Events from './components/Events';
import Branch from './components/Branch';
import Support from './components/Support';
import CheckOrders from './components/CheckOrders';
import Setting from './components/Setting';

const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },

        Home: { screen: Home },
        ListProducts: {
            path: 'list-product/:catId',
            screen: ListProducts
        },
        ListCat: { screen: ListCat },
        ProductDetail: { screen: ProductDetail },
        Cart: { screen: Cart },
        Contact: { screen: Contact },
        Promotions: { screen: Promotions },
        Events: { screen: Events },
        Branch: { screen: Branch },
        Support: { screen: Support },
        CheckOrders: { screen: CheckOrders },
        Setting: { screen: Setting }
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    }
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
