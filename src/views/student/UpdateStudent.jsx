import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {

    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
} from "reactstrap";
function UpdateUserFrom() {
    const [postdata, setPostdata] = useState([]);
    const { post_Id } = useParams();

    const [data, setData] = useState({});

    const fetchApi = () => {
        if (post_Id) {
            fetch(`https://student-api.mycodelibraries.com/api/student/update/${post_Id}`)
                .then(response => {
                    console.log(response); // Log the entire response
                    return response.json();
                })
                .then(json => setData(json))
                .catch(error => console.error(error));
        }
    };


    useEffect(() => {
        fetchApi();
    }, [post_Id]);
    // console.log(data.data);
    const nav = useNavigate()
    // if (Object.keys(data).length === 0) {
    //     return <div>Loading...</div>;
    // }
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
    };
    const handleSubmit = () => {
        console.log(data);

        fetch(`https://student-api.mycodelibraries.com/api/student/update/${post_Id}`, {
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
        console.log(post_Id);
    }
    return <>
        <div>UpdateUserFrom</div>
        <Form>
            <FormGroup>
                <Label for="firstName">Firstname</Label>
                <Input
                    id="firstName"
                    name="firstName"
                    placeholder="firstName"
                    type="text"
                    onChange={handleOnChange}
                    value={postdata.firstName}
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
                    value={data.lastName}
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
    </>
}

export default UpdateUserFrom