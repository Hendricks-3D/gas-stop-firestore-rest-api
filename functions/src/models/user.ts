class User  {
    name:any;
    password:any;
    carType:any
}


type Request = {
    body:User,
    params: {userId: string}
}
export{User,Request}