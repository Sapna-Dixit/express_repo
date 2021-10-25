import React ,{useState}from 'react'


const StudentDemo = (prop) =>{
    const[name, setName] = useState("Ramlal")


    return(
            <div className = "App">
                <h1>Props in React :)</h1>
                <h2>Hello {prop.name}</h2>

            </div>
    )
}
export default  StudentDemo;