
const connectToBaseDonnee  = async ()=>{
    const {MongoClient,url,dbName} = require("../helpers/settingsDataBase")
    try {
        const client = await MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
        console.log("connecte a la base de donnee")
       return client.db(dbName)
    } catch (error) {
        console.error("Erreur de connexion à la base de données:", error);
        throw error;
    }

}
module.exports = {connectToBaseDonnee }