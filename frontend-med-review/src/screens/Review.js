import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReview } from "../action/reviewActions";
const Review = ({ match, history }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(localStorage.getItem("profile"));

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const reviewDetails = useSelector((state) => state.review);
  const {
    loading: reviewLoading,
    success: reviewSuccess,
    error: reviewError,
  } = reviewDetails;

  useEffect(() => {
    if (reviewSuccess) {
      alert("Review posted successfully.. Redirecting to home page");
      history.push("/");
    }
  }, [match, dispatch, reviewSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    const review = { comment: comment, rating: rating };
    console.log(JSON.stringify(review));
    dispatch(
      submitReview({ comment: comment, rating: rating }, match.params.id)
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <form
            className="card text-black bg-light p-3 mb-3"
            onSubmit={submitHandler}
          >
            <fieldset>
              <legend>Dear user, Your review is important to us.. </legend>
              <br />
              <div>
                <textarea
                  name="review"
                  className="form-group w-75"
                  id="review"
                  rows="10"
                  placeholder="Your opinion about the drug goes here"
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
            </fieldset>
            <fieldset className="form-group">
              <label> Was it prescribed by a doctor to you?</label>
              <div class="form-check">
                <input type="checkbox" name="yes" id="yes" />
                <span className="ml-2">Yes</span>
              </div>
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="rating">Choose your rating</label>
              <select
                className="form-control w-25"
                name="rating"
                id="rating"
                onChange={(e) => setRating(parseInt(e.target.value))}
                required
              >
                <option value="">Choose the rating</option>
                <option value="1">1 / 5</option>
                <option value="2">2 / 5</option>
                <option value="3">3 / 5</option>
                <option value="4">4 / 5</option>
                <option value="5">5 / 5</option>
              </select>
            </fieldset>

            <fieldset className="form-group">
              <button type="submit" class="btn btn-success" id="submit">
                Post your review
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
