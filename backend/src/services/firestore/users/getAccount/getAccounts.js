const firestore = require('../../../../lib/firestore')

const getAccounts = async () => {
    const accounts = await firestore
    .collection("users")
    .where("isDeleted", "==", 0)
    .get();

    const accountsSnapshot = accounts.docs.map((obj, index) => {
        const tempData = obj.data()
        return {
            id: obj.id,
            username: tempData.username,
            remarks: tempData.remarks,
            role: tempData.role,
        }
    }).filter(obj => obj.role !== 1000)

    return accountsSnapshot
}

module.exports = { getAccounts }