import signUp from './images/Signup-removebg-preview.png';
import user from './images/user.png'
import email from './images/email.png';
import pwd from './images/password.png'
import InputField from '../shared/component/input'
import Images from '../shared/component/Image';
import PageHeading from '../shared/component/pageHeading';
import Button from '../shared/component/button';
import Content from '../shared/component/content';
import logo from './images/beautiful-gradient-logo-designs-22-removebg-preview.png';
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
const SignUp = () => {
  return (
    <div className='flex items-center min-h-screen bg-bglinear'>
      <div className='border-style  border-top flex-1 h-full xs:max-w-1xl  sm:max-w-2xl md:max-w-3xl lg:max-w-7xl mx-auto bg-white rounded-lg shadow-xl rounded-tl-md '>
        <div className='flex flex-col md:flex-row'>
          <div className='md:h-auto md:w-1/2 flex flex-col'>
            <div className="flex justify-end w-full ">
              <div className="flex justify-end w-full">
                <PageHeading id="SIGN UP" />
              </div>
            </div>
            <div className="w-auto"></div>
            <div className=' flex justify-center items-center flex-grow'>
              <div className='w-9/12 m-auto flex justify-center'>
                <Images sr={signUp} />
              </div>
            </div>
          </div>
          <Formik
            initialValues={{
              fullname: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
              fullname: Yup.string().required("Fullname equired"),
              email: Yup.string().email("Invalid Email").required("Email is required"),
              password: Yup.string().required('Please enter your password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
              confirmPassword: Yup.string().required('Confirm password is required')
                .when('password', {
                  is: (val: any) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf([Yup.ref("password")],
                    "Both password needed to be the same")
                })
            })}
            onSubmit={async (values,{resetForm}) => {
              console.log("Values----", values);
              await resetForm();
             
            }} >
              {(props) => (
            <div className='border-style border-bottom flex items-center justify-center p-6 sm:p-12 md:w-1/2 bg-bgcolor rounded-bl-3xl rounded-tr-3xl rounded-br-2xl'>
              <div className='w-full'>
                <div className='flex justify-center'>
                  <div className='w-28'>
                    <Images sr={logo} />
                  </div>
                </div>
                <Form onSubmit={props.handleSubmit}>
                  <div className='form-style lg:w-3/6 m-auto  sm:w-9/12 xs:w-6/12'>
                      <Field 
                      type="text"
                      placeholder="Full Name"
                      name="fullname"
                      icon={user} 
                      onChange={props.handleChange}
                      value={props.values.fullname }
                      component ={InputField}
                      />
                        
                      <Field
                      icon={email} 
                      type="text"
                      placeholder="Email"
                      name="email" 
                      onChange={props.handleChange} 
                      value={props.values.email } 
                      component ={InputField}
                        />
                      <Field 
                      icon={pwd} 
                      type="password"
                      placeholder="Password"
                      name="password" 
                      onChange={props.handleChange} 
                      value={props.values.password } 
                      component ={InputField}
                      />
                      <Field 
                      icon={pwd} 
                      type="password" 
                      placeholder="Confirm Password" 
                      name="confirmPassword"
                      onChange={props.handleChange} 
                      value={props.values.confirmPassword}
                      component ={InputField}
                      />
                  </div>
                <div className='mt-2 flex w-full justify-center'>
                  <Button name="Sign Up" type="submit"/>
                </div>
                </Form>
                <div className='flex items-center justify-center mt-3  text-sm text-black font-semibold hover:underline '>
                  <Content value="Already Member ? SignIn" />
                </div>
              </div>

            </div>
          )}
          </Formik>
        </div>
      </div>


    </div>

      )
}

      export default SignUp;