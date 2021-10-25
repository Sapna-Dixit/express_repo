import React from 'react'
import {Button, Modal} from 'react-bootstrap'


export default class ReactBootStrap extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            show : false
        }
    }

    handleModal()
    {
        this.setState({show : true})
    }
    render()
    {
        return(
            <div>
                <h1>React BootStrap</h1>
                <Button  onClick ={()=>{this.handleModal()}}>Click me</Button>
                <Modal>
                    <Model.Header>Modal Heading</Model.Header>
                </Modal>
            </div>
        )
    }
}