import ObjectId from 'bson-objectid'




export default function getObjectId() {
  let newID = new ObjectId()
  return newID.toHexString()
}
