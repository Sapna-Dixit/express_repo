import signIn from './images/signin-removebg-preview.png'
import email from './images/email.png';
import pwd from './images/password.png'
import InputField from '../shared/component/input'
import Images from '../shared/component/Image';
import PageHeading from '../shared/component/pageHeading';
import Button from '../shared/component/button';
import Content from '../shared/component/content';
import logo from './images/beautiful-gradient-logo-designs-22-removebg-preview.png';
import facebook from './images/facebook.png';
import google from './images/google.png';
import git from './images/github.png';
import { Formik, Form,Field} from 'formik';
import * as Yup from 'yup';

const SignIn = () => {
  return (
    <>
      <div className='flex items-center min-h-screen bg-bglinear'>
        <div className='border-style  border-top flex-1 h-full xs:max-w-1xl  sm:max-w-2xl md:max-w-3xl lg:max-w-7xl mx-auto bg-white rounded-lg shadow-xl rounded-tl-md '>
          <div className='flex flex-col md:flex-row'>
            <div className='md:h-auto md:w-1/2 flex flex-col'>
              <div className="flex justify-end w-full ">
                <div className="flex justify-end w-full">
                  <PageHeading id="SIGN IN" />
                </div>
              </div>
              <div className="w-auto"></div>
              <div className=' flex justify-center items-center flex-grow'>
                <div className='w-9/12 m-auto flex justify-center'>
                  <Images sr={signIn} />
                </div>
              </div>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: ""
              }}

              validationSchema={Yup.object().shape({
                email: Yup.string().email("Invalid Email").required("Email is required"),
                password: Yup.string().required("Password is required")
              })
              }
              onSubmit={async (values, { resetForm }) => {
                console.log("values---", values);
                await resetForm();

              }}
            >
              {(props)=>(
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
                    icon={email} 
                    type="text"
                    name="email"
                    value ={props.values.email}
                    placeholder="Email" 
                    onChange ={props.handleChange}
                    component ={InputField}
                    />
                    <Field
                    icon={pwd}
                    type="password"
                    name ="password"
                    placeholder="Password"
                    value ={props.values.password}
                    component={InputField}
                    />
                    <p className="mt-1 mb-1">
                      <a
                        className="text-sm text-black hover:underline float-right font-medium"
                        href="#"
                      >
                        Forgot your password?
                      </a>
                    </p>
                  </div>
                  <div className='mt-2 flex w-full justify-center'>
                    <Button name="Sign In" type="submit"/>
                  </div>
                  </Form>
                  <div className="flex items-center justify-center gap-4 mt-10">
                    <Images sr={facebook} />
                    <Images sr={google} />
                    <Images sr={git} />
                  </div>
                  <div className='flex items-center justify-center mt-3  text-sm text-black font-semibold hover:underline '>
                    <Content value="Don't have account ? SignUp" />
                  </div>
                </div>
              </div>
              )}
              </Formik>
          </div>
        </div>
      </div>
    </>

  )
}

export default SignIn;