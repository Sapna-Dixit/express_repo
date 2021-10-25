import React, { Component } from 'react'

class StudentDemo1 extends Component
{
    render()
    {
        return(
            <div>
                <h1>StudentDemo1 : {this.props.name}</h1>
            </div>
        )
    }
    // render()
    // {
    //     return 
    //     (
    //         <div className = "App">
    //             <h1> StudentDemo1 {this.props.name} </h1>
    //         </div>
    //     )
    // }
}
export default StudentDemo1;