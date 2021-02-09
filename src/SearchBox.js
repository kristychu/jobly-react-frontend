import React, {useState} from "react";
import { Form, FormGroup, Button, Input } from "reactstrap";
import './SearchBox.css';

function SearchBox({search}) {
    const [formData, setFormData] = useState("");

    const handleSubmit = evt => {
        evt.preventDefault();
        search(formData);
    };

    const handleChange = e => {
        setFormData(e.target.value);
    };

    /** render form */

    return (
        <Form className="search-box">
            <FormGroup className="input-group">
                <Input className="form-control width100"
                    id="search"
                    name="name"
                    type="text"
                    placeholder="Enter search term.."
                    value={formData.term}
                    onChange={handleChange}
                />
                <span className="input-group-btn">
                <Button color="primary" onClick={handleSubmit}>Submit</Button>
                </span>
            </FormGroup>
        </Form>
    );
}

export default SearchBox;