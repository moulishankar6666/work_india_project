import { Component } from "react";

const apiStatus = {
  initial: "INITIAL",
  success: "SUCCESS",
  progress: "PROGRESS",
  failure: "FAILURE",
};

class MovieDetailsItem extends Component {
  constructor(props) {
    super(props);
    this.state = { movieDetails: [], status: apiStatus.initial };
  }

  componentDidMount() {
    this.fetchMovieDetails();
  }

  fetchMovieDetails = async () => {
    this.setState({ status: apiStatus.progress });
    console.log("hello");

    // const movie_id = params.id;
    // const Api_key = "ebd68c0a625eb2337b6312fe363d9d1a";
    // const options = {
    //   method: "GET",
    // };
    // const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`;
    // const response = await fetch(url, options);
    // if (response.ok) {
    //   const data = await response.json();
    //   console.log(data);
    //   this.setState({ movieDetails: data.cast, status: apiStatus.success });
    // }
  };
  render() {
    return <h1 className="movie-details-page">this is movie details page</h1>;
  }
}
export default MovieDetailsItem;
