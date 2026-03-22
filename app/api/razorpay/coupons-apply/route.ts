import { NextResponse } from "next/server"

export const GET = async ()=>{
    return NextResponse.json({
 "failure_code": "LOGIN_REQUIRED",
 "failure_reason": "promotion Code has expired" 
})
}