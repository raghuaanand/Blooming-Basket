import { cookies } from "next/headers";

export function DELETE(){ 
    cookies().delete('token')
    return Response.json({
        success:true,
        message:"Signed Out Successfully"}
    ,{
        status:200
    })
}