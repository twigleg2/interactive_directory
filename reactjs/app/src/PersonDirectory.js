import React from 'react';
import PersonListItem from './PersonListItem';
import TabBar from './TabBar.js';
import './PersonDirectory.css';

class PersonDirectory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPage: null
    }
  }

  componentDidMount() {
    console.log("component did mount");
    this.selectPage(this.props.pages[0]);
  }

  //function for selecting a page, passed down to tab bar?
  selectPage(page) {
    this.setState({
      selectedPage: page
    })
  }

  render() {
    if(!this.state.selectedPage) {
      return null;
    }

    let personListItems = [];
    for (let person of this.state.selectedPage.people) {
      personListItems.push( <PersonListItem 
        selectPerson = {this.props.selectPerson} // function
        person = {person}
        key = {person.id}
        /> );
      }

      return (
        <div className = "PersonDirectory" >
          <h1 className="Header"> Person Directory </h1>
          {personListItems}
          <hr/>
          <TabBar
            selectPage = {(page) => this.selectPage(page)}
            pages = {this.props.pages}
            selectedPage = {this.state.selectedPage}
          />
        </div>
    )
  }
}

export default PersonDirectory;