import { gql } from "@apollo/client";

// TABLE
export const GET_ALL_TABLES = gql`
   subscription getTables {
      tables {
         id
         table_name
      }
   }
`;

export const ADD_TABLE = gql`
   mutation addTable($id: String, $table_name: String) {
      insert_tables_one(object: { id: $id, table_name: $table_name }) {
         id
      }
   }
`;

export const DELETE_TABLE = gql`
   mutation deleteTable($id: String!) {
      delete_tables_by_pk(id: $id) {
         id
      }
   }
`;

// CATEGORY

export const ADD_CATEGORY = gql`
   mutation addCategory($id: String, $category_name: String) {
      insert_categories_one(object: { id: $id, category_name: $category_name }) {
         id
      }
   }
`;

export const GET_ALL_CATEGORIES = gql`
   subscription getCategories {
      categories(order_by: { category_name: desc }) {
         id
         category_name
         foods {
            id
            food_price
            food_name
            food_image
            food_description
            category {
               id
               category_name
            }
         }
      }
   }
`;

export const DELETE_CATEGORY = gql`
   mutation deleteCategory($id: String!) {
      delete_categories_by_pk(id: $id) {
         id
      }
   }
`;

// FOOD

export const GET_FOODS = gql`
   subscription getFoods($where: foods_bool_exp) {
      foods(where: $where) {
         id
         food_name
         food_image
         food_description
         food_price
         category_id
         category {
            id
            category_name
         }
      }
   }
`;

export const ADD_FOOD = gql`
   mutation addFood($id: String, $food_price: Int, $food_name: String, $food_image: String, $food_description: String, $category_id: String) {
      insert_foods_one(object: { id: $id, food_price: $food_price, food_name: $food_name, food_image: $food_image, food_description: $food_description, category_id: $category_id }) {
         id
      }
   }
`;

export const DELETE_FOOD = gql`
   mutation deleteFood($id: String!) {
      delete_foods_by_pk(id: $id) {
         id
      }
   }
`;
