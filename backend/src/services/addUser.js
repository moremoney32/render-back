const { connectToBaseDonnee } = require("../models/connectToBaseDonnee")
// const {formatDate} = require ("../helpers/formatDate")
const { formatDate } = require("../helpers/formatDate");
const addUser = async (userData)=>{
  
    const db = await connectToBaseDonnee()
    const collectionName = "facture"
        const newTime = new Date();
        const formatTime = await formatDate(newTime)
      
        try {
            const result = await db.collection(collectionName).insertOne({  ...userData,
                time: formatTime,
              });
            const userId = result.insertedId.toString();
            return { data: { ...userData, time: formatTime }, id: userId };
                    
        } catch (error) {
            console.error("Erreur lors de l'insertion de l'utilisateur:", error);
            throw { message: "Erreur lors de l'insertion de l'utilisateur" };    
        }


}
module.exports = {addUser}