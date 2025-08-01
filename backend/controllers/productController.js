import Product from "../models/productModels.js";



const getTopProducts = async(req,res)=>{
    const products = await Product.find({}).sort({ratng:-1}).limit(3);
    res.json(products);
}    


const getProducts = async(req,res)=>{
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1 ;

    const keyword  = req.query.keyword? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }


    } :{}

    const count = await Product.countDocuments({ ... keyword });
    const products = await Product.find({ ...keyword })
    .sort({ _id: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });

}


const getProductById = async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){

        res.status(201);
        res.json(product);

    }else{
        res.status(404);
        throw new Error('Product not found');
    }
}


const createProduct = async(req,res)=>{
   
    const product  = new Product({
       name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',

    });
    const createProduct = await product.save();
    res.status(201).json(product);
}

const updateProduct = async(req,res)=>{

    const { name, price, description, image, brand, category, countInStock } =
    req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updateProduct = await product.save();
        res.json(updateProduct)

    }else{
        res.status(404);
        throw new Error('Product not found');
    }


}


const deleteProduct = async(req,res)=>{
     const product = await Product.findById(req.params.id);
    if(product){
       await Product.deleteOne({_id:req.params.id})
       res.status(201);
       res.json({message:'Product delete sucessfully'});

    }else{
        res.status(404);
        throw new Error('Product not found');
    }
}


const createProductReview = async (req,res) =>{
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id);
    console.log(product);
   
    if(product){
      
        const alreadyReviewd = product.reviews.find((r)=> r.user.toString() === req.user._id.toString())
        if(alreadyReviewd){
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const reviewData = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(reviewData);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc,val)=> acc + val.rating,0) / product.reviews.length;
        await product.save();
        res.status(201);
        res.json({message:'Review added'})
    }else{
        res.status(400);
        throw new Error('Product not found');
    }
   
}


export { createProduct, updateProduct, deleteProduct, getProductById, getProducts, getTopProducts, createProductReview }