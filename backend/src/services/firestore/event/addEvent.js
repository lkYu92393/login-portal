const firestore = require('../../../lib/firestore')

const addEvent = async (data) => {
    
    const res = await firestore.collection('garageEvents').add(data);

    return res
}

module.exports = { addEvent }