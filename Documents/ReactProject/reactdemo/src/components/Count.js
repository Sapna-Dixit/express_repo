import React ,{useState} from 'react'

const Count = () =>{
    const[count, setCount] = useState(0)
    
    function updateData()
    {
        setCount(count+1)
    }
console.log("##########################");
    return(
        <div>
            <h1>{count}</h1>
           {/* <button onClick={()=>setCount(count+1)}>count</button> */}
            <button onClick={updateData}>count</button>
        </div>
    )
}
export default Count;