const firestore = require('lib/firestore')

const addEvent = async (data) => {
    
    data.createdTime = new Date()
    data.lastUpdatedTime = new Date()
    
    const res = await firestore.collection('garageEvents').add(data);

    return res
}

module.exports = { addEvent }