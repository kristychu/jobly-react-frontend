import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import CurrentUserContext from './CurrentUserContext';
import UserProfileContext from "./UserProfileContext";
import './Login.css';

function Profile({confirmChanges}) {
  const currUser = useContext(CurrentUserContext);
  const userProfile = useContext(UserProfileContext);
  const INITIAL_STATE = {
    username: userProfile.username,
    firstName: userProfile.firstname,
    lastName: userProfile.lastname,
    email: userProfile.email,
    password:""
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory();

  const handleSubmit = evt => {
    evt.preventDefault();
    confirmChanges(formData, currUser);
    history.push('/')
  };

  const handleChange = evt => {
    const { name, value }= evt.target;
    setFormData(fData => ({
    ...fData,
    [name]: value
    }));
  };

  return currUser ?
      <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input plaintext name="username" value={userProfile.username} readOnly/>
        </FormGroup>
        <FormGroup>
          <Label for="firstname">First name</Label>
          <Input type="text" name="firstName" id="firstname" value={formData.firstName} onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="lastname">Last name</Label>
          <Input type="text" name="lastName" id="lastname" value={formData.lastName} onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="password">Confirm password to make changes:</Label>
          <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
        </FormGroup>
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
      </Form>
  :
    <Redirect to="/login"/>
}

export default Profile;
