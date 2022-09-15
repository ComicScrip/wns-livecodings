const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Wilder',
  columns: {
    id: {
      primary: true,
      generated: true,
      type: 'int',
    },
    name: {
      type: 'text',
    },
  },
  relations: {
    skills: {
      target: 'Skill',
      type: 'many-to-many',
      joinTable: true,
      eager: true,
    },
  },
});
