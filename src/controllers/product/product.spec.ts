import Product from '../../models/Product';
import request from 'supertest'
import app from '../../app'
const { setupDB } = require('./../config/test-setupMemory')
setupDB();


describe('Product tests suite', () => {

it('Should save complete Product in database', async done => {

   const productStructure = { 
      name: 'Product Test #33',
      description: 'Product description',
      price: {
         normal: 200,
         promotional: 100,
         discountRate: 50
      },
      info: {
         reference: "AB-36251452",
         brand: "Nike",
         barCode: 123456789,
         sizes: [
            { 
            name: 'P',
            quantity: 5
            },
            { 
            name: 'M',
            quantity: 5
            },
            { 
            name: 'G',
            quantity: 5
            }
         ],
         colors: [
            { 
               name: 'red',
               quantity: 3
               },
               { 
               name: 'green',
               quantity: 5
               },
               { 
               name: 'blue',
               quantity: 1
               }
         ],
         variants: [{
            name: 'Manga corta',
            quantity: 10
         }],
         composition: "100% Poliester",
         material: "Cloth",
         fabric: "Cotton",
         packing: "6 docena",
         innerPack: "12 Unidades",
         grossWeight: 17.3,
         netWeight: 15.3,
         width: 35,
         height: 70,
         depth: 40
      }
   }

   const res = await request(app).post('/product')
      .send(productStructure)

      const product = await Product.findOne({ name: productStructure.name })

      expect(product.name).toBe(productStructure.name)
      expect(product.price.normal).toBe(productStructure.price.normal)
      expect(product.info.sizes[0].quantity).toBe(productStructure.info.sizes[0].quantity)
      expect(product.info.colors[0].name).toBe(productStructure.info.colors[0].name)
      done();
   })
 
})