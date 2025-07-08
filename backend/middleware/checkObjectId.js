import { isValidObjectId } from "mongoose";

const checkObjectId = (req,res,next) => {
    
    if(!isValidObjectId(req.params.id)){
        res.status(400);
       throw new Error( `Invalid object id ${req.params.id} `)
    }
    next()
}

export { checkObjectId }