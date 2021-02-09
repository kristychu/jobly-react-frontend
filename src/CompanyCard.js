import React from "react";
import './CompanyCard.css';

const CompanyCard = ({ handle, name, description }) => {
  return (
    <div className="company-card" key={handle}>
        <h4>{name}</h4>
        <p>{description}</p>
    </div>
  )

}

export default CompanyCard;