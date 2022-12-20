import { useState, useEffect, React, useMemo } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import '../styling/main.css'
import { getID } from '../jwtDetails';

export default function VehicleDashboard() {
  const [formData, setFormData] = useState({  
    vehicles : []
  });
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const jwt = localStorage.getItem("jwt")
    await fetch('/vehicle/getVehicle', {
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
          formData.vehicles = data;
          console.log(formData.vehicles);
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
        <Table className="vehicleTable" bordered hover size="sm" variant="light">
          <thead>
            <tr>
              <th>VehicleID</th>
              <th>Car Registration(CR)</th>
              <th>Make</th>
              <th>Model</th>
              <th>Age</th>
              <th>Value</th>
              <th>Year of Registration(YoR)</th>
            </tr>
          </thead>
          <tbody>
            {formData.vehicles.map(item => {
              return (
                <tr key={item.vehicleID}>
                  <td>{ item.vehicleID }</td>
                  <td>{ item.carReg }</td>
                  <td>{ item.make }</td>
                  <td>{ item.model }</td>
                  <td>{ item.age }</td>
                  <td>{ item.value }</td>
                  <td>{ item.yearOfRegistration }</td>
                </tr>
              );
            })}
          </tbody>
          <br></br>
          <Button className="button" href="/RegVehicle" variant="dark" type="button">
            Register new Vehicle
          </Button>
        </Table>
      )}
    </Container>
  );
}