import { Component } from "react";

import { ThreeCircles } from "react-loader-spinner";

import Header from "../Header";
import MovieItem from "../MovieItem";
import Pagination from "../pagination";

import "./index.css";

const apiStatus = {
  initial: "INITIAL",
  success: "SUCCESS",
  progress: "PROGRESS",
  failure: "FAILURE",
};

class Home extends Component {
  state = { status: apiStatus.initial, pageNumber: 1 };

  componentDidMount() {
    this.getMovieData();
  }

  changeCase = (movie) => ({
    id: movie.id,
    title: movie.title,
    poster_path: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`,
    vote_average: Math.round(movie.vote_average * 10),
    release_date: movie.release_date,
  });

  getMovieData = async (pageNumber = 1) => {
    this.setState({ status: apiStatus.progress });
    const apiKey = "ebd68c0a625eb2337b6312fe363d9d1a";
    const options = {
      method: "GET",
    };
    console.log("working");
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`,
      options
    );
    if (response.ok) {
      const data = await response.json();
      // const updatedData = data.results.map(movie => this.changeCase(movie))
      this.setState({
        moviesList: data.results,
        status: apiStatus.success,
      });
    } else {
      console.log("fail");
    }
  };

  setPageList = (pageNum) => {
    this.setState({ pageNumber: pageNum });
    this.getMovieData(pageNum);
  };

  renderSuccessView = () => {
    const { moviesList, pageNumber } = this.state;
    return (
      <>
        <section className="content">
          <h1>Popular</h1>
          <ul className="movies-list">
            {moviesList.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </ul>
        </section>
        <Pagination
          setPageNo={this.setPageList}
          moviesList={moviesList}
          pageNo={pageNumber}
        />
      </>
    );
  };

  renderProgressView = () => (
    <div className="loader" data-testid="loader">
      <ThreeCircles color=" #ff0000" height="50" width="50" />
    </div>
  );

  renderMovies = () => {
    const { status } = this.state;
    switch (status) {
      case apiStatus.success:
        return this.renderSuccessView();
      case apiStatus.progress:
        return this.renderProgressView();
      // case apiStatus.failure:
      //   return this.renderFailureView()

      default:
        return null;
    }
  };

  render() {
    console.log("home");
    return (
      <div className="home-page">
        <Header />
        {this.renderMovies()}
      </div>
    );
  }
}
export default Home;
