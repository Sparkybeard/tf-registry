
/**
 * Client
**/

import * as runtime from './runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model Provider
 * 
 */
export type Provider = {
  id: number
  namespace: string
  type: string
  published_at: Date
}

/**
 * Model Version
 * 
 */
export type Version = {
  id: number
  name: string
  providerId: number
}

/**
 * Model VersionProtocol
 * 
 */
export type VersionProtocol = {
  id: number
  versionId: number
  protocolId: number
}

/**
 * Model Protocol
 * 
 */
export type Protocol = {
  id: number
  name: string
}

/**
 * Model Platform
 * 
 */
export type Platform = {
  id: number
  os: string
  arch: string
  shasum: string
  filename: string
  providerId: number
}

/**
 * Model GpgPublicKey
 * 
 */
export type GpgPublicKey = {
  id: number
  keyId: string
  asciiArmor: string
  trustSignature: string
  source: string
  sourceUrl: string
  providerId: number
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Providers
 * const providers = await prisma.provider.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Providers
   * const providers = await prisma.provider.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.provider`: Exposes CRUD operations for the **Provider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Providers
    * const providers = await prisma.provider.findMany()
    * ```
    */
  get provider(): Prisma.ProviderDelegate<GlobalReject>;

  /**
   * `prisma.version`: Exposes CRUD operations for the **Version** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Versions
    * const versions = await prisma.version.findMany()
    * ```
    */
  get version(): Prisma.VersionDelegate<GlobalReject>;

  /**
   * `prisma.versionProtocol`: Exposes CRUD operations for the **VersionProtocol** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VersionProtocols
    * const versionProtocols = await prisma.versionProtocol.findMany()
    * ```
    */
  get versionProtocol(): Prisma.VersionProtocolDelegate<GlobalReject>;

  /**
   * `prisma.protocol`: Exposes CRUD operations for the **Protocol** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Protocols
    * const protocols = await prisma.protocol.findMany()
    * ```
    */
  get protocol(): Prisma.ProtocolDelegate<GlobalReject>;

  /**
   * `prisma.platform`: Exposes CRUD operations for the **Platform** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Platforms
    * const platforms = await prisma.platform.findMany()
    * ```
    */
  get platform(): Prisma.PlatformDelegate<GlobalReject>;

  /**
   * `prisma.gpgPublicKey`: Exposes CRUD operations for the **GpgPublicKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GpgPublicKeys
    * const gpgPublicKeys = await prisma.gpgPublicKey.findMany()
    * ```
    */
  get gpgPublicKey(): Prisma.GpgPublicKeyDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.12.0
   * Query Engine version: 659ef412370fa3b41cd7bf6e94587c1dfb7f67e7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Provider: 'Provider',
    Version: 'Version',
    VersionProtocol: 'VersionProtocol',
    Protocol: 'Protocol',
    Platform: 'Platform',
    GpgPublicKey: 'GpgPublicKey'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProviderCountOutputType
   */


  export type ProviderCountOutputType = {
    versions: number
    gpgPublicKeys: number
  }

  export type ProviderCountOutputTypeSelect = {
    versions?: boolean
    gpgPublicKeys?: boolean
  }

  export type ProviderCountOutputTypeGetPayload<S extends boolean | null | undefined | ProviderCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ProviderCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ProviderCountOutputTypeArgs)
    ? ProviderCountOutputType 
    : S extends { select: any } & (ProviderCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ProviderCountOutputType ? ProviderCountOutputType[P] : never
  } 
      : ProviderCountOutputType




  // Custom InputTypes

  /**
   * ProviderCountOutputType without action
   */
  export type ProviderCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProviderCountOutputType
     */
    select?: ProviderCountOutputTypeSelect | null
  }



  /**
   * Count Type VersionCountOutputType
   */


  export type VersionCountOutputType = {
    platforms: number
    protocols: number
  }

  export type VersionCountOutputTypeSelect = {
    platforms?: boolean
    protocols?: boolean
  }

  export type VersionCountOutputTypeGetPayload<S extends boolean | null | undefined | VersionCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? VersionCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (VersionCountOutputTypeArgs)
    ? VersionCountOutputType 
    : S extends { select: any } & (VersionCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof VersionCountOutputType ? VersionCountOutputType[P] : never
  } 
      : VersionCountOutputType




  // Custom InputTypes

  /**
   * VersionCountOutputType without action
   */
  export type VersionCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the VersionCountOutputType
     */
    select?: VersionCountOutputTypeSelect | null
  }



  /**
   * Count Type ProtocolCountOutputType
   */


  export type ProtocolCountOutputType = {
    providers: number
  }

  export type ProtocolCountOutputTypeSelect = {
    providers?: boolean
  }

  export type ProtocolCountOutputTypeGetPayload<S extends boolean | null | undefined | ProtocolCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ProtocolCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ProtocolCountOutputTypeArgs)
    ? ProtocolCountOutputType 
    : S extends { select: any } & (ProtocolCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ProtocolCountOutputType ? ProtocolCountOutputType[P] : never
  } 
      : ProtocolCountOutputType




  // Custom InputTypes

  /**
   * ProtocolCountOutputType without action
   */
  export type ProtocolCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProtocolCountOutputType
     */
    select?: ProtocolCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Provider
   */


  export type AggregateProvider = {
    _count: ProviderCountAggregateOutputType | null
    _avg: ProviderAvgAggregateOutputType | null
    _sum: ProviderSumAggregateOutputType | null
    _min: ProviderMinAggregateOutputType | null
    _max: ProviderMaxAggregateOutputType | null
  }

  export type ProviderAvgAggregateOutputType = {
    id: number | null
  }

  export type ProviderSumAggregateOutputType = {
    id: number | null
  }

  export type ProviderMinAggregateOutputType = {
    id: number | null
    namespace: string | null
    type: string | null
    published_at: Date | null
  }

  export type ProviderMaxAggregateOutputType = {
    id: number | null
    namespace: string | null
    type: string | null
    published_at: Date | null
  }

  export type ProviderCountAggregateOutputType = {
    id: number
    namespace: number
    type: number
    published_at: number
    _all: number
  }


  export type ProviderAvgAggregateInputType = {
    id?: true
  }

  export type ProviderSumAggregateInputType = {
    id?: true
  }

  export type ProviderMinAggregateInputType = {
    id?: true
    namespace?: true
    type?: true
    published_at?: true
  }

  export type ProviderMaxAggregateInputType = {
    id?: true
    namespace?: true
    type?: true
    published_at?: true
  }

  export type ProviderCountAggregateInputType = {
    id?: true
    namespace?: true
    type?: true
    published_at?: true
    _all?: true
  }

  export type ProviderAggregateArgs = {
    /**
     * Filter which Provider to aggregate.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: Enumerable<ProviderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Providers
    **/
    _count?: true | ProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProviderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProviderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProviderMaxAggregateInputType
  }

  export type GetProviderAggregateType<T extends ProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProvider[P]>
      : GetScalarType<T[P], AggregateProvider[P]>
  }




  export type ProviderGroupByArgs = {
    where?: ProviderWhereInput
    orderBy?: Enumerable<ProviderOrderByWithAggregationInput>
    by: ProviderScalarFieldEnum[]
    having?: ProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProviderCountAggregateInputType | true
    _avg?: ProviderAvgAggregateInputType
    _sum?: ProviderSumAggregateInputType
    _min?: ProviderMinAggregateInputType
    _max?: ProviderMaxAggregateInputType
  }


  export type ProviderGroupByOutputType = {
    id: number
    namespace: string
    type: string
    published_at: Date
    _count: ProviderCountAggregateOutputType | null
    _avg: ProviderAvgAggregateOutputType | null
    _sum: ProviderSumAggregateOutputType | null
    _min: ProviderMinAggregateOutputType | null
    _max: ProviderMaxAggregateOutputType | null
  }

  type GetProviderGroupByPayload<T extends ProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProviderGroupByOutputType[P]>
            : GetScalarType<T[P], ProviderGroupByOutputType[P]>
        }
      >
    >


  export type ProviderSelect = {
    id?: boolean
    namespace?: boolean
    type?: boolean
    published_at?: boolean
    versions?: boolean | Provider$versionsArgs
    gpgPublicKeys?: boolean | Provider$gpgPublicKeysArgs
    _count?: boolean | ProviderCountOutputTypeArgs
  }


  export type ProviderInclude = {
    versions?: boolean | Provider$versionsArgs
    gpgPublicKeys?: boolean | Provider$gpgPublicKeysArgs
    _count?: boolean | ProviderCountOutputTypeArgs
  }

  export type ProviderGetPayload<S extends boolean | null | undefined | ProviderArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Provider :
    S extends undefined ? never :
    S extends { include: any } & (ProviderArgs | ProviderFindManyArgs)
    ? Provider  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'versions' ? Array < VersionGetPayload<S['include'][P]>>  :
        P extends 'gpgPublicKeys' ? Array < GpgPublicKeyGetPayload<S['include'][P]>>  :
        P extends '_count' ? ProviderCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ProviderArgs | ProviderFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'versions' ? Array < VersionGetPayload<S['select'][P]>>  :
        P extends 'gpgPublicKeys' ? Array < GpgPublicKeyGetPayload<S['select'][P]>>  :
        P extends '_count' ? ProviderCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Provider ? Provider[P] : never
  } 
      : Provider


  type ProviderCountArgs = 
    Omit<ProviderFindManyArgs, 'select' | 'include'> & {
      select?: ProviderCountAggregateInputType | true
    }

  export interface ProviderDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Provider that matches the filter.
     * @param {ProviderFindUniqueArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProviderFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProviderFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Provider'> extends True ? Prisma__ProviderClient<ProviderGetPayload<T>> : Prisma__ProviderClient<ProviderGetPayload<T> | null, null>

    /**
     * Find one Provider that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ProviderFindUniqueOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProviderFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProviderFindUniqueOrThrowArgs>
    ): Prisma__ProviderClient<ProviderGetPayload<T>>

    /**
     * Find the first Provider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProviderFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProviderFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Provider'> extends True ? Prisma__ProviderClient<ProviderGetPayload<T>> : Prisma__ProviderClient<ProviderGetPayload<T> | null, null>

    /**
     * Find the first Provider that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProviderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProviderFindFirstOrThrowArgs>
    ): Prisma__ProviderClient<ProviderGetPayload<T>>

    /**
     * Find zero or more Providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Providers
     * const providers = await prisma.provider.findMany()
     * 
     * // Get first 10 Providers
     * const providers = await prisma.provider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const providerWithIdOnly = await prisma.provider.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProviderFindManyArgs>(
      args?: SelectSubset<T, ProviderFindManyArgs>
    ): Prisma.PrismaPromise<Array<ProviderGetPayload<T>>>

    /**
     * Create a Provider.
     * @param {ProviderCreateArgs} args - Arguments to create a Provider.
     * @example
     * // Create one Provider
     * const Provider = await prisma.provider.create({
     *   data: {
     *     // ... data to create a Provider
     *   }
     * })
     * 
    **/
    create<T extends ProviderCreateArgs>(
      args: SelectSubset<T, ProviderCreateArgs>
    ): Prisma__ProviderClient<ProviderGetPayload<T>>

    /**
     * Create many Providers.
     *     @param {ProviderCreateManyArgs} args - Arguments to create many Providers.
     *     @example
     *     // Create many Providers
     *     const provider = await prisma.provider.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProviderCreateManyArgs>(
      args?: SelectSubset<T, ProviderCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Provider.
     * @param {ProviderDeleteArgs} args - Arguments to delete one Provider.
     * @example
     * // Delete one Provider
     * const Provider = await prisma.provider.delete({
     *   where: {
     *     // ... filter to delete one Provider
     *   }
     * })
     * 
    **/
    delete<T extends ProviderDeleteArgs>(
      args: SelectSubset<T, ProviderDeleteArgs>
    ): Prisma__ProviderClient<ProviderGetPayload<T>>

    /**
     * Update one Provider.
     * @param {ProviderUpdateArgs} args - Arguments to update one Provider.
     * @example
     * // Update one Provider
     * const provider = await prisma.provider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProviderUpdateArgs>(
      args: SelectSubset<T, ProviderUpdateArgs>
    ): Prisma__ProviderClient<ProviderGetPayload<T>>

    /**
     * Delete zero or more Providers.
     * @param {ProviderDeleteManyArgs} args - Arguments to filter Providers to delete.
     * @example
     * // Delete a few Providers
     * const { count } = await prisma.provider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProviderDeleteManyArgs>(
      args?: SelectSubset<T, ProviderDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Providers
     * const provider = await prisma.provider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProviderUpdateManyArgs>(
      args: SelectSubset<T, ProviderUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Provider.
     * @param {ProviderUpsertArgs} args - Arguments to update or create a Provider.
     * @example
     * // Update or create a Provider
     * const provider = await prisma.provider.upsert({
     *   create: {
     *     // ... data to create a Provider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Provider we want to update
     *   }
     * })
    **/
    upsert<T extends ProviderUpsertArgs>(
      args: SelectSubset<T, ProviderUpsertArgs>
    ): Prisma__ProviderClient<ProviderGetPayload<T>>

    /**
     * Count the number of Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCountArgs} args - Arguments to filter Providers to count.
     * @example
     * // Count the number of Providers
     * const count = await prisma.provider.count({
     *   where: {
     *     // ... the filter for the Providers we want to count
     *   }
     * })
    **/
    count<T extends ProviderCountArgs>(
      args?: Subset<T, ProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProviderAggregateArgs>(args: Subset<T, ProviderAggregateArgs>): Prisma.PrismaPromise<GetProviderAggregateType<T>>

    /**
     * Group by Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProviderGroupByArgs['orderBy'] }
        : { orderBy?: ProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Provider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProviderClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    versions<T extends Provider$versionsArgs= {}>(args?: Subset<T, Provider$versionsArgs>): Prisma.PrismaPromise<Array<VersionGetPayload<T>>| Null>;

    gpgPublicKeys<T extends Provider$gpgPublicKeysArgs= {}>(args?: Subset<T, Provider$gpgPublicKeysArgs>): Prisma.PrismaPromise<Array<GpgPublicKeyGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Provider base type for findUnique actions
   */
  export type ProviderFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProviderInclude | null
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider findUnique
   */
  export interface ProviderFindUniqueArgs extends ProviderFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Provider findUniqueOrThrow
   */
  export type ProviderFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProviderInclude | null
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput
  }


  /**
   * Provider base type for findFirst actions
   */
  export type ProviderFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProviderInclude | null
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: Enumerable<ProviderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: Enumerable<ProviderScalarFieldEnum>
  }

  /**
   * Provider findFirst
   */
  export interface ProviderFindFirstArgs extends ProviderFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Provider findFirstOrThrow
   */
  export type ProviderFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProviderInclude | null
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: Enumerable<ProviderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: Enumerable<ProviderScalarFieldEnum>
  }


  /**
   * Provider findMany
   */
  export type ProviderFindManyArgs = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProviderInclude | null
    /**
     * Filter, which Providers to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: Enumerable<ProviderOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    distinct?: Enumerable<ProviderScalarFieldEnum>
  }


  /**
   * Provider create
   */
  export type ProviderCreateArgs = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProviderInclude | null
    /**
     * The data needed to create a Provider.
     */
    data: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>
  }


  /**
   * Provider createMany
   */
  export type ProviderCreateManyArgs = {
    /**
     * The data used to create many Providers.
     */
    data: Enumerable<ProviderCreateManyInput>
  }


  /**
   * Provider update
   */
  export type ProviderUpdateArgs = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProviderInclude | null
    /**
     * The data needed to update a Provider.
     */
    data: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>
    /**
     * Choose, which Provider to update.
     */
    where: ProviderWhereUniqueInput
  }


  /**
   * Provider updateMany
   */
  export type ProviderUpdateManyArgs = {
    /**
     * The data used to update Providers.
     */
    data: XOR<ProviderUpdateManyMutationInput, ProviderUncheckedUpdateManyInput>
    /**
     * Filter which Providers to update
     */
    where?: ProviderWhereInput
  }


  /**
   * Provider upsert
   */
  export type ProviderUpsertArgs = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProviderInclude | null
    /**
     * The filter to search for the Provider to update in case it exists.
     */
    where: ProviderWhereUniqueInput
    /**
     * In case the Provider found by the `where` argument doesn't exist, create a new Provider with this data.
     */
    create: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>
    /**
     * In case the Provider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>
  }


  /**
   * Provider delete
   */
  export type ProviderDeleteArgs = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProviderInclude | null
    /**
     * Filter which Provider to delete.
     */
    where: ProviderWhereUniqueInput
  }


  /**
   * Provider deleteMany
   */
  export type ProviderDeleteManyArgs = {
    /**
     * Filter which Providers to delete
     */
    where?: ProviderWhereInput
  }


  /**
   * Provider.versions
   */
  export type Provider$versionsArgs = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
    where?: VersionWhereInput
    orderBy?: Enumerable<VersionOrderByWithRelationInput>
    cursor?: VersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<VersionScalarFieldEnum>
  }


  /**
   * Provider.gpgPublicKeys
   */
  export type Provider$gpgPublicKeysArgs = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
    where?: GpgPublicKeyWhereInput
    orderBy?: Enumerable<GpgPublicKeyOrderByWithRelationInput>
    cursor?: GpgPublicKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<GpgPublicKeyScalarFieldEnum>
  }


  /**
   * Provider without action
   */
  export type ProviderArgs = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProviderInclude | null
  }



  /**
   * Model Version
   */


  export type AggregateVersion = {
    _count: VersionCountAggregateOutputType | null
    _avg: VersionAvgAggregateOutputType | null
    _sum: VersionSumAggregateOutputType | null
    _min: VersionMinAggregateOutputType | null
    _max: VersionMaxAggregateOutputType | null
  }

  export type VersionAvgAggregateOutputType = {
    id: number | null
    providerId: number | null
  }

  export type VersionSumAggregateOutputType = {
    id: number | null
    providerId: number | null
  }

  export type VersionMinAggregateOutputType = {
    id: number | null
    name: string | null
    providerId: number | null
  }

  export type VersionMaxAggregateOutputType = {
    id: number | null
    name: string | null
    providerId: number | null
  }

  export type VersionCountAggregateOutputType = {
    id: number
    name: number
    providerId: number
    _all: number
  }


  export type VersionAvgAggregateInputType = {
    id?: true
    providerId?: true
  }

  export type VersionSumAggregateInputType = {
    id?: true
    providerId?: true
  }

  export type VersionMinAggregateInputType = {
    id?: true
    name?: true
    providerId?: true
  }

  export type VersionMaxAggregateInputType = {
    id?: true
    name?: true
    providerId?: true
  }

  export type VersionCountAggregateInputType = {
    id?: true
    name?: true
    providerId?: true
    _all?: true
  }

  export type VersionAggregateArgs = {
    /**
     * Filter which Version to aggregate.
     */
    where?: VersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Versions to fetch.
     */
    orderBy?: Enumerable<VersionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Versions
    **/
    _count?: true | VersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VersionMaxAggregateInputType
  }

  export type GetVersionAggregateType<T extends VersionAggregateArgs> = {
        [P in keyof T & keyof AggregateVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVersion[P]>
      : GetScalarType<T[P], AggregateVersion[P]>
  }




  export type VersionGroupByArgs = {
    where?: VersionWhereInput
    orderBy?: Enumerable<VersionOrderByWithAggregationInput>
    by: VersionScalarFieldEnum[]
    having?: VersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VersionCountAggregateInputType | true
    _avg?: VersionAvgAggregateInputType
    _sum?: VersionSumAggregateInputType
    _min?: VersionMinAggregateInputType
    _max?: VersionMaxAggregateInputType
  }


  export type VersionGroupByOutputType = {
    id: number
    name: string
    providerId: number
    _count: VersionCountAggregateOutputType | null
    _avg: VersionAvgAggregateOutputType | null
    _sum: VersionSumAggregateOutputType | null
    _min: VersionMinAggregateOutputType | null
    _max: VersionMaxAggregateOutputType | null
  }

  type GetVersionGroupByPayload<T extends VersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<VersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VersionGroupByOutputType[P]>
            : GetScalarType<T[P], VersionGroupByOutputType[P]>
        }
      >
    >


  export type VersionSelect = {
    id?: boolean
    name?: boolean
    providerId?: boolean
    provider?: boolean | ProviderArgs
    platforms?: boolean | Version$platformsArgs
    protocols?: boolean | Version$protocolsArgs
    _count?: boolean | VersionCountOutputTypeArgs
  }


  export type VersionInclude = {
    provider?: boolean | ProviderArgs
    platforms?: boolean | Version$platformsArgs
    protocols?: boolean | Version$protocolsArgs
    _count?: boolean | VersionCountOutputTypeArgs
  }

  export type VersionGetPayload<S extends boolean | null | undefined | VersionArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Version :
    S extends undefined ? never :
    S extends { include: any } & (VersionArgs | VersionFindManyArgs)
    ? Version  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'provider' ? ProviderGetPayload<S['include'][P]> :
        P extends 'platforms' ? Array < PlatformGetPayload<S['include'][P]>>  :
        P extends 'protocols' ? Array < VersionProtocolGetPayload<S['include'][P]>>  :
        P extends '_count' ? VersionCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (VersionArgs | VersionFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'provider' ? ProviderGetPayload<S['select'][P]> :
        P extends 'platforms' ? Array < PlatformGetPayload<S['select'][P]>>  :
        P extends 'protocols' ? Array < VersionProtocolGetPayload<S['select'][P]>>  :
        P extends '_count' ? VersionCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Version ? Version[P] : never
  } 
      : Version


  type VersionCountArgs = 
    Omit<VersionFindManyArgs, 'select' | 'include'> & {
      select?: VersionCountAggregateInputType | true
    }

  export interface VersionDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Version that matches the filter.
     * @param {VersionFindUniqueArgs} args - Arguments to find a Version
     * @example
     * // Get one Version
     * const version = await prisma.version.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends VersionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, VersionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Version'> extends True ? Prisma__VersionClient<VersionGetPayload<T>> : Prisma__VersionClient<VersionGetPayload<T> | null, null>

    /**
     * Find one Version that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {VersionFindUniqueOrThrowArgs} args - Arguments to find a Version
     * @example
     * // Get one Version
     * const version = await prisma.version.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends VersionFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, VersionFindUniqueOrThrowArgs>
    ): Prisma__VersionClient<VersionGetPayload<T>>

    /**
     * Find the first Version that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionFindFirstArgs} args - Arguments to find a Version
     * @example
     * // Get one Version
     * const version = await prisma.version.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends VersionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, VersionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Version'> extends True ? Prisma__VersionClient<VersionGetPayload<T>> : Prisma__VersionClient<VersionGetPayload<T> | null, null>

    /**
     * Find the first Version that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionFindFirstOrThrowArgs} args - Arguments to find a Version
     * @example
     * // Get one Version
     * const version = await prisma.version.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends VersionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VersionFindFirstOrThrowArgs>
    ): Prisma__VersionClient<VersionGetPayload<T>>

    /**
     * Find zero or more Versions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Versions
     * const versions = await prisma.version.findMany()
     * 
     * // Get first 10 Versions
     * const versions = await prisma.version.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const versionWithIdOnly = await prisma.version.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends VersionFindManyArgs>(
      args?: SelectSubset<T, VersionFindManyArgs>
    ): Prisma.PrismaPromise<Array<VersionGetPayload<T>>>

    /**
     * Create a Version.
     * @param {VersionCreateArgs} args - Arguments to create a Version.
     * @example
     * // Create one Version
     * const Version = await prisma.version.create({
     *   data: {
     *     // ... data to create a Version
     *   }
     * })
     * 
    **/
    create<T extends VersionCreateArgs>(
      args: SelectSubset<T, VersionCreateArgs>
    ): Prisma__VersionClient<VersionGetPayload<T>>

    /**
     * Create many Versions.
     *     @param {VersionCreateManyArgs} args - Arguments to create many Versions.
     *     @example
     *     // Create many Versions
     *     const version = await prisma.version.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends VersionCreateManyArgs>(
      args?: SelectSubset<T, VersionCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Version.
     * @param {VersionDeleteArgs} args - Arguments to delete one Version.
     * @example
     * // Delete one Version
     * const Version = await prisma.version.delete({
     *   where: {
     *     // ... filter to delete one Version
     *   }
     * })
     * 
    **/
    delete<T extends VersionDeleteArgs>(
      args: SelectSubset<T, VersionDeleteArgs>
    ): Prisma__VersionClient<VersionGetPayload<T>>

    /**
     * Update one Version.
     * @param {VersionUpdateArgs} args - Arguments to update one Version.
     * @example
     * // Update one Version
     * const version = await prisma.version.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends VersionUpdateArgs>(
      args: SelectSubset<T, VersionUpdateArgs>
    ): Prisma__VersionClient<VersionGetPayload<T>>

    /**
     * Delete zero or more Versions.
     * @param {VersionDeleteManyArgs} args - Arguments to filter Versions to delete.
     * @example
     * // Delete a few Versions
     * const { count } = await prisma.version.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends VersionDeleteManyArgs>(
      args?: SelectSubset<T, VersionDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Versions
     * const version = await prisma.version.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends VersionUpdateManyArgs>(
      args: SelectSubset<T, VersionUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Version.
     * @param {VersionUpsertArgs} args - Arguments to update or create a Version.
     * @example
     * // Update or create a Version
     * const version = await prisma.version.upsert({
     *   create: {
     *     // ... data to create a Version
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Version we want to update
     *   }
     * })
    **/
    upsert<T extends VersionUpsertArgs>(
      args: SelectSubset<T, VersionUpsertArgs>
    ): Prisma__VersionClient<VersionGetPayload<T>>

    /**
     * Count the number of Versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionCountArgs} args - Arguments to filter Versions to count.
     * @example
     * // Count the number of Versions
     * const count = await prisma.version.count({
     *   where: {
     *     // ... the filter for the Versions we want to count
     *   }
     * })
    **/
    count<T extends VersionCountArgs>(
      args?: Subset<T, VersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Version.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VersionAggregateArgs>(args: Subset<T, VersionAggregateArgs>): Prisma.PrismaPromise<GetVersionAggregateType<T>>

    /**
     * Group by Version.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VersionGroupByArgs['orderBy'] }
        : { orderBy?: VersionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Version.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VersionClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    provider<T extends ProviderArgs= {}>(args?: Subset<T, ProviderArgs>): Prisma__ProviderClient<ProviderGetPayload<T> | Null>;

    platforms<T extends Version$platformsArgs= {}>(args?: Subset<T, Version$platformsArgs>): Prisma.PrismaPromise<Array<PlatformGetPayload<T>>| Null>;

    protocols<T extends Version$protocolsArgs= {}>(args?: Subset<T, Version$protocolsArgs>): Prisma.PrismaPromise<Array<VersionProtocolGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Version base type for findUnique actions
   */
  export type VersionFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
    /**
     * Filter, which Version to fetch.
     */
    where: VersionWhereUniqueInput
  }

  /**
   * Version findUnique
   */
  export interface VersionFindUniqueArgs extends VersionFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Version findUniqueOrThrow
   */
  export type VersionFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
    /**
     * Filter, which Version to fetch.
     */
    where: VersionWhereUniqueInput
  }


  /**
   * Version base type for findFirst actions
   */
  export type VersionFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
    /**
     * Filter, which Version to fetch.
     */
    where?: VersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Versions to fetch.
     */
    orderBy?: Enumerable<VersionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Versions.
     */
    cursor?: VersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Versions.
     */
    distinct?: Enumerable<VersionScalarFieldEnum>
  }

  /**
   * Version findFirst
   */
  export interface VersionFindFirstArgs extends VersionFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Version findFirstOrThrow
   */
  export type VersionFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
    /**
     * Filter, which Version to fetch.
     */
    where?: VersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Versions to fetch.
     */
    orderBy?: Enumerable<VersionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Versions.
     */
    cursor?: VersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Versions.
     */
    distinct?: Enumerable<VersionScalarFieldEnum>
  }


  /**
   * Version findMany
   */
  export type VersionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
    /**
     * Filter, which Versions to fetch.
     */
    where?: VersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Versions to fetch.
     */
    orderBy?: Enumerable<VersionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Versions.
     */
    cursor?: VersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Versions.
     */
    skip?: number
    distinct?: Enumerable<VersionScalarFieldEnum>
  }


  /**
   * Version create
   */
  export type VersionCreateArgs = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
    /**
     * The data needed to create a Version.
     */
    data: XOR<VersionCreateInput, VersionUncheckedCreateInput>
  }


  /**
   * Version createMany
   */
  export type VersionCreateManyArgs = {
    /**
     * The data used to create many Versions.
     */
    data: Enumerable<VersionCreateManyInput>
  }


  /**
   * Version update
   */
  export type VersionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
    /**
     * The data needed to update a Version.
     */
    data: XOR<VersionUpdateInput, VersionUncheckedUpdateInput>
    /**
     * Choose, which Version to update.
     */
    where: VersionWhereUniqueInput
  }


  /**
   * Version updateMany
   */
  export type VersionUpdateManyArgs = {
    /**
     * The data used to update Versions.
     */
    data: XOR<VersionUpdateManyMutationInput, VersionUncheckedUpdateManyInput>
    /**
     * Filter which Versions to update
     */
    where?: VersionWhereInput
  }


  /**
   * Version upsert
   */
  export type VersionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
    /**
     * The filter to search for the Version to update in case it exists.
     */
    where: VersionWhereUniqueInput
    /**
     * In case the Version found by the `where` argument doesn't exist, create a new Version with this data.
     */
    create: XOR<VersionCreateInput, VersionUncheckedCreateInput>
    /**
     * In case the Version was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VersionUpdateInput, VersionUncheckedUpdateInput>
  }


  /**
   * Version delete
   */
  export type VersionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
    /**
     * Filter which Version to delete.
     */
    where: VersionWhereUniqueInput
  }


  /**
   * Version deleteMany
   */
  export type VersionDeleteManyArgs = {
    /**
     * Filter which Versions to delete
     */
    where?: VersionWhereInput
  }


  /**
   * Version.platforms
   */
  export type Version$platformsArgs = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
    where?: PlatformWhereInput
    orderBy?: Enumerable<PlatformOrderByWithRelationInput>
    cursor?: PlatformWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PlatformScalarFieldEnum>
  }


  /**
   * Version.protocols
   */
  export type Version$protocolsArgs = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    where?: VersionProtocolWhereInput
    orderBy?: Enumerable<VersionProtocolOrderByWithRelationInput>
    cursor?: VersionProtocolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<VersionProtocolScalarFieldEnum>
  }


  /**
   * Version without action
   */
  export type VersionArgs = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionInclude | null
  }



  /**
   * Model VersionProtocol
   */


  export type AggregateVersionProtocol = {
    _count: VersionProtocolCountAggregateOutputType | null
    _avg: VersionProtocolAvgAggregateOutputType | null
    _sum: VersionProtocolSumAggregateOutputType | null
    _min: VersionProtocolMinAggregateOutputType | null
    _max: VersionProtocolMaxAggregateOutputType | null
  }

  export type VersionProtocolAvgAggregateOutputType = {
    id: number | null
    versionId: number | null
    protocolId: number | null
  }

  export type VersionProtocolSumAggregateOutputType = {
    id: number | null
    versionId: number | null
    protocolId: number | null
  }

  export type VersionProtocolMinAggregateOutputType = {
    id: number | null
    versionId: number | null
    protocolId: number | null
  }

  export type VersionProtocolMaxAggregateOutputType = {
    id: number | null
    versionId: number | null
    protocolId: number | null
  }

  export type VersionProtocolCountAggregateOutputType = {
    id: number
    versionId: number
    protocolId: number
    _all: number
  }


  export type VersionProtocolAvgAggregateInputType = {
    id?: true
    versionId?: true
    protocolId?: true
  }

  export type VersionProtocolSumAggregateInputType = {
    id?: true
    versionId?: true
    protocolId?: true
  }

  export type VersionProtocolMinAggregateInputType = {
    id?: true
    versionId?: true
    protocolId?: true
  }

  export type VersionProtocolMaxAggregateInputType = {
    id?: true
    versionId?: true
    protocolId?: true
  }

  export type VersionProtocolCountAggregateInputType = {
    id?: true
    versionId?: true
    protocolId?: true
    _all?: true
  }

  export type VersionProtocolAggregateArgs = {
    /**
     * Filter which VersionProtocol to aggregate.
     */
    where?: VersionProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionProtocols to fetch.
     */
    orderBy?: Enumerable<VersionProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VersionProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionProtocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionProtocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VersionProtocols
    **/
    _count?: true | VersionProtocolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VersionProtocolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VersionProtocolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VersionProtocolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VersionProtocolMaxAggregateInputType
  }

  export type GetVersionProtocolAggregateType<T extends VersionProtocolAggregateArgs> = {
        [P in keyof T & keyof AggregateVersionProtocol]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVersionProtocol[P]>
      : GetScalarType<T[P], AggregateVersionProtocol[P]>
  }




  export type VersionProtocolGroupByArgs = {
    where?: VersionProtocolWhereInput
    orderBy?: Enumerable<VersionProtocolOrderByWithAggregationInput>
    by: VersionProtocolScalarFieldEnum[]
    having?: VersionProtocolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VersionProtocolCountAggregateInputType | true
    _avg?: VersionProtocolAvgAggregateInputType
    _sum?: VersionProtocolSumAggregateInputType
    _min?: VersionProtocolMinAggregateInputType
    _max?: VersionProtocolMaxAggregateInputType
  }


  export type VersionProtocolGroupByOutputType = {
    id: number
    versionId: number
    protocolId: number
    _count: VersionProtocolCountAggregateOutputType | null
    _avg: VersionProtocolAvgAggregateOutputType | null
    _sum: VersionProtocolSumAggregateOutputType | null
    _min: VersionProtocolMinAggregateOutputType | null
    _max: VersionProtocolMaxAggregateOutputType | null
  }

  type GetVersionProtocolGroupByPayload<T extends VersionProtocolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<VersionProtocolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VersionProtocolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VersionProtocolGroupByOutputType[P]>
            : GetScalarType<T[P], VersionProtocolGroupByOutputType[P]>
        }
      >
    >


  export type VersionProtocolSelect = {
    id?: boolean
    versionId?: boolean
    protocolId?: boolean
    version?: boolean | VersionArgs
    protocol?: boolean | ProtocolArgs
  }


  export type VersionProtocolInclude = {
    version?: boolean | VersionArgs
    protocol?: boolean | ProtocolArgs
  }

  export type VersionProtocolGetPayload<S extends boolean | null | undefined | VersionProtocolArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? VersionProtocol :
    S extends undefined ? never :
    S extends { include: any } & (VersionProtocolArgs | VersionProtocolFindManyArgs)
    ? VersionProtocol  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'version' ? VersionGetPayload<S['include'][P]> :
        P extends 'protocol' ? ProtocolGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (VersionProtocolArgs | VersionProtocolFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'version' ? VersionGetPayload<S['select'][P]> :
        P extends 'protocol' ? ProtocolGetPayload<S['select'][P]> :  P extends keyof VersionProtocol ? VersionProtocol[P] : never
  } 
      : VersionProtocol


  type VersionProtocolCountArgs = 
    Omit<VersionProtocolFindManyArgs, 'select' | 'include'> & {
      select?: VersionProtocolCountAggregateInputType | true
    }

  export interface VersionProtocolDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one VersionProtocol that matches the filter.
     * @param {VersionProtocolFindUniqueArgs} args - Arguments to find a VersionProtocol
     * @example
     * // Get one VersionProtocol
     * const versionProtocol = await prisma.versionProtocol.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends VersionProtocolFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, VersionProtocolFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'VersionProtocol'> extends True ? Prisma__VersionProtocolClient<VersionProtocolGetPayload<T>> : Prisma__VersionProtocolClient<VersionProtocolGetPayload<T> | null, null>

    /**
     * Find one VersionProtocol that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {VersionProtocolFindUniqueOrThrowArgs} args - Arguments to find a VersionProtocol
     * @example
     * // Get one VersionProtocol
     * const versionProtocol = await prisma.versionProtocol.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends VersionProtocolFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, VersionProtocolFindUniqueOrThrowArgs>
    ): Prisma__VersionProtocolClient<VersionProtocolGetPayload<T>>

    /**
     * Find the first VersionProtocol that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionProtocolFindFirstArgs} args - Arguments to find a VersionProtocol
     * @example
     * // Get one VersionProtocol
     * const versionProtocol = await prisma.versionProtocol.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends VersionProtocolFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, VersionProtocolFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'VersionProtocol'> extends True ? Prisma__VersionProtocolClient<VersionProtocolGetPayload<T>> : Prisma__VersionProtocolClient<VersionProtocolGetPayload<T> | null, null>

    /**
     * Find the first VersionProtocol that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionProtocolFindFirstOrThrowArgs} args - Arguments to find a VersionProtocol
     * @example
     * // Get one VersionProtocol
     * const versionProtocol = await prisma.versionProtocol.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends VersionProtocolFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VersionProtocolFindFirstOrThrowArgs>
    ): Prisma__VersionProtocolClient<VersionProtocolGetPayload<T>>

    /**
     * Find zero or more VersionProtocols that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionProtocolFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VersionProtocols
     * const versionProtocols = await prisma.versionProtocol.findMany()
     * 
     * // Get first 10 VersionProtocols
     * const versionProtocols = await prisma.versionProtocol.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const versionProtocolWithIdOnly = await prisma.versionProtocol.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends VersionProtocolFindManyArgs>(
      args?: SelectSubset<T, VersionProtocolFindManyArgs>
    ): Prisma.PrismaPromise<Array<VersionProtocolGetPayload<T>>>

    /**
     * Create a VersionProtocol.
     * @param {VersionProtocolCreateArgs} args - Arguments to create a VersionProtocol.
     * @example
     * // Create one VersionProtocol
     * const VersionProtocol = await prisma.versionProtocol.create({
     *   data: {
     *     // ... data to create a VersionProtocol
     *   }
     * })
     * 
    **/
    create<T extends VersionProtocolCreateArgs>(
      args: SelectSubset<T, VersionProtocolCreateArgs>
    ): Prisma__VersionProtocolClient<VersionProtocolGetPayload<T>>

    /**
     * Create many VersionProtocols.
     *     @param {VersionProtocolCreateManyArgs} args - Arguments to create many VersionProtocols.
     *     @example
     *     // Create many VersionProtocols
     *     const versionProtocol = await prisma.versionProtocol.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends VersionProtocolCreateManyArgs>(
      args?: SelectSubset<T, VersionProtocolCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VersionProtocol.
     * @param {VersionProtocolDeleteArgs} args - Arguments to delete one VersionProtocol.
     * @example
     * // Delete one VersionProtocol
     * const VersionProtocol = await prisma.versionProtocol.delete({
     *   where: {
     *     // ... filter to delete one VersionProtocol
     *   }
     * })
     * 
    **/
    delete<T extends VersionProtocolDeleteArgs>(
      args: SelectSubset<T, VersionProtocolDeleteArgs>
    ): Prisma__VersionProtocolClient<VersionProtocolGetPayload<T>>

    /**
     * Update one VersionProtocol.
     * @param {VersionProtocolUpdateArgs} args - Arguments to update one VersionProtocol.
     * @example
     * // Update one VersionProtocol
     * const versionProtocol = await prisma.versionProtocol.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends VersionProtocolUpdateArgs>(
      args: SelectSubset<T, VersionProtocolUpdateArgs>
    ): Prisma__VersionProtocolClient<VersionProtocolGetPayload<T>>

    /**
     * Delete zero or more VersionProtocols.
     * @param {VersionProtocolDeleteManyArgs} args - Arguments to filter VersionProtocols to delete.
     * @example
     * // Delete a few VersionProtocols
     * const { count } = await prisma.versionProtocol.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends VersionProtocolDeleteManyArgs>(
      args?: SelectSubset<T, VersionProtocolDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VersionProtocols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionProtocolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VersionProtocols
     * const versionProtocol = await prisma.versionProtocol.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends VersionProtocolUpdateManyArgs>(
      args: SelectSubset<T, VersionProtocolUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VersionProtocol.
     * @param {VersionProtocolUpsertArgs} args - Arguments to update or create a VersionProtocol.
     * @example
     * // Update or create a VersionProtocol
     * const versionProtocol = await prisma.versionProtocol.upsert({
     *   create: {
     *     // ... data to create a VersionProtocol
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VersionProtocol we want to update
     *   }
     * })
    **/
    upsert<T extends VersionProtocolUpsertArgs>(
      args: SelectSubset<T, VersionProtocolUpsertArgs>
    ): Prisma__VersionProtocolClient<VersionProtocolGetPayload<T>>

    /**
     * Count the number of VersionProtocols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionProtocolCountArgs} args - Arguments to filter VersionProtocols to count.
     * @example
     * // Count the number of VersionProtocols
     * const count = await prisma.versionProtocol.count({
     *   where: {
     *     // ... the filter for the VersionProtocols we want to count
     *   }
     * })
    **/
    count<T extends VersionProtocolCountArgs>(
      args?: Subset<T, VersionProtocolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VersionProtocolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VersionProtocol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionProtocolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VersionProtocolAggregateArgs>(args: Subset<T, VersionProtocolAggregateArgs>): Prisma.PrismaPromise<GetVersionProtocolAggregateType<T>>

    /**
     * Group by VersionProtocol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionProtocolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VersionProtocolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VersionProtocolGroupByArgs['orderBy'] }
        : { orderBy?: VersionProtocolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VersionProtocolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVersionProtocolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for VersionProtocol.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VersionProtocolClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    version<T extends VersionArgs= {}>(args?: Subset<T, VersionArgs>): Prisma__VersionClient<VersionGetPayload<T> | Null>;

    protocol<T extends ProtocolArgs= {}>(args?: Subset<T, ProtocolArgs>): Prisma__ProtocolClient<ProtocolGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * VersionProtocol base type for findUnique actions
   */
  export type VersionProtocolFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    /**
     * Filter, which VersionProtocol to fetch.
     */
    where: VersionProtocolWhereUniqueInput
  }

  /**
   * VersionProtocol findUnique
   */
  export interface VersionProtocolFindUniqueArgs extends VersionProtocolFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VersionProtocol findUniqueOrThrow
   */
  export type VersionProtocolFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    /**
     * Filter, which VersionProtocol to fetch.
     */
    where: VersionProtocolWhereUniqueInput
  }


  /**
   * VersionProtocol base type for findFirst actions
   */
  export type VersionProtocolFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    /**
     * Filter, which VersionProtocol to fetch.
     */
    where?: VersionProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionProtocols to fetch.
     */
    orderBy?: Enumerable<VersionProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VersionProtocols.
     */
    cursor?: VersionProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionProtocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionProtocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VersionProtocols.
     */
    distinct?: Enumerable<VersionProtocolScalarFieldEnum>
  }

  /**
   * VersionProtocol findFirst
   */
  export interface VersionProtocolFindFirstArgs extends VersionProtocolFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VersionProtocol findFirstOrThrow
   */
  export type VersionProtocolFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    /**
     * Filter, which VersionProtocol to fetch.
     */
    where?: VersionProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionProtocols to fetch.
     */
    orderBy?: Enumerable<VersionProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VersionProtocols.
     */
    cursor?: VersionProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionProtocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionProtocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VersionProtocols.
     */
    distinct?: Enumerable<VersionProtocolScalarFieldEnum>
  }


  /**
   * VersionProtocol findMany
   */
  export type VersionProtocolFindManyArgs = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    /**
     * Filter, which VersionProtocols to fetch.
     */
    where?: VersionProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionProtocols to fetch.
     */
    orderBy?: Enumerable<VersionProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VersionProtocols.
     */
    cursor?: VersionProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionProtocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionProtocols.
     */
    skip?: number
    distinct?: Enumerable<VersionProtocolScalarFieldEnum>
  }


  /**
   * VersionProtocol create
   */
  export type VersionProtocolCreateArgs = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    /**
     * The data needed to create a VersionProtocol.
     */
    data: XOR<VersionProtocolCreateInput, VersionProtocolUncheckedCreateInput>
  }


  /**
   * VersionProtocol createMany
   */
  export type VersionProtocolCreateManyArgs = {
    /**
     * The data used to create many VersionProtocols.
     */
    data: Enumerable<VersionProtocolCreateManyInput>
  }


  /**
   * VersionProtocol update
   */
  export type VersionProtocolUpdateArgs = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    /**
     * The data needed to update a VersionProtocol.
     */
    data: XOR<VersionProtocolUpdateInput, VersionProtocolUncheckedUpdateInput>
    /**
     * Choose, which VersionProtocol to update.
     */
    where: VersionProtocolWhereUniqueInput
  }


  /**
   * VersionProtocol updateMany
   */
  export type VersionProtocolUpdateManyArgs = {
    /**
     * The data used to update VersionProtocols.
     */
    data: XOR<VersionProtocolUpdateManyMutationInput, VersionProtocolUncheckedUpdateManyInput>
    /**
     * Filter which VersionProtocols to update
     */
    where?: VersionProtocolWhereInput
  }


  /**
   * VersionProtocol upsert
   */
  export type VersionProtocolUpsertArgs = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    /**
     * The filter to search for the VersionProtocol to update in case it exists.
     */
    where: VersionProtocolWhereUniqueInput
    /**
     * In case the VersionProtocol found by the `where` argument doesn't exist, create a new VersionProtocol with this data.
     */
    create: XOR<VersionProtocolCreateInput, VersionProtocolUncheckedCreateInput>
    /**
     * In case the VersionProtocol was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VersionProtocolUpdateInput, VersionProtocolUncheckedUpdateInput>
  }


  /**
   * VersionProtocol delete
   */
  export type VersionProtocolDeleteArgs = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    /**
     * Filter which VersionProtocol to delete.
     */
    where: VersionProtocolWhereUniqueInput
  }


  /**
   * VersionProtocol deleteMany
   */
  export type VersionProtocolDeleteManyArgs = {
    /**
     * Filter which VersionProtocols to delete
     */
    where?: VersionProtocolWhereInput
  }


  /**
   * VersionProtocol without action
   */
  export type VersionProtocolArgs = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
  }



  /**
   * Model Protocol
   */


  export type AggregateProtocol = {
    _count: ProtocolCountAggregateOutputType | null
    _avg: ProtocolAvgAggregateOutputType | null
    _sum: ProtocolSumAggregateOutputType | null
    _min: ProtocolMinAggregateOutputType | null
    _max: ProtocolMaxAggregateOutputType | null
  }

  export type ProtocolAvgAggregateOutputType = {
    id: number | null
  }

  export type ProtocolSumAggregateOutputType = {
    id: number | null
  }

  export type ProtocolMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type ProtocolMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type ProtocolCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type ProtocolAvgAggregateInputType = {
    id?: true
  }

  export type ProtocolSumAggregateInputType = {
    id?: true
  }

  export type ProtocolMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type ProtocolMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type ProtocolCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type ProtocolAggregateArgs = {
    /**
     * Filter which Protocol to aggregate.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: Enumerable<ProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Protocols
    **/
    _count?: true | ProtocolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProtocolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProtocolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProtocolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProtocolMaxAggregateInputType
  }

  export type GetProtocolAggregateType<T extends ProtocolAggregateArgs> = {
        [P in keyof T & keyof AggregateProtocol]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProtocol[P]>
      : GetScalarType<T[P], AggregateProtocol[P]>
  }




  export type ProtocolGroupByArgs = {
    where?: ProtocolWhereInput
    orderBy?: Enumerable<ProtocolOrderByWithAggregationInput>
    by: ProtocolScalarFieldEnum[]
    having?: ProtocolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProtocolCountAggregateInputType | true
    _avg?: ProtocolAvgAggregateInputType
    _sum?: ProtocolSumAggregateInputType
    _min?: ProtocolMinAggregateInputType
    _max?: ProtocolMaxAggregateInputType
  }


  export type ProtocolGroupByOutputType = {
    id: number
    name: string
    _count: ProtocolCountAggregateOutputType | null
    _avg: ProtocolAvgAggregateOutputType | null
    _sum: ProtocolSumAggregateOutputType | null
    _min: ProtocolMinAggregateOutputType | null
    _max: ProtocolMaxAggregateOutputType | null
  }

  type GetProtocolGroupByPayload<T extends ProtocolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ProtocolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProtocolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProtocolGroupByOutputType[P]>
            : GetScalarType<T[P], ProtocolGroupByOutputType[P]>
        }
      >
    >


  export type ProtocolSelect = {
    id?: boolean
    name?: boolean
    providers?: boolean | Protocol$providersArgs
    _count?: boolean | ProtocolCountOutputTypeArgs
  }


  export type ProtocolInclude = {
    providers?: boolean | Protocol$providersArgs
    _count?: boolean | ProtocolCountOutputTypeArgs
  }

  export type ProtocolGetPayload<S extends boolean | null | undefined | ProtocolArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Protocol :
    S extends undefined ? never :
    S extends { include: any } & (ProtocolArgs | ProtocolFindManyArgs)
    ? Protocol  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'providers' ? Array < VersionProtocolGetPayload<S['include'][P]>>  :
        P extends '_count' ? ProtocolCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ProtocolArgs | ProtocolFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'providers' ? Array < VersionProtocolGetPayload<S['select'][P]>>  :
        P extends '_count' ? ProtocolCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Protocol ? Protocol[P] : never
  } 
      : Protocol


  type ProtocolCountArgs = 
    Omit<ProtocolFindManyArgs, 'select' | 'include'> & {
      select?: ProtocolCountAggregateInputType | true
    }

  export interface ProtocolDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Protocol that matches the filter.
     * @param {ProtocolFindUniqueArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProtocolFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProtocolFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Protocol'> extends True ? Prisma__ProtocolClient<ProtocolGetPayload<T>> : Prisma__ProtocolClient<ProtocolGetPayload<T> | null, null>

    /**
     * Find one Protocol that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ProtocolFindUniqueOrThrowArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProtocolFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProtocolFindUniqueOrThrowArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Find the first Protocol that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolFindFirstArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProtocolFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProtocolFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Protocol'> extends True ? Prisma__ProtocolClient<ProtocolGetPayload<T>> : Prisma__ProtocolClient<ProtocolGetPayload<T> | null, null>

    /**
     * Find the first Protocol that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolFindFirstOrThrowArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProtocolFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProtocolFindFirstOrThrowArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Find zero or more Protocols that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Protocols
     * const protocols = await prisma.protocol.findMany()
     * 
     * // Get first 10 Protocols
     * const protocols = await prisma.protocol.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const protocolWithIdOnly = await prisma.protocol.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProtocolFindManyArgs>(
      args?: SelectSubset<T, ProtocolFindManyArgs>
    ): Prisma.PrismaPromise<Array<ProtocolGetPayload<T>>>

    /**
     * Create a Protocol.
     * @param {ProtocolCreateArgs} args - Arguments to create a Protocol.
     * @example
     * // Create one Protocol
     * const Protocol = await prisma.protocol.create({
     *   data: {
     *     // ... data to create a Protocol
     *   }
     * })
     * 
    **/
    create<T extends ProtocolCreateArgs>(
      args: SelectSubset<T, ProtocolCreateArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Create many Protocols.
     *     @param {ProtocolCreateManyArgs} args - Arguments to create many Protocols.
     *     @example
     *     // Create many Protocols
     *     const protocol = await prisma.protocol.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProtocolCreateManyArgs>(
      args?: SelectSubset<T, ProtocolCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Protocol.
     * @param {ProtocolDeleteArgs} args - Arguments to delete one Protocol.
     * @example
     * // Delete one Protocol
     * const Protocol = await prisma.protocol.delete({
     *   where: {
     *     // ... filter to delete one Protocol
     *   }
     * })
     * 
    **/
    delete<T extends ProtocolDeleteArgs>(
      args: SelectSubset<T, ProtocolDeleteArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Update one Protocol.
     * @param {ProtocolUpdateArgs} args - Arguments to update one Protocol.
     * @example
     * // Update one Protocol
     * const protocol = await prisma.protocol.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProtocolUpdateArgs>(
      args: SelectSubset<T, ProtocolUpdateArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Delete zero or more Protocols.
     * @param {ProtocolDeleteManyArgs} args - Arguments to filter Protocols to delete.
     * @example
     * // Delete a few Protocols
     * const { count } = await prisma.protocol.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProtocolDeleteManyArgs>(
      args?: SelectSubset<T, ProtocolDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Protocols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Protocols
     * const protocol = await prisma.protocol.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProtocolUpdateManyArgs>(
      args: SelectSubset<T, ProtocolUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Protocol.
     * @param {ProtocolUpsertArgs} args - Arguments to update or create a Protocol.
     * @example
     * // Update or create a Protocol
     * const protocol = await prisma.protocol.upsert({
     *   create: {
     *     // ... data to create a Protocol
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Protocol we want to update
     *   }
     * })
    **/
    upsert<T extends ProtocolUpsertArgs>(
      args: SelectSubset<T, ProtocolUpsertArgs>
    ): Prisma__ProtocolClient<ProtocolGetPayload<T>>

    /**
     * Count the number of Protocols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolCountArgs} args - Arguments to filter Protocols to count.
     * @example
     * // Count the number of Protocols
     * const count = await prisma.protocol.count({
     *   where: {
     *     // ... the filter for the Protocols we want to count
     *   }
     * })
    **/
    count<T extends ProtocolCountArgs>(
      args?: Subset<T, ProtocolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProtocolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Protocol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProtocolAggregateArgs>(args: Subset<T, ProtocolAggregateArgs>): Prisma.PrismaPromise<GetProtocolAggregateType<T>>

    /**
     * Group by Protocol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProtocolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProtocolGroupByArgs['orderBy'] }
        : { orderBy?: ProtocolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProtocolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProtocolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Protocol.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProtocolClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    providers<T extends Protocol$providersArgs= {}>(args?: Subset<T, Protocol$providersArgs>): Prisma.PrismaPromise<Array<VersionProtocolGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Protocol base type for findUnique actions
   */
  export type ProtocolFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter, which Protocol to fetch.
     */
    where: ProtocolWhereUniqueInput
  }

  /**
   * Protocol findUnique
   */
  export interface ProtocolFindUniqueArgs extends ProtocolFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Protocol findUniqueOrThrow
   */
  export type ProtocolFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter, which Protocol to fetch.
     */
    where: ProtocolWhereUniqueInput
  }


  /**
   * Protocol base type for findFirst actions
   */
  export type ProtocolFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter, which Protocol to fetch.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: Enumerable<ProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Protocols.
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Protocols.
     */
    distinct?: Enumerable<ProtocolScalarFieldEnum>
  }

  /**
   * Protocol findFirst
   */
  export interface ProtocolFindFirstArgs extends ProtocolFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Protocol findFirstOrThrow
   */
  export type ProtocolFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter, which Protocol to fetch.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: Enumerable<ProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Protocols.
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Protocols.
     */
    distinct?: Enumerable<ProtocolScalarFieldEnum>
  }


  /**
   * Protocol findMany
   */
  export type ProtocolFindManyArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter, which Protocols to fetch.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: Enumerable<ProtocolOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Protocols.
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    distinct?: Enumerable<ProtocolScalarFieldEnum>
  }


  /**
   * Protocol create
   */
  export type ProtocolCreateArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * The data needed to create a Protocol.
     */
    data: XOR<ProtocolCreateInput, ProtocolUncheckedCreateInput>
  }


  /**
   * Protocol createMany
   */
  export type ProtocolCreateManyArgs = {
    /**
     * The data used to create many Protocols.
     */
    data: Enumerable<ProtocolCreateManyInput>
  }


  /**
   * Protocol update
   */
  export type ProtocolUpdateArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * The data needed to update a Protocol.
     */
    data: XOR<ProtocolUpdateInput, ProtocolUncheckedUpdateInput>
    /**
     * Choose, which Protocol to update.
     */
    where: ProtocolWhereUniqueInput
  }


  /**
   * Protocol updateMany
   */
  export type ProtocolUpdateManyArgs = {
    /**
     * The data used to update Protocols.
     */
    data: XOR<ProtocolUpdateManyMutationInput, ProtocolUncheckedUpdateManyInput>
    /**
     * Filter which Protocols to update
     */
    where?: ProtocolWhereInput
  }


  /**
   * Protocol upsert
   */
  export type ProtocolUpsertArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * The filter to search for the Protocol to update in case it exists.
     */
    where: ProtocolWhereUniqueInput
    /**
     * In case the Protocol found by the `where` argument doesn't exist, create a new Protocol with this data.
     */
    create: XOR<ProtocolCreateInput, ProtocolUncheckedCreateInput>
    /**
     * In case the Protocol was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProtocolUpdateInput, ProtocolUncheckedUpdateInput>
  }


  /**
   * Protocol delete
   */
  export type ProtocolDeleteArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
    /**
     * Filter which Protocol to delete.
     */
    where: ProtocolWhereUniqueInput
  }


  /**
   * Protocol deleteMany
   */
  export type ProtocolDeleteManyArgs = {
    /**
     * Filter which Protocols to delete
     */
    where?: ProtocolWhereInput
  }


  /**
   * Protocol.providers
   */
  export type Protocol$providersArgs = {
    /**
     * Select specific fields to fetch from the VersionProtocol
     */
    select?: VersionProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: VersionProtocolInclude | null
    where?: VersionProtocolWhereInput
    orderBy?: Enumerable<VersionProtocolOrderByWithRelationInput>
    cursor?: VersionProtocolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<VersionProtocolScalarFieldEnum>
  }


  /**
   * Protocol without action
   */
  export type ProtocolArgs = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProtocolInclude | null
  }



  /**
   * Model Platform
   */


  export type AggregatePlatform = {
    _count: PlatformCountAggregateOutputType | null
    _avg: PlatformAvgAggregateOutputType | null
    _sum: PlatformSumAggregateOutputType | null
    _min: PlatformMinAggregateOutputType | null
    _max: PlatformMaxAggregateOutputType | null
  }

  export type PlatformAvgAggregateOutputType = {
    id: number | null
    providerId: number | null
  }

  export type PlatformSumAggregateOutputType = {
    id: number | null
    providerId: number | null
  }

  export type PlatformMinAggregateOutputType = {
    id: number | null
    os: string | null
    arch: string | null
    shasum: string | null
    filename: string | null
    providerId: number | null
  }

  export type PlatformMaxAggregateOutputType = {
    id: number | null
    os: string | null
    arch: string | null
    shasum: string | null
    filename: string | null
    providerId: number | null
  }

  export type PlatformCountAggregateOutputType = {
    id: number
    os: number
    arch: number
    shasum: number
    filename: number
    providerId: number
    _all: number
  }


  export type PlatformAvgAggregateInputType = {
    id?: true
    providerId?: true
  }

  export type PlatformSumAggregateInputType = {
    id?: true
    providerId?: true
  }

  export type PlatformMinAggregateInputType = {
    id?: true
    os?: true
    arch?: true
    shasum?: true
    filename?: true
    providerId?: true
  }

  export type PlatformMaxAggregateInputType = {
    id?: true
    os?: true
    arch?: true
    shasum?: true
    filename?: true
    providerId?: true
  }

  export type PlatformCountAggregateInputType = {
    id?: true
    os?: true
    arch?: true
    shasum?: true
    filename?: true
    providerId?: true
    _all?: true
  }

  export type PlatformAggregateArgs = {
    /**
     * Filter which Platform to aggregate.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: Enumerable<PlatformOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Platforms
    **/
    _count?: true | PlatformCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlatformAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlatformSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformMaxAggregateInputType
  }

  export type GetPlatformAggregateType<T extends PlatformAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatform]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatform[P]>
      : GetScalarType<T[P], AggregatePlatform[P]>
  }




  export type PlatformGroupByArgs = {
    where?: PlatformWhereInput
    orderBy?: Enumerable<PlatformOrderByWithAggregationInput>
    by: PlatformScalarFieldEnum[]
    having?: PlatformScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformCountAggregateInputType | true
    _avg?: PlatformAvgAggregateInputType
    _sum?: PlatformSumAggregateInputType
    _min?: PlatformMinAggregateInputType
    _max?: PlatformMaxAggregateInputType
  }


  export type PlatformGroupByOutputType = {
    id: number
    os: string
    arch: string
    shasum: string
    filename: string
    providerId: number
    _count: PlatformCountAggregateOutputType | null
    _avg: PlatformAvgAggregateOutputType | null
    _sum: PlatformSumAggregateOutputType | null
    _min: PlatformMinAggregateOutputType | null
    _max: PlatformMaxAggregateOutputType | null
  }

  type GetPlatformGroupByPayload<T extends PlatformGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<PlatformGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformGroupByOutputType[P]>
        }
      >
    >


  export type PlatformSelect = {
    id?: boolean
    os?: boolean
    arch?: boolean
    shasum?: boolean
    filename?: boolean
    providerId?: boolean
    provider?: boolean | VersionArgs
  }


  export type PlatformInclude = {
    provider?: boolean | VersionArgs
  }

  export type PlatformGetPayload<S extends boolean | null | undefined | PlatformArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Platform :
    S extends undefined ? never :
    S extends { include: any } & (PlatformArgs | PlatformFindManyArgs)
    ? Platform  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'provider' ? VersionGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (PlatformArgs | PlatformFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'provider' ? VersionGetPayload<S['select'][P]> :  P extends keyof Platform ? Platform[P] : never
  } 
      : Platform


  type PlatformCountArgs = 
    Omit<PlatformFindManyArgs, 'select' | 'include'> & {
      select?: PlatformCountAggregateInputType | true
    }

  export interface PlatformDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Platform that matches the filter.
     * @param {PlatformFindUniqueArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PlatformFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PlatformFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Platform'> extends True ? Prisma__PlatformClient<PlatformGetPayload<T>> : Prisma__PlatformClient<PlatformGetPayload<T> | null, null>

    /**
     * Find one Platform that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PlatformFindUniqueOrThrowArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PlatformFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PlatformFindUniqueOrThrowArgs>
    ): Prisma__PlatformClient<PlatformGetPayload<T>>

    /**
     * Find the first Platform that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformFindFirstArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PlatformFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PlatformFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Platform'> extends True ? Prisma__PlatformClient<PlatformGetPayload<T>> : Prisma__PlatformClient<PlatformGetPayload<T> | null, null>

    /**
     * Find the first Platform that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformFindFirstOrThrowArgs} args - Arguments to find a Platform
     * @example
     * // Get one Platform
     * const platform = await prisma.platform.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PlatformFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PlatformFindFirstOrThrowArgs>
    ): Prisma__PlatformClient<PlatformGetPayload<T>>

    /**
     * Find zero or more Platforms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Platforms
     * const platforms = await prisma.platform.findMany()
     * 
     * // Get first 10 Platforms
     * const platforms = await prisma.platform.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformWithIdOnly = await prisma.platform.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PlatformFindManyArgs>(
      args?: SelectSubset<T, PlatformFindManyArgs>
    ): Prisma.PrismaPromise<Array<PlatformGetPayload<T>>>

    /**
     * Create a Platform.
     * @param {PlatformCreateArgs} args - Arguments to create a Platform.
     * @example
     * // Create one Platform
     * const Platform = await prisma.platform.create({
     *   data: {
     *     // ... data to create a Platform
     *   }
     * })
     * 
    **/
    create<T extends PlatformCreateArgs>(
      args: SelectSubset<T, PlatformCreateArgs>
    ): Prisma__PlatformClient<PlatformGetPayload<T>>

    /**
     * Create many Platforms.
     *     @param {PlatformCreateManyArgs} args - Arguments to create many Platforms.
     *     @example
     *     // Create many Platforms
     *     const platform = await prisma.platform.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PlatformCreateManyArgs>(
      args?: SelectSubset<T, PlatformCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Platform.
     * @param {PlatformDeleteArgs} args - Arguments to delete one Platform.
     * @example
     * // Delete one Platform
     * const Platform = await prisma.platform.delete({
     *   where: {
     *     // ... filter to delete one Platform
     *   }
     * })
     * 
    **/
    delete<T extends PlatformDeleteArgs>(
      args: SelectSubset<T, PlatformDeleteArgs>
    ): Prisma__PlatformClient<PlatformGetPayload<T>>

    /**
     * Update one Platform.
     * @param {PlatformUpdateArgs} args - Arguments to update one Platform.
     * @example
     * // Update one Platform
     * const platform = await prisma.platform.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PlatformUpdateArgs>(
      args: SelectSubset<T, PlatformUpdateArgs>
    ): Prisma__PlatformClient<PlatformGetPayload<T>>

    /**
     * Delete zero or more Platforms.
     * @param {PlatformDeleteManyArgs} args - Arguments to filter Platforms to delete.
     * @example
     * // Delete a few Platforms
     * const { count } = await prisma.platform.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PlatformDeleteManyArgs>(
      args?: SelectSubset<T, PlatformDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Platforms
     * const platform = await prisma.platform.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PlatformUpdateManyArgs>(
      args: SelectSubset<T, PlatformUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Platform.
     * @param {PlatformUpsertArgs} args - Arguments to update or create a Platform.
     * @example
     * // Update or create a Platform
     * const platform = await prisma.platform.upsert({
     *   create: {
     *     // ... data to create a Platform
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Platform we want to update
     *   }
     * })
    **/
    upsert<T extends PlatformUpsertArgs>(
      args: SelectSubset<T, PlatformUpsertArgs>
    ): Prisma__PlatformClient<PlatformGetPayload<T>>

    /**
     * Count the number of Platforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformCountArgs} args - Arguments to filter Platforms to count.
     * @example
     * // Count the number of Platforms
     * const count = await prisma.platform.count({
     *   where: {
     *     // ... the filter for the Platforms we want to count
     *   }
     * })
    **/
    count<T extends PlatformCountArgs>(
      args?: Subset<T, PlatformCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Platform.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlatformAggregateArgs>(args: Subset<T, PlatformAggregateArgs>): Prisma.PrismaPromise<GetPlatformAggregateType<T>>

    /**
     * Group by Platform.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlatformGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformGroupByArgs['orderBy'] }
        : { orderBy?: PlatformGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlatformGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Platform.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PlatformClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    provider<T extends VersionArgs= {}>(args?: Subset<T, VersionArgs>): Prisma__VersionClient<VersionGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Platform base type for findUnique actions
   */
  export type PlatformFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
    /**
     * Filter, which Platform to fetch.
     */
    where: PlatformWhereUniqueInput
  }

  /**
   * Platform findUnique
   */
  export interface PlatformFindUniqueArgs extends PlatformFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Platform findUniqueOrThrow
   */
  export type PlatformFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
    /**
     * Filter, which Platform to fetch.
     */
    where: PlatformWhereUniqueInput
  }


  /**
   * Platform base type for findFirst actions
   */
  export type PlatformFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
    /**
     * Filter, which Platform to fetch.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: Enumerable<PlatformOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Platforms.
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Platforms.
     */
    distinct?: Enumerable<PlatformScalarFieldEnum>
  }

  /**
   * Platform findFirst
   */
  export interface PlatformFindFirstArgs extends PlatformFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Platform findFirstOrThrow
   */
  export type PlatformFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
    /**
     * Filter, which Platform to fetch.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: Enumerable<PlatformOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Platforms.
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Platforms.
     */
    distinct?: Enumerable<PlatformScalarFieldEnum>
  }


  /**
   * Platform findMany
   */
  export type PlatformFindManyArgs = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
    /**
     * Filter, which Platforms to fetch.
     */
    where?: PlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Platforms to fetch.
     */
    orderBy?: Enumerable<PlatformOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Platforms.
     */
    cursor?: PlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Platforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Platforms.
     */
    skip?: number
    distinct?: Enumerable<PlatformScalarFieldEnum>
  }


  /**
   * Platform create
   */
  export type PlatformCreateArgs = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
    /**
     * The data needed to create a Platform.
     */
    data: XOR<PlatformCreateInput, PlatformUncheckedCreateInput>
  }


  /**
   * Platform createMany
   */
  export type PlatformCreateManyArgs = {
    /**
     * The data used to create many Platforms.
     */
    data: Enumerable<PlatformCreateManyInput>
  }


  /**
   * Platform update
   */
  export type PlatformUpdateArgs = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
    /**
     * The data needed to update a Platform.
     */
    data: XOR<PlatformUpdateInput, PlatformUncheckedUpdateInput>
    /**
     * Choose, which Platform to update.
     */
    where: PlatformWhereUniqueInput
  }


  /**
   * Platform updateMany
   */
  export type PlatformUpdateManyArgs = {
    /**
     * The data used to update Platforms.
     */
    data: XOR<PlatformUpdateManyMutationInput, PlatformUncheckedUpdateManyInput>
    /**
     * Filter which Platforms to update
     */
    where?: PlatformWhereInput
  }


  /**
   * Platform upsert
   */
  export type PlatformUpsertArgs = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
    /**
     * The filter to search for the Platform to update in case it exists.
     */
    where: PlatformWhereUniqueInput
    /**
     * In case the Platform found by the `where` argument doesn't exist, create a new Platform with this data.
     */
    create: XOR<PlatformCreateInput, PlatformUncheckedCreateInput>
    /**
     * In case the Platform was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformUpdateInput, PlatformUncheckedUpdateInput>
  }


  /**
   * Platform delete
   */
  export type PlatformDeleteArgs = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
    /**
     * Filter which Platform to delete.
     */
    where: PlatformWhereUniqueInput
  }


  /**
   * Platform deleteMany
   */
  export type PlatformDeleteManyArgs = {
    /**
     * Filter which Platforms to delete
     */
    where?: PlatformWhereInput
  }


  /**
   * Platform without action
   */
  export type PlatformArgs = {
    /**
     * Select specific fields to fetch from the Platform
     */
    select?: PlatformSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PlatformInclude | null
  }



  /**
   * Model GpgPublicKey
   */


  export type AggregateGpgPublicKey = {
    _count: GpgPublicKeyCountAggregateOutputType | null
    _avg: GpgPublicKeyAvgAggregateOutputType | null
    _sum: GpgPublicKeySumAggregateOutputType | null
    _min: GpgPublicKeyMinAggregateOutputType | null
    _max: GpgPublicKeyMaxAggregateOutputType | null
  }

  export type GpgPublicKeyAvgAggregateOutputType = {
    id: number | null
    providerId: number | null
  }

  export type GpgPublicKeySumAggregateOutputType = {
    id: number | null
    providerId: number | null
  }

  export type GpgPublicKeyMinAggregateOutputType = {
    id: number | null
    keyId: string | null
    asciiArmor: string | null
    trustSignature: string | null
    source: string | null
    sourceUrl: string | null
    providerId: number | null
  }

  export type GpgPublicKeyMaxAggregateOutputType = {
    id: number | null
    keyId: string | null
    asciiArmor: string | null
    trustSignature: string | null
    source: string | null
    sourceUrl: string | null
    providerId: number | null
  }

  export type GpgPublicKeyCountAggregateOutputType = {
    id: number
    keyId: number
    asciiArmor: number
    trustSignature: number
    source: number
    sourceUrl: number
    providerId: number
    _all: number
  }


  export type GpgPublicKeyAvgAggregateInputType = {
    id?: true
    providerId?: true
  }

  export type GpgPublicKeySumAggregateInputType = {
    id?: true
    providerId?: true
  }

  export type GpgPublicKeyMinAggregateInputType = {
    id?: true
    keyId?: true
    asciiArmor?: true
    trustSignature?: true
    source?: true
    sourceUrl?: true
    providerId?: true
  }

  export type GpgPublicKeyMaxAggregateInputType = {
    id?: true
    keyId?: true
    asciiArmor?: true
    trustSignature?: true
    source?: true
    sourceUrl?: true
    providerId?: true
  }

  export type GpgPublicKeyCountAggregateInputType = {
    id?: true
    keyId?: true
    asciiArmor?: true
    trustSignature?: true
    source?: true
    sourceUrl?: true
    providerId?: true
    _all?: true
  }

  export type GpgPublicKeyAggregateArgs = {
    /**
     * Filter which GpgPublicKey to aggregate.
     */
    where?: GpgPublicKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GpgPublicKeys to fetch.
     */
    orderBy?: Enumerable<GpgPublicKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GpgPublicKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GpgPublicKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GpgPublicKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GpgPublicKeys
    **/
    _count?: true | GpgPublicKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GpgPublicKeyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GpgPublicKeySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GpgPublicKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GpgPublicKeyMaxAggregateInputType
  }

  export type GetGpgPublicKeyAggregateType<T extends GpgPublicKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateGpgPublicKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGpgPublicKey[P]>
      : GetScalarType<T[P], AggregateGpgPublicKey[P]>
  }




  export type GpgPublicKeyGroupByArgs = {
    where?: GpgPublicKeyWhereInput
    orderBy?: Enumerable<GpgPublicKeyOrderByWithAggregationInput>
    by: GpgPublicKeyScalarFieldEnum[]
    having?: GpgPublicKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GpgPublicKeyCountAggregateInputType | true
    _avg?: GpgPublicKeyAvgAggregateInputType
    _sum?: GpgPublicKeySumAggregateInputType
    _min?: GpgPublicKeyMinAggregateInputType
    _max?: GpgPublicKeyMaxAggregateInputType
  }


  export type GpgPublicKeyGroupByOutputType = {
    id: number
    keyId: string
    asciiArmor: string
    trustSignature: string
    source: string
    sourceUrl: string
    providerId: number
    _count: GpgPublicKeyCountAggregateOutputType | null
    _avg: GpgPublicKeyAvgAggregateOutputType | null
    _sum: GpgPublicKeySumAggregateOutputType | null
    _min: GpgPublicKeyMinAggregateOutputType | null
    _max: GpgPublicKeyMaxAggregateOutputType | null
  }

  type GetGpgPublicKeyGroupByPayload<T extends GpgPublicKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<GpgPublicKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GpgPublicKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GpgPublicKeyGroupByOutputType[P]>
            : GetScalarType<T[P], GpgPublicKeyGroupByOutputType[P]>
        }
      >
    >


  export type GpgPublicKeySelect = {
    id?: boolean
    keyId?: boolean
    asciiArmor?: boolean
    trustSignature?: boolean
    source?: boolean
    sourceUrl?: boolean
    providerId?: boolean
    provider?: boolean | ProviderArgs
  }


  export type GpgPublicKeyInclude = {
    provider?: boolean | ProviderArgs
  }

  export type GpgPublicKeyGetPayload<S extends boolean | null | undefined | GpgPublicKeyArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? GpgPublicKey :
    S extends undefined ? never :
    S extends { include: any } & (GpgPublicKeyArgs | GpgPublicKeyFindManyArgs)
    ? GpgPublicKey  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'provider' ? ProviderGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (GpgPublicKeyArgs | GpgPublicKeyFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'provider' ? ProviderGetPayload<S['select'][P]> :  P extends keyof GpgPublicKey ? GpgPublicKey[P] : never
  } 
      : GpgPublicKey


  type GpgPublicKeyCountArgs = 
    Omit<GpgPublicKeyFindManyArgs, 'select' | 'include'> & {
      select?: GpgPublicKeyCountAggregateInputType | true
    }

  export interface GpgPublicKeyDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one GpgPublicKey that matches the filter.
     * @param {GpgPublicKeyFindUniqueArgs} args - Arguments to find a GpgPublicKey
     * @example
     * // Get one GpgPublicKey
     * const gpgPublicKey = await prisma.gpgPublicKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GpgPublicKeyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, GpgPublicKeyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'GpgPublicKey'> extends True ? Prisma__GpgPublicKeyClient<GpgPublicKeyGetPayload<T>> : Prisma__GpgPublicKeyClient<GpgPublicKeyGetPayload<T> | null, null>

    /**
     * Find one GpgPublicKey that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {GpgPublicKeyFindUniqueOrThrowArgs} args - Arguments to find a GpgPublicKey
     * @example
     * // Get one GpgPublicKey
     * const gpgPublicKey = await prisma.gpgPublicKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends GpgPublicKeyFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, GpgPublicKeyFindUniqueOrThrowArgs>
    ): Prisma__GpgPublicKeyClient<GpgPublicKeyGetPayload<T>>

    /**
     * Find the first GpgPublicKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpgPublicKeyFindFirstArgs} args - Arguments to find a GpgPublicKey
     * @example
     * // Get one GpgPublicKey
     * const gpgPublicKey = await prisma.gpgPublicKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GpgPublicKeyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, GpgPublicKeyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'GpgPublicKey'> extends True ? Prisma__GpgPublicKeyClient<GpgPublicKeyGetPayload<T>> : Prisma__GpgPublicKeyClient<GpgPublicKeyGetPayload<T> | null, null>

    /**
     * Find the first GpgPublicKey that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpgPublicKeyFindFirstOrThrowArgs} args - Arguments to find a GpgPublicKey
     * @example
     * // Get one GpgPublicKey
     * const gpgPublicKey = await prisma.gpgPublicKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends GpgPublicKeyFindFirstOrThrowArgs>(
      args?: SelectSubset<T, GpgPublicKeyFindFirstOrThrowArgs>
    ): Prisma__GpgPublicKeyClient<GpgPublicKeyGetPayload<T>>

    /**
     * Find zero or more GpgPublicKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpgPublicKeyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GpgPublicKeys
     * const gpgPublicKeys = await prisma.gpgPublicKey.findMany()
     * 
     * // Get first 10 GpgPublicKeys
     * const gpgPublicKeys = await prisma.gpgPublicKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gpgPublicKeyWithIdOnly = await prisma.gpgPublicKey.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GpgPublicKeyFindManyArgs>(
      args?: SelectSubset<T, GpgPublicKeyFindManyArgs>
    ): Prisma.PrismaPromise<Array<GpgPublicKeyGetPayload<T>>>

    /**
     * Create a GpgPublicKey.
     * @param {GpgPublicKeyCreateArgs} args - Arguments to create a GpgPublicKey.
     * @example
     * // Create one GpgPublicKey
     * const GpgPublicKey = await prisma.gpgPublicKey.create({
     *   data: {
     *     // ... data to create a GpgPublicKey
     *   }
     * })
     * 
    **/
    create<T extends GpgPublicKeyCreateArgs>(
      args: SelectSubset<T, GpgPublicKeyCreateArgs>
    ): Prisma__GpgPublicKeyClient<GpgPublicKeyGetPayload<T>>

    /**
     * Create many GpgPublicKeys.
     *     @param {GpgPublicKeyCreateManyArgs} args - Arguments to create many GpgPublicKeys.
     *     @example
     *     // Create many GpgPublicKeys
     *     const gpgPublicKey = await prisma.gpgPublicKey.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends GpgPublicKeyCreateManyArgs>(
      args?: SelectSubset<T, GpgPublicKeyCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GpgPublicKey.
     * @param {GpgPublicKeyDeleteArgs} args - Arguments to delete one GpgPublicKey.
     * @example
     * // Delete one GpgPublicKey
     * const GpgPublicKey = await prisma.gpgPublicKey.delete({
     *   where: {
     *     // ... filter to delete one GpgPublicKey
     *   }
     * })
     * 
    **/
    delete<T extends GpgPublicKeyDeleteArgs>(
      args: SelectSubset<T, GpgPublicKeyDeleteArgs>
    ): Prisma__GpgPublicKeyClient<GpgPublicKeyGetPayload<T>>

    /**
     * Update one GpgPublicKey.
     * @param {GpgPublicKeyUpdateArgs} args - Arguments to update one GpgPublicKey.
     * @example
     * // Update one GpgPublicKey
     * const gpgPublicKey = await prisma.gpgPublicKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GpgPublicKeyUpdateArgs>(
      args: SelectSubset<T, GpgPublicKeyUpdateArgs>
    ): Prisma__GpgPublicKeyClient<GpgPublicKeyGetPayload<T>>

    /**
     * Delete zero or more GpgPublicKeys.
     * @param {GpgPublicKeyDeleteManyArgs} args - Arguments to filter GpgPublicKeys to delete.
     * @example
     * // Delete a few GpgPublicKeys
     * const { count } = await prisma.gpgPublicKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GpgPublicKeyDeleteManyArgs>(
      args?: SelectSubset<T, GpgPublicKeyDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GpgPublicKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpgPublicKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GpgPublicKeys
     * const gpgPublicKey = await prisma.gpgPublicKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GpgPublicKeyUpdateManyArgs>(
      args: SelectSubset<T, GpgPublicKeyUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GpgPublicKey.
     * @param {GpgPublicKeyUpsertArgs} args - Arguments to update or create a GpgPublicKey.
     * @example
     * // Update or create a GpgPublicKey
     * const gpgPublicKey = await prisma.gpgPublicKey.upsert({
     *   create: {
     *     // ... data to create a GpgPublicKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GpgPublicKey we want to update
     *   }
     * })
    **/
    upsert<T extends GpgPublicKeyUpsertArgs>(
      args: SelectSubset<T, GpgPublicKeyUpsertArgs>
    ): Prisma__GpgPublicKeyClient<GpgPublicKeyGetPayload<T>>

    /**
     * Count the number of GpgPublicKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpgPublicKeyCountArgs} args - Arguments to filter GpgPublicKeys to count.
     * @example
     * // Count the number of GpgPublicKeys
     * const count = await prisma.gpgPublicKey.count({
     *   where: {
     *     // ... the filter for the GpgPublicKeys we want to count
     *   }
     * })
    **/
    count<T extends GpgPublicKeyCountArgs>(
      args?: Subset<T, GpgPublicKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GpgPublicKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GpgPublicKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpgPublicKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GpgPublicKeyAggregateArgs>(args: Subset<T, GpgPublicKeyAggregateArgs>): Prisma.PrismaPromise<GetGpgPublicKeyAggregateType<T>>

    /**
     * Group by GpgPublicKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GpgPublicKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GpgPublicKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GpgPublicKeyGroupByArgs['orderBy'] }
        : { orderBy?: GpgPublicKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GpgPublicKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGpgPublicKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for GpgPublicKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__GpgPublicKeyClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    provider<T extends ProviderArgs= {}>(args?: Subset<T, ProviderArgs>): Prisma__ProviderClient<ProviderGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * GpgPublicKey base type for findUnique actions
   */
  export type GpgPublicKeyFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
    /**
     * Filter, which GpgPublicKey to fetch.
     */
    where: GpgPublicKeyWhereUniqueInput
  }

  /**
   * GpgPublicKey findUnique
   */
  export interface GpgPublicKeyFindUniqueArgs extends GpgPublicKeyFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * GpgPublicKey findUniqueOrThrow
   */
  export type GpgPublicKeyFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
    /**
     * Filter, which GpgPublicKey to fetch.
     */
    where: GpgPublicKeyWhereUniqueInput
  }


  /**
   * GpgPublicKey base type for findFirst actions
   */
  export type GpgPublicKeyFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
    /**
     * Filter, which GpgPublicKey to fetch.
     */
    where?: GpgPublicKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GpgPublicKeys to fetch.
     */
    orderBy?: Enumerable<GpgPublicKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GpgPublicKeys.
     */
    cursor?: GpgPublicKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GpgPublicKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GpgPublicKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GpgPublicKeys.
     */
    distinct?: Enumerable<GpgPublicKeyScalarFieldEnum>
  }

  /**
   * GpgPublicKey findFirst
   */
  export interface GpgPublicKeyFindFirstArgs extends GpgPublicKeyFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * GpgPublicKey findFirstOrThrow
   */
  export type GpgPublicKeyFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
    /**
     * Filter, which GpgPublicKey to fetch.
     */
    where?: GpgPublicKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GpgPublicKeys to fetch.
     */
    orderBy?: Enumerable<GpgPublicKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GpgPublicKeys.
     */
    cursor?: GpgPublicKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GpgPublicKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GpgPublicKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GpgPublicKeys.
     */
    distinct?: Enumerable<GpgPublicKeyScalarFieldEnum>
  }


  /**
   * GpgPublicKey findMany
   */
  export type GpgPublicKeyFindManyArgs = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
    /**
     * Filter, which GpgPublicKeys to fetch.
     */
    where?: GpgPublicKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GpgPublicKeys to fetch.
     */
    orderBy?: Enumerable<GpgPublicKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GpgPublicKeys.
     */
    cursor?: GpgPublicKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GpgPublicKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GpgPublicKeys.
     */
    skip?: number
    distinct?: Enumerable<GpgPublicKeyScalarFieldEnum>
  }


  /**
   * GpgPublicKey create
   */
  export type GpgPublicKeyCreateArgs = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
    /**
     * The data needed to create a GpgPublicKey.
     */
    data: XOR<GpgPublicKeyCreateInput, GpgPublicKeyUncheckedCreateInput>
  }


  /**
   * GpgPublicKey createMany
   */
  export type GpgPublicKeyCreateManyArgs = {
    /**
     * The data used to create many GpgPublicKeys.
     */
    data: Enumerable<GpgPublicKeyCreateManyInput>
  }


  /**
   * GpgPublicKey update
   */
  export type GpgPublicKeyUpdateArgs = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
    /**
     * The data needed to update a GpgPublicKey.
     */
    data: XOR<GpgPublicKeyUpdateInput, GpgPublicKeyUncheckedUpdateInput>
    /**
     * Choose, which GpgPublicKey to update.
     */
    where: GpgPublicKeyWhereUniqueInput
  }


  /**
   * GpgPublicKey updateMany
   */
  export type GpgPublicKeyUpdateManyArgs = {
    /**
     * The data used to update GpgPublicKeys.
     */
    data: XOR<GpgPublicKeyUpdateManyMutationInput, GpgPublicKeyUncheckedUpdateManyInput>
    /**
     * Filter which GpgPublicKeys to update
     */
    where?: GpgPublicKeyWhereInput
  }


  /**
   * GpgPublicKey upsert
   */
  export type GpgPublicKeyUpsertArgs = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
    /**
     * The filter to search for the GpgPublicKey to update in case it exists.
     */
    where: GpgPublicKeyWhereUniqueInput
    /**
     * In case the GpgPublicKey found by the `where` argument doesn't exist, create a new GpgPublicKey with this data.
     */
    create: XOR<GpgPublicKeyCreateInput, GpgPublicKeyUncheckedCreateInput>
    /**
     * In case the GpgPublicKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GpgPublicKeyUpdateInput, GpgPublicKeyUncheckedUpdateInput>
  }


  /**
   * GpgPublicKey delete
   */
  export type GpgPublicKeyDeleteArgs = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
    /**
     * Filter which GpgPublicKey to delete.
     */
    where: GpgPublicKeyWhereUniqueInput
  }


  /**
   * GpgPublicKey deleteMany
   */
  export type GpgPublicKeyDeleteManyArgs = {
    /**
     * Filter which GpgPublicKeys to delete
     */
    where?: GpgPublicKeyWhereInput
  }


  /**
   * GpgPublicKey without action
   */
  export type GpgPublicKeyArgs = {
    /**
     * Select specific fields to fetch from the GpgPublicKey
     */
    select?: GpgPublicKeySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GpgPublicKeyInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const GpgPublicKeyScalarFieldEnum: {
    id: 'id',
    keyId: 'keyId',
    asciiArmor: 'asciiArmor',
    trustSignature: 'trustSignature',
    source: 'source',
    sourceUrl: 'sourceUrl',
    providerId: 'providerId'
  };

  export type GpgPublicKeyScalarFieldEnum = (typeof GpgPublicKeyScalarFieldEnum)[keyof typeof GpgPublicKeyScalarFieldEnum]


  export const PlatformScalarFieldEnum: {
    id: 'id',
    os: 'os',
    arch: 'arch',
    shasum: 'shasum',
    filename: 'filename',
    providerId: 'providerId'
  };

  export type PlatformScalarFieldEnum = (typeof PlatformScalarFieldEnum)[keyof typeof PlatformScalarFieldEnum]


  export const ProtocolScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type ProtocolScalarFieldEnum = (typeof ProtocolScalarFieldEnum)[keyof typeof ProtocolScalarFieldEnum]


  export const ProviderScalarFieldEnum: {
    id: 'id',
    namespace: 'namespace',
    type: 'type',
    published_at: 'published_at'
  };

  export type ProviderScalarFieldEnum = (typeof ProviderScalarFieldEnum)[keyof typeof ProviderScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
    Snapshot: 'Snapshot'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const VersionProtocolScalarFieldEnum: {
    id: 'id',
    versionId: 'versionId',
    protocolId: 'protocolId'
  };

  export type VersionProtocolScalarFieldEnum = (typeof VersionProtocolScalarFieldEnum)[keyof typeof VersionProtocolScalarFieldEnum]


  export const VersionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    providerId: 'providerId'
  };

  export type VersionScalarFieldEnum = (typeof VersionScalarFieldEnum)[keyof typeof VersionScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type ProviderWhereInput = {
    AND?: Enumerable<ProviderWhereInput>
    OR?: Enumerable<ProviderWhereInput>
    NOT?: Enumerable<ProviderWhereInput>
    id?: IntFilter | number
    namespace?: StringFilter | string
    type?: StringFilter | string
    published_at?: DateTimeFilter | Date | string
    versions?: VersionListRelationFilter
    gpgPublicKeys?: GpgPublicKeyListRelationFilter
  }

  export type ProviderOrderByWithRelationInput = {
    id?: SortOrder
    namespace?: SortOrder
    type?: SortOrder
    published_at?: SortOrder
    versions?: VersionOrderByRelationAggregateInput
    gpgPublicKeys?: GpgPublicKeyOrderByRelationAggregateInput
  }

  export type ProviderWhereUniqueInput = {
    id?: number
  }

  export type ProviderOrderByWithAggregationInput = {
    id?: SortOrder
    namespace?: SortOrder
    type?: SortOrder
    published_at?: SortOrder
    _count?: ProviderCountOrderByAggregateInput
    _avg?: ProviderAvgOrderByAggregateInput
    _max?: ProviderMaxOrderByAggregateInput
    _min?: ProviderMinOrderByAggregateInput
    _sum?: ProviderSumOrderByAggregateInput
  }

  export type ProviderScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProviderScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProviderScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProviderScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    namespace?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    published_at?: DateTimeWithAggregatesFilter | Date | string
  }

  export type VersionWhereInput = {
    AND?: Enumerable<VersionWhereInput>
    OR?: Enumerable<VersionWhereInput>
    NOT?: Enumerable<VersionWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    providerId?: IntFilter | number
    provider?: XOR<ProviderRelationFilter, ProviderWhereInput>
    platforms?: PlatformListRelationFilter
    protocols?: VersionProtocolListRelationFilter
  }

  export type VersionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    providerId?: SortOrder
    provider?: ProviderOrderByWithRelationInput
    platforms?: PlatformOrderByRelationAggregateInput
    protocols?: VersionProtocolOrderByRelationAggregateInput
  }

  export type VersionWhereUniqueInput = {
    id?: number
    providerId?: number
  }

  export type VersionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    providerId?: SortOrder
    _count?: VersionCountOrderByAggregateInput
    _avg?: VersionAvgOrderByAggregateInput
    _max?: VersionMaxOrderByAggregateInput
    _min?: VersionMinOrderByAggregateInput
    _sum?: VersionSumOrderByAggregateInput
  }

  export type VersionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<VersionScalarWhereWithAggregatesInput>
    OR?: Enumerable<VersionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<VersionScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    providerId?: IntWithAggregatesFilter | number
  }

  export type VersionProtocolWhereInput = {
    AND?: Enumerable<VersionProtocolWhereInput>
    OR?: Enumerable<VersionProtocolWhereInput>
    NOT?: Enumerable<VersionProtocolWhereInput>
    id?: IntFilter | number
    versionId?: IntFilter | number
    protocolId?: IntFilter | number
    version?: XOR<VersionRelationFilter, VersionWhereInput>
    protocol?: XOR<ProtocolRelationFilter, ProtocolWhereInput>
  }

  export type VersionProtocolOrderByWithRelationInput = {
    id?: SortOrder
    versionId?: SortOrder
    protocolId?: SortOrder
    version?: VersionOrderByWithRelationInput
    protocol?: ProtocolOrderByWithRelationInput
  }

  export type VersionProtocolWhereUniqueInput = {
    id?: number
  }

  export type VersionProtocolOrderByWithAggregationInput = {
    id?: SortOrder
    versionId?: SortOrder
    protocolId?: SortOrder
    _count?: VersionProtocolCountOrderByAggregateInput
    _avg?: VersionProtocolAvgOrderByAggregateInput
    _max?: VersionProtocolMaxOrderByAggregateInput
    _min?: VersionProtocolMinOrderByAggregateInput
    _sum?: VersionProtocolSumOrderByAggregateInput
  }

  export type VersionProtocolScalarWhereWithAggregatesInput = {
    AND?: Enumerable<VersionProtocolScalarWhereWithAggregatesInput>
    OR?: Enumerable<VersionProtocolScalarWhereWithAggregatesInput>
    NOT?: Enumerable<VersionProtocolScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    versionId?: IntWithAggregatesFilter | number
    protocolId?: IntWithAggregatesFilter | number
  }

  export type ProtocolWhereInput = {
    AND?: Enumerable<ProtocolWhereInput>
    OR?: Enumerable<ProtocolWhereInput>
    NOT?: Enumerable<ProtocolWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    providers?: VersionProtocolListRelationFilter
  }

  export type ProtocolOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    providers?: VersionProtocolOrderByRelationAggregateInput
  }

  export type ProtocolWhereUniqueInput = {
    id?: number
  }

  export type ProtocolOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: ProtocolCountOrderByAggregateInput
    _avg?: ProtocolAvgOrderByAggregateInput
    _max?: ProtocolMaxOrderByAggregateInput
    _min?: ProtocolMinOrderByAggregateInput
    _sum?: ProtocolSumOrderByAggregateInput
  }

  export type ProtocolScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProtocolScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProtocolScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProtocolScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
  }

  export type PlatformWhereInput = {
    AND?: Enumerable<PlatformWhereInput>
    OR?: Enumerable<PlatformWhereInput>
    NOT?: Enumerable<PlatformWhereInput>
    id?: IntFilter | number
    os?: StringFilter | string
    arch?: StringFilter | string
    shasum?: StringFilter | string
    filename?: StringFilter | string
    providerId?: IntFilter | number
    provider?: XOR<VersionRelationFilter, VersionWhereInput>
  }

  export type PlatformOrderByWithRelationInput = {
    id?: SortOrder
    os?: SortOrder
    arch?: SortOrder
    shasum?: SortOrder
    filename?: SortOrder
    providerId?: SortOrder
    provider?: VersionOrderByWithRelationInput
  }

  export type PlatformWhereUniqueInput = {
    id?: number
  }

  export type PlatformOrderByWithAggregationInput = {
    id?: SortOrder
    os?: SortOrder
    arch?: SortOrder
    shasum?: SortOrder
    filename?: SortOrder
    providerId?: SortOrder
    _count?: PlatformCountOrderByAggregateInput
    _avg?: PlatformAvgOrderByAggregateInput
    _max?: PlatformMaxOrderByAggregateInput
    _min?: PlatformMinOrderByAggregateInput
    _sum?: PlatformSumOrderByAggregateInput
  }

  export type PlatformScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PlatformScalarWhereWithAggregatesInput>
    OR?: Enumerable<PlatformScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PlatformScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    os?: StringWithAggregatesFilter | string
    arch?: StringWithAggregatesFilter | string
    shasum?: StringWithAggregatesFilter | string
    filename?: StringWithAggregatesFilter | string
    providerId?: IntWithAggregatesFilter | number
  }

  export type GpgPublicKeyWhereInput = {
    AND?: Enumerable<GpgPublicKeyWhereInput>
    OR?: Enumerable<GpgPublicKeyWhereInput>
    NOT?: Enumerable<GpgPublicKeyWhereInput>
    id?: IntFilter | number
    keyId?: StringFilter | string
    asciiArmor?: StringFilter | string
    trustSignature?: StringFilter | string
    source?: StringFilter | string
    sourceUrl?: StringFilter | string
    providerId?: IntFilter | number
    provider?: XOR<ProviderRelationFilter, ProviderWhereInput>
  }

  export type GpgPublicKeyOrderByWithRelationInput = {
    id?: SortOrder
    keyId?: SortOrder
    asciiArmor?: SortOrder
    trustSignature?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    providerId?: SortOrder
    provider?: ProviderOrderByWithRelationInput
  }

  export type GpgPublicKeyWhereUniqueInput = {
    id?: number
    providerId?: number
  }

  export type GpgPublicKeyOrderByWithAggregationInput = {
    id?: SortOrder
    keyId?: SortOrder
    asciiArmor?: SortOrder
    trustSignature?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    providerId?: SortOrder
    _count?: GpgPublicKeyCountOrderByAggregateInput
    _avg?: GpgPublicKeyAvgOrderByAggregateInput
    _max?: GpgPublicKeyMaxOrderByAggregateInput
    _min?: GpgPublicKeyMinOrderByAggregateInput
    _sum?: GpgPublicKeySumOrderByAggregateInput
  }

  export type GpgPublicKeyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<GpgPublicKeyScalarWhereWithAggregatesInput>
    OR?: Enumerable<GpgPublicKeyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<GpgPublicKeyScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    keyId?: StringWithAggregatesFilter | string
    asciiArmor?: StringWithAggregatesFilter | string
    trustSignature?: StringWithAggregatesFilter | string
    source?: StringWithAggregatesFilter | string
    sourceUrl?: StringWithAggregatesFilter | string
    providerId?: IntWithAggregatesFilter | number
  }

  export type ProviderCreateInput = {
    namespace: string
    type: string
    published_at?: Date | string
    versions?: VersionCreateNestedManyWithoutProviderInput
    gpgPublicKeys?: GpgPublicKeyCreateNestedManyWithoutProviderInput
  }

  export type ProviderUncheckedCreateInput = {
    id?: number
    namespace: string
    type: string
    published_at?: Date | string
    versions?: VersionUncheckedCreateNestedManyWithoutProviderInput
    gpgPublicKeys?: GpgPublicKeyUncheckedCreateNestedManyWithoutProviderInput
  }

  export type ProviderUpdateInput = {
    namespace?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: VersionUpdateManyWithoutProviderNestedInput
    gpgPublicKeys?: GpgPublicKeyUpdateManyWithoutProviderNestedInput
  }

  export type ProviderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    namespace?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: VersionUncheckedUpdateManyWithoutProviderNestedInput
    gpgPublicKeys?: GpgPublicKeyUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type ProviderCreateManyInput = {
    namespace: string
    type: string
    published_at?: Date | string
  }

  export type ProviderUpdateManyMutationInput = {
    namespace?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    namespace?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionCreateInput = {
    name: string
    provider: ProviderCreateNestedOneWithoutVersionsInput
    platforms?: PlatformCreateNestedManyWithoutProviderInput
    protocols?: VersionProtocolCreateNestedManyWithoutVersionInput
  }

  export type VersionUncheckedCreateInput = {
    id?: number
    name: string
    providerId: number
    platforms?: PlatformUncheckedCreateNestedManyWithoutProviderInput
    protocols?: VersionProtocolUncheckedCreateNestedManyWithoutVersionInput
  }

  export type VersionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    provider?: ProviderUpdateOneRequiredWithoutVersionsNestedInput
    platforms?: PlatformUpdateManyWithoutProviderNestedInput
    protocols?: VersionProtocolUpdateManyWithoutVersionNestedInput
  }

  export type VersionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    providerId?: IntFieldUpdateOperationsInput | number
    platforms?: PlatformUncheckedUpdateManyWithoutProviderNestedInput
    protocols?: VersionProtocolUncheckedUpdateManyWithoutVersionNestedInput
  }

  export type VersionCreateManyInput = {
    name: string
    providerId: number
  }

  export type VersionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VersionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    providerId?: IntFieldUpdateOperationsInput | number
  }

  export type VersionProtocolCreateInput = {
    version: VersionCreateNestedOneWithoutProtocolsInput
    protocol: ProtocolCreateNestedOneWithoutProvidersInput
  }

  export type VersionProtocolUncheckedCreateInput = {
    id?: number
    versionId: number
    protocolId: number
  }

  export type VersionProtocolUpdateInput = {
    version?: VersionUpdateOneRequiredWithoutProtocolsNestedInput
    protocol?: ProtocolUpdateOneRequiredWithoutProvidersNestedInput
  }

  export type VersionProtocolUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    versionId?: IntFieldUpdateOperationsInput | number
    protocolId?: IntFieldUpdateOperationsInput | number
  }

  export type VersionProtocolCreateManyInput = {
    versionId: number
    protocolId: number
  }

  export type VersionProtocolUpdateManyMutationInput = {

  }

  export type VersionProtocolUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    versionId?: IntFieldUpdateOperationsInput | number
    protocolId?: IntFieldUpdateOperationsInput | number
  }

  export type ProtocolCreateInput = {
    name: string
    providers?: VersionProtocolCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolUncheckedCreateInput = {
    id?: number
    name: string
    providers?: VersionProtocolUncheckedCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    providers?: VersionProtocolUpdateManyWithoutProtocolNestedInput
  }

  export type ProtocolUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    providers?: VersionProtocolUncheckedUpdateManyWithoutProtocolNestedInput
  }

  export type ProtocolCreateManyInput = {
    name: string
  }

  export type ProtocolUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProtocolUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PlatformCreateInput = {
    os: string
    arch: string
    shasum: string
    filename: string
    provider: VersionCreateNestedOneWithoutPlatformsInput
  }

  export type PlatformUncheckedCreateInput = {
    id?: number
    os: string
    arch: string
    shasum: string
    filename: string
    providerId: number
  }

  export type PlatformUpdateInput = {
    os?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    shasum?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    provider?: VersionUpdateOneRequiredWithoutPlatformsNestedInput
  }

  export type PlatformUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    os?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    shasum?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    providerId?: IntFieldUpdateOperationsInput | number
  }

  export type PlatformCreateManyInput = {
    os: string
    arch: string
    shasum: string
    filename: string
    providerId: number
  }

  export type PlatformUpdateManyMutationInput = {
    os?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    shasum?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
  }

  export type PlatformUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    os?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    shasum?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    providerId?: IntFieldUpdateOperationsInput | number
  }

  export type GpgPublicKeyCreateInput = {
    keyId: string
    asciiArmor: string
    trustSignature: string
    source: string
    sourceUrl: string
    provider: ProviderCreateNestedOneWithoutGpgPublicKeysInput
  }

  export type GpgPublicKeyUncheckedCreateInput = {
    id?: number
    keyId: string
    asciiArmor: string
    trustSignature: string
    source: string
    sourceUrl: string
    providerId: number
  }

  export type GpgPublicKeyUpdateInput = {
    keyId?: StringFieldUpdateOperationsInput | string
    asciiArmor?: StringFieldUpdateOperationsInput | string
    trustSignature?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    provider?: ProviderUpdateOneRequiredWithoutGpgPublicKeysNestedInput
  }

  export type GpgPublicKeyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    keyId?: StringFieldUpdateOperationsInput | string
    asciiArmor?: StringFieldUpdateOperationsInput | string
    trustSignature?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    providerId?: IntFieldUpdateOperationsInput | number
  }

  export type GpgPublicKeyCreateManyInput = {
    keyId: string
    asciiArmor: string
    trustSignature: string
    source: string
    sourceUrl: string
    providerId: number
  }

  export type GpgPublicKeyUpdateManyMutationInput = {
    keyId?: StringFieldUpdateOperationsInput | string
    asciiArmor?: StringFieldUpdateOperationsInput | string
    trustSignature?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
  }

  export type GpgPublicKeyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    keyId?: StringFieldUpdateOperationsInput | string
    asciiArmor?: StringFieldUpdateOperationsInput | string
    trustSignature?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    providerId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type VersionListRelationFilter = {
    every?: VersionWhereInput
    some?: VersionWhereInput
    none?: VersionWhereInput
  }

  export type GpgPublicKeyListRelationFilter = {
    every?: GpgPublicKeyWhereInput
    some?: GpgPublicKeyWhereInput
    none?: GpgPublicKeyWhereInput
  }

  export type VersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GpgPublicKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProviderCountOrderByAggregateInput = {
    id?: SortOrder
    namespace?: SortOrder
    type?: SortOrder
    published_at?: SortOrder
  }

  export type ProviderAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    namespace?: SortOrder
    type?: SortOrder
    published_at?: SortOrder
  }

  export type ProviderMinOrderByAggregateInput = {
    id?: SortOrder
    namespace?: SortOrder
    type?: SortOrder
    published_at?: SortOrder
  }

  export type ProviderSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type ProviderRelationFilter = {
    is?: ProviderWhereInput
    isNot?: ProviderWhereInput
  }

  export type PlatformListRelationFilter = {
    every?: PlatformWhereInput
    some?: PlatformWhereInput
    none?: PlatformWhereInput
  }

  export type VersionProtocolListRelationFilter = {
    every?: VersionProtocolWhereInput
    some?: VersionProtocolWhereInput
    none?: VersionProtocolWhereInput
  }

  export type PlatformOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VersionProtocolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VersionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    providerId?: SortOrder
  }

  export type VersionAvgOrderByAggregateInput = {
    id?: SortOrder
    providerId?: SortOrder
  }

  export type VersionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    providerId?: SortOrder
  }

  export type VersionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    providerId?: SortOrder
  }

  export type VersionSumOrderByAggregateInput = {
    id?: SortOrder
    providerId?: SortOrder
  }

  export type VersionRelationFilter = {
    is?: VersionWhereInput
    isNot?: VersionWhereInput
  }

  export type ProtocolRelationFilter = {
    is?: ProtocolWhereInput
    isNot?: ProtocolWhereInput
  }

  export type VersionProtocolCountOrderByAggregateInput = {
    id?: SortOrder
    versionId?: SortOrder
    protocolId?: SortOrder
  }

  export type VersionProtocolAvgOrderByAggregateInput = {
    id?: SortOrder
    versionId?: SortOrder
    protocolId?: SortOrder
  }

  export type VersionProtocolMaxOrderByAggregateInput = {
    id?: SortOrder
    versionId?: SortOrder
    protocolId?: SortOrder
  }

  export type VersionProtocolMinOrderByAggregateInput = {
    id?: SortOrder
    versionId?: SortOrder
    protocolId?: SortOrder
  }

  export type VersionProtocolSumOrderByAggregateInput = {
    id?: SortOrder
    versionId?: SortOrder
    protocolId?: SortOrder
  }

  export type ProtocolCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ProtocolAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProtocolMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ProtocolMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ProtocolSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PlatformCountOrderByAggregateInput = {
    id?: SortOrder
    os?: SortOrder
    arch?: SortOrder
    shasum?: SortOrder
    filename?: SortOrder
    providerId?: SortOrder
  }

  export type PlatformAvgOrderByAggregateInput = {
    id?: SortOrder
    providerId?: SortOrder
  }

  export type PlatformMaxOrderByAggregateInput = {
    id?: SortOrder
    os?: SortOrder
    arch?: SortOrder
    shasum?: SortOrder
    filename?: SortOrder
    providerId?: SortOrder
  }

  export type PlatformMinOrderByAggregateInput = {
    id?: SortOrder
    os?: SortOrder
    arch?: SortOrder
    shasum?: SortOrder
    filename?: SortOrder
    providerId?: SortOrder
  }

  export type PlatformSumOrderByAggregateInput = {
    id?: SortOrder
    providerId?: SortOrder
  }

  export type GpgPublicKeyCountOrderByAggregateInput = {
    id?: SortOrder
    keyId?: SortOrder
    asciiArmor?: SortOrder
    trustSignature?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    providerId?: SortOrder
  }

  export type GpgPublicKeyAvgOrderByAggregateInput = {
    id?: SortOrder
    providerId?: SortOrder
  }

  export type GpgPublicKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    keyId?: SortOrder
    asciiArmor?: SortOrder
    trustSignature?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    providerId?: SortOrder
  }

  export type GpgPublicKeyMinOrderByAggregateInput = {
    id?: SortOrder
    keyId?: SortOrder
    asciiArmor?: SortOrder
    trustSignature?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    providerId?: SortOrder
  }

  export type GpgPublicKeySumOrderByAggregateInput = {
    id?: SortOrder
    providerId?: SortOrder
  }

  export type VersionCreateNestedManyWithoutProviderInput = {
    create?: XOR<Enumerable<VersionCreateWithoutProviderInput>, Enumerable<VersionUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<VersionCreateOrConnectWithoutProviderInput>
    createMany?: VersionCreateManyProviderInputEnvelope
    connect?: Enumerable<VersionWhereUniqueInput>
  }

  export type GpgPublicKeyCreateNestedManyWithoutProviderInput = {
    create?: XOR<Enumerable<GpgPublicKeyCreateWithoutProviderInput>, Enumerable<GpgPublicKeyUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<GpgPublicKeyCreateOrConnectWithoutProviderInput>
    createMany?: GpgPublicKeyCreateManyProviderInputEnvelope
    connect?: Enumerable<GpgPublicKeyWhereUniqueInput>
  }

  export type VersionUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<Enumerable<VersionCreateWithoutProviderInput>, Enumerable<VersionUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<VersionCreateOrConnectWithoutProviderInput>
    createMany?: VersionCreateManyProviderInputEnvelope
    connect?: Enumerable<VersionWhereUniqueInput>
  }

  export type GpgPublicKeyUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<Enumerable<GpgPublicKeyCreateWithoutProviderInput>, Enumerable<GpgPublicKeyUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<GpgPublicKeyCreateOrConnectWithoutProviderInput>
    createMany?: GpgPublicKeyCreateManyProviderInputEnvelope
    connect?: Enumerable<GpgPublicKeyWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VersionUpdateManyWithoutProviderNestedInput = {
    create?: XOR<Enumerable<VersionCreateWithoutProviderInput>, Enumerable<VersionUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<VersionCreateOrConnectWithoutProviderInput>
    upsert?: Enumerable<VersionUpsertWithWhereUniqueWithoutProviderInput>
    createMany?: VersionCreateManyProviderInputEnvelope
    set?: Enumerable<VersionWhereUniqueInput>
    disconnect?: Enumerable<VersionWhereUniqueInput>
    delete?: Enumerable<VersionWhereUniqueInput>
    connect?: Enumerable<VersionWhereUniqueInput>
    update?: Enumerable<VersionUpdateWithWhereUniqueWithoutProviderInput>
    updateMany?: Enumerable<VersionUpdateManyWithWhereWithoutProviderInput>
    deleteMany?: Enumerable<VersionScalarWhereInput>
  }

  export type GpgPublicKeyUpdateManyWithoutProviderNestedInput = {
    create?: XOR<Enumerable<GpgPublicKeyCreateWithoutProviderInput>, Enumerable<GpgPublicKeyUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<GpgPublicKeyCreateOrConnectWithoutProviderInput>
    upsert?: Enumerable<GpgPublicKeyUpsertWithWhereUniqueWithoutProviderInput>
    createMany?: GpgPublicKeyCreateManyProviderInputEnvelope
    set?: Enumerable<GpgPublicKeyWhereUniqueInput>
    disconnect?: Enumerable<GpgPublicKeyWhereUniqueInput>
    delete?: Enumerable<GpgPublicKeyWhereUniqueInput>
    connect?: Enumerable<GpgPublicKeyWhereUniqueInput>
    update?: Enumerable<GpgPublicKeyUpdateWithWhereUniqueWithoutProviderInput>
    updateMany?: Enumerable<GpgPublicKeyUpdateManyWithWhereWithoutProviderInput>
    deleteMany?: Enumerable<GpgPublicKeyScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VersionUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<Enumerable<VersionCreateWithoutProviderInput>, Enumerable<VersionUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<VersionCreateOrConnectWithoutProviderInput>
    upsert?: Enumerable<VersionUpsertWithWhereUniqueWithoutProviderInput>
    createMany?: VersionCreateManyProviderInputEnvelope
    set?: Enumerable<VersionWhereUniqueInput>
    disconnect?: Enumerable<VersionWhereUniqueInput>
    delete?: Enumerable<VersionWhereUniqueInput>
    connect?: Enumerable<VersionWhereUniqueInput>
    update?: Enumerable<VersionUpdateWithWhereUniqueWithoutProviderInput>
    updateMany?: Enumerable<VersionUpdateManyWithWhereWithoutProviderInput>
    deleteMany?: Enumerable<VersionScalarWhereInput>
  }

  export type GpgPublicKeyUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<Enumerable<GpgPublicKeyCreateWithoutProviderInput>, Enumerable<GpgPublicKeyUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<GpgPublicKeyCreateOrConnectWithoutProviderInput>
    upsert?: Enumerable<GpgPublicKeyUpsertWithWhereUniqueWithoutProviderInput>
    createMany?: GpgPublicKeyCreateManyProviderInputEnvelope
    set?: Enumerable<GpgPublicKeyWhereUniqueInput>
    disconnect?: Enumerable<GpgPublicKeyWhereUniqueInput>
    delete?: Enumerable<GpgPublicKeyWhereUniqueInput>
    connect?: Enumerable<GpgPublicKeyWhereUniqueInput>
    update?: Enumerable<GpgPublicKeyUpdateWithWhereUniqueWithoutProviderInput>
    updateMany?: Enumerable<GpgPublicKeyUpdateManyWithWhereWithoutProviderInput>
    deleteMany?: Enumerable<GpgPublicKeyScalarWhereInput>
  }

  export type ProviderCreateNestedOneWithoutVersionsInput = {
    create?: XOR<ProviderCreateWithoutVersionsInput, ProviderUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutVersionsInput
    connect?: ProviderWhereUniqueInput
  }

  export type PlatformCreateNestedManyWithoutProviderInput = {
    create?: XOR<Enumerable<PlatformCreateWithoutProviderInput>, Enumerable<PlatformUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<PlatformCreateOrConnectWithoutProviderInput>
    createMany?: PlatformCreateManyProviderInputEnvelope
    connect?: Enumerable<PlatformWhereUniqueInput>
  }

  export type VersionProtocolCreateNestedManyWithoutVersionInput = {
    create?: XOR<Enumerable<VersionProtocolCreateWithoutVersionInput>, Enumerable<VersionProtocolUncheckedCreateWithoutVersionInput>>
    connectOrCreate?: Enumerable<VersionProtocolCreateOrConnectWithoutVersionInput>
    createMany?: VersionProtocolCreateManyVersionInputEnvelope
    connect?: Enumerable<VersionProtocolWhereUniqueInput>
  }

  export type PlatformUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<Enumerable<PlatformCreateWithoutProviderInput>, Enumerable<PlatformUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<PlatformCreateOrConnectWithoutProviderInput>
    createMany?: PlatformCreateManyProviderInputEnvelope
    connect?: Enumerable<PlatformWhereUniqueInput>
  }

  export type VersionProtocolUncheckedCreateNestedManyWithoutVersionInput = {
    create?: XOR<Enumerable<VersionProtocolCreateWithoutVersionInput>, Enumerable<VersionProtocolUncheckedCreateWithoutVersionInput>>
    connectOrCreate?: Enumerable<VersionProtocolCreateOrConnectWithoutVersionInput>
    createMany?: VersionProtocolCreateManyVersionInputEnvelope
    connect?: Enumerable<VersionProtocolWhereUniqueInput>
  }

  export type ProviderUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<ProviderCreateWithoutVersionsInput, ProviderUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutVersionsInput
    upsert?: ProviderUpsertWithoutVersionsInput
    connect?: ProviderWhereUniqueInput
    update?: XOR<ProviderUpdateWithoutVersionsInput, ProviderUncheckedUpdateWithoutVersionsInput>
  }

  export type PlatformUpdateManyWithoutProviderNestedInput = {
    create?: XOR<Enumerable<PlatformCreateWithoutProviderInput>, Enumerable<PlatformUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<PlatformCreateOrConnectWithoutProviderInput>
    upsert?: Enumerable<PlatformUpsertWithWhereUniqueWithoutProviderInput>
    createMany?: PlatformCreateManyProviderInputEnvelope
    set?: Enumerable<PlatformWhereUniqueInput>
    disconnect?: Enumerable<PlatformWhereUniqueInput>
    delete?: Enumerable<PlatformWhereUniqueInput>
    connect?: Enumerable<PlatformWhereUniqueInput>
    update?: Enumerable<PlatformUpdateWithWhereUniqueWithoutProviderInput>
    updateMany?: Enumerable<PlatformUpdateManyWithWhereWithoutProviderInput>
    deleteMany?: Enumerable<PlatformScalarWhereInput>
  }

  export type VersionProtocolUpdateManyWithoutVersionNestedInput = {
    create?: XOR<Enumerable<VersionProtocolCreateWithoutVersionInput>, Enumerable<VersionProtocolUncheckedCreateWithoutVersionInput>>
    connectOrCreate?: Enumerable<VersionProtocolCreateOrConnectWithoutVersionInput>
    upsert?: Enumerable<VersionProtocolUpsertWithWhereUniqueWithoutVersionInput>
    createMany?: VersionProtocolCreateManyVersionInputEnvelope
    set?: Enumerable<VersionProtocolWhereUniqueInput>
    disconnect?: Enumerable<VersionProtocolWhereUniqueInput>
    delete?: Enumerable<VersionProtocolWhereUniqueInput>
    connect?: Enumerable<VersionProtocolWhereUniqueInput>
    update?: Enumerable<VersionProtocolUpdateWithWhereUniqueWithoutVersionInput>
    updateMany?: Enumerable<VersionProtocolUpdateManyWithWhereWithoutVersionInput>
    deleteMany?: Enumerable<VersionProtocolScalarWhereInput>
  }

  export type PlatformUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<Enumerable<PlatformCreateWithoutProviderInput>, Enumerable<PlatformUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<PlatformCreateOrConnectWithoutProviderInput>
    upsert?: Enumerable<PlatformUpsertWithWhereUniqueWithoutProviderInput>
    createMany?: PlatformCreateManyProviderInputEnvelope
    set?: Enumerable<PlatformWhereUniqueInput>
    disconnect?: Enumerable<PlatformWhereUniqueInput>
    delete?: Enumerable<PlatformWhereUniqueInput>
    connect?: Enumerable<PlatformWhereUniqueInput>
    update?: Enumerable<PlatformUpdateWithWhereUniqueWithoutProviderInput>
    updateMany?: Enumerable<PlatformUpdateManyWithWhereWithoutProviderInput>
    deleteMany?: Enumerable<PlatformScalarWhereInput>
  }

  export type VersionProtocolUncheckedUpdateManyWithoutVersionNestedInput = {
    create?: XOR<Enumerable<VersionProtocolCreateWithoutVersionInput>, Enumerable<VersionProtocolUncheckedCreateWithoutVersionInput>>
    connectOrCreate?: Enumerable<VersionProtocolCreateOrConnectWithoutVersionInput>
    upsert?: Enumerable<VersionProtocolUpsertWithWhereUniqueWithoutVersionInput>
    createMany?: VersionProtocolCreateManyVersionInputEnvelope
    set?: Enumerable<VersionProtocolWhereUniqueInput>
    disconnect?: Enumerable<VersionProtocolWhereUniqueInput>
    delete?: Enumerable<VersionProtocolWhereUniqueInput>
    connect?: Enumerable<VersionProtocolWhereUniqueInput>
    update?: Enumerable<VersionProtocolUpdateWithWhereUniqueWithoutVersionInput>
    updateMany?: Enumerable<VersionProtocolUpdateManyWithWhereWithoutVersionInput>
    deleteMany?: Enumerable<VersionProtocolScalarWhereInput>
  }

  export type VersionCreateNestedOneWithoutProtocolsInput = {
    create?: XOR<VersionCreateWithoutProtocolsInput, VersionUncheckedCreateWithoutProtocolsInput>
    connectOrCreate?: VersionCreateOrConnectWithoutProtocolsInput
    connect?: VersionWhereUniqueInput
  }

  export type ProtocolCreateNestedOneWithoutProvidersInput = {
    create?: XOR<ProtocolCreateWithoutProvidersInput, ProtocolUncheckedCreateWithoutProvidersInput>
    connectOrCreate?: ProtocolCreateOrConnectWithoutProvidersInput
    connect?: ProtocolWhereUniqueInput
  }

  export type VersionUpdateOneRequiredWithoutProtocolsNestedInput = {
    create?: XOR<VersionCreateWithoutProtocolsInput, VersionUncheckedCreateWithoutProtocolsInput>
    connectOrCreate?: VersionCreateOrConnectWithoutProtocolsInput
    upsert?: VersionUpsertWithoutProtocolsInput
    connect?: VersionWhereUniqueInput
    update?: XOR<VersionUpdateWithoutProtocolsInput, VersionUncheckedUpdateWithoutProtocolsInput>
  }

  export type ProtocolUpdateOneRequiredWithoutProvidersNestedInput = {
    create?: XOR<ProtocolCreateWithoutProvidersInput, ProtocolUncheckedCreateWithoutProvidersInput>
    connectOrCreate?: ProtocolCreateOrConnectWithoutProvidersInput
    upsert?: ProtocolUpsertWithoutProvidersInput
    connect?: ProtocolWhereUniqueInput
    update?: XOR<ProtocolUpdateWithoutProvidersInput, ProtocolUncheckedUpdateWithoutProvidersInput>
  }

  export type VersionProtocolCreateNestedManyWithoutProtocolInput = {
    create?: XOR<Enumerable<VersionProtocolCreateWithoutProtocolInput>, Enumerable<VersionProtocolUncheckedCreateWithoutProtocolInput>>
    connectOrCreate?: Enumerable<VersionProtocolCreateOrConnectWithoutProtocolInput>
    createMany?: VersionProtocolCreateManyProtocolInputEnvelope
    connect?: Enumerable<VersionProtocolWhereUniqueInput>
  }

  export type VersionProtocolUncheckedCreateNestedManyWithoutProtocolInput = {
    create?: XOR<Enumerable<VersionProtocolCreateWithoutProtocolInput>, Enumerable<VersionProtocolUncheckedCreateWithoutProtocolInput>>
    connectOrCreate?: Enumerable<VersionProtocolCreateOrConnectWithoutProtocolInput>
    createMany?: VersionProtocolCreateManyProtocolInputEnvelope
    connect?: Enumerable<VersionProtocolWhereUniqueInput>
  }

  export type VersionProtocolUpdateManyWithoutProtocolNestedInput = {
    create?: XOR<Enumerable<VersionProtocolCreateWithoutProtocolInput>, Enumerable<VersionProtocolUncheckedCreateWithoutProtocolInput>>
    connectOrCreate?: Enumerable<VersionProtocolCreateOrConnectWithoutProtocolInput>
    upsert?: Enumerable<VersionProtocolUpsertWithWhereUniqueWithoutProtocolInput>
    createMany?: VersionProtocolCreateManyProtocolInputEnvelope
    set?: Enumerable<VersionProtocolWhereUniqueInput>
    disconnect?: Enumerable<VersionProtocolWhereUniqueInput>
    delete?: Enumerable<VersionProtocolWhereUniqueInput>
    connect?: Enumerable<VersionProtocolWhereUniqueInput>
    update?: Enumerable<VersionProtocolUpdateWithWhereUniqueWithoutProtocolInput>
    updateMany?: Enumerable<VersionProtocolUpdateManyWithWhereWithoutProtocolInput>
    deleteMany?: Enumerable<VersionProtocolScalarWhereInput>
  }

  export type VersionProtocolUncheckedUpdateManyWithoutProtocolNestedInput = {
    create?: XOR<Enumerable<VersionProtocolCreateWithoutProtocolInput>, Enumerable<VersionProtocolUncheckedCreateWithoutProtocolInput>>
    connectOrCreate?: Enumerable<VersionProtocolCreateOrConnectWithoutProtocolInput>
    upsert?: Enumerable<VersionProtocolUpsertWithWhereUniqueWithoutProtocolInput>
    createMany?: VersionProtocolCreateManyProtocolInputEnvelope
    set?: Enumerable<VersionProtocolWhereUniqueInput>
    disconnect?: Enumerable<VersionProtocolWhereUniqueInput>
    delete?: Enumerable<VersionProtocolWhereUniqueInput>
    connect?: Enumerable<VersionProtocolWhereUniqueInput>
    update?: Enumerable<VersionProtocolUpdateWithWhereUniqueWithoutProtocolInput>
    updateMany?: Enumerable<VersionProtocolUpdateManyWithWhereWithoutProtocolInput>
    deleteMany?: Enumerable<VersionProtocolScalarWhereInput>
  }

  export type VersionCreateNestedOneWithoutPlatformsInput = {
    create?: XOR<VersionCreateWithoutPlatformsInput, VersionUncheckedCreateWithoutPlatformsInput>
    connectOrCreate?: VersionCreateOrConnectWithoutPlatformsInput
    connect?: VersionWhereUniqueInput
  }

  export type VersionUpdateOneRequiredWithoutPlatformsNestedInput = {
    create?: XOR<VersionCreateWithoutPlatformsInput, VersionUncheckedCreateWithoutPlatformsInput>
    connectOrCreate?: VersionCreateOrConnectWithoutPlatformsInput
    upsert?: VersionUpsertWithoutPlatformsInput
    connect?: VersionWhereUniqueInput
    update?: XOR<VersionUpdateWithoutPlatformsInput, VersionUncheckedUpdateWithoutPlatformsInput>
  }

  export type ProviderCreateNestedOneWithoutGpgPublicKeysInput = {
    create?: XOR<ProviderCreateWithoutGpgPublicKeysInput, ProviderUncheckedCreateWithoutGpgPublicKeysInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutGpgPublicKeysInput
    connect?: ProviderWhereUniqueInput
  }

  export type ProviderUpdateOneRequiredWithoutGpgPublicKeysNestedInput = {
    create?: XOR<ProviderCreateWithoutGpgPublicKeysInput, ProviderUncheckedCreateWithoutGpgPublicKeysInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutGpgPublicKeysInput
    upsert?: ProviderUpsertWithoutGpgPublicKeysInput
    connect?: ProviderWhereUniqueInput
    update?: XOR<ProviderUpdateWithoutGpgPublicKeysInput, ProviderUncheckedUpdateWithoutGpgPublicKeysInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type VersionCreateWithoutProviderInput = {
    name: string
    platforms?: PlatformCreateNestedManyWithoutProviderInput
    protocols?: VersionProtocolCreateNestedManyWithoutVersionInput
  }

  export type VersionUncheckedCreateWithoutProviderInput = {
    id?: number
    name: string
    platforms?: PlatformUncheckedCreateNestedManyWithoutProviderInput
    protocols?: VersionProtocolUncheckedCreateNestedManyWithoutVersionInput
  }

  export type VersionCreateOrConnectWithoutProviderInput = {
    where: VersionWhereUniqueInput
    create: XOR<VersionCreateWithoutProviderInput, VersionUncheckedCreateWithoutProviderInput>
  }

  export type VersionCreateManyProviderInputEnvelope = {
    data: Enumerable<VersionCreateManyProviderInput>
  }

  export type GpgPublicKeyCreateWithoutProviderInput = {
    keyId: string
    asciiArmor: string
    trustSignature: string
    source: string
    sourceUrl: string
  }

  export type GpgPublicKeyUncheckedCreateWithoutProviderInput = {
    id?: number
    keyId: string
    asciiArmor: string
    trustSignature: string
    source: string
    sourceUrl: string
  }

  export type GpgPublicKeyCreateOrConnectWithoutProviderInput = {
    where: GpgPublicKeyWhereUniqueInput
    create: XOR<GpgPublicKeyCreateWithoutProviderInput, GpgPublicKeyUncheckedCreateWithoutProviderInput>
  }

  export type GpgPublicKeyCreateManyProviderInputEnvelope = {
    data: Enumerable<GpgPublicKeyCreateManyProviderInput>
  }

  export type VersionUpsertWithWhereUniqueWithoutProviderInput = {
    where: VersionWhereUniqueInput
    update: XOR<VersionUpdateWithoutProviderInput, VersionUncheckedUpdateWithoutProviderInput>
    create: XOR<VersionCreateWithoutProviderInput, VersionUncheckedCreateWithoutProviderInput>
  }

  export type VersionUpdateWithWhereUniqueWithoutProviderInput = {
    where: VersionWhereUniqueInput
    data: XOR<VersionUpdateWithoutProviderInput, VersionUncheckedUpdateWithoutProviderInput>
  }

  export type VersionUpdateManyWithWhereWithoutProviderInput = {
    where: VersionScalarWhereInput
    data: XOR<VersionUpdateManyMutationInput, VersionUncheckedUpdateManyWithoutVersionsInput>
  }

  export type VersionScalarWhereInput = {
    AND?: Enumerable<VersionScalarWhereInput>
    OR?: Enumerable<VersionScalarWhereInput>
    NOT?: Enumerable<VersionScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    providerId?: IntFilter | number
  }

  export type GpgPublicKeyUpsertWithWhereUniqueWithoutProviderInput = {
    where: GpgPublicKeyWhereUniqueInput
    update: XOR<GpgPublicKeyUpdateWithoutProviderInput, GpgPublicKeyUncheckedUpdateWithoutProviderInput>
    create: XOR<GpgPublicKeyCreateWithoutProviderInput, GpgPublicKeyUncheckedCreateWithoutProviderInput>
  }

  export type GpgPublicKeyUpdateWithWhereUniqueWithoutProviderInput = {
    where: GpgPublicKeyWhereUniqueInput
    data: XOR<GpgPublicKeyUpdateWithoutProviderInput, GpgPublicKeyUncheckedUpdateWithoutProviderInput>
  }

  export type GpgPublicKeyUpdateManyWithWhereWithoutProviderInput = {
    where: GpgPublicKeyScalarWhereInput
    data: XOR<GpgPublicKeyUpdateManyMutationInput, GpgPublicKeyUncheckedUpdateManyWithoutGpgPublicKeysInput>
  }

  export type GpgPublicKeyScalarWhereInput = {
    AND?: Enumerable<GpgPublicKeyScalarWhereInput>
    OR?: Enumerable<GpgPublicKeyScalarWhereInput>
    NOT?: Enumerable<GpgPublicKeyScalarWhereInput>
    id?: IntFilter | number
    keyId?: StringFilter | string
    asciiArmor?: StringFilter | string
    trustSignature?: StringFilter | string
    source?: StringFilter | string
    sourceUrl?: StringFilter | string
    providerId?: IntFilter | number
  }

  export type ProviderCreateWithoutVersionsInput = {
    namespace: string
    type: string
    published_at?: Date | string
    gpgPublicKeys?: GpgPublicKeyCreateNestedManyWithoutProviderInput
  }

  export type ProviderUncheckedCreateWithoutVersionsInput = {
    id?: number
    namespace: string
    type: string
    published_at?: Date | string
    gpgPublicKeys?: GpgPublicKeyUncheckedCreateNestedManyWithoutProviderInput
  }

  export type ProviderCreateOrConnectWithoutVersionsInput = {
    where: ProviderWhereUniqueInput
    create: XOR<ProviderCreateWithoutVersionsInput, ProviderUncheckedCreateWithoutVersionsInput>
  }

  export type PlatformCreateWithoutProviderInput = {
    os: string
    arch: string
    shasum: string
    filename: string
  }

  export type PlatformUncheckedCreateWithoutProviderInput = {
    id?: number
    os: string
    arch: string
    shasum: string
    filename: string
  }

  export type PlatformCreateOrConnectWithoutProviderInput = {
    where: PlatformWhereUniqueInput
    create: XOR<PlatformCreateWithoutProviderInput, PlatformUncheckedCreateWithoutProviderInput>
  }

  export type PlatformCreateManyProviderInputEnvelope = {
    data: Enumerable<PlatformCreateManyProviderInput>
  }

  export type VersionProtocolCreateWithoutVersionInput = {
    protocol: ProtocolCreateNestedOneWithoutProvidersInput
  }

  export type VersionProtocolUncheckedCreateWithoutVersionInput = {
    id?: number
    protocolId: number
  }

  export type VersionProtocolCreateOrConnectWithoutVersionInput = {
    where: VersionProtocolWhereUniqueInput
    create: XOR<VersionProtocolCreateWithoutVersionInput, VersionProtocolUncheckedCreateWithoutVersionInput>
  }

  export type VersionProtocolCreateManyVersionInputEnvelope = {
    data: Enumerable<VersionProtocolCreateManyVersionInput>
  }

  export type ProviderUpsertWithoutVersionsInput = {
    update: XOR<ProviderUpdateWithoutVersionsInput, ProviderUncheckedUpdateWithoutVersionsInput>
    create: XOR<ProviderCreateWithoutVersionsInput, ProviderUncheckedCreateWithoutVersionsInput>
  }

  export type ProviderUpdateWithoutVersionsInput = {
    namespace?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    gpgPublicKeys?: GpgPublicKeyUpdateManyWithoutProviderNestedInput
  }

  export type ProviderUncheckedUpdateWithoutVersionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    namespace?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    gpgPublicKeys?: GpgPublicKeyUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type PlatformUpsertWithWhereUniqueWithoutProviderInput = {
    where: PlatformWhereUniqueInput
    update: XOR<PlatformUpdateWithoutProviderInput, PlatformUncheckedUpdateWithoutProviderInput>
    create: XOR<PlatformCreateWithoutProviderInput, PlatformUncheckedCreateWithoutProviderInput>
  }

  export type PlatformUpdateWithWhereUniqueWithoutProviderInput = {
    where: PlatformWhereUniqueInput
    data: XOR<PlatformUpdateWithoutProviderInput, PlatformUncheckedUpdateWithoutProviderInput>
  }

  export type PlatformUpdateManyWithWhereWithoutProviderInput = {
    where: PlatformScalarWhereInput
    data: XOR<PlatformUpdateManyMutationInput, PlatformUncheckedUpdateManyWithoutPlatformsInput>
  }

  export type PlatformScalarWhereInput = {
    AND?: Enumerable<PlatformScalarWhereInput>
    OR?: Enumerable<PlatformScalarWhereInput>
    NOT?: Enumerable<PlatformScalarWhereInput>
    id?: IntFilter | number
    os?: StringFilter | string
    arch?: StringFilter | string
    shasum?: StringFilter | string
    filename?: StringFilter | string
    providerId?: IntFilter | number
  }

  export type VersionProtocolUpsertWithWhereUniqueWithoutVersionInput = {
    where: VersionProtocolWhereUniqueInput
    update: XOR<VersionProtocolUpdateWithoutVersionInput, VersionProtocolUncheckedUpdateWithoutVersionInput>
    create: XOR<VersionProtocolCreateWithoutVersionInput, VersionProtocolUncheckedCreateWithoutVersionInput>
  }

  export type VersionProtocolUpdateWithWhereUniqueWithoutVersionInput = {
    where: VersionProtocolWhereUniqueInput
    data: XOR<VersionProtocolUpdateWithoutVersionInput, VersionProtocolUncheckedUpdateWithoutVersionInput>
  }

  export type VersionProtocolUpdateManyWithWhereWithoutVersionInput = {
    where: VersionProtocolScalarWhereInput
    data: XOR<VersionProtocolUpdateManyMutationInput, VersionProtocolUncheckedUpdateManyWithoutProtocolsInput>
  }

  export type VersionProtocolScalarWhereInput = {
    AND?: Enumerable<VersionProtocolScalarWhereInput>
    OR?: Enumerable<VersionProtocolScalarWhereInput>
    NOT?: Enumerable<VersionProtocolScalarWhereInput>
    id?: IntFilter | number
    versionId?: IntFilter | number
    protocolId?: IntFilter | number
  }

  export type VersionCreateWithoutProtocolsInput = {
    name: string
    provider: ProviderCreateNestedOneWithoutVersionsInput
    platforms?: PlatformCreateNestedManyWithoutProviderInput
  }

  export type VersionUncheckedCreateWithoutProtocolsInput = {
    id?: number
    name: string
    providerId: number
    platforms?: PlatformUncheckedCreateNestedManyWithoutProviderInput
  }

  export type VersionCreateOrConnectWithoutProtocolsInput = {
    where: VersionWhereUniqueInput
    create: XOR<VersionCreateWithoutProtocolsInput, VersionUncheckedCreateWithoutProtocolsInput>
  }

  export type ProtocolCreateWithoutProvidersInput = {
    name: string
  }

  export type ProtocolUncheckedCreateWithoutProvidersInput = {
    id?: number
    name: string
  }

  export type ProtocolCreateOrConnectWithoutProvidersInput = {
    where: ProtocolWhereUniqueInput
    create: XOR<ProtocolCreateWithoutProvidersInput, ProtocolUncheckedCreateWithoutProvidersInput>
  }

  export type VersionUpsertWithoutProtocolsInput = {
    update: XOR<VersionUpdateWithoutProtocolsInput, VersionUncheckedUpdateWithoutProtocolsInput>
    create: XOR<VersionCreateWithoutProtocolsInput, VersionUncheckedCreateWithoutProtocolsInput>
  }

  export type VersionUpdateWithoutProtocolsInput = {
    name?: StringFieldUpdateOperationsInput | string
    provider?: ProviderUpdateOneRequiredWithoutVersionsNestedInput
    platforms?: PlatformUpdateManyWithoutProviderNestedInput
  }

  export type VersionUncheckedUpdateWithoutProtocolsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    providerId?: IntFieldUpdateOperationsInput | number
    platforms?: PlatformUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type ProtocolUpsertWithoutProvidersInput = {
    update: XOR<ProtocolUpdateWithoutProvidersInput, ProtocolUncheckedUpdateWithoutProvidersInput>
    create: XOR<ProtocolCreateWithoutProvidersInput, ProtocolUncheckedCreateWithoutProvidersInput>
  }

  export type ProtocolUpdateWithoutProvidersInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProtocolUncheckedUpdateWithoutProvidersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VersionProtocolCreateWithoutProtocolInput = {
    version: VersionCreateNestedOneWithoutProtocolsInput
  }

  export type VersionProtocolUncheckedCreateWithoutProtocolInput = {
    id?: number
    versionId: number
  }

  export type VersionProtocolCreateOrConnectWithoutProtocolInput = {
    where: VersionProtocolWhereUniqueInput
    create: XOR<VersionProtocolCreateWithoutProtocolInput, VersionProtocolUncheckedCreateWithoutProtocolInput>
  }

  export type VersionProtocolCreateManyProtocolInputEnvelope = {
    data: Enumerable<VersionProtocolCreateManyProtocolInput>
  }

  export type VersionProtocolUpsertWithWhereUniqueWithoutProtocolInput = {
    where: VersionProtocolWhereUniqueInput
    update: XOR<VersionProtocolUpdateWithoutProtocolInput, VersionProtocolUncheckedUpdateWithoutProtocolInput>
    create: XOR<VersionProtocolCreateWithoutProtocolInput, VersionProtocolUncheckedCreateWithoutProtocolInput>
  }

  export type VersionProtocolUpdateWithWhereUniqueWithoutProtocolInput = {
    where: VersionProtocolWhereUniqueInput
    data: XOR<VersionProtocolUpdateWithoutProtocolInput, VersionProtocolUncheckedUpdateWithoutProtocolInput>
  }

  export type VersionProtocolUpdateManyWithWhereWithoutProtocolInput = {
    where: VersionProtocolScalarWhereInput
    data: XOR<VersionProtocolUpdateManyMutationInput, VersionProtocolUncheckedUpdateManyWithoutProvidersInput>
  }

  export type VersionCreateWithoutPlatformsInput = {
    name: string
    provider: ProviderCreateNestedOneWithoutVersionsInput
    protocols?: VersionProtocolCreateNestedManyWithoutVersionInput
  }

  export type VersionUncheckedCreateWithoutPlatformsInput = {
    id?: number
    name: string
    providerId: number
    protocols?: VersionProtocolUncheckedCreateNestedManyWithoutVersionInput
  }

  export type VersionCreateOrConnectWithoutPlatformsInput = {
    where: VersionWhereUniqueInput
    create: XOR<VersionCreateWithoutPlatformsInput, VersionUncheckedCreateWithoutPlatformsInput>
  }

  export type VersionUpsertWithoutPlatformsInput = {
    update: XOR<VersionUpdateWithoutPlatformsInput, VersionUncheckedUpdateWithoutPlatformsInput>
    create: XOR<VersionCreateWithoutPlatformsInput, VersionUncheckedCreateWithoutPlatformsInput>
  }

  export type VersionUpdateWithoutPlatformsInput = {
    name?: StringFieldUpdateOperationsInput | string
    provider?: ProviderUpdateOneRequiredWithoutVersionsNestedInput
    protocols?: VersionProtocolUpdateManyWithoutVersionNestedInput
  }

  export type VersionUncheckedUpdateWithoutPlatformsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    providerId?: IntFieldUpdateOperationsInput | number
    protocols?: VersionProtocolUncheckedUpdateManyWithoutVersionNestedInput
  }

  export type ProviderCreateWithoutGpgPublicKeysInput = {
    namespace: string
    type: string
    published_at?: Date | string
    versions?: VersionCreateNestedManyWithoutProviderInput
  }

  export type ProviderUncheckedCreateWithoutGpgPublicKeysInput = {
    id?: number
    namespace: string
    type: string
    published_at?: Date | string
    versions?: VersionUncheckedCreateNestedManyWithoutProviderInput
  }

  export type ProviderCreateOrConnectWithoutGpgPublicKeysInput = {
    where: ProviderWhereUniqueInput
    create: XOR<ProviderCreateWithoutGpgPublicKeysInput, ProviderUncheckedCreateWithoutGpgPublicKeysInput>
  }

  export type ProviderUpsertWithoutGpgPublicKeysInput = {
    update: XOR<ProviderUpdateWithoutGpgPublicKeysInput, ProviderUncheckedUpdateWithoutGpgPublicKeysInput>
    create: XOR<ProviderCreateWithoutGpgPublicKeysInput, ProviderUncheckedCreateWithoutGpgPublicKeysInput>
  }

  export type ProviderUpdateWithoutGpgPublicKeysInput = {
    namespace?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: VersionUpdateManyWithoutProviderNestedInput
  }

  export type ProviderUncheckedUpdateWithoutGpgPublicKeysInput = {
    id?: IntFieldUpdateOperationsInput | number
    namespace?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    published_at?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: VersionUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type VersionCreateManyProviderInput = {
    name: string
  }

  export type GpgPublicKeyCreateManyProviderInput = {
    keyId: string
    asciiArmor: string
    trustSignature: string
    source: string
    sourceUrl: string
  }

  export type VersionUpdateWithoutProviderInput = {
    name?: StringFieldUpdateOperationsInput | string
    platforms?: PlatformUpdateManyWithoutProviderNestedInput
    protocols?: VersionProtocolUpdateManyWithoutVersionNestedInput
  }

  export type VersionUncheckedUpdateWithoutProviderInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    platforms?: PlatformUncheckedUpdateManyWithoutProviderNestedInput
    protocols?: VersionProtocolUncheckedUpdateManyWithoutVersionNestedInput
  }

  export type VersionUncheckedUpdateManyWithoutVersionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GpgPublicKeyUpdateWithoutProviderInput = {
    keyId?: StringFieldUpdateOperationsInput | string
    asciiArmor?: StringFieldUpdateOperationsInput | string
    trustSignature?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
  }

  export type GpgPublicKeyUncheckedUpdateWithoutProviderInput = {
    id?: IntFieldUpdateOperationsInput | number
    keyId?: StringFieldUpdateOperationsInput | string
    asciiArmor?: StringFieldUpdateOperationsInput | string
    trustSignature?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
  }

  export type GpgPublicKeyUncheckedUpdateManyWithoutGpgPublicKeysInput = {
    id?: IntFieldUpdateOperationsInput | number
    keyId?: StringFieldUpdateOperationsInput | string
    asciiArmor?: StringFieldUpdateOperationsInput | string
    trustSignature?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
  }

  export type PlatformCreateManyProviderInput = {
    os: string
    arch: string
    shasum: string
    filename: string
  }

  export type VersionProtocolCreateManyVersionInput = {
    protocolId: number
  }

  export type PlatformUpdateWithoutProviderInput = {
    os?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    shasum?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
  }

  export type PlatformUncheckedUpdateWithoutProviderInput = {
    id?: IntFieldUpdateOperationsInput | number
    os?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    shasum?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
  }

  export type PlatformUncheckedUpdateManyWithoutPlatformsInput = {
    id?: IntFieldUpdateOperationsInput | number
    os?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    shasum?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
  }

  export type VersionProtocolUpdateWithoutVersionInput = {
    protocol?: ProtocolUpdateOneRequiredWithoutProvidersNestedInput
  }

  export type VersionProtocolUncheckedUpdateWithoutVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    protocolId?: IntFieldUpdateOperationsInput | number
  }

  export type VersionProtocolUncheckedUpdateManyWithoutProtocolsInput = {
    id?: IntFieldUpdateOperationsInput | number
    protocolId?: IntFieldUpdateOperationsInput | number
  }

  export type VersionProtocolCreateManyProtocolInput = {
    versionId: number
  }

  export type VersionProtocolUpdateWithoutProtocolInput = {
    version?: VersionUpdateOneRequiredWithoutProtocolsNestedInput
  }

  export type VersionProtocolUncheckedUpdateWithoutProtocolInput = {
    id?: IntFieldUpdateOperationsInput | number
    versionId?: IntFieldUpdateOperationsInput | number
  }

  export type VersionProtocolUncheckedUpdateManyWithoutProvidersInput = {
    id?: IntFieldUpdateOperationsInput | number
    versionId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}