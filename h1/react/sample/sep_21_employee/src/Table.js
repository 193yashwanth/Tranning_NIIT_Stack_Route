import React, { Component, useEffect, useState } from "react";
import axios from "axios";

class Table extends Component {
  state = {
    employee: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:3001/employee")
      .then((response) => {
        this.setState({ employee: response.data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  render() {
    const { employee } = this.state;
    return (
      <div>
        <h1>Employee Table</h1>
        <table border={1}>
            <tr>
                <th>phone number</th>
                <th>employee id</th>
                <th>base location</th>
            </tr>
          {employee.map((us) => (
            <tr key={us.id}>
              <td>{us.phone_number}</td>
              <td>{us.employee_id}</td>
              <td>{us.base_location}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
export default Table;
