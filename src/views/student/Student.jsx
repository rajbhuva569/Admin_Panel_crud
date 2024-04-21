import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

    Table
} from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchStudentApi } from '../../services/fetchApi';
function Student() {
    const [data, setData] = useState([]);
    const { post_Id } = useParams();

    const fetchData = async () => {
        try {
            const result = await fetchStudentApi();
            console.log("API Response:", result);
            setData(result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();

    }, []);

    // The empty dependency array means this effect will run once when the component mounts

    console.log(data);
    const nav = useNavigate()
    const handleDelete = (_id) => {
        if (window.confirm("are you sure thid data is deleted")) {
            fetch(`https://student-api.mycodelibraries.com/api/student/delete?id=${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(data),
            })
        }
    }
    useEffect(() => {

        // handleDelete();
    }, [data]);
    return <>



        <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
                <tr>
                    <th>_id</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Hobbies</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data && data?.map(post => (
                    <tr key={post._id} className="border-top">
                        <td>
                            <div className="d-flex align-items-center p-2">
                                <img
                                    src={post.image}
                                    className="rounded-circle"
                                    alt="Profile"
                                    width="45"
                                    height="45"
                                />
                            </div>
                        </td>
                        <td>
                            <div className="ms-3">
                                <h6 className="mb-0">{post.firstName}</h6>
                                {/* <span className="text-muted">{tdata.email}</span> */}
                            </div>
                        </td>
                        <td>{post.lastName}</td>
                        {/* <td>{tdata.project}</td>
                  <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td> */}
                        <td>{post.hobbies}</td>
                        <td>{post.gender}</td>
                        <td>{post.city}</td>
                        <td>{post.age}</td>
                        <td>
                            <button onClick={() => nav(`user/userform/${post._id}`)}>
                                update
                            </button>
                            <button onClick={() => { console.log(post._id); handleDelete(post._id); }}>
                                Delete
                            </button>

                            {/* <FontAwesomeIcon icon="fad fa-edit" size="sm" style={{ "--fa-primary-color": "#1b94de", "--fa-secondary-color": "#1b94de", }} /> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table >
    </>
}

export default Student