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

// ORDERS

export const ADD_ORDER = gql`
   mutation addOrder($id: String, $order_price: numeric, $order_table_id: String, $order_description: String) {
      insert_orders(objects: { id: $id, order_price: $order_price, order_table_id: $order_table_id, order_description: $order_description }) {
         affected_rows
      }
   }
`;

export const ADD_ORDER_ITEMS = gql`
   mutation addOrderItems($id: String, $food_id: String, $order_id: String, $food_piece: String) {
      insert_order_items(objects: { id: $id, food_id: $food_id, order_id: $order_id, food_piece: $food_piece }) {
         affected_rows
      }
   }
`;

export const GET_ORDER = gql`
   subscription getOrder($id: String!) {
      orders(where: { id: { _eq: $id } }) {
         status
         updated_at
         id
         order_items {
            id
            food_piece
            food {
               food_name
               food_image
            }
         }
      }
   }
`;

export const GET_ALL_ORDERS = gql`
   subscription getOrders($where: orders_bool_exp) {
      orders(where: $where, order_by: { updated_at: desc }) {
         id
         status
         updated_at
         order_description
         table {
            table_name
         }
         order_items {
            food_piece
            food {
               id
               food_name
            }
         }
      }
   }
`;

export const UPDATE_ORDER = gql`
   mutation orderUpdateKitchen($id: String!, $status: String!, $updated_at: timestamptz!) {
      update_orders_by_pk(pk_columns: { id: $id }, _set: { status: $status, updated_at: $updated_at }) {
         id
      }
   }
`;

export const ORDER_WEEKLY_COUNT = gql`
   subscription orderWeeklyCount($date: timestamptz!) {
      orders(where: { updated_at: { _gte: $date } }, order_by: { updated_at: asc }) {
         updated_at
      }
   }
`;
