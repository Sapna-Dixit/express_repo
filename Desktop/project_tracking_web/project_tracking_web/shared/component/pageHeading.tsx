const PageHeading =(props:any)=>{
    return(
<h1 className={`${props?.id=="FORGOT PASSWORD" ? "w-72":"w-48"} shadow-style text-2xl p-2 my-4 font-semibold text-center text-white bg-secondary rounded-bl-3xl`}>
    {props.id} </h1>
    )
}

export default PageHeading;