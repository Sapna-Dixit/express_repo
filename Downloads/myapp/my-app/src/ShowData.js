import React, { useEffect, useState } from "react"
import {Table, Thead, Tbody, Th, Tr, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import axios from 'axios';

const ShowData =()=>{
    const[users, setUsers]= useState([]);

    const getUsers = ()=>{
        axios.get(`http://localhost:8000/getAllUsersDetails`)
         .then((response)=>{setUsers(response.data)}
        )        
    }
    useEffect(()=>{
        getUsers();
    },[]);

    return(
        <> <br/>
          <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-12'>
                    <h3>INFORMATION OF USERS</h3><hr/>
                    <div className='table table-responsive'>
                       <Table >
                            <Thead>
                                <Tr>
                                <Th>Id</Th>
                                <Th>First Name</Th>
                                <Th>Last Name</Th>
                                <Th>Email</Th>
                                <Th>Password</Th>
                                <Th>Address</Th>
                                <Th>Gender</Th>
                                <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                               { 

                                 users.map(dt=>(
                                     
                                <Tr>
                                    <Td>{dt.id}</Td>
                                    <Td>{dt.firstName}</Td>
                                    <Td>{dt.lastName}</Td>
                                    <Td>{dt.email}</Td>
                                    <Td>{dt.password}</Td>
                                    <Td>{dt.address}</Td>
                                    <Td>{dt.gender}</Td>
                                    <Td>
                                        <a href='#edit' className='edit' data-toggle='modal'><i className='fa fa-pen'></i></a>
                                        <a href="#delete" className='danger' data-toggle='model'><i className='fa-solid fa-trash-can '></i></a>
                                    </Td>
                                </Tr>
                                ))}
                            </Tbody>
                       </Table>
                    </div>

                </div>

            </div>
          </div>
        </>
    )
}

export default ShowData;



