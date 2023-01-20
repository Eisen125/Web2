import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'yuval',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'almog',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'yuvals-shoes',
      slug: 'yuvals-adidas-shoes',
      category: 'manShoes',
      image: '/images/p1.jpg',
      price: 2,
      countInStock: 10,
      brand: 'adidas',
      rating: 10,
      numReviews: 10000000000,
      description: ' damn-good-shoes',
    }]
};

export default data;
