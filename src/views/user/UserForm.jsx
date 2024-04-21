import React, { useState } from 'react'
import {

    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
} from "reactstrap";

function UserForm() {
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({});
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
        } else if (type === 'file') {
            const selectedFile = files[0];

            if (selectedFile) {
                // Read the selected file as a Data URL and update the state
                const reader = new FileReader();
                reader.onloadend = () => {
                    setData({
                        ...data,
                        file: selectedFile,
                        image: reader.result, // base64 string
                    });
                };
                reader.readAsDataURL(selectedFile);
            }
        } else {
            setData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
        if (!value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };
    const handleSubmit = () => {
        console.log(data);
        // if (validateForm()) {

        fetch('https://student-api.mycodelibraries.com/api/user/add', {
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
                    image: null,
                })
            })
            .catch(error => console.error('API request failed:', error));
        // }
    }
    const validateForm = () => {
        const errors = {};
        // Perform validation checks for each field
        if (!data.firstName) {
            errors.firstName = 'First Name is required';
        }
        if (!data.lastName) {
            errors.lastName = 'Last Name is required';
        }
        if (!data.age) {
            errors.age = 'age is required';
        }
        if (!data.city) {
            errors.city = 'city is required';
        }
        if (!data.hobbies) {
            errors.hobbies = 'hobbies is required';
        }
        if (!data.gender) {
            errors.gender = 'gender is required';
        }
        if (!data.image) {
            errors.image = 'image is required';
        }
        // Add more validations for other fields as needed

        setErrors(errors);
        setData({
            firstName: '',
            lastName: '',
            age: '',
            city: '',
            hobbies: [],
            gender: '',
            image: null,
        });
        setErrors({});
        return Object.keys(errors).length === 0; // Return true if there are no errors
    };

    return (
        <div>
            <Form>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup>
                            <Label for="firstName">Firstname</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                placeholder="firstName"
                                type="text"
                                onChange={handleOnChange}
                            />
                            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
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
                            {errors.age && <div className="text-danger">{errors.age}</div>}
                        </FormGroup>

                    </div>

                    <div className="col-md-6">
                        <FormGroup>
                            <Label for="lastname">LastName</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                placeholder="lastName"
                                type="text"
                                onChange={handleOnChange}
                            />
                            {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
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
                            {errors.city && <div className="text-danger">{errors.city}</div>}
                        </FormGroup>

                    </div>
                    <div className="col-md-6">
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
                            {errors.hobbies && <div className="text-danger">{errors.hobbies}</div>}
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
                            {errors.gender && <div className="text-danger">{errors.gender}</div>}
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label for="image">Profile</Label>
                        <Input id="image" name="image" type="file" onChange={handleOnChange} />
                        {data.image && (
                            <img src={data?.image} alt="Selected" style={{ maxWidth: '100px', marginTop: '10px' }} />
                        )}
                        {errors.image && <div className="text-danger">{errors.image}</div>}
                    </FormGroup>
                </div>

                <Button type='button' className="mt-2" onClick={handleSubmit}>Submit</Button>
            </Form>

        </div>
    )
}

export default UserForm