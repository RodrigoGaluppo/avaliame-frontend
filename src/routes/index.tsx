import React from "react"
import { Switch} from "react-router-dom"
import Route from "./Routes"
import Dashboard from "../pages/Dashboard"
import Company from "../pages/Company"
import Profile from "../pages/Profile"
import CreateReview from '../pages/CreateReview'
import UpdateReview from '../pages/UpdateReview'
import CreateCompany from '../pages/CreateCompany'
import UpdateCompany from '../pages/UpdateCompany'
import {SignIn} from "../pages/SignIn"
import {SignUp} from "../pages/SignUp"

const Routes:React.FC = ()=>(
    <Switch>
        <Route path="/" exact  component={Dashboard} ></Route>
        <Route path="/dashboard"  component={Dashboard} ></Route>
        <Route path="/signin"  component={SignIn} ></Route>
        <Route path="/signup"  component={SignUp} ></Route>
        <Route path="/add_review/:company_id" isPrivate component={CreateReview} ></Route>
        <Route path="/update_review/:review_id" isPrivate component={UpdateReview} ></Route>
        <Route path="/add_company" isPrivate component={CreateCompany} ></Route>
        <Route path="/view_company/:company_id"  component={Company} ></Route>
        <Route path="/update_company/:company_id"  component={UpdateCompany} ></Route>
        <Route path="/profile"  isPrivate component={Profile} ></Route>
    </Switch>
)

export default Routes