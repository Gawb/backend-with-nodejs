const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool')

class ProductService {

  constructor(){
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err));
  }

  async generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url()
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    const query = 'SELECT * FROM public.tasks ;';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
     throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes){
      const index = this.products.findIndex(item => item.id === id);
      if(index === -1){
        throw boom.notFound('product not found')
      }
      const product = this.products[index]
      this.products[index] = {
        ...product,
        ...changes
      };
      return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductService;


// this.products.push({
//   id: index,
//   name: `product n°${index}`,
//   price: `122${index}`,
//   image: `https://www.images.com/imagen/${index}`
// });
