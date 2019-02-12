import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {

  constructor(props){
    super(props)
      this.state = {
      userInput: ``
    }
    this.handleUserInput = this.handleUserInput.bind(this)
  }

  handleUserInput(event) {
    this.setState({
      userInput: event.target.value
    })
  }

  handleSearchReturn = () => {
    this.props.searchPostFn(this.state.userInput)
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={this.handleUserInput} onEmptied={this.props.restorePostsFn} placeholder="Search Your Feed" />

          <SearchIcon onClick={this.handleSearchReturn}id="Search__icon" />
        </div>
        
      </section>
    )
  }
}