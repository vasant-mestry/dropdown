import React, { Component } from "react";
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";
import "font-awesome/css/font-awesome.min.css";
import "../SearchInput.css";

/**
 * A react component which will take datalist and searchkey
 * and search the query in datalist
 */
class SearchInput extends Component {
  /**
   * Constructor for SearchInput Component
   * @param {*} props - React props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      final: ""
    };
  }

  /**
   * Update's the value of input element and searches for the value
   * @param {event} - A react event
   */
  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      this.searchCall(event.target.value)
    );
  };

  /**
   * Search given string in datalist
   * @param {str} - Search String
   */
  searchCall = str => {
    const temp = [];
    const addIndex = new Set();
    const { searchKey, getIndexes } = this.props;
    searchKey.forEach(key => {
      this.addValue(temp, addIndex, key, str);
    });
    this.setState({ final: temp }, () => {
      getIndexes(temp);
    });
  };

  /**
   * It append the index of objects which have str in the value of key
   * @param {Array} final - List of objects which are already selected.
   * @param {Set} addIndex - Set of selected objects.
   * @param {String} key - The property of object where we have to search.
   * @param {String} str - The string which we have to search.
   */
  addValue = (temp, addIndex, key, str) => {
    const { dataList, selectOptions } = this.props;
    dataList.forEach((ele, index) => {
      if (!addIndex.has(index) && ele[key] && ele[key].includes(str)) {
        temp.push(ele[key]);
        addIndex.add(index);
      }
    });
    selectOptions(temp);
  };

  /**
   * It returns font awesome icon
   * @returns {JSX} - A search icon
   */
  returnIcon() {
    return <i className="fa fa-search search-icon" />;
  }

  /**
   * render method of SearchInput Component
   */
  render() {
    const { searchItem, alignSearchItem } = this.props;
    const { searchString } = this.state;
    return (
      <div className="input-container">
        <div className="input-field">
          {searchItem && alignSearchItem === "left" && this.returnIcon()}
          <input
            className="search-input-box"
            type="text"
            name="searchString"
            placeholder=" Search...."
            value={searchString}
            onChange={this.handleChange}
          />
          {searchItem && alignSearchItem === "right" && this.returnIcon()}
        </div>
      </div>
    );
  }
}
SearchInput.propTypes = {
  /**
   * Array of objects where we have to perform search
   */
  dataList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  /** Array of keys in which we have to search.
   * */
  searchKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Display search icon or not.
   * - Options - ```true``` | ```false```
   * - Default - ```false```
   * */
  searchItem: PropTypes.bool,
  /** Alignment of search icon.
   * - Options - ```left``` | ```right```
   * - Default - ```left```
   * */
  alignSearchItem: PropTypes.string
  // getIndexes: PropTypes
};
SearchInput.defaultProps = {
  searchItem: false,
  alignSearchItem: "left"
};
export default SearchInput;
