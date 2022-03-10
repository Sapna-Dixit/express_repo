const Button =(props:any)=>{
    return(
            <button type={props?.type} className="block font-semibold w-28 px-4 py-3 mt-8 text-md leading-5 text-center text-primary rounded-lg bg-textwhite">{props.name}</button>
    )

}
export default Button;