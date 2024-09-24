import { faker } from '@faker-js/faker';
import { DrizzleDB } from '../../drizzle';
import { categories, product_category, products } from '../../schema';

export default async function seed(db: DrizzleDB) {
  try {
    const categoriesData = await db
      .insert(categories)
      .values(
        Array(5)
          .fill('')
          .map((_, index) => ({
            name: `${index} ${faker.person.firstName()}`,
            cover_url: faker.image.url(),
          })),
      )
      .returning();

    const productsData = await db
      .insert(products)
      .values(
        Array(10)
          .fill('')
          .map((_) => ({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            image_url: faker.image.url(),
            quantity: faker.number.int({ max: 999999999 }),
            price: faker.number.float(),
          })),
      )
      .returning();

    const productCategoryData = [];

    categoriesData.forEach((category) => {
      productsData.forEach((product) => {
        productCategoryData.push({
          product_id: product.id,
          category_id: category.id,
        });
      });
    });

    await db.insert(product_category).values(productCategoryData);
  } catch (err) {
    console.log('Error in seeding product category pivot: ', err.message);
  }
}
