export const changeId = (arr) => {
    const list = arr.map(obj => {
        const { _id, ...otherDetails } = obj._doc
        const newObject = {
            id: _id,
            ...otherDetails
        }
        return newObject
    })

    return list
} 