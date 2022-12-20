import { useState, useEffect, React, useMemo } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import '../styling/main.css'

export default function AdminClaims() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({  
    claims : []
  });
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const jwt = localStorage.getItem("jwt")
    await fetch('/claims/getClaims', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${jwt}`,
     },
    })
       .then((response) => response.json())
       .then((data) => {
          formData.claims = data;
          console.log(formData.claims);
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

   function handleStatus(event) {
    console.log(event.target.value);
    console.log(event.target.getAttribute('claimID'));
    changeStatus(event);
  }

  const changeStatus = async (event) => {
    const jwt = localStorage.getItem("jwt")
    await fetch('/claims/updateClaim', {
       method: 'PATCH',
       body: JSON.stringify({
          decision : event.target.value,
          claimID : event.target.getAttribute('claimID'),
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${jwt}`,
       },
    })
       .then((response) => response.json())
       .then((response) => {
          if(response.ok) {
            console.log("Updated Successfully");
          }
          else {
            console.log("Updated unsuccessfully")
          }
       })
       .catch((err) => {
          console.log(err.message);
       });
 };

  return (
    <Container className="box-container">
      {loading ? (
        <p>Loading, Please wait...</p>
      ) : (
        <Table className="claimsTable" bordered hover size="sm" variant="light">
          <thead>
            <tr>
              <th>ClaimID</th>
              <th>QuoteID</th>
              <th>UserID</th>
              <th>Vehicle Insurance Number (VIN)</th>
              <th>Insurance Number</th>
              <th>Claim Amount</th>
              <th>Claim Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {formData.claims.map(item => {
              return (
                <tr key={ item.claimID }>
                  <td>{ item.claimID }</td>
                  <td>{ item.quoteID }</td>
                  <td>{ item.userID }</td>
                  <td>{ item.vin }</td>
                  <td>{ item.insuranceNo }</td>
                  <td>{ item.claimAmount }</td>
                  <td>{ item.claimStatus }</td>
                  <td className="approveDenyCol">
                    <button type="submit" claimID={item.claimID} value={true} onClick={(event) => handleStatus(event, "value")} className="btn btn-success">Approve</button>
                    <button type="submit" claimID={item.claimID} value={false} onClick={(event) => handleStatus(event, "value")} className="btn btn-danger">Deny</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}