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
    regular!: number;
    premium!: number;
    diesel!: number;
    ULSD!: number;
    openTime!:string;
    closeTime!:string;
    address!:string;
    latitude!:string;
    longitude!:string;
    ratings!:string;
    reviewsAmount!:number;

    GasStation(){
        this.name ='';
        this.password='';;
        this.email='';
        this.telephone='';
        this.regular=0.0;
        this.premium= 0.0;
        this.diesel=0.0;
        this.ULSD=0.0;
        this.openTime='';
        this.closeTime='';
        this.address='';
        this.latitude='';
        this.longitude='';
       this.ratings='';
        this.reviewsAmount=0;
    }

}


type Request = {
    body:GasStation,
    params: {gasStationId: string,address?:string}
}
export{GasStation,Request}