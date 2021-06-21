import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

function UserProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <div>
      {user ? (
        <>
          <div className="jumbotron m-5 p-4">
            <div>
              <h4>username : {user.result.firstName}</h4>
            </div>
            <div>
              <h4>email : {user.result.email}</h4>
            </div>
          </div>
        </>
      ) : (
        <div className="jumbotron m-5 p-4">
          <h3>You have to login to see you're user profile.</h3>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
