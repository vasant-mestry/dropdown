/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchInput from "./SearchInput";
import "../Collapsible.css";
import "font-awesome/css/font-awesome.min.css";

/**
 * A react component which will take datalist and searchkey
 * and search the query in datalist
 */
class Collapsible extends Component {
  container = React.createRef();

  /**
   * constructor for SearchInput Component
   * @param {*} props - React props
   */
  constructor(props) {
    super(props);
    const { dataList, displayKey } = this.props;
    const finalArr = dataList.map(i => {
      return i[displayKey];
    });
    this.state = {
      open: false,
      title: "Select ",
      final: finalArr
    };
  }

  /**
   * It will add event listener outside the component.
   */
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  /**
   * It will remove event listener outside the component.
   */
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  /**
   * Updates the optionList state.
   * @param {Array} indexList - List of indexes from SearchInput component.
   */
  getIndexes = indexList => {
    const arr = [];
    indexList.forEach(element => {
      arr.push(element);
      this.setState({
        final: arr
      });
    });
  };

  //= ================================================================================

  /**
   * It select the value from the option and display on dropbox
   * @param {event} -A react event
   */
  selectValue = event => {
    const { dataList, displayKey } = this.props;
    // const {final} = this.state
    const { textContent } = event.target;
    this.setState({
      title: textContent,
      open: false,
      final: dataList.map(i => {
        return i[displayKey];
      })
    });
  };

  /**
   * @param {Array} final - List of objects which are already selected.
   */
  selectOptions = temp => {
    this.setState({
      final: temp
    });
  };

  /**
   * It toggles the dropbox
   */
  displayValues = () => {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  };

  /**
   * It open and close the dropdown
   */
  togglePanel = () => {
    const { dataList, displayKey } = this.props;
    const { open } = this.state;
    this.setState({
      open: !open,
      final: dataList.map(i => {
        return i[displayKey];
      })
    });
  };

  /**
   * It wiill check whether clicked outside
   * @param {event} -A react event
   */
  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false
      });
    }
  };

  /**
   * render method of the component
   */
  render() {
    const { final, title, open } = this.state;
    const {
      dataList,
      displayKey,
      searchKey,
      searchItem,
      alignSearchItem
    } = this.props;
    return (
      <div className="container" ref={this.container}>
        <div onClick={this.togglePanel} className="header" role="presentation">
          {title}
          <i className="fa fa-caret-down" />
        </div>
        {open ? (
          <div className="content">
            <SearchInput
              dataList={dataList}
              displayKey={displayKey}
              searchKey={searchKey}
              searchItem={searchItem}
              alignSearchItem={alignSearchItem}
              selectOptions={this.selectOptions}
              getIndexes={this.getIndexes}
              onBlur={this.togglePanel}
            />
            <div className="scroll">
              {final.map(item => {
                return (
                  <div
                    onClick={this.selectValue}
                    role="presentation"
                    key={item}
                    className="options"
                    style={{
                      textAlign: "left",
                      borderTop: "1px solid lightgray",
                      padding: "10px"
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Collapsible.propTypes = {
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
  displayKey: PropTypes.string,
  searchItem: PropTypes.bool,
  /** Alignment of search icon.
   * - Options - ```left``` | ```right```
   * - Default - ```left```
   * */
  alignSearchItem: PropTypes.string
};

Collapsible.defaultProps = {
  searchItem: false,
  alignSearchItem: "left",
  displayKey: "foo"
};

export default Collapsible;
