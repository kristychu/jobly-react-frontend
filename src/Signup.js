import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Login.css';

function Signup({signup}) {
  const INITIAL_STATE = { username:"", password:"", firstName:"", lastName:"", email:"" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory();

  const handleSubmit = evt => {
    evt.preventDefault();
    signup(formData);
    history.push('/')
  };

  const handleChange = evt => {
    const { name, value }= evt.target;
    setFormData(fData => ({
    ...fData,
    [name]: value
    }));
  };

  return (
    <Form>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input type="text" name="username" id="username" value={formData.username} onChange={handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="firstname">First name</Label>
        <Input type="text" name="firstName" id="firstname" value={formData.firstname} onChange={handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="lastname">Last name</Label>
        <Input type="text" name="lastName" id="lastname" value={formData.lastname} onChange={handleChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange}/>
      </FormGroup>
      <Button color="primary" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

export default Signup;