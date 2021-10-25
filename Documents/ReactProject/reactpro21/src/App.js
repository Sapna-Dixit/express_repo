import logo from './logo.svg';
import './App.css';
import React from 'react';
import Student from './Student';

class  App extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      name : " Props......!!!!"
    }

  }

  render()
  {
    return(
      <div className="App" style= {{background : "skyblue", margin:"20px"}}>
        <h1>Hello React Root  Component</h1>
        <Student name ={this.state.name}/>
        <button onClick = {()=>this.setState({name:" world!!!"})}>Click</button>
      </div>
    )
  }
}
export default App;
