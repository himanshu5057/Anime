import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./SignMethod";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

function AnimeNewPage(props) {
  const [e, setData] = useState(props.location.state);
  console.log(props);
  const [allReviews, setReviews] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [rev, setRev] = useState(0);
  const [review, setReview] = useState("");
  const onClick = async () => {
    let url = "http://localhost:8080/anime/getReviews";
    let res = await axios.post(`${url}`, {
      anime_id: e.id,
    });
    if (res != null) {
      setReviews(res.data.review);
    }
    setShowReview(true);
  };
  const addReview = async () => {
    let url = "http://localhost:8080/anime/addReview";
    console.log(e.id);
    let username = localStorage.getItem("username");
    console.log(username);
    let body = {
      username: username,
      rating: rev,
      comment: review,
      anime_id: e.id.toString(),
    };
    let res = await axios.post(`${url}`, body);
    let reviews = allReviews;
    if (res.data != null || res.status == 200) {
      reviews.push(body);
      setReviews(reviews);
      console.log(allReviews);
    }
    setReview("");
    setRev(0);
    console.log(res);
  };
  useEffect(() => {addReview()}, [allReviews]);
  return (
    <div className="animeNewPage">
      <div className="description">
        <h1>{props.location.state.titles.en}</h1>
        <img
          src={props.location.state.banner_image}
          height="50%"
          width="90%"
          style={{ alignText: "center" }}
        ></img>
        <div>{props.location.state.descriptions.en}</div>

        <div>
          Genres:{"  "} {e.genres.join(", ")}
        </div>
        <div>
          Trailer Link:{" "}
          {e.trailer_url ? (
            <Link href={e.trailer_url} target="_blank">
              Link
            </Link>
          ) : (
            "NA"
          )}
        </div>
        <div>
          Start Date: {e.start_date.substring(0, 10)}
          {" | "} End Date: {e.end_date.substring(0, 10)}
        </div>
        <div>
          Season Year: {e.season_year} {" | "} Episodes: {e.episodes_count}
        </div>
      </div>
      <div className="reviews">
        {showReview == false ? (
          <Button
            // className={classes.margin}
            size="large"
            variant="contained"
            color="primary"
            onClick={onClick}
          >
            Show Reviews
          </Button>
        ) : (
          <div className="all-add-review">
            <div className="addReview">
              <TextField
                id="Review"
                label="Review"
                variant="outlined"
                value={review}
                fullWidth
                onChange={(e) => {
                  let val = e.target.value;
                  val = val.trim();
                  //   val = val.replace(" ", "%20");
                  setReview(val);
                }}
              />
              <div>
                <span
                  class={`fa fa-star  ${rev >= 1 ? "checked" : ""}`}
                  onClick={() => {
                    setRev(1);
                  }}
                ></span>
                <span
                  class={`fa fa-star  ${rev >= 2 ? "checked" : ""}`}
                  onClick={() => {
                    setRev(2);
                  }}
                ></span>
                <span
                  class={`fa fa-star  ${rev >= 3 ? "checked" : ""}`}
                  onClick={() => {
                    setRev(3);
                  }}
                ></span>
                <span
                  class={`fa fa-star  ${rev >= 4 ? "checked" : ""}`}
                  onClick={() => {
                    setRev(4);
                  }}
                ></span>
                <span
                  class={`fa fa-star  ${rev >= 5 ? "checked" : ""}`}
                  onClick={() => {
                    setRev(5);
                  }}
                ></span>
              </div>
              <Button
                // className={classes.margin}
                size="large"
                variant="contained"
                color="primary"
                onClick={addReview}
              >
                Add
              </Button>
            </div>
            <div className="allReviews">
              <table>
                <tr>
                  <th>Username</th>
                  <th>Comment</th>
                  <th>Rating</th>
                </tr>
                {allReviews == null || allReviews.length == 0 ? (
                  <div>No reviews found</div>
                ) : (
                  allReviews.map((data) => {
                    return (
                      <tr>
                        <td>{data.username}</td>
                        <td>{data.comment}</td>
                        <td>{data.rating}</td>
                      </tr>
                    );
                  })
                )}
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AnimeNewPage;
