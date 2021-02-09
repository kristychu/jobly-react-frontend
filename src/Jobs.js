import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import JobCard from './JobCard';
import SearchBox from './SearchBox';
import CurrentUserContext from './CurrentUserContext';
import UserProfileContext from "./UserProfileContext";

function JobsList({jobs, companies, searchJobs, apply}) {
    const currUser = useContext(CurrentUserContext);
    const userProfile = useContext(UserProfileContext);
    const apps = userProfile.applications;
    return currUser ?
        <div className="jobs">
            <SearchBox search={searchJobs}/>
            {jobs.length > 0 ?
            jobs.map(({ id, title, salary, equity, companyHandle }) => (
                <JobCard
                    id={id}
                    title={title}
                    salary={salary}
                    equity={equity}
                    key={id}
                    companyHandle={companyHandle}
                    companies={companies}
                    applied = {apps.includes(id)}
                    apply={apply}/>
            ))
            :
            <p>Sorry, no results were found!</p>}
        </div>
        :
        <Redirect to="/login" />
    }

export default JobsList;