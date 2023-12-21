/***fonction qui format la date */

const formatDate = (created) => {
    try {
        const day = String(created.getDate()).padStart(2, '0');
        const month = String(created.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajoutez 1
        const year = created.getFullYear();

        const hours = String(created.getHours()).padStart(2, '0');
        const minutes = String(created.getMinutes()).padStart(2, '0');
        const seconds = String(created.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    } catch (error) {
        console.error("Erreur de format:", error);
        throw error;
    }
}

module.exports = { formatDate };