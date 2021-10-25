import React, { Component } from 'react' 

class ClassComponent extends Component
{
    constructor()
    {
        super();
        this.state = {
            data : "JavaScript"
            
        }
    }
    apple()
    {
        this.setState({data:this.state.data+1})
        
    }
    render()
    {
        return(
            <div>
                <h1>{this.state.data}</h1>
                <button onClick = {()=>this.apple()}>update State</button>
            </div>
        )
    }
}
export default ClassComponent;