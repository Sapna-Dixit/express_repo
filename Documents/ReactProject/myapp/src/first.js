import React from "react"

export default class First extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        }
    }
    componentDidMount() {
        fetch('https://reqres.in/api/users').then((resp) => {
            resp.json().then((result) => {
                console.warn(result)
            })
        })
    }
    render() {
        return (
            <div>
                <h1>Fetch API data</h1>
                {
                    this.state.users ?
                    this.state.users.map((item,i)=>
                    <div>
                        <p>{i}</p>
                    </div>
                    })
                    :null
                }
            </div>
        );
    }
}