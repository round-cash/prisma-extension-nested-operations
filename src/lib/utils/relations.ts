export type RelationField = {
  name: string;
  kind: string;
  type: string;
  relationName: string;
  isList: boolean;
};

export type ModelsMeta = Record<string, { uniqueFields: string[]; uniqueIndexFields: string[]; relations: RelationField[] }>;

export function getRelationsByModel(
  modelsMeta: ModelsMeta
): Record<string, RelationField[]> {
  const relationsByModel: Record<string, RelationField[]> = {};
  for (const [modelName, meta] of Object.entries(modelsMeta)) {
    relationsByModel[modelName] = meta.relations;
  }
  return relationsByModel;
}

export function findOppositeRelation(
  relationsByModel: Record<string, RelationField[]>,
  relation: RelationField
): RelationField {
  const parentRelations = relationsByModel[relation.type] || [];

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
