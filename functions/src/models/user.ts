class User  {
    name!:string;
    password!:string;
    email!:string;
    carType!:string
}


type Request = {
    body:User,
    params: {userId: string}
}
export{User,Request}