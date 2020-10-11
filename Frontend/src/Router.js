import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LoginRoute from  './LoginRoute'
import HomeView from "./view/HomeView";
import LoginView from './view/LoginView'
import {history} from "./utils/history";
import BookView from "./view/BookView";
import ShoppingCartView from "./view/ShoppingCartView";
import OrderListView from "./view/OrderListView";
import UserProfileView from "./view/UserProfileView";
import RegisterView from "./view/RegisterView";
import AdminBookListView from "./view/AdminBookListView";
import AdminOrderListView from "./view/AdminOrderListView";
import AdminUserListView from "./view/AdminUserListView";
class BasicRoute extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={HomeView} />
                    <LoginRoute exact path="/login" component={LoginView} />
                    <Route exact path="/register" component={RegisterView}/>
                    <PrivateRoute exact path="/bookDetails" component={BookView} />
                    <PrivateRoute exact path="/ShoppingCart" component={ShoppingCartView} />
                    <PrivateRoute exact path="/OrderList" component={OrderListView} />
                    <PrivateRoute exact path="/UserProfile" component={UserProfileView} />
                    <PrivateRoute exact path="/admainBooklist"component={AdminBookListView}/>
                    <PrivateRoute exact path="/admainOrderlist"component={AdminOrderListView}/>
                    <PrivateRoute exact path="/admainUserlist"component={AdminUserListView}/>
                    <Redirect from="/*" to="/" />
                </Switch>

            </Router>
        )
    }


}

export default BasicRoute;
