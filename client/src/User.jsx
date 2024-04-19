import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001")
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="container-fluid bg-gradient">
      <div className="row justify-content-center">
        <div className="col-md-8 mt-5">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
            <center><h1>Library management system</h1></center>
            </div>
            <div className="card-body">
              <NavLink to="/create" className="btn btn-primary mb-3">
                <i className="fas fa-plus mr-2"></i>Add Book
              </NavLink>
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Book Name</th>
                    <th>Publisher Email</th>
                    <th>Book ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>
                        <Link to={`/update/${user._id}`} className="btn btn-success mr-2">
                          <i className="fas fa-edit mr-1"></i>Update
                        </Link>
                        <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                          <i className="fas fa-trash-alt mr-1"></i>Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
