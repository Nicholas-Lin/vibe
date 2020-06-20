import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'

import Title from './Components/Title'
import SubmitButton from './Components/SubmitButton'
import SongDisplay from './Components/SongDisplay'


function App() {
  return (
    <div className="App">

      <Container>
        <Title />
        <SongDisplay />
        <SubmitButton />
      </Container>

    </div>
  );
}

export default App;
