import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { CategoryValue } from '~/packages/categories/categories.js';
import {
  SubcategoryFoodAndDrinksValue,
  SubcategoryShoppingValue,
  SubcategoryHousingValue,
  SubcategoryVehicleValue,
  SubcategoryTransportationValue,
} from '~/packages/subcategories/libs/enums/enums.js';
import { createCounter } from '~/libs/helpers/helpers.js';

export async function seed(knex: Knex): Promise<void> {
  const counter = createCounter(1);

  await knex(DatabaseTableName.RECORD_SUBCATEGORIES).del();

  await knex(DatabaseTableName.RECORD_SUBCATEGORIES).insert(
    Object.values(CategoryValue)
      .map((category, categoryIndex) => {
        switch (category) {
          case CategoryValue.FOOD_AND_DRINKS:
            return Object.values(SubcategoryFoodAndDrinksValue).map(
              (subcategory) => ({
                id: counter(),
                name: subcategory,
                category_id: categoryIndex + 1,
              }),
            );
          case CategoryValue.SHOPPING:
            return Object.values(SubcategoryShoppingValue).map(
              (subcategory) => ({
                id: counter(),
                name: subcategory,
                category_id: categoryIndex + 1,
              }),
            );
          case CategoryValue.HOUSING:
            return Object.values(SubcategoryHousingValue).map(
              (subcategory) => ({
                id: counter(),
                name: subcategory,
                category_id: categoryIndex + 1,
              }),
            );
          case CategoryValue.VEHICLE:
            return Object.values(SubcategoryVehicleValue).map(
              (subcategory) => ({
                id: counter(),
                name: subcategory,
                category_id: categoryIndex + 1,
              }),
            );
          case CategoryValue.TRANSPORTATION:
            return Object.values(SubcategoryTransportationValue).map(
              (subcategory) => ({
                id: counter(),
                name: subcategory,
                category_id: categoryIndex + 1,
              }),
            );
        }
      })
      .flat(),
  );
}
