import './App.css'; 
import First from "./first"
import ReactHook from "./Components/ReactHook"
import  ReactHookEffect from "./Components/ReactHookEffect"
import ReactBootStrap from "./Components/ReactBootStrap"

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <First />
        <hr/>
        <ReactHook /><hr/>
        <ReactHookEffect /> 
        <ReactBootStrap />
      </header>
    </div>
  );
}

export default App;
