import { NextRequest, NextResponse } from "next/server"
import { DELIVERY_FEE } from "@/lib/checkout/constants";

export const POST = async (req: NextRequest)=>{
    const data = await req.json()
    return NextResponse.json({
        addresses:data.addresses.map((address:object)=>({
      ...address,
      "serviceable": true,
      "shipping_methods": [
        {
          "id": "1",
          "description": "BlueDart Shipping",
          "name": "Delivery within a week",
          "serviceable": true,
          "shipping_fee": DELIVERY_FEE*100,
          "cod": false,
          "cod_fee": 0
        },
      ]
}))
    })
}