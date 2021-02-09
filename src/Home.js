import React, {useContext} from "react";
import CurrentUserContext from './CurrentUserContext';

function Home() {
  const currUser = useContext(CurrentUserContext);
  return currUser ?
      <h3>Welcome back!</h3> :
      <div>
        <h2>Welcome to Jobly</h2>
        <p>All the jobs in one, convenient place.</p>
      </div>
}

export default Home;
