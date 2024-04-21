import React, { useState } from 'react'
import {

    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
} from "reactstrap";

function StudentForm() {
    const [data, setData] = useState({})

    const handleOnChange = (event) => {
        const { name, type, value, checked, files } = event.target;

        if (type === 'checkbox') {
            let hobby = data?.[name]?.length ? [...data[name]] : [];

            if (checked) {
                hobby.push(value);
            } else {
                hobby = hobby.filter((item) => item !== value);
            }

            setData({ ...data, [name]: hobby });

        } else {
            setData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleSubmit = () => {
        console.log(data);

        fetch('https://student-api.mycodelibraries.com/api/student/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                setData({
                    Firstname: '',
                    lastname: '',
                    age: '',
                    city: '',
                    hobbies: [],
                    gender: '',

                })
            })
            .catch(error => console.error('API request failed:', error));
    }
    return (
        <div>
            <Form>
                <FormGroup>
                    <Label for="firstName">Firstname</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        placeholder="firstName"
                        type="text"
                        onChange={handleOnChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="lastname">LastName</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        placeholder="lastName"
                        type="text"
                        onChange={handleOnChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="age">Age</Label>
                    <Input
                        id="age"
                        name="age"
                        placeholder="age"
                        type="number"
                        onChange={handleOnChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                        id="city"
                        name="city"
                        placeholder="city"
                        type="text"
                        onChange={handleOnChange}
                    />
                </FormGroup>


                <FormGroup tag="fieldset">
                    <Label for="hobbies">Hobbies:</Label>
                    <FormGroup check>
                        <Input name="hobbies" type="checkbox" onChange={handleOnChange} value={'cricket'} />{" "}
                        <Label check className="form-label">
                            cricket
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input name="hobbies" type="checkbox" onChange={handleOnChange} value={'football'} />{" "}
                        <Label check>football</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input name="hobbies" type="checkbox" onChange={handleOnChange} value={'vollyball'} />{" "}
                        <Label check className="form-label">
                            vollyball
                        </Label>
                    </FormGroup>


                </FormGroup>

                <FormGroup tag="fieldset">
                    <span>Gender:</span>
                    <FormGroup check>
                        <Input name="gender" type="radio" onChange={handleOnChange} value={'male'} />{" "}
                        <Label check className="form-label">
                            male
                        </Label>
                    </FormGroup>
                    <FormGroup check >
                        <Input name="gender" type="radio" onChange={handleOnChange} value={'male'} />{"fe-male"}
                        <Label check>fe-male</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input name="gender" type="radio" onChange={handleOnChange} value={'male'} />{"other"}
                        <Label check className="form-label">
                            other
                        </Label>
                    </FormGroup>
                </FormGroup>


                <Button type='button' className="mt-2" onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    )
}

export default StudentForm