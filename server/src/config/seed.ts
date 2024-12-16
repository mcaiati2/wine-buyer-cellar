import {faker} from '@faker-js/faker';

import {client} from '../models/index.js';
import {User, Shop, Wine} from '../models/index.js';

// Recreate all of the tables, using our models - erases all previous data
await client.sync({force: true});

async function seedUsers() {
  const userData: any[] = [];
  let amount = 10;
  
  while (amount--) {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();

    userData.push({
      first_name: first_name,
      last_name: last_name,
      email: `${first_name.toLowerCase()}.${last_name.toLowerCase()}@test.com`,
      password: 'password123',
      // Generate a number between 15 and 100 for the age
      age: Math.floor(Math.random() * (100 - 15 + 1)) + 15
    });
  }

  // @ts-ignore
  await User.bulkCreate(userData);
}

async function seedShops() {
  const users = await User.findAll();
  const shopData = [];
  let amount = 15;

  while(amount--) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    shopData.push({
      name: faker.company.name() + ' Winery',
      address: faker.location.streetAddress(),
      user_id: randomUser.id
    });
  }

  // @ts-ignore
  await Shop.bulkCreate(shopData);
}

async function seedWines() {
  const shops = await Shop.findAll();
  const wineData = [];
  let amount = 30;
  const types = ['rose', 'pinot noir', 'red', 'sauvignon', 'cabernet'];

  while(amount--) {
    const randomShop = shops[Math.floor(Math.random() * shops.length)];

    wineData.push({
      brand: faker.company.name(),
      type: types[Math.floor(Math.random() * types.length)],
      region: faker.location.country(),
      price: faker.finance.amount(),
      shop_id: randomShop.id,
      // @ts-ignore
      user_id: randomShop.user_id
    });
  }

  // @ts-ignore
  await Wine.bulkCreate(wineData);
}

async function seedManagers() {
  const users = await User.findAll();
  const managerData: any = [];
  const userData: any = [];
  let amount = 5;

  const getRandomUser = (isManager: boolean): any => {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    if (isManager) {
      return managerData.includes(randomUser) ? getRandomUser(isManager) : randomUser;
    }

    return userData.includes(randomUser) ? getRandomUser(isManager) : randomUser;
  };

  while (amount--) {
    const manager = getRandomUser(true);
    const user = getRandomUser(false);

    managerData.push(manager);
    userData.push(user);
  }

  // @ts-ignore
  // A for of loop lets us run asynchronous code within the code block, whereas other loops (including forEach) do not
  for (const [index, user] of userData.entries()) {
    await user.update({
      manager_id: managerData[index].id
    });
  }
}

try {
  await seedUsers();
  await seedShops();
  await seedWines();
  await seedManagers();

  console.log('Tables seeded successfully!');
} catch (error) {
  console.log('SEED ERROR', error);
}

process.exit();