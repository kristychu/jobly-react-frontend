import React, { useContext } from "react";
import { Card, CardBody, Button } from "reactstrap";
import UserProfileContext from "./UserProfileContext";

const JobCard = ({ id, title, equity, salary, companyHandle, companies, apply, applied }) => {
  const userProfile = useContext(UserProfileContext);
  const username = userProfile.username;
    const token = localStorage.getItem("token");
    const handleApply = evt => {
      evt.preventDefault();
      apply(username, id, token)
    }
  if(companies){
    const company = companies.find(company => company.handle === companyHandle);
    return (
      <Card>
        <CardBody>
            <h3>{title}</h3>
            <p>Company: {company.name}</p>
            <p>Salary: {Number(salary).toLocaleString()}</p>
            <p>Equity: {equity}</p>
            {applied ? <Button color="success" disabled>APPLIED</Button>:
            <Button color="danger" onClick={handleApply}>APPLY</Button>}
          </CardBody>
      </Card>
    )
  } else {
    return(
    <Card>
        <CardBody>
          <h3>{title}</h3>
          <p>Salary: {Number(salary).toLocaleString()}</p>
          <p>Equity: {equity}</p>
          {applied ? <Button color="success" disabled>APPLIED</Button>:
            <Button color="danger" onClick={handleApply}>APPLY</Button>}
        </CardBody>
    </Card>
    )
  }
}

export default JobCard;