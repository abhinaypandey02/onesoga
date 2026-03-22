import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest)=>{
    const data = await req.json()
    return NextResponse.json({
        addresses:data.addresses.map((address:object)=>({
      ...address,
      "shipping_methods": [
        {
          "id": "1",
          "description": "BlueDart Shipping",
          "name": "Delivery within a week",
          "serviceable": true,
          "shipping_fee": 5000, // in paise. Here 1000 = 1000 paise, which equals to ₹10
          "cod": false,
          "cod_fee": 0 // in paise. Here 1000 = 1000 paise, which equals to ₹10
        },
      ]
}))
    })
}