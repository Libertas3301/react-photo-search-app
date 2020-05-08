import React from "react";
import styles from "./search.module.css";
import { connect } from "react-redux";

class Search extends React.Component {
  state = {
    value: "",
    arr: [],
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.userValue(this.state.value);
  };

  handleSaveQueries = (event) => {
    event.preventDefault();
    let query = this.state.value;
    this.props.dispatch({ type: "TAKE_QUERY", query });
    this.props.queriesInput("" + [...this.props.value]);
  };

  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit} className={styles.form}>
          <input
            className={styles.input__value}
            type="text"
            onChange={this.handleChange}
            placeholder="Search for a photo..."
          />
          <input type="submit" className={styles.form__submit_button} />
          <button
            className={styles.form__submit_button}
            onClick={this.handleSaveQueries}
          >
            SAVE
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ value: state.queryDispatch.val });

//connect function INJECTS dispatch function as a prop!!
export default connect(mapStateToProps)(Search);
