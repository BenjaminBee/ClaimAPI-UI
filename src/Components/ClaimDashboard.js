import { useState, useEffect, React, useMemo } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import '../styling/main.css'
import { getID } from '../jwtDetails';

export default function ClaimDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({  
    claims : []
  });
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const jwt = localStorage.getItem("jwt")
    await fetch('/claims/getClaim', {
      method: 'POST',
      body: JSON.stringify({
        userID : getID(),
      }),
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
              <th>Vehicle Insurance Number (VIN)</th>
              <th>Insurance Number</th>
              <th>Claim Amount</th>
              <th>Claim Status</th>
            </tr>
          </thead>
          <tbody>
            {formData.claims.map(item => {
              return (
                <tr key={ item.claimID }>
                  <td>{ item.claimID }</td>
                  <td>{ item.quoteID }</td>
                  <td>{ item.vin }</td>
                  <td>{ item.insuranceNo }</td>
                  <td>{ item.claimAmount }</td>
                  <td>{ item.claimStatus }</td>
                </tr>
              );
            })}
          </tbody>
          <br></br>
          <Button className="button" href="/RegClaim" variant="dark" type="button">
            Register new Claim
          </Button>
        </Table>
      )}
    </Container>
  );
}