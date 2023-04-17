
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  findSync
} = require('./runtime/library')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.12.0
 * Query Engine version: 659ef412370fa3b41cd7bf6e94587c1dfb7f67e7
 */
Prisma.prismaVersion = {
  client: "4.12.0",
  engine: "659ef412370fa3b41cd7bf6e94587c1dfb7f67e7"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "src/stores/mssql/prisma/generated/client",
    "stores/mssql/prisma/generated/client",
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.GpgPublicKeyScalarFieldEnum = makeEnum({
  id: 'id',
  keyId: 'keyId',
  asciiArmor: 'asciiArmor',
  trustSignature: 'trustSignature',
  source: 'source',
  sourceUrl: 'sourceUrl',
  providerId: 'providerId'
});

exports.Prisma.PlatformScalarFieldEnum = makeEnum({
  id: 'id',
  os: 'os',
  arch: 'arch',
  shasum: 'shasum',
  filename: 'filename',
  providerId: 'providerId'
});

exports.Prisma.ProtocolScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name'
});

exports.Prisma.ProviderScalarFieldEnum = makeEnum({
  id: 'id',
  namespace: 'namespace',
  type: 'type',
  published_at: 'published_at'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
  Snapshot: 'Snapshot'
});

exports.Prisma.VersionProtocolScalarFieldEnum = makeEnum({
  id: 'id',
  versionId: 'versionId',
  protocolId: 'protocolId'
});

exports.Prisma.VersionScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  providerId: 'providerId'
});


exports.Prisma.ModelName = makeEnum({
  Provider: 'Provider',
  Version: 'Version',
  VersionProtocol: 'VersionProtocol',
  Protocol: 'Protocol',
  Platform: 'Platform',
  GpgPublicKey: 'GpgPublicKey'
});

const dmmfString = "{\"datamodel\":{\"enums\":[],\"models\":[{\"name\":\"Provider\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"namespace\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"versions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Version\",\"relationName\":\"ProviderToVersion\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gpgPublicKeys\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GpgPublicKey\",\"relationName\":\"GpgPublicKeyToProvider\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"published_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Version\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Provider\",\"relationName\":\"ProviderToVersion\",\"relationFromFields\":[\"providerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"platforms\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Platform\",\"relationName\":\"PlatformToVersion\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"protocols\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"VersionProtocol\",\"relationName\":\"VersionToVersionProtocol\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"VersionProtocol\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Version\",\"relationName\":\"VersionToVersionProtocol\",\"relationFromFields\":[\"versionId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"versionId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"protocol\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Protocol\",\"relationName\":\"ProtocolToVersionProtocol\",\"relationFromFields\":[\"protocolId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"protocolId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Protocol\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"VersionProtocol\",\"relationName\":\"ProtocolToVersionProtocol\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Platform\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"os\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"arch\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"shasum\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"filename\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Version\",\"relationName\":\"PlatformToVersion\",\"relationFromFields\":[\"providerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"GpgPublicKey\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"keyId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asciiArmor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trustSignature\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"source\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sourceUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Provider\",\"relationName\":\"GpgPublicKeyToProvider\",\"relationFromFields\":[\"providerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}],\"types\":[]},\"mappings\":{\"modelOperations\":[{\"model\":\"Provider\",\"plural\":\"providers\",\"findUnique\":\"findUniqueProvider\",\"findUniqueOrThrow\":\"findUniqueProviderOrThrow\",\"findFirst\":\"findFirstProvider\",\"findFirstOrThrow\":\"findFirstProviderOrThrow\",\"findMany\":\"findManyProvider\",\"create\":\"createOneProvider\",\"createMany\":\"createManyProvider\",\"delete\":\"deleteOneProvider\",\"update\":\"updateOneProvider\",\"deleteMany\":\"deleteManyProvider\",\"updateMany\":\"updateManyProvider\",\"upsert\":\"upsertOneProvider\",\"aggregate\":\"aggregateProvider\",\"groupBy\":\"groupByProvider\"},{\"model\":\"Version\",\"plural\":\"versions\",\"findUnique\":\"findUniqueVersion\",\"findUniqueOrThrow\":\"findUniqueVersionOrThrow\",\"findFirst\":\"findFirstVersion\",\"findFirstOrThrow\":\"findFirstVersionOrThrow\",\"findMany\":\"findManyVersion\",\"create\":\"createOneVersion\",\"createMany\":\"createManyVersion\",\"delete\":\"deleteOneVersion\",\"update\":\"updateOneVersion\",\"deleteMany\":\"deleteManyVersion\",\"updateMany\":\"updateManyVersion\",\"upsert\":\"upsertOneVersion\",\"aggregate\":\"aggregateVersion\",\"groupBy\":\"groupByVersion\"},{\"model\":\"VersionProtocol\",\"plural\":\"versionProtocols\",\"findUnique\":\"findUniqueVersionProtocol\",\"findUniqueOrThrow\":\"findUniqueVersionProtocolOrThrow\",\"findFirst\":\"findFirstVersionProtocol\",\"findFirstOrThrow\":\"findFirstVersionProtocolOrThrow\",\"findMany\":\"findManyVersionProtocol\",\"create\":\"createOneVersionProtocol\",\"createMany\":\"createManyVersionProtocol\",\"delete\":\"deleteOneVersionProtocol\",\"update\":\"updateOneVersionProtocol\",\"deleteMany\":\"deleteManyVersionProtocol\",\"updateMany\":\"updateManyVersionProtocol\",\"upsert\":\"upsertOneVersionProtocol\",\"aggregate\":\"aggregateVersionProtocol\",\"groupBy\":\"groupByVersionProtocol\"},{\"model\":\"Protocol\",\"plural\":\"protocols\",\"findUnique\":\"findUniqueProtocol\",\"findUniqueOrThrow\":\"findUniqueProtocolOrThrow\",\"findFirst\":\"findFirstProtocol\",\"findFirstOrThrow\":\"findFirstProtocolOrThrow\",\"findMany\":\"findManyProtocol\",\"create\":\"createOneProtocol\",\"createMany\":\"createManyProtocol\",\"delete\":\"deleteOneProtocol\",\"update\":\"updateOneProtocol\",\"deleteMany\":\"deleteManyProtocol\",\"updateMany\":\"updateManyProtocol\",\"upsert\":\"upsertOneProtocol\",\"aggregate\":\"aggregateProtocol\",\"groupBy\":\"groupByProtocol\"},{\"model\":\"Platform\",\"plural\":\"platforms\",\"findUnique\":\"findUniquePlatform\",\"findUniqueOrThrow\":\"findUniquePlatformOrThrow\",\"findFirst\":\"findFirstPlatform\",\"findFirstOrThrow\":\"findFirstPlatformOrThrow\",\"findMany\":\"findManyPlatform\",\"create\":\"createOnePlatform\",\"createMany\":\"createManyPlatform\",\"delete\":\"deleteOnePlatform\",\"update\":\"updateOnePlatform\",\"deleteMany\":\"deleteManyPlatform\",\"updateMany\":\"updateManyPlatform\",\"upsert\":\"upsertOnePlatform\",\"aggregate\":\"aggregatePlatform\",\"groupBy\":\"groupByPlatform\"},{\"model\":\"GpgPublicKey\",\"plural\":\"gpgPublicKeys\",\"findUnique\":\"findUniqueGpgPublicKey\",\"findUniqueOrThrow\":\"findUniqueGpgPublicKeyOrThrow\",\"findFirst\":\"findFirstGpgPublicKey\",\"findFirstOrThrow\":\"findFirstGpgPublicKeyOrThrow\",\"findMany\":\"findManyGpgPublicKey\",\"create\":\"createOneGpgPublicKey\",\"createMany\":\"createManyGpgPublicKey\",\"delete\":\"deleteOneGpgPublicKey\",\"update\":\"updateOneGpgPublicKey\",\"deleteMany\":\"deleteManyGpgPublicKey\",\"updateMany\":\"updateManyGpgPublicKey\",\"upsert\":\"upsertOneGpgPublicKey\",\"aggregate\":\"aggregateGpgPublicKey\",\"groupBy\":\"groupByGpgPublicKey\"}],\"otherOperations\":{\"read\":[],\"write\":[\"executeRaw\",\"queryRaw\"]}}}"
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/kuala/Documents/Projects/MBCP/TFRegNodeTS/src/stores/mssql/prisma/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../..",
  "clientVersion": "4.12.0",
  "engineVersion": "659ef412370fa3b41cd7bf6e94587c1dfb7f67e7",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "sqlserver",
  "dataProxy": false
}
config.dirname = dirname
config.document = dmmf




const { warnEnvConflicts } = require('./runtime/library')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})


const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "src/stores/mssql/prisma/generated/client/libquery_engine-darwin-arm64.dylib.node")
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/stores/mssql/prisma/generated/client/schema.prisma")
