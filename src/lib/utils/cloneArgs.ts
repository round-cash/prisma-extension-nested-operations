import { objectEnumValues } from "@prisma/client/runtime/library";
import { cloneDeepWith } from "lodash";

// Prisma v4 requires that instances of Prisma.NullTypes are not cloned,
// otherwise it will parse them as 'undefined' and the operation will fail.
function passThroughNullTypes(value: any) {
  if (
    value instanceof objectEnumValues.classes.DbNull ||
    value instanceof objectEnumValues.classes.JsonNull ||
    value instanceof objectEnumValues.classes.AnyNull
  ) {
    return value;
  }
}

export function cloneArgs(args: any) {
  return cloneDeepWith(args, passThroughNullTypes);
}
