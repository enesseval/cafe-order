/* eslint-disable */
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

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
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

/** columns and relationships of "categories" */
export type Categories = {
  __typename?: 'categories';
  category_name: Scalars['String']['output'];
  /** An array relationship */
  foods: Array<Foods>;
  /** An aggregate relationship */
  foods_aggregate: Foods_Aggregate;
  id: Scalars['String']['output'];
};


/** columns and relationships of "categories" */
export type CategoriesFoodsArgs = {
  distinct_on?: InputMaybe<Array<Foods_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Foods_Order_By>>;
  where?: InputMaybe<Foods_Bool_Exp>;
};


/** columns and relationships of "categories" */
export type CategoriesFoods_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Foods_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Foods_Order_By>>;
  where?: InputMaybe<Foods_Bool_Exp>;
};

/** aggregated selection of "categories" */
export type Categories_Aggregate = {
  __typename?: 'categories_aggregate';
  aggregate?: Maybe<Categories_Aggregate_Fields>;
  nodes: Array<Categories>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_Fields = {
  __typename?: 'categories_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Categories_Max_Fields>;
  min?: Maybe<Categories_Min_Fields>;
};


/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Categories_Bool_Exp>>;
  _not?: InputMaybe<Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Categories_Bool_Exp>>;
  category_name?: InputMaybe<String_Comparison_Exp>;
  foods?: InputMaybe<Foods_Bool_Exp>;
  foods_aggregate?: InputMaybe<Foods_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "categories" */
export enum Categories_Constraint {
  /** unique or primary key constraint on columns "id" */
  CategoriesPkey = 'categories_pkey'
}

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  category_name?: InputMaybe<Scalars['String']['input']>;
  foods?: InputMaybe<Foods_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Categories_Max_Fields = {
  __typename?: 'categories_max_fields';
  category_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Categories_Min_Fields = {
  __typename?: 'categories_min_fields';
  category_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "categories" */
export type Categories_Mutation_Response = {
  __typename?: 'categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Categories>;
};

/** input type for inserting object relation for remote table "categories" */
export type Categories_Obj_Rel_Insert_Input = {
  data: Categories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Categories_On_Conflict>;
};

/** on_conflict condition type for table "categories" */
export type Categories_On_Conflict = {
  constraint: Categories_Constraint;
  update_columns?: Array<Categories_Update_Column>;
  where?: InputMaybe<Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "categories". */
export type Categories_Order_By = {
  category_name?: InputMaybe<Order_By>;
  foods_aggregate?: InputMaybe<Foods_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: categories */
export type Categories_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "categories" */
export enum Categories_Select_Column {
  /** column name */
  CategoryName = 'category_name',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  category_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "categories" */
export type Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Categories_Stream_Cursor_Value_Input = {
  category_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "categories" */
export enum Categories_Update_Column {
  /** column name */
  CategoryName = 'category_name',
  /** column name */
  Id = 'id'
}

export type Categories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Categories_Set_Input>;
  /** filter the rows which have to be updated */
  where: Categories_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "foods" */
export type Foods = {
  __typename?: 'foods';
  /** An object relationship */
  category: Categories;
  category_id: Scalars['String']['output'];
  food_description: Scalars['String']['output'];
  food_image: Scalars['String']['output'];
  food_name: Scalars['String']['output'];
  food_price: Scalars['Int']['output'];
  id: Scalars['String']['output'];
};

/** aggregated selection of "foods" */
export type Foods_Aggregate = {
  __typename?: 'foods_aggregate';
  aggregate?: Maybe<Foods_Aggregate_Fields>;
  nodes: Array<Foods>;
};

export type Foods_Aggregate_Bool_Exp = {
  count?: InputMaybe<Foods_Aggregate_Bool_Exp_Count>;
};

export type Foods_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Foods_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Foods_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "foods" */
export type Foods_Aggregate_Fields = {
  __typename?: 'foods_aggregate_fields';
  avg?: Maybe<Foods_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Foods_Max_Fields>;
  min?: Maybe<Foods_Min_Fields>;
  stddev?: Maybe<Foods_Stddev_Fields>;
  stddev_pop?: Maybe<Foods_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Foods_Stddev_Samp_Fields>;
  sum?: Maybe<Foods_Sum_Fields>;
  var_pop?: Maybe<Foods_Var_Pop_Fields>;
  var_samp?: Maybe<Foods_Var_Samp_Fields>;
  variance?: Maybe<Foods_Variance_Fields>;
};


/** aggregate fields of "foods" */
export type Foods_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Foods_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "foods" */
export type Foods_Aggregate_Order_By = {
  avg?: InputMaybe<Foods_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Foods_Max_Order_By>;
  min?: InputMaybe<Foods_Min_Order_By>;
  stddev?: InputMaybe<Foods_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Foods_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Foods_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Foods_Sum_Order_By>;
  var_pop?: InputMaybe<Foods_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Foods_Var_Samp_Order_By>;
  variance?: InputMaybe<Foods_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "foods" */
export type Foods_Arr_Rel_Insert_Input = {
  data: Array<Foods_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Foods_On_Conflict>;
};

/** aggregate avg on columns */
export type Foods_Avg_Fields = {
  __typename?: 'foods_avg_fields';
  food_price?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "foods" */
export type Foods_Avg_Order_By = {
  food_price?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "foods". All fields are combined with a logical 'AND'. */
export type Foods_Bool_Exp = {
  _and?: InputMaybe<Array<Foods_Bool_Exp>>;
  _not?: InputMaybe<Foods_Bool_Exp>;
  _or?: InputMaybe<Array<Foods_Bool_Exp>>;
  category?: InputMaybe<Categories_Bool_Exp>;
  category_id?: InputMaybe<String_Comparison_Exp>;
  food_description?: InputMaybe<String_Comparison_Exp>;
  food_image?: InputMaybe<String_Comparison_Exp>;
  food_name?: InputMaybe<String_Comparison_Exp>;
  food_price?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "foods" */
export enum Foods_Constraint {
  /** unique or primary key constraint on columns "id" */
  FoodsPkey = 'foods_pkey'
}

/** input type for incrementing numeric columns in table "foods" */
export type Foods_Inc_Input = {
  food_price?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "foods" */
export type Foods_Insert_Input = {
  category?: InputMaybe<Categories_Obj_Rel_Insert_Input>;
  category_id?: InputMaybe<Scalars['String']['input']>;
  food_description?: InputMaybe<Scalars['String']['input']>;
  food_image?: InputMaybe<Scalars['String']['input']>;
  food_name?: InputMaybe<Scalars['String']['input']>;
  food_price?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Foods_Max_Fields = {
  __typename?: 'foods_max_fields';
  category_id?: Maybe<Scalars['String']['output']>;
  food_description?: Maybe<Scalars['String']['output']>;
  food_image?: Maybe<Scalars['String']['output']>;
  food_name?: Maybe<Scalars['String']['output']>;
  food_price?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "foods" */
export type Foods_Max_Order_By = {
  category_id?: InputMaybe<Order_By>;
  food_description?: InputMaybe<Order_By>;
  food_image?: InputMaybe<Order_By>;
  food_name?: InputMaybe<Order_By>;
  food_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Foods_Min_Fields = {
  __typename?: 'foods_min_fields';
  category_id?: Maybe<Scalars['String']['output']>;
  food_description?: Maybe<Scalars['String']['output']>;
  food_image?: Maybe<Scalars['String']['output']>;
  food_name?: Maybe<Scalars['String']['output']>;
  food_price?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "foods" */
export type Foods_Min_Order_By = {
  category_id?: InputMaybe<Order_By>;
  food_description?: InputMaybe<Order_By>;
  food_image?: InputMaybe<Order_By>;
  food_name?: InputMaybe<Order_By>;
  food_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "foods" */
export type Foods_Mutation_Response = {
  __typename?: 'foods_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Foods>;
};

/** on_conflict condition type for table "foods" */
export type Foods_On_Conflict = {
  constraint: Foods_Constraint;
  update_columns?: Array<Foods_Update_Column>;
  where?: InputMaybe<Foods_Bool_Exp>;
};

/** Ordering options when selecting data from "foods". */
export type Foods_Order_By = {
  category?: InputMaybe<Categories_Order_By>;
  category_id?: InputMaybe<Order_By>;
  food_description?: InputMaybe<Order_By>;
  food_image?: InputMaybe<Order_By>;
  food_name?: InputMaybe<Order_By>;
  food_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: foods */
export type Foods_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "foods" */
export enum Foods_Select_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  FoodDescription = 'food_description',
  /** column name */
  FoodImage = 'food_image',
  /** column name */
  FoodName = 'food_name',
  /** column name */
  FoodPrice = 'food_price',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "foods" */
export type Foods_Set_Input = {
  category_id?: InputMaybe<Scalars['String']['input']>;
  food_description?: InputMaybe<Scalars['String']['input']>;
  food_image?: InputMaybe<Scalars['String']['input']>;
  food_name?: InputMaybe<Scalars['String']['input']>;
  food_price?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Foods_Stddev_Fields = {
  __typename?: 'foods_stddev_fields';
  food_price?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "foods" */
export type Foods_Stddev_Order_By = {
  food_price?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Foods_Stddev_Pop_Fields = {
  __typename?: 'foods_stddev_pop_fields';
  food_price?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "foods" */
export type Foods_Stddev_Pop_Order_By = {
  food_price?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Foods_Stddev_Samp_Fields = {
  __typename?: 'foods_stddev_samp_fields';
  food_price?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "foods" */
export type Foods_Stddev_Samp_Order_By = {
  food_price?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "foods" */
export type Foods_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Foods_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Foods_Stream_Cursor_Value_Input = {
  category_id?: InputMaybe<Scalars['String']['input']>;
  food_description?: InputMaybe<Scalars['String']['input']>;
  food_image?: InputMaybe<Scalars['String']['input']>;
  food_name?: InputMaybe<Scalars['String']['input']>;
  food_price?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Foods_Sum_Fields = {
  __typename?: 'foods_sum_fields';
  food_price?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "foods" */
export type Foods_Sum_Order_By = {
  food_price?: InputMaybe<Order_By>;
};

/** update columns of table "foods" */
export enum Foods_Update_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  FoodDescription = 'food_description',
  /** column name */
  FoodImage = 'food_image',
  /** column name */
  FoodName = 'food_name',
  /** column name */
  FoodPrice = 'food_price',
  /** column name */
  Id = 'id'
}

export type Foods_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Foods_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Foods_Set_Input>;
  /** filter the rows which have to be updated */
  where: Foods_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Foods_Var_Pop_Fields = {
  __typename?: 'foods_var_pop_fields';
  food_price?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "foods" */
export type Foods_Var_Pop_Order_By = {
  food_price?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Foods_Var_Samp_Fields = {
  __typename?: 'foods_var_samp_fields';
  food_price?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "foods" */
export type Foods_Var_Samp_Order_By = {
  food_price?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Foods_Variance_Fields = {
  __typename?: 'foods_variance_fields';
  food_price?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "foods" */
export type Foods_Variance_Order_By = {
  food_price?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "categories" */
  delete_categories?: Maybe<Categories_Mutation_Response>;
  /** delete single row from the table: "categories" */
  delete_categories_by_pk?: Maybe<Categories>;
  /** delete data from the table: "foods" */
  delete_foods?: Maybe<Foods_Mutation_Response>;
  /** delete single row from the table: "foods" */
  delete_foods_by_pk?: Maybe<Foods>;
  /** delete data from the table: "tables" */
  delete_tables?: Maybe<Tables_Mutation_Response>;
  /** delete single row from the table: "tables" */
  delete_tables_by_pk?: Maybe<Tables>;
  /** insert data into the table: "categories" */
  insert_categories?: Maybe<Categories_Mutation_Response>;
  /** insert a single row into the table: "categories" */
  insert_categories_one?: Maybe<Categories>;
  /** insert data into the table: "foods" */
  insert_foods?: Maybe<Foods_Mutation_Response>;
  /** insert a single row into the table: "foods" */
  insert_foods_one?: Maybe<Foods>;
  /** insert data into the table: "tables" */
  insert_tables?: Maybe<Tables_Mutation_Response>;
  /** insert a single row into the table: "tables" */
  insert_tables_one?: Maybe<Tables>;
  /** update data of the table: "categories" */
  update_categories?: Maybe<Categories_Mutation_Response>;
  /** update single row of the table: "categories" */
  update_categories_by_pk?: Maybe<Categories>;
  /** update multiples rows of table: "categories" */
  update_categories_many?: Maybe<Array<Maybe<Categories_Mutation_Response>>>;
  /** update data of the table: "foods" */
  update_foods?: Maybe<Foods_Mutation_Response>;
  /** update single row of the table: "foods" */
  update_foods_by_pk?: Maybe<Foods>;
  /** update multiples rows of table: "foods" */
  update_foods_many?: Maybe<Array<Maybe<Foods_Mutation_Response>>>;
  /** update data of the table: "tables" */
  update_tables?: Maybe<Tables_Mutation_Response>;
  /** update single row of the table: "tables" */
  update_tables_by_pk?: Maybe<Tables>;
  /** update multiples rows of table: "tables" */
  update_tables_many?: Maybe<Array<Maybe<Tables_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_CategoriesArgs = {
  where: Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Categories_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_FoodsArgs = {
  where: Foods_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Foods_By_PkArgs = {
  id: Scalars['String']['input'];
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
export type Mutation_RootInsert_CategoriesArgs = {
  objects: Array<Categories_Insert_Input>;
  on_conflict?: InputMaybe<Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Categories_OneArgs = {
  object: Categories_Insert_Input;
  on_conflict?: InputMaybe<Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FoodsArgs = {
  objects: Array<Foods_Insert_Input>;
  on_conflict?: InputMaybe<Foods_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Foods_OneArgs = {
  object: Foods_Insert_Input;
  on_conflict?: InputMaybe<Foods_On_Conflict>;
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
export type Mutation_RootUpdate_CategoriesArgs = {
  _set?: InputMaybe<Categories_Set_Input>;
  where: Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Categories_By_PkArgs = {
  _set?: InputMaybe<Categories_Set_Input>;
  pk_columns: Categories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Categories_ManyArgs = {
  updates: Array<Categories_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FoodsArgs = {
  _inc?: InputMaybe<Foods_Inc_Input>;
  _set?: InputMaybe<Foods_Set_Input>;
  where: Foods_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Foods_By_PkArgs = {
  _inc?: InputMaybe<Foods_Inc_Input>;
  _set?: InputMaybe<Foods_Set_Input>;
  pk_columns: Foods_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Foods_ManyArgs = {
  updates: Array<Foods_Updates>;
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
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** An array relationship */
  foods: Array<Foods>;
  /** An aggregate relationship */
  foods_aggregate: Foods_Aggregate;
  /** fetch data from the table: "foods" using primary key columns */
  foods_by_pk?: Maybe<Foods>;
  /** fetch data from the table: "tables" */
  tables: Array<Tables>;
  /** fetch aggregated fields from the table: "tables" */
  tables_aggregate: Tables_Aggregate;
  /** fetch data from the table: "tables" using primary key columns */
  tables_by_pk?: Maybe<Tables>;
};


export type Query_RootCategoriesArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Query_RootCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Query_RootCategories_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootFoodsArgs = {
  distinct_on?: InputMaybe<Array<Foods_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Foods_Order_By>>;
  where?: InputMaybe<Foods_Bool_Exp>;
};


export type Query_RootFoods_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Foods_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Foods_Order_By>>;
  where?: InputMaybe<Foods_Bool_Exp>;
};


export type Query_RootFoods_By_PkArgs = {
  id: Scalars['String']['input'];
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
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table in a streaming manner: "categories" */
  categories_stream: Array<Categories>;
  /** An array relationship */
  foods: Array<Foods>;
  /** An aggregate relationship */
  foods_aggregate: Foods_Aggregate;
  /** fetch data from the table: "foods" using primary key columns */
  foods_by_pk?: Maybe<Foods>;
  /** fetch data from the table in a streaming manner: "foods" */
  foods_stream: Array<Foods>;
  /** fetch data from the table: "tables" */
  tables: Array<Tables>;
  /** fetch aggregated fields from the table: "tables" */
  tables_aggregate: Tables_Aggregate;
  /** fetch data from the table: "tables" using primary key columns */
  tables_by_pk?: Maybe<Tables>;
  /** fetch data from the table in a streaming manner: "tables" */
  tables_stream: Array<Tables>;
};


export type Subscription_RootCategoriesArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Subscription_RootCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Subscription_RootCategories_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootCategories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Categories_Stream_Cursor_Input>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Subscription_RootFoodsArgs = {
  distinct_on?: InputMaybe<Array<Foods_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Foods_Order_By>>;
  where?: InputMaybe<Foods_Bool_Exp>;
};


export type Subscription_RootFoods_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Foods_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Foods_Order_By>>;
  where?: InputMaybe<Foods_Bool_Exp>;
};


export type Subscription_RootFoods_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFoods_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Foods_Stream_Cursor_Input>>;
  where?: InputMaybe<Foods_Bool_Exp>;
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
