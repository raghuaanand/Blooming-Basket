import { jwtVerify } from "jose"

export const getJwtSecretKey = ()=>{
    const secret = process.env.SECRET_KEY
    if(!secret || secret.length===0){
        throw new Error('The Environment variable JWT IS NOT SET')
    }
    return secret
}

export const verifyAuth = async (Token)=>{
    try {
        const verified = await jwtVerify(Token, new TextEncoder().encode(getJwtSecretKey()))
        return verified.payload 
    } catch (error) {
        return Response.redirect(new URL('/userAuth'))
    }
}