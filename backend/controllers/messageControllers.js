
const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id} = req.params; 
    } catch (error) {
        res.status(401).json({error:error.message});
    }
}

export default sendMessage;