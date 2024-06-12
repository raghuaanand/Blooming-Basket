import productModels from "@/Models/productModels"

export async function POST(req){
    try {
    const { id , reviews } = await req.json()
    let avg
    const product = await productModels.findById(id).populate('user','email _id admin')
    product.reviews.push(
        {
            user: reviews.user,
            name: reviews.name,
            comment: reviews.comment,
            rating: reviews.rating
          }
        )
    product.numofReviews = product.reviews.length
    avg = product.reviews.reduce((acc,item)=>acc+Number(item.rating),0)
    product.rating = Number(avg/product.reviews.length).toPrecision(3)
    product.save()
    return Response.json({
        success:true,
        product
    }, 
    {
        status:200
    })
    } catch (error) {
      console.log(error)
      throw new Error(error,'error submitting a review')  
    }
}