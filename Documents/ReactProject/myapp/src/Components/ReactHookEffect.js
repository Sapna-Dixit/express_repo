import React, {useState ,useEffect } from 'react'

export default function ReactHookEffect()
{
    const[count, setCount] =useState(0);

    useEffect(()=>{
        document.title =`You clicked ${count} times`
    });
    return(
        <div>
            <p>You clicked {count}</p>
            <button onClick ={()=>setCount(count+1)}>Click</button>

        </div>
    )
    
}