
class Comment{
        id!:string;
        name!:string;
        timeStamp!:string;
        text!:String;
        gasStationId!:string;


        Comment(){
            this.id='';
            this.name='';
            this.timeStamp='';
            this.text='';
            this.gasStationId='';

        }
}

type Request = {
    body:Comment,
    params: {gasStationId:string}
}

export {Comment, Request};