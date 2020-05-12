import React from 'react';
import PersonDirectory from './PersonDirectory'
import PersonViewer from './PersonViewer';
import ServiceDirectory from './ServiceDirectory';
import ServiceViewer from './ServiceViewer';
import InfoBox from './InfoBox';
import client from './feathers';
import './App.css';



function Page(people) {
  this.people = people;
  this.getTag = () => {
    let first = this.people[0].lastName;
    let last = this.people[this.people.length - 1].lastName;
    let firstTag = first.slice(0, 2);
    let lastTag = last.slice(0, 2);
    return firstTag + "-" + lastTag;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      selectedPerson: null,
      services: null,
      selectedService: null,
      asyncDone: false,
    };
  }

  //~~~ perform setup
  async componentDidMount() {
    //block component from rendering
    this.setState({asyncDone: false})

    //create services to hit
    const people = client.service('people');
    const services = client.service('services');

    //get the services in the services table and set state
    try {
      let response = await services.find({
        query: {
          $select: ['id', 'name', 'roomNumber'],
          $sort: {
            name: 1
          }
        }
      })
      this.setState({services: response.data});
    }
    catch(error) {
      console.log(error);
    }

    //get the number of people in the people table
    //this number will be used for pagination
    let numRecords;
    try {
      let response = await people.find({
        query: {
          $limit: 0,
        }
      });
      numRecords = response.total;
    } catch (error) {
      console.log(error);
    }

    //create queries to paginate the people data
    const LIMIT = 19;
    let queries = [];
    for (let i = 0; i < numRecords / LIMIT; i++) {
      queries.push(
        people.find({
          query: {
            $limit: LIMIT,
            $skip: i * LIMIT,
            $select: ['id', 'firstName', 'lastName', 'roomNumber', 'profilePicture', 'gender'],
            $sort: {
              lastName: 1
            }
          }
        })
      );
    }

    //execute the queries created above at the same time
    try {
      var responses = await Promise.all(queries);
    }
    catch(error) {
      console.log("Promise.all error: ", error);
    }

    //create Page objects from the returned data
    let pages = [];
    console.log("responses: ", responses);
    for (let res of responses) {
      let page = new Page(res.data);
      pages.push(page);
    }
    
    //set state
    this.setState({
      pages: pages,
    })
    
    //unblock component from rendering
    this.setState({asyncDone: true})
  }

  //~~~~~~~~~~~~~~~~
  
  selectPerson(person) {
    this.setState({
      selectedPerson: person,
      selectedService: null,
    })
    this.startTimer();
  }

  async selectService(service) {
    const people = client.service('people'); //api
    let response;
    try {
      response = await people.find({
        query: {
          serviceId: service.id,
          $select: ['id', 'firstName', 'lastName', 'roomNumber'],
          $sort: {
            lastName: 1
          }
        }
      })
    }
    catch(error) {
      console.log("serviceViewer error: ", error);
    }
    
    service.people = response.data;
    this.setState({
      selectedPerson: null,
      selectedService: service,
    })
    this.startTimer();
  }

  startTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({selectedPerson: null, selectedService: null}), 20000);
  }

  render() {
    if(!this.state.asyncDone){
      return (
        <div className = "App"></div>
      )
    }

    let personViewer = <PersonViewer selectedPerson = {this.state.selectedPerson}/>;
    let serviceViewer = <ServiceViewer selectedService = {this.state.selectedService}/>
    let infoBox = <InfoBox/>
    let viewer;
    if(this.state.selectedPerson){
      viewer = personViewer;
    }
    else if(this.state.selectedService){
      viewer = serviceViewer;
    }
    else {
      viewer = infoBox;
    }
    
    return (
      <div className = "App">
        {viewer}
        <ServiceDirectory
          selectService = {(service) => this.selectService(service)}
          services = {this.state.services}
        />
        <PersonDirectory
          selectPerson = {(person) => this.selectPerson(person)}
          pages = {this.state.pages}
        />
      </div>
    );
  }
}

export default App;