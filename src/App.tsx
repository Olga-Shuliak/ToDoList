import React from 'react';
import './App.css';
import {Header} from './components/Header';
import {Body} from './components/body/Body';

function App() {
  //вынести верстку в отдельную компоненту, дважды вызвать

  return (
      <div className="App">
        <Header title={'TO DO LIST'}/>
        <Header title={'My To Do List'}/>
        <Body/>
      </div>
  );
}

export default App;
