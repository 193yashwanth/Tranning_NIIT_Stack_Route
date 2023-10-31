import React from 'react'

function GetRequest() {
  return <table className="person-table">
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
}

export default GetRequest