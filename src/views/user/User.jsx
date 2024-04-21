import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table } from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Import useDispatch
// import { deleteUserAction } from '../../redux/actions'; // Import your Redux action

function User() {
  const [data, setData] = useState([]);
  const { post_Id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function

  const fetchData = async () => {
    try {
      const result = await axios.get('https://student-api.mycodelibraries.com/api/user');
      console.log("API Response:", result.data);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure this data will be deleted?")) {
      try {
        await axios.delete(`https://student-api.mycodelibraries.com/api/user/delete?id=${_id}`);
        // Instead of calling fetchData, dispatch an action
        // dispatch(deleteUserAction(_id));
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button onClick={() => nav('/userform')}>Add User</button>

      <Table className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
          {/* ... Your table header code ... */}
        </thead>
        <tbody>
          {data && data.map(post => (
            <tr key={post._id} className="border-top">
              {/* ... Your table body code ... */}
              <td>
                <Button className="btn" color="danger" onClick={() => handleDelete(post._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default User;
