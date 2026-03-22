import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest)=>{
    const data = await req.json()
    console.log("data", JSON.stringify(data,null,2))
    const response = {
        addresses:data.addresses.map((address:object)=>({
      ...address,
      "serviceable": true,
      "cod": false,
      "cod_fee": 0,
      "shipping_fee": 5000,
      "shipping_methods": [
        {
          "id": "1",
          "description": "BlueDart Shipping",
          "name": "Delivery within a week",
          "serviceable": true,
          "shipping_fee": 5000,
          "cod": false,
          "cod_fee": 0
        },
      ]
}))
    }
    console.log("response", JSON.stringify(response,null,2))
    return NextResponse.json(response)
}