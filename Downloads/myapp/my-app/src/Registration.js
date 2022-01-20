import React from 'react'
import './register.css';
import {Formik, Field, Form, ErrorMessage}from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Registration = ()=>{
    return(
        <div className='container'>
           <div className='row'>
           <div className='col-md-2'></div>
            <div className='col-md-8 form'>
            <h3 className='title'>Create An Account</h3><hr/>
            <Formik 
            initialValues={{
                firstName :'',
                lastName : '',
                email :'',
                password:'',
                phone:'',
                address:'',
                gender:'',
            }}
            validationSchema={Yup.object().shape({
                firstName : Yup.string().required('First Name is required'),
                lastName :Yup.string().required('Last Name is required'),
                email : Yup.string().email('Email is invalid')
                .required('Email is required'),
                password:Yup.string().min(6,'Password must be at least 6 character').required('Password is Required'),
                address : Yup.string().required('Address is required'),
                 phone:  Yup.string().matches(/^[6-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false}),
                gender: Yup.string().required("You must select the gender"),      
            })}
            onSubmit={async (values) => {
                console.log('--values---',values)
                 const dt =  await axios.post('http://localhost:8000/register',(values));
                    console.log("User information -------", dt);
                 await alert(JSON.stringify(values, null, 2));              
              }}
            > 
           {({errors, touched,  onSubmit})=>(
                <Form id="register" > 
                    <div className="form-gruop">
                        <label></label>
                        <Field
                         type="text" 
                         name ="firstName"
                         className={`form-control shadow-none ${touched.firstName && errors.firstName && 'is-invalid'}`}
                         placeholder="Enter First Name"
                         id="firstName"
                           />
                        <ErrorMessage name="firstName" component="div" className='error'/>
                    </div>
                    <div className="form-group">
                        <label></label>&nbsp;
                        <Field type="text" 
                            name="lastName" 
                            className={`form-control shadow-none ${touched.lastName && errors.lastName && 'is-invalid'}`}
                            placeholder='Enter Last Name'
                            id="lastName"
                        />
                        <ErrorMessage name="lastName" component="div" className='error'/>
                    </div>
                    <div className="form-group">
                        <label> </label>
                        <Field type="Email" 
                        name="email"  
                        className={`form-control shadow-none ${touched.email && errors.email && 'is-invalid'}`}
                         placeholder="Enter Email" 
                        id="email"
                        />
                        <ErrorMessage name="email" component="div" className='error'/>
                    </div>
                    <div className="form-group">
                        <label></label>
                        <Field type="password" name="password"
                        className={`form-control shadow-none ${touched.password && errors.password && 'is-invalid'}`}
                        placeholder="Enter Password" id="pass"
                        />
                         <ErrorMessage name="password" component="div" className='error'/>
                    </div>
                   
                    <div className="form-group">
                        <label></label>
                        <Field type="text" name="address" 
                         className={`form-control shadow-none ${touched.address && errors.address && 'is-invalid'}`}
                         placeholder="Enter Addresss" 
                        id="addrs" />
                        <ErrorMessage name="address" component="div" className='error'/>
                    </div>
                    <div className="form-group">
                        <label></label>
                        <Field type="text" name ="phone"
                        className={`form-control shadow-none ${touched.phone && errors.phone && 'is-invalid'}`}
                        placeholder="Enter Phone Number" id="phone"  />
                        <ErrorMessage name="phone" component="div" className='error'/>
                    </div>
                   <br/>
                Gender :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div role ="group" className="form-check form-check-inline btn-group">  
                        <label className="form-check-label" for='male'>
                        <Field type="radio" name="gender" value="male"
                        className="form-check-input"
                         id="male" />Male
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label className="form-check-label" for='female'>
                        <Field type="radio" name="gender"
                         className= "form-check-input"
                         id="female" value="female"/>Female
                        </label> 
                    </div> <br/>
                    <ErrorMessage name="gender" component="div" className='error'/>
                    <br/>
                    <div className="form-group">
                        <button  type="submit"  id="sBtn" 
                        className=" form-control btn btn-primary">Submit</button>
                    </div>
                </Form>
             )}
                </Formik>
            </div>
            <div className='col-md-2'></div>

           </div>
        </div>
    )
}

export default Registration;