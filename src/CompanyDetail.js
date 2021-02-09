import React, { useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import JobCard from './JobCard';
import CurrentUserContext from './CurrentUserContext';
import UserProfileContext from "./UserProfileContext";

const CompanyDetail = ({companies, jobs}) => {
  const currUser = useContext(CurrentUserContext);
  const { handle } = useParams();
  const userProfile = useContext(UserProfileContext);
  const apps = userProfile.applications;
  const company = companies.find(company => company.handle === handle)
  let companyJobs = jobs.filter(job => job.companyHandle === handle)
  return currUser ?
    <div key={handle}>
        <h4>{company.name}</h4>
        <p>{company.description}</p>
        <p>Number of Employees: {company.numEmployees}</p>
        {companyJobs.map(({ id, title, salary, equity, companyHandle }) => (
            <JobCard 
              title={title}
              salary={salary}
              equity={equity}
              key={id}
              companyHandle={companyHandle}
              applied = {apps.includes(id)}
              />
            ))}
    </div>
    :
    <Redirect to="/login" />
}

export default CompanyDetail;