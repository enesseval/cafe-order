import { gql } from "@apollo/client";

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
