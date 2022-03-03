import mongoMemoryHandler from '../database/mongoMemory'

const setupMongoMemory = () => {
  beforeAll(mongoMemoryHandler.connect)
  afterAll(mongoMemoryHandler.disconnect)
}
export default setupMongoMemory
