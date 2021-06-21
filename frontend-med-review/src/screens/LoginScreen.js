import { Link } from "react-router-dom";


const LoginScreen = () => {
  return (
    <div className="continer mt-5">
      <div className="row">
        <div class="card border-dark mb-3 m-auto">
          <div class="card-header">Log In</div>
          <div class="card-body">
            <form>
              <div className="col">
                <div class="form-group">
                  <label>
                    <h5>Email Address</h5>
                  </label>
                  <div>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="example@example.com"
                    ></input>
                    <small id="emailHelp" class="form-text text-muted">
                      We will never share your email with anyone else
                    </small>
                  </div>
                </div>
              </div>

              <div className="col">
                <div class="form-group">
                  <label>
                    <h5>Password</h5>
                  </label>
                  <div>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Enter a valid passowd"
                    ></input>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="row ml-3 pb-3">
            <div className="col">
              <button className="btn btn-success">Login</button>
              <p className="mt-3">
                <small>
                  Don't have an account? <Link to="/signup">Register</Link>{" "}
                  here.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginScreen;
