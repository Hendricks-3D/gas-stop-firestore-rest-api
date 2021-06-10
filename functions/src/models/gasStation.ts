/*
*Definite Assignment Assertions ( !)
*The definite assignment assertion is a feature that allows a ! to be placed 
*after instance property and variable declarations to relay to TypeScript that
*a variable is indeed assigned for all intents and purposes, even if TypeScript’s
*analyses cannot detect so.
*/

class GasStation  {
    name!:string;
    password!:string;
    email!: string;
    telephone!:string;
    regular!: boolean;
    premium!: boolean;
    midGrade!: boolean;
    openTime!:string;
    closeTime!:string;
    Address!:string;
    latitude!:string;
    longitude!:string;
    ratings!:string;
    reviewsAmount!:number;

}


type Request = {
    body:GasStation,
    params: {gasStationId: string}
}
export{GasStation,Request}