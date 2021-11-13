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
import dotenv from "dotenv"

import { useHistory } from "react-router-dom";
import AnimeNewPage from "./AnimeNewPage.js";
dotenv.config();
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },

  logout: {
    position: "absolute",
    right: "20px",
    top: "10px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },

  searchBar: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    justifyContent: "center",
  },
  sizedBox: {
    width: "20px",
    height: "20px",
  },
  cover: {
    width: 151,
  },
}));

function Anime() {
  const history = useHistory();
  const classes = useStyles();
  const { currentUser, logout } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorText, setErrorText] = useState("");
  const [anime, setAnime] = useState([]);
 

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("anime") != null)
      setAnime(JSON.parse(localStorage.getItem("anime")));
  }, []);
  const onClick = async () => {
    let url = "https://api.aniapi.com/v1/anime";
    let addOn = "";
    if (title == "" && genre == "") {
    } else if (title != "" && genre != "") {
      addOn = addOn + `?title=${title}&genres=${genre}`;
    } else if (title != "") {
      addOn = addOn + `?title=${title}`;
    } else if (genre != "") {
      addOn = addOn + `?genres=${genre}`;
    }
    let res;
    if (title.length != 0 || genre.length != 0) {
      res = await axios.get(`${url}${addOn}`);
    } else if (res == null) {
      setError("Please enter Title or Genre for better result");
    }
    // console.log(res.data);
    // console.log(res.data.data.documents.length);
    else if (res.data.status_code == 404) {
      res =
        "No data found for your search, Please edit title or genre for better result";
    }
    if (res != null && typeof res != "string" && res.data.status_code == 200) {
      setError("");
      // let obj={id,rating};
      let ids=[];
      let promises=[];const url = process.env.REACT_APP_SERVER_URL;

      for (let x = 0; x < res.data.data.documents.length; x++) {
          promises.push(axios.post(
            `${url}/anime/getReviews`,
            { anime_id: res.data.data.documents[x].id.toString() }
            ).then((response)=>{
              ids.push({...res.data.data.documents[x], rating:response.data.rating});
            }).catch((error)=>console.log("Error occured"))
            )
          // console.log(response.data);
          // console.log(x);
        }
        await Promise.allSettled(promises);
        setAnime(ids);
      // console.log(res.data.data.documents);
      console.log(0);
      console.log(ids[0]);
      localStorage.setItem("anime", JSON.stringify(ids));
    }
  };
  const goToAnimeDesc = (e) => {
    // console.log("redirect");
    <div>
      <AnimeNewPage data={e}></AnimeNewPage>
    </div>;
  };


  const Rating = ({ value, text, color }) => {
    return (
      <div className="rating">
        <span>
          <i
            style={{ color }}
            className={
              value >= 1
                ? "fas fa-star"
                : value >= 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 2
                ? "fas fa-star"
                : value >= 1.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 3
                ? "fas fa-star"
                : value >= 2.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 4
                ? "fas fa-star"
                : value >= 3.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 5
                ? "fas fa-star"
                : value >= 4.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        {/* <span>{text && text}</span> */}
      </div>
    );
  };






  return (
    <div className="main">
      <div className="searchBar">
        <form className="form">
          <TextField
            id="Title"
            label="Title"
            variant="outlined"
            // error={errorText.length != 0 ? true : false}
            // errorText="Please enter a valid title"
            onChange={(e) => {
              let val = e.target.value;
              val = val.trim();
              val = val.replace(" ", "%20");
              setTitle(val);
            }}
          />
          <div className={classes.sizedBox} />
          <TextField
            id="Genre"
            label="Genre"
            variant="outlined"
            // fullWidth
            onChange={(e) => {
              setGenre(e.target.value.trim());
            }}
          />{" "}
          <div className={classes.sizedBox} />
          <div className={classes.sizedBox} />
          <Button
            className={classes.margin}
            size="large"
            variant="contained"
            color="primary"
            onClick={onClick}
          >
            Search
          </Button>
        </form>
      </div>
      <div className="animeData">
        {anime.map((e) => {
          // console.log(e);
          return (
            <div className="anime">
              <Card
                className="animeCard"
                onClick={() =>
                  history.push({
                    pathname: "/animeDesc",
                    state: e, // your data array of objects
                  })
                }
              >
                <img
                  src={e.cover_image}
                  alt=""
                  width="91.97"
                  height="151"
                  onClick={goToAnimeDesc(e)}
                />
                <div className="animeDes" >
                  <div style={{fontWeight:"bold"}}>
                    {e.titles.en}
                    
                    {"  "}{<div> {Rating({value:e.rating,text:" ",color:"orange"})}</div>}
                  </div>
                  <div style={{ fontSize: "10px" }}>
                    {e.descriptions.en.substring(0, 200)}{" "}
                  </div>
                  <div style={{fontSize:"13px"}}>
                    Trailer Link:{" "}
                    {e.trailer_url ? (
                      <Link href={e.trailer_url} target="_blank">
                        Link
                      </Link>
                    ) : (
                      "NA"
                    )}
                  </div>
                  <div style={{fontSize:"13px"}}>
                    Season Year: {e.season_year} {" | "} Episodes:{" "}
                    {e.episodes_count}
                  </div>
                  <div style={{fontSize:"13px"}}>Genres {e.genres.slice(0, 5).join(", ")}</div>
                </div>
              </Card>
              {/* </Link> */}
              {/* <div className={classes.sizedBox}></div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Anime;
