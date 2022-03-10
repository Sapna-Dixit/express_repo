import Images from "./Image"
import { ErrorMessage } from "formik"
export default function InputField({
    field,
    form:{touched, errors},
    ...props
}:any)
{
  
    return(
        <div className="relative mt-10">
            <div className='w-14 absolute -left-10 -top-2'>
                <Images sr={props.icon} />
            </div>
            <input type={props?.type}
            name={props.name} 
            placeholder={props.placeholder} 
            className={`shadow-style w-full px-4 bg-field text-black py-2
             text-sm border rounded-md focus:border-blue-400 
             focus:outline-none focus:ring-1 focus:ring-blue-600 
             ${touched[field.name] && errors[field.name]&&'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500'}`}
            onChange={props.onChange} 
            value ={props.values}
            autoComplete ="off"
            {...field}
            />
            <ErrorMessage name={field.name} className='text-red-500 ' component='span'/>
       </div>
        )
}