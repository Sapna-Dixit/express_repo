import React from 'react'

class Student extends  React.Component
{
    
    render()
    {
        return(
            <div>
                <h1>Hello! {this.props.name}</h1>
            </div>
        )
    }
}

export default Student;