import type { ModelName } from "../../../generated/prisma/internal/prismaNamespace";
import type {
  UserDelegate, UserSelect, UserInclude,
  PostDelegate, PostSelect, PostInclude,
  ProfileDelegate, ProfileSelect, ProfileInclude,
  CommentDelegate, CommentSelect, CommentInclude,
} from "../../../generated/prisma/models";

type AnyExtension = { client: any, model: any, query: any; result: any }

type DelegateByModel<Model extends ModelName> = Model extends "User"
  ? UserDelegate<AnyExtension>
  : Model extends "Post"
  ? PostDelegate<AnyExtension>
  : Model extends "Profile"
  ? ProfileDelegate<AnyExtension>
  : Model extends "Comment"
  ? CommentDelegate<AnyExtension>
  : never;

type SelectByModel<Model extends ModelName> = Model extends "User"
  ? UserSelect
  : Model extends "Post"
  ? PostSelect
  : Model extends "Profile"
  ? ProfileSelect
  : Model extends "Comment"
  ? CommentSelect
  : never;

type IncludeByModel<Model extends ModelName> = Model extends "User"
  ? UserInclude
  : Model extends "Post"
  ? PostInclude
  : Model extends "Profile"
  ? ProfileInclude
  : Model extends "Comment"
  ? CommentInclude
  : never;

type ActionByModel<Model extends ModelName> =
  | keyof DelegateByModel<Model>
  | "connectOrCreate"
  | "select"
  | "include"
  | "where";

type ArgsByAction<
  Model extends ModelName,
  Action extends ActionByModel<Model>
> = Action extends "create"
  ? Parameters<DelegateByModel<Model>["create"]>[0]
  : Action extends "update"
  ? Parameters<DelegateByModel<Model>["update"]>[0]
  : Action extends "upsert"
  ? Parameters<DelegateByModel<Model>["upsert"]>[0]
  : Action extends "delete"
  ? Parameters<DelegateByModel<Model>["delete"]>[0]
  : Action extends "createMany"
  ? Parameters<DelegateByModel<Model>["createMany"]>[0]
  : Action extends "updateMany"
  ? Parameters<DelegateByModel<Model>["updateMany"]>[0]
  : Action extends "deleteMany"
  ? Parameters<DelegateByModel<Model>["deleteMany"]>[0]
  : Action extends "findUnique"
  ? Parameters<DelegateByModel<Model>["findUnique"]>[0]
  : Action extends "findFirst"
  ? Parameters<DelegateByModel<Model>["findFirst"]>[0]
  : Action extends "findMany"
  ? Parameters<DelegateByModel<Model>["findMany"]>[0]
  : Action extends "count"
  ? Parameters<DelegateByModel<Model>["count"]>[0]
  : Action extends "aggregate"
  ? Parameters<DelegateByModel<Model>["aggregate"]>[0]
  : Action extends "groupBy"
  ? Parameters<DelegateByModel<Model>["groupBy"]>[0]
  : Action extends "connectOrCreate"
  ? {
      where: Parameters<DelegateByModel<Model>["findUnique"]>[0];
      create: Parameters<DelegateByModel<Model>["create"]>[0];
    }
  : Action extends "select"
  ? SelectByModel<Model>
  : Action extends "include"
  ? IncludeByModel<Model>
  : never;

export const createParams = <
  Model extends ModelName,
  Action extends ActionByModel<Model> = ActionByModel<Model>,
>(
  query: (args: any) => Promise<any>,
  model: Model,
  operation: Action,
  args: ArgsByAction<Model, Action>,
) => ({
  query: query as any,
  model,
  operation: operation as any,
  args: args as any,
});
