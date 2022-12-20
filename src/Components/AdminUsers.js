import { useState, useEffect, React, useMemo } from 'react';
import { Container, Table } from 'react-bootstrap';
import '../styling/main.css'

export default function AdminUsers() {
  const [formData, setFormData] = useState({  
    users : []
  });
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const jwt = localStorage.getItem("jwt")
    await fetch('/user/getUsers', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${jwt}`,
     },
    })
       .then((response) => response.json())
       .then((data) => {
          formData.users = data;
          console.log(formData.users);
       })
       .catch((err) => {
          console.log(err.message);
       });
       setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getData();
   }, []);

  return (
    <Container className="box-container">
      {loading ? (
        <p>Loading, Please wait...</p>
      ) : (
        <Table className="userTable" bordered hover size="sm" variant="light">
          <thead>
            <tr>
              <th>UserID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {formData.users.map(item => {
              return (
                <tr key={item.userID}>
                  <td>{ item.userID }</td>
                  <td>{ item.username }</td>
                  <td>{ item.email }</td>
                  <td>{ item.rolePrivilege }</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}