import { isDbNull, isJsonNull, isAnyNull } from "@prisma/client/runtime/client";
import { cloneDeepWith } from "lodash";

function passThroughNullTypes(value: any) {
  if (isDbNull(value) || isJsonNull(value) || isAnyNull(value)) {
    return value;
  }
}

export function cloneArgs(args: any) {
  return cloneDeepWith(args, passThroughNullTypes);
}
