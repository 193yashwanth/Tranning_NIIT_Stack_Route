import React from "react";
import axios from "axios";

export default class PersonList extends React.Component {
  state = {
    persons: [],
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          const persons = res.data;
          this.setState({ persons });
    });
  }

  render() {
    return (
      <table className="person-table">
        <thead>
          <tr>
            <th>ID</th>
            <th className="username-column">Username</th>
          </tr>
        </thead>
        <tbody>
          {this.state.persons.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
