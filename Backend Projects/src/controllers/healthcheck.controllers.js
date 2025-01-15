import APIHandler from "../utils/APIResponses.js";
import asyncHandler from "../utils/asyncHandler.js";



const healthCheck =  asyncHandler(async (req,res) => {
    return res
        .status(200)
        .json(new APIHandler(200, {status: "GGWP"}, "Health Check"));
});


export default healthCheck;