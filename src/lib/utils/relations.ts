import type { Prisma } from "@prisma/client";
import type { BaseDMMF } from "@prisma/client/runtime/library";

export function getRelationsByModel(
  dmmf: BaseDMMF
): Record<string, Prisma.DMMF.Field[]> {
  const relationsByModel: Record<string, Prisma.DMMF.Field[]> = {};
  dmmf.datamodel.models.forEach((model: Prisma.DMMF.Model) => {
    relationsByModel[model.name] = model.fields.filter(
      (field) => field.kind === "object" && field.relationName
    );
  });
  return relationsByModel;
}

export function findOppositeRelation(
  relationsByModel: Record<string, Prisma.DMMF.Field[]>,
  relation: Prisma.DMMF.Field
): Prisma.DMMF.Field {
  const parentRelations =
    relationsByModel[relation.type as Prisma.ModelName] || [];

  const oppositeRelation = parentRelations.find(
    (parentRelation) =>
      parentRelation !== relation &&
      parentRelation.relationName === relation.relationName
  );

  if (!oppositeRelation) {
    throw new Error(`Unable to find opposite relation to ${relation.name}`);
  }

  return oppositeRelation;
}
