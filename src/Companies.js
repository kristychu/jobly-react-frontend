import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CompanyCard from "./CompanyCard";
import SearchBox from './SearchBox';
import CurrentUserContext from './CurrentUserContext';

function CompanyList({companies, searchCompanies}) {
    const currUser = useContext(CurrentUserContext);
    return currUser ?
        <div className="companies">
            <SearchBox search={searchCompanies}/>
            {companies.length > 0 ?
            companies.map(({handle, name, description }) => (
                <Link to={`/companies/${handle}`} key={handle}>
                    <CompanyCard 
                    key={handle} 
                    name={name} 
                    description={description} 
                /></Link>
            )) :
            <p>Sorry, no results were found!</p>}
        </div>
        :
        <Redirect to="/login" />
    }

export default CompanyList;