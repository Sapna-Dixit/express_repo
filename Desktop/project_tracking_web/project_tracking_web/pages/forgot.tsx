import signIn from './images/signin-removebg-preview.png'
import email from './images/email.png';
import phone from './images/phone.png'
import InputField from '../shared/component/input'
import Images from '../shared/component/Image';
import PageHeading from '../shared/component/pageHeading';
import Button from '../shared/component/button';
import Content from '../shared/component/content';
import logo from './images/beautiful-gradient-logo-designs-22-removebg-preview.png';
import forgotpwd from './images/forgotpwd.png'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const ForgotPwd = () => {
  return (

    <div className='flex items-center min-h-screen bg-bglinear'>
      <div className='border-style  border-top flex-1 h-full xs:max-w-1xl  sm:max-w-2xl md:max-w-3xl lg:max-w-7xl mx-auto bg-white rounded-lg shadow-xl rounded-tl-md '>
        <div className='flex flex-col md:flex-row'>
          <div className='md:h-auto md:w-1/2 flex flex-col'>
            <div className="flex justify-end w-full ">
              <div className="flex justify-end w-full">
                <PageHeading id="FORGOT PASSWORD" />
              </div>
            </div>
            <div className="w-auto"></div>
            <div className=' flex justify-center items-center flex-grow'>
              <div className='w-9/12 m-auto flex justify-center'>
                <Images sr={forgotpwd} />
              </div>
            </div>
          </div>
          <Formik
            initialValues={{
              email:'',
              phoneNumber:''
            }}

            validationSchema ={Yup.object().shape({
              email:Yup.string()
              .test(
                'notBothAtTheSameTime', // test name
                'You cannot pass email at the same time as phone number', // validation message to the user
                // it has to be function definition to use `this`
                function(email) {
                  const { phoneNumber } = this.parent;
                  if (email && phoneNumber) {
                    return false; // when user enters both email & phone number do not validate form
                  }
                  return true;
                }
              )
               .when(['phoneNumber'],{
                is:(phoneNumber:string)=>!phoneNumber,
                then:Yup.string().required("Email is required").email("Invalid Email")
              }),
              phoneNumber : Yup.string()
              .test(
                'notBothAtTheSameTime',// test name
                'You cannot pass email at the same time as phone number', //validation message to the user
                function(phoneNumber){
                  const{email}= this.parent;
                  if(phoneNumber && email )
                  {
                    return false;  // when user enters both email & phone number do not validate form
                  }
                  return true;
                }
              )
              .when(['email'],{
                is:(email:string)=>!email,
                then:Yup.string().matches(/^[6-9]\d{9}$/,{message: "Please Enter Valid Number.", excludeEmptyString: false})
                .required("Phone Number is required")
              })
            },
            [['email','phoneNumber']]
            )}

            onSubmit ={async(values, {resetForm})=>{
                console.log("Values of forgot password", values);
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
                <Form>
                <div className='form-style lg:w-3/6 m-auto  sm:w-9/12 xs:w-6/12'>
                  <Field 
                  icon={email} 
                  type="email" 
                  placeholder="Email"
                  name ="email"
                  value ={props.values.email}
                  onChange ={props.handleChange} 
                  component ={InputField}
                  />
                  <div className="my-7 mb-10">
                    <h6 className="flex items-center justify-center   text-sm text-black font-semibold   ">
                      Or
                    </h6>
                    <hr className=" border-gray-400 w-28 -my-2.5" />
                    <hr className=" border-gray-400 w-28 float-right my-2.5" />
                  </div>
                  <Field 
                  icon={phone}
                  type="text" 
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={props.values.phoneNumber}
                  component ={InputField} />
                  <div className='mt-2 flex w-full justify-center'>
                    <Button name="Reset" />
                  </div>

                  <div className="flex justify-between	">
                    <Content value="SignUp" />
                    <Content value="SignIn" />
                  </div>
                </div>
                </Form>
              </div>
            </div>
            )}
          </Formik>
        </div>
      </div>
    </div>

  )
}

export default ForgotPwd;