import React from "react";
import axios from "axios";
import Search from "./components/search.jsx";
import styles from "./index.module.css";

export default class App extends React.Component {
  state = {
    photosData: "",
    errorMsg: "",
    savedQueries: [],
    imgLink: "",
    loading: true,
    startGettingData: false,
  };

  onSearchSubmit = async (value) => {
    this.setState({ loading: true });
    this.setState({ startGettingData: true });
    const response = await axios
      .get("https://api.unsplash.com/search/photos", {
        params: { query: value },
        headers: {
          Authorization:
            "Client-ID JoBf5D3FDF5Z90j9hNksfxZBPg3g5Y2h79hzRtRNQF0",
        },
      })
      .then(
        setTimeout(
          function () {
            this.setState({ loading: false });
            this.setState({ startGettingData: false });
          }.bind(this),
          500
        )
      );

    this.setState({ photosData: response.data.results });
  };

  handleLinkChange = (event) => {
    this.setState({ imgLink: event.currentTarget.src });
  };

  openInNewPage = () => {
    window.open(this.state.imgLink);
  };

  queries = (value) => {
    this.setState({ savedQueries: value.split(",") });
  };

  getPhotosByQuery = (event) => {
    this.onSearchSubmit(event.currentTarget.innerHTML);
  };

  render() {
    return (
      <div className={styles.container}>
        <Search userValue={this.onSearchSubmit} queriesInput={this.queries} />

        {this.state.loading && this.state.startGettingData && (
          <p className={styles.loading}>Se încarcă...</p>
        )}

        {!this.state.startGettingData && (
          <div className={styles.galery__block}>
            {!this.state.photosData && (
              <p className={styles.message__notFound}>
                Nu ați căutat încă nimic
              </p>
            )}

            <div className={styles.galery__grid}>
              {this.state.photosData &&
                this.state.photosData.map((item, index) => {
                  return (
                    <div key={index} onClick={this.openInNewPage}>
                      <img
                        src={item.urls.small}
                        alt={item.alt_description}
                        onMouseOver={this.handleLinkChange}
                      />
                      <p className={styles.likes__counter}>
                        {item.likes} likes
                      </p>
                    </div>
                  );
                })}
            </div>

            {this.state.photosData && (
              <div className={styles.query__data}>
                <p className={styles.query__data_title}>Saved queries</p>
                <ul className={styles.query__element}>
                  {this.state.savedQueries.map((item, index) => (
                    <li
                      onClick={this.getPhotosByQuery}
                      key={index}
                      className={styles.query__entity}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
