import React from 'react' 

function  Student(props)
{
    console.log(props.name);
    return(
        <div style = {{background : "skyblue",margin : "10px"}}>
            <h1>Hello  {props.name}</h1>
            <h2>Email : {props.email}</h2>
            <h3>Address : {props.other.address}</h3>
            <h4>Mobile  : {props.other.mob}</h4>
        </div>
    )
}
export default Student;