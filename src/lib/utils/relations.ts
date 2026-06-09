export type RelationFieldMeta = { kind: string; isList: boolean; type: string; relationName: string };
export type RelationMeta = Record<string, Record<string, RelationFieldMeta>>;

export type RelationField = {
  name: string;
  kind: string;
  type: string;
  relationName: string;
  isList: boolean;
};

export function getRelationsByModel(
  relationMeta: RelationMeta
): Record<string, RelationField[]> {
  const relationsByModel: Record<string, RelationField[]> = {};
  for (const [modelName, fields] of Object.entries(relationMeta)) {
    relationsByModel[modelName] = Object.entries(fields).map(
      ([fieldName, meta]): RelationField => ({
        name: fieldName,
        kind: meta.kind,
        type: meta.type,
        relationName: meta.relationName,
        isList: meta.isList,
      })
    );
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
