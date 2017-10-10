import React from 'react';
import { DrawerNavigator } from 'react-navigation';

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
import PromotionDetail from './components/PromotionDetail';
import Events from './components/Events';
import EventDetail from './components/EventDetail';
import Branch from './components/Branch';
import Support from './components/Support';
import CheckOrders from './components/CheckOrders';
import Setting from './components/Setting';
const DrawerExample = DrawerNavigator(
  {
    Home: { screen: Home },
    ListProducts: {screen: ListProducts},
    ListCat: { screen: ListCat },
    ProductDetail: { screen: ProductDetail },
    Cart: { screen: Cart },
    Contact: { screen: Contact },
    Promotions: { screen: Promotions },
    PromotionDetail: { screen: PromotionDetail},
    Events: { screen: Events },
    EventDetail: { screen: EventDetail },
    Branch: { screen: Branch },
    Support: { screen: Support },
    CheckOrders: { screen: CheckOrders },
    Setting: { screen: Setting }
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63',

    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
