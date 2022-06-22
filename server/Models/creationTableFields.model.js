class creationTableFields {
  constructor(
    fieldName,
    fieldType,
    canBeNull = true,
    isUnique = false,
    isPrimaryKey = false,
    isAutoIncrement = false
  ) {
    this.fieldName = fieldName;
    this.fieldType = fieldType;
    this.canBeNull = canBeNull;
    this.isUnique = isUnique;
    this.isPrimaryKey = isPrimaryKey;
    this.isAutoIncrement = isAutoIncrement;
  }
}

module.exports.creationTableFields = creationTableFields;
