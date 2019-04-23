# Repository to reproduce an issue on knex for Microsoft SQL Server 2017

Link to the issue: https://github.com/tgriesser/knex/issues/3160

- Initialize the database with
```
npm run db:up
```

- Execute migration script with
```
npx knex migrate:latest
```


# Environment

Knex CLI version:  0.16.3
Local Knex version:  0.16.3
Database + version: 
```
Docker version 18.09.2, build 6247962
Microsoft SQL Server 2017 (RTM-CU13) (KB4466404) - 14.0.3048.4 (X64) 
	Nov 30 2018 12:57:58 
	Copyright (C) 2017 Microsoft Corporation
	Developer Edition (64-bit) on Linux (Ubuntu 16.04.5 LTS)
```
OS: MacOS Mojave 10.14 

Select applicable tempalate from below.
For MSSql tag .
Rest of dialects doesn't need tags.

# Bug

1. Explain what kind of behaviour you are getting and how you think it should do

Hi @smorey2 , I create a migration to add default value to some columns with an alteration. I get an error message telling me that there is a syntax error.
It should generate a valid SQL request for MSSQL syntax like:
```
ALTER TABLE Table1
ADD CONSTRAINT df_Column1
DEFAULT '0' FOR Column1;
```

2. Error message

```
RequestError: Incorrect syntax near the keyword 'default'.
    at handleError (./node_modules/mssql/lib/tedious.js:519:15)
    at Connection.emit (events.js:182:13)
    at Parser.<anonymous> (./node_modules/tedious/lib/connection.js:618:16)
    at Parser.emit (events.js:182:13)
    at Parser.<anonymous> (./node_modules/tedious/lib/token/token-stream-parser.js:54:15)
    at Parser.emit (events.js:182:13)
    at addChunk (./node_modules/readable-stream/lib/_stream_readable.js:291:12)
    at readableAddChunk (./node_modules/readable-stream/lib/_stream_readable.js:278:11)
    at Parser.Readable.push (./node_modules/readable-stream/lib/_stream_readable.js:245:10)
    at Parser.Transform.push (./node_modules/readable-stream/lib/_stream_transform.js:148:32)
    at doneParsing (./node_modules/tedious/lib/token/stream-parser.js:110:18)
    at ./node_modules/tedious/lib/token/infoerror-token-parser.js:46:5
    at ./node_modules/tedious/lib/token/infoerror-token-parser.js:13:19
    at ./node_modules/tedious/lib/token/stream-parser.js:247:9
    at Parser.awaitData (./node_modules/tedious/lib/token/stream-parser.js:144:9)
    at Parser.readUInt32LE (./node_modules/tedious/lib/token/stream-parser.js:244:12)
```
Generated SQL:
```
ALTER TABLE [Table1] alter column [column1] bit not null default '0'
```


3. Reduced test code, for example in https://npm.runkit.com/knex or if it needs real
   database connection to mysql or postgresql, then single file example which initializes
   needed data and demonstrates the problem.

Code to create the table:
```
exports.up = knex => knex.schema.hasTable('Table1').then((table1Exists) => {
  if (table1Exists) {
    return knex.schema.createTable('Table1').then((table) => {
      table.boolean('column1');
    });
  }
  return null;
});
```

Code that generate the error:
```
exports.up = knex => knex.schema.hasTable('Table1').then((table1Exists) => {
  if (table1Exists) {
    return knex.schema.alterTable('Table1', (table) => {
      table.boolean('column1').notNullable().default(false).alter();
    });
  }
  return null;
});
```

