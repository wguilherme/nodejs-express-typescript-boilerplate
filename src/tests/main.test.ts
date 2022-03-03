/* eslint-disable max-len */
import request from 'supertest'
import setupMongoMemory from '../config/testSetup/setupMongoMemoryTest'
import app from '../app'

setupMongoMemory()

const api = request(app)
