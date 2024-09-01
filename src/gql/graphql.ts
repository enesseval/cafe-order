/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "tables" */
  delete_tables?: Maybe<Tables_Mutation_Response>;
  /** delete single row from the table: "tables" */
  delete_tables_by_pk?: Maybe<Tables>;
  /** insert data into the table: "tables" */
  insert_tables?: Maybe<Tables_Mutation_Response>;
  /** insert a single row into the table: "tables" */
  insert_tables_one?: Maybe<Tables>;
  /** update data of the table: "tables" */
  update_tables?: Maybe<Tables_Mutation_Response>;
  /** update single row of the table: "tables" */
  update_tables_by_pk?: Maybe<Tables>;
  /** update multiples rows of table: "tables" */
  update_tables_many?: Maybe<Array<Maybe<Tables_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_TablesArgs = {
  where: Tables_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tables_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootInsert_TablesArgs = {
  objects: Array<Tables_Insert_Input>;
  on_conflict?: InputMaybe<Tables_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tables_OneArgs = {
  object: Tables_Insert_Input;
  on_conflict?: InputMaybe<Tables_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_TablesArgs = {
  _set?: InputMaybe<Tables_Set_Input>;
  where: Tables_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tables_By_PkArgs = {
  _set?: InputMaybe<Tables_Set_Input>;
  pk_columns: Tables_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Tables_ManyArgs = {
  updates: Array<Tables_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "tables" */
  tables: Array<Tables>;
  /** fetch aggregated fields from the table: "tables" */
  tables_aggregate: Tables_Aggregate;
  /** fetch data from the table: "tables" using primary key columns */
  tables_by_pk?: Maybe<Tables>;
};


export type Query_RootTablesArgs = {
  distinct_on?: InputMaybe<Array<Tables_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tables_Order_By>>;
  where?: InputMaybe<Tables_Bool_Exp>;
};


export type Query_RootTables_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tables_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tables_Order_By>>;
  where?: InputMaybe<Tables_Bool_Exp>;
};


export type Query_RootTables_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "tables" */
  tables: Array<Tables>;
  /** fetch aggregated fields from the table: "tables" */
  tables_aggregate: Tables_Aggregate;
  /** fetch data from the table: "tables" using primary key columns */
  tables_by_pk?: Maybe<Tables>;
  /** fetch data from the table in a streaming manner: "tables" */
  tables_stream: Array<Tables>;
};


export type Subscription_RootTablesArgs = {
  distinct_on?: InputMaybe<Array<Tables_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tables_Order_By>>;
  where?: InputMaybe<Tables_Bool_Exp>;
};


export type Subscription_RootTables_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tables_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tables_Order_By>>;
  where?: InputMaybe<Tables_Bool_Exp>;
};


export type Subscription_RootTables_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootTables_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tables_Stream_Cursor_Input>>;
  where?: InputMaybe<Tables_Bool_Exp>;
};

/** columns and relationships of "tables" */
export type Tables = {
  __typename?: 'tables';
  id: Scalars['String']['output'];
  table_name: Scalars['String']['output'];
};

/** aggregated selection of "tables" */
export type Tables_Aggregate = {
  __typename?: 'tables_aggregate';
  aggregate?: Maybe<Tables_Aggregate_Fields>;
  nodes: Array<Tables>;
};

/** aggregate fields of "tables" */
export type Tables_Aggregate_Fields = {
  __typename?: 'tables_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Tables_Max_Fields>;
  min?: Maybe<Tables_Min_Fields>;
};


/** aggregate fields of "tables" */
export type Tables_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tables_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "tables". All fields are combined with a logical 'AND'. */
export type Tables_Bool_Exp = {
  _and?: InputMaybe<Array<Tables_Bool_Exp>>;
  _not?: InputMaybe<Tables_Bool_Exp>;
  _or?: InputMaybe<Array<Tables_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  table_name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "tables" */
export enum Tables_Constraint {
  /** unique or primary key constraint on columns "id" */
  TablesPkey = 'tables_pkey'
}

/** input type for inserting data into table "tables" */
export type Tables_Insert_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  table_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Tables_Max_Fields = {
  __typename?: 'tables_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  table_name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Tables_Min_Fields = {
  __typename?: 'tables_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  table_name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "tables" */
export type Tables_Mutation_Response = {
  __typename?: 'tables_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Tables>;
};

/** on_conflict condition type for table "tables" */
export type Tables_On_Conflict = {
  constraint: Tables_Constraint;
  update_columns?: Array<Tables_Update_Column>;
  where?: InputMaybe<Tables_Bool_Exp>;
};

/** Ordering options when selecting data from "tables". */
export type Tables_Order_By = {
  id?: InputMaybe<Order_By>;
  table_name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: tables */
export type Tables_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "tables" */
export enum Tables_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  TableName = 'table_name'
}

/** input type for updating data in table "tables" */
export type Tables_Set_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  table_name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "tables" */
export type Tables_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tables_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tables_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  table_name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "tables" */
export enum Tables_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  TableName = 'table_name'
}

export type Tables_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Tables_Set_Input>;
  /** filter the rows which have to be updated */
  where: Tables_Bool_Exp;
};

export type AddTableMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  table_name?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddTableMutation = { __typename?: 'mutation_root', insert_tables_one?: { __typename?: 'tables', id: string } | null };

export type DeleteTableMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeleteTableMutation = { __typename?: 'mutation_root', delete_tables_by_pk?: { __typename?: 'tables', id: string } | null };


export const AddTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"table_name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_tables_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"table_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"table_name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddTableMutation, AddTableMutationVariables>;
export const DeleteTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_tables_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTableMutation, DeleteTableMutationVariables>;