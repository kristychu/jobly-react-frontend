import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import CompanyList from './Companies';
import CompanyDetail from './CompanyDetail';
import Jobs from './Jobs';
import Login from './Login';
import Signup from './Signup';
import Profile from './EditProfile';
import Nav from './Nav';
import Home from './Home';
import JoblyApi from "./api";
import CurrentUserContext from './CurrentUserContext';
import UserProfileContext from './UserProfileContext';

function Routes() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const [userProfile, setUserProfile] = useState({});
  
  /** User Methods: Signup, Login, Logout, Apply to a Job */
  const signup = ({username, password, firstName, lastName, email}) => {
    async function signup(){
      let result = await JoblyApi.signup({username, password, firstName, lastName, email});
      setToken(result.token);
      localStorage.clear();
      localStorage.setItem("token", result.token);
      getUserProfile(username, result.token)
    }
      signup();
  }

  const login = ({username, password}) => {
    async function login(){
      let result = await JoblyApi.login({username, password});
      setToken(result.token);
      localStorage.clear();
      localStorage.setItem("token", result.token);
      getUserProfile(username, result.token)
    }
    login();
  }

  const logout = () => {
    setCurrentUser("");
    localStorage.clear();
  }

  const apply = (username, jobId, token) => {
    async function apply(){
      await JoblyApi.apply(username, jobId, token);
      getUserProfile(username, token)
    }
    apply();
    
  }

  /** User Profile Methods: Get user info, confirm profile changes */
  const getUserProfile = (username, token) => {
    async function getUser(){
      let result = await JoblyApi.getUser(username, token);
      setUserProfile({
        username: result.username,
        firstname: result.firstName,
        lastname: result.lastName,
        email: result.email,
        applications: result.applications
      });
    }
    getUser();
  }

  const confirmChanges = ({username, password, firstName, lastName, email}, token) => {
    async function confirmChanges(){
      let result = await JoblyApi.profileChanges({username, password, firstName, lastName, email}, token);
      getUserProfile(result.username, token)
    }
    confirmChanges();
  }
  
  /** Filter Companies */
  const searchCompanies = (term) => {
      async function searchCompanies(){
          let result = await JoblyApi.getCompanies(term);
          setCompanies(result);
      }
      searchCompanies();
  }

  /** Filter Jobs */
  const searchJobs = (term) => {
    async function searchJobs(){
        let result = await JoblyApi.getJobs(term);
        setJobs(result);
    }
    searchJobs();
}

  /** useEffect: Current user token, API Calls: Companies and Jobs */

  useEffect(() => {
    setCurrentUser(localStorage.getItem("token"));
  }, [token])

  useEffect(() => {
      async function getCompanies() {
          let result = await JoblyApi.getCompanies();
          setCompanies(result);
      }
          getCompanies();
  }, []);

  useEffect(() => {
    async function getJobs() {
        let result = await JoblyApi.getJobs();
        setJobs(result);
    }
        getJobs();
  }, []);

  return (
    <div className="Routes">
      <CurrentUserContext.Provider value={currentUser}>
      <UserProfileContext.Provider value={userProfile}>
        <Nav logout={logout}/>
          <main>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/companies">
                <CompanyList companies={companies} searchCompanies={searchCompanies}/>
              </Route>
              <Route path="/companies/:handle">
                <CompanyDetail companies={companies} jobs={jobs} apply={apply}/>
              </Route>
              <Route exact path="/jobs">
                <Jobs jobs={jobs} companies={companies} searchJobs={searchJobs} apply={apply}/>
              </Route>
              <Route path="/login">
                <Login login={login}/>
              </Route>
              <Route exact path="/signup">
                <Signup signup={signup}/>
              </Route>
              <Route exact path="/profile">
                <Profile confirmChanges={confirmChanges}/>
              </Route>
              <Route exact path="/logout">
                <Home/>
              </Route>
              <Route>
                <p>Hmmm. I can't seem to find what you want.</p>
              </Route>
            </Switch>
          </main>
        </UserProfileContext.Provider>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default Routes;