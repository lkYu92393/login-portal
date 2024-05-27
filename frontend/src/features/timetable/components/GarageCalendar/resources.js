
//event example
// {
//     id: createEventId(),
//     title: 'Timed event',
//     start: 'YYYY-MM-DDT12:00:00',
//     end: 'YYYY-MM-DDT14:00:00',
//     type: 'testset',
//     location: 'aetaetaet',
//     resourceId: 'P2',
//     color: typeColor(type),
// }

const viewStateChoice = {
    view: 1,
    add: 2,
    edit: 3
}

const locationList = [
    { id: 'P1', title: 'Parking 1' },
    { id: 'P2', title: 'Parking 2' },
    { id: 'P3', title: 'Parking 3' },
    { id: 'P4', title: 'Parking 4' },
    { id: 'L1', title: 'Lift 1' },
    { id: 'L2', title: 'Lift 2' },
]

const codeList = [
    { id: 'FIX', title: "Fixing" },
    { id: 'MAINT', title: 'Maintenance' }
]

const typeColor = (type) => {
    switch (type) {
        case 'FIX':
            return '#ff0000'
        case 'MAINT':
            return '#00ff00'
        default:
            return '#0000ff'
    }
}

export { viewStateChoice, locationList, codeList, typeColor }