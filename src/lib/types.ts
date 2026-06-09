import type { TypeMapDef, Types } from "@prisma/client/runtime/client";
import { DeferredPromise } from "@open-draft/deferred-promise";
import type { RelationField } from "./utils/relations";

export type Modifier = "is" | "isNot" | "some" | "none" | "every";
export type LogicalOperator = "AND" | "OR" | "NOT";

export type NestedQueryOperation = "where";
export type NestedReadOperation = "include" | "select";
export type NestedWriteOperation =
  | "create"
  | "update"
  | "upsert"
  | "connectOrCreate"
  | "connect"
  | "disconnect"
  | "createMany"
  | "updateMany"
  | "delete"
  | "deleteMany";

export type NestedOperation =
  | NestedWriteOperation
  | NestedReadOperation
  | NestedQueryOperation;

export type QueryTarget = {
  operation: NestedQueryOperation;
  relationName?: string;
  modifier?: Modifier;
  logicalOperations?: { logicalOperator: LogicalOperator; index?: number }[];
  readOperation?: NestedReadOperation;
  parentTarget?: Target;
};

export type ReadTarget = {
  operation: NestedReadOperation;
  relationName?: string;
  field?: string;
  parentTarget?: Target;
};

export type WriteTarget = {
  operation: NestedWriteOperation;
  relationName: string;
  field?: string;
  index?: number;
  parentTarget?: Target;
};

export type Target = ReadTarget | WriteTarget | QueryTarget;

export type OperationCall<ExtArgs extends Types.Extensions.InternalArgs> = {
  queryPromise: DeferredPromise<any>;
  result: Promise<any>;
  updatedArgs: any;
  origin: Target;
  target: Target;
  scope?: Scope<ExtArgs>;
};

export type Scope<ExtArgs extends Types.Extensions.InternalArgs> = {
  parentParams: Omit<NestedParams<ExtArgs>, "query">;
  relations: { to: RelationField; from: RelationField };
  modifier?: Modifier;
  logicalOperators?: LogicalOperator[];
};

export type NestedParams<
  ExtArgs extends Types.Extensions.InternalArgs,
  TMap extends TypeMapDef = TypeMapDef
> = {
  query: (args: any, operation?: NestedOperation) => Promise<any>;
  model: string & keyof TMap["model"];
  args: any;
  operation: NestedOperation;
  scope?: Scope<ExtArgs>;
};

export type ExecuteFunction<
  ExtArgs extends Types.Extensions.InternalArgs = Types.Extensions.DefaultArgs,
  T = any
> = (params: NestedParams<ExtArgs>) => Promise<T>;
