import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'

import Title from './Components/Title'
import SubmitButton from './Components/SubmitButton'
import SongDisplay from './Components/SongDisplay'


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render(){
    return (
      <div className="App">
  
        <Container>
          <Title />
          {
            this.state.isLoggedIn?
            <SongDisplay />:
            <SubmitButton />
          }          
        </Container>
  
      </div>
    );
  }
}

export default App;
