import React ,{useState} from 'react'
import Count from './components/Count';
import ClassComponent from './components/ClassComponent';
import Student from './components/Student';
import './App.css';
import StudentDemo from './components/StudentDemo';
import StudentDemo1 from './components/StudentDemo1';


function App() {
  const[data, setData] = useState("react")
  const[name, setName] = useState("Peter")


  function updateData()
  {
    setData("Redux")
  }

  console.warn("**********************")
  return (
    <div className="App">
      <h1>{data}</h1>
      <button onClick = {updateData}>Click</button>
      <Count /><hr/>
      <ClassComponent />
    <Student  name = {"Ramlal"} email = "ramlal@gmail.com" other = {{address :"delhi",mob : "000"}}/>
    {/* <Student name = {"Shamlal"} email = "shamlal@test.com" other = {{address :"noida", mob :"111"}}/>
    <Student name = {"Babulal"} email = "babulal@test.com" other = {{address : "gurugram", mob :"222"}}/>  */}
   
    <StudentDemo name = {name} />
    <button onClick = {()=>{setName("Jethalal")}}>update</button>
   
   <StudentDemo1 name = {"JavaScript"}/>
    </div>
  );
}

export default App;
