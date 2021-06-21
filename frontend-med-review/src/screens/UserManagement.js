import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, listUsers } from "../action/userActions";
const UserManagement = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(localStorage.getItem("profile"));
  console.log(user);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleteSuccess } = userDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete user?")) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(listUsers());
    }
  }, [dispatch, user, deleteSuccess]);
  return (
    <>
      <h1>User Management</h1>
      <div className="container m-3 p-2">
        <div className="row">
          <div className="col">
            <div
              className="table table-responsive"
              style={{
                marginLeft: "43%",
              }}
            >
              <thead>
                <tr className="table-success">
                  <th>User Name</th>
                  <th>Email Id</th>
                  <th>Is Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div className="spinner-border spinner spinner-border text-warning spinner-border-lg"></div>
                ) : (
                  <>
                    {users.map((u) => {
                      if (u.isAdmin === false) {
                        return (
                          <tr className="table-light">
                            <td>{u.firstName}</td>
                            <td>{u.email}</td>
                            <td>No</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteHandler(u._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </>
                )}
              </tbody>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
