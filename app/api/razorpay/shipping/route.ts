import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest)=>{
    const data = await req.json()
    console.log(JSON.stringify({
        addresses:data.addresses.map((address:object)=>({
      "id": "0",
      "zipcode": "560000",
      "state_code": "KA",
      "country": "IN",
      "shipping_methods": [
        {
          "id": "0",
          "description": "Delivery within a week",
          "name": "BlueDart Shipping",
          "serviceable": true,
          "shipping_fee": 5000, // in paise. Here 1000 = 1000 paise, which equals to ₹10
          "cod": false,
          "cod_fee": 0 // in paise. Here 1000 = 1000 paise, which equals to ₹10
        },
      ]
}))
    }, null ,2))
    
    return NextResponse.json({
  "addresses": [
    {
      "id": "0",
      "zipcode": "560000",
      "state_code": "KA",
      "country": "IN",
      "shipping_methods": [
        {
          "id": "1",
          "description": "Free shipping",
          "name": "Delivery within 5 days",
          "serviceable": true,
          "shipping_fee": 1000, // in paise. Here 1000 = 1000 paise, which equals to ₹10
          "cod": true,
          "cod_fee": 1000 // in paise. Here 1000 = 1000 paise, which equals to ₹10
        },
        {
          "id": "2",
          "description": "Standard Delivery",
          "name": "Delivered on the same day",
          "serviceable": true,
          "shipping_fee": 1000, // in paise. Here 1000 = 1000 paise, which equals to ₹10
          "cod": false,
          "cod_fee": 0 // in paise. Here 1000 = 1000 paise, which equals to ₹10
        }
      ]
    }
  ]
})
}