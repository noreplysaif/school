# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetClass*](#getclass)
  - [*ListClasses*](#listclasses)
  - [*ListMyEnrollments*](#listmyenrollments)
  - [*GetAssignment*](#getassignment)
  - [*ListAssignments*](#listassignments)
  - [*GetMySubmission*](#getmysubmission)
  - [*ListMySubmissions*](#listmysubmissions)
  - [*GetAnnouncement*](#getannouncement)
  - [*ListAnnouncements*](#listannouncements)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateClass*](#createclass)
  - [*UpdateClass*](#updateclass)
  - [*DeleteClass*](#deleteclass)
  - [*CreateEnrollment*](#createenrollment)
  - [*DeleteEnrollment*](#deleteenrollment)
  - [*CreateAssignment*](#createassignment)
  - [*UpdateAssignment*](#updateassignment)
  - [*DeleteAssignment*](#deleteassignment)
  - [*CreateSubmission*](#createsubmission)
  - [*UpdateSubmission*](#updatesubmission)
  - [*DeleteSubmission*](#deletesubmission)
  - [*CreateAnnouncement*](#createannouncement)
  - [*UpdateAnnouncement*](#updateannouncement)
  - [*DeleteAnnouncement*](#deleteannouncement)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    name: string;
    email: string;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetClass
You can execute the `GetClass` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getClass(vars: GetClassVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassData, GetClassVariables>;

interface GetClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetClassVariables): QueryRef<GetClassData, GetClassVariables>;
}
export const getClassRef: GetClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getClass(dc: DataConnect, vars: GetClassVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassData, GetClassVariables>;

interface GetClassRef {
  ...
  (dc: DataConnect, vars: GetClassVariables): QueryRef<GetClassData, GetClassVariables>;
}
export const getClassRef: GetClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getClassRef:
```typescript
const name = getClassRef.operationName;
console.log(name);
```

### Variables
The `GetClass` query requires an argument of type `GetClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetClassVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetClass` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetClassData {
  class?: {
    className: string;
    teacher: {
      name: string;
    };
  };
}
```
### Using `GetClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getClass, GetClassVariables } from '@dataconnect/generated';

// The `GetClass` query requires an argument of type `GetClassVariables`:
const getClassVars: GetClassVariables = {
  id: ..., 
};

// Call the `getClass()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getClass(getClassVars);
// Variables can be defined inline as well.
const { data } = await getClass({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getClass(dataConnect, getClassVars);

console.log(data.class);

// Or, you can use the `Promise` API.
getClass(getClassVars).then((response) => {
  const data = response.data;
  console.log(data.class);
});
```

### Using `GetClass`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getClassRef, GetClassVariables } from '@dataconnect/generated';

// The `GetClass` query requires an argument of type `GetClassVariables`:
const getClassVars: GetClassVariables = {
  id: ..., 
};

// Call the `getClassRef()` function to get a reference to the query.
const ref = getClassRef(getClassVars);
// Variables can be defined inline as well.
const ref = getClassRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getClassRef(dataConnect, getClassVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.class);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.class);
});
```

## ListClasses
You can execute the `ListClasses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listClasses(options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;

interface ListClassesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClassesData, undefined>;
}
export const listClassesRef: ListClassesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listClasses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;

interface ListClassesRef {
  ...
  (dc: DataConnect): QueryRef<ListClassesData, undefined>;
}
export const listClassesRef: ListClassesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listClassesRef:
```typescript
const name = listClassesRef.operationName;
console.log(name);
```

### Variables
The `ListClasses` query has no variables.
### Return Type
Recall that executing the `ListClasses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListClassesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListClassesData {
  classes: ({
    className: string;
  })[];
}
```
### Using `ListClasses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listClasses } from '@dataconnect/generated';


// Call the `listClasses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listClasses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listClasses(dataConnect);

console.log(data.classes);

// Or, you can use the `Promise` API.
listClasses().then((response) => {
  const data = response.data;
  console.log(data.classes);
});
```

### Using `ListClasses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listClassesRef } from '@dataconnect/generated';


// Call the `listClassesRef()` function to get a reference to the query.
const ref = listClassesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listClassesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.classes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.classes);
});
```

## ListMyEnrollments
You can execute the `ListMyEnrollments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyEnrollments(options?: ExecuteQueryOptions): QueryPromise<ListMyEnrollmentsData, undefined>;

interface ListMyEnrollmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyEnrollmentsData, undefined>;
}
export const listMyEnrollmentsRef: ListMyEnrollmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyEnrollments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyEnrollmentsData, undefined>;

interface ListMyEnrollmentsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyEnrollmentsData, undefined>;
}
export const listMyEnrollmentsRef: ListMyEnrollmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyEnrollmentsRef:
```typescript
const name = listMyEnrollmentsRef.operationName;
console.log(name);
```

### Variables
The `ListMyEnrollments` query has no variables.
### Return Type
Recall that executing the `ListMyEnrollments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyEnrollmentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyEnrollmentsData {
  enrollments: ({
    class: {
      className: string;
    };
  })[];
}
```
### Using `ListMyEnrollments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyEnrollments } from '@dataconnect/generated';


// Call the `listMyEnrollments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyEnrollments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyEnrollments(dataConnect);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
listMyEnrollments().then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

### Using `ListMyEnrollments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyEnrollmentsRef } from '@dataconnect/generated';


// Call the `listMyEnrollmentsRef()` function to get a reference to the query.
const ref = listMyEnrollmentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyEnrollmentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

## GetAssignment
You can execute the `GetAssignment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAssignment(vars: GetAssignmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssignmentData, GetAssignmentVariables>;

interface GetAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssignmentVariables): QueryRef<GetAssignmentData, GetAssignmentVariables>;
}
export const getAssignmentRef: GetAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAssignment(dc: DataConnect, vars: GetAssignmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssignmentData, GetAssignmentVariables>;

interface GetAssignmentRef {
  ...
  (dc: DataConnect, vars: GetAssignmentVariables): QueryRef<GetAssignmentData, GetAssignmentVariables>;
}
export const getAssignmentRef: GetAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAssignmentRef:
```typescript
const name = getAssignmentRef.operationName;
console.log(name);
```

### Variables
The `GetAssignment` query requires an argument of type `GetAssignmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAssignmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAssignment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAssignmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAssignmentData {
  assignment?: {
    title: string;
    dueDate: TimestampString;
  };
}
```
### Using `GetAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAssignment, GetAssignmentVariables } from '@dataconnect/generated';

// The `GetAssignment` query requires an argument of type `GetAssignmentVariables`:
const getAssignmentVars: GetAssignmentVariables = {
  id: ..., 
};

// Call the `getAssignment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAssignment(getAssignmentVars);
// Variables can be defined inline as well.
const { data } = await getAssignment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAssignment(dataConnect, getAssignmentVars);

console.log(data.assignment);

// Or, you can use the `Promise` API.
getAssignment(getAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.assignment);
});
```

### Using `GetAssignment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAssignmentRef, GetAssignmentVariables } from '@dataconnect/generated';

// The `GetAssignment` query requires an argument of type `GetAssignmentVariables`:
const getAssignmentVars: GetAssignmentVariables = {
  id: ..., 
};

// Call the `getAssignmentRef()` function to get a reference to the query.
const ref = getAssignmentRef(getAssignmentVars);
// Variables can be defined inline as well.
const ref = getAssignmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAssignmentRef(dataConnect, getAssignmentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assignment);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assignment);
});
```

## ListAssignments
You can execute the `ListAssignments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAssignments(options?: ExecuteQueryOptions): QueryPromise<ListAssignmentsData, undefined>;

interface ListAssignmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAssignmentsData, undefined>;
}
export const listAssignmentsRef: ListAssignmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAssignments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAssignmentsData, undefined>;

interface ListAssignmentsRef {
  ...
  (dc: DataConnect): QueryRef<ListAssignmentsData, undefined>;
}
export const listAssignmentsRef: ListAssignmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAssignmentsRef:
```typescript
const name = listAssignmentsRef.operationName;
console.log(name);
```

### Variables
The `ListAssignments` query has no variables.
### Return Type
Recall that executing the `ListAssignments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAssignmentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAssignmentsData {
  assignments: ({
    title: string;
  })[];
}
```
### Using `ListAssignments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAssignments } from '@dataconnect/generated';


// Call the `listAssignments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAssignments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAssignments(dataConnect);

console.log(data.assignments);

// Or, you can use the `Promise` API.
listAssignments().then((response) => {
  const data = response.data;
  console.log(data.assignments);
});
```

### Using `ListAssignments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAssignmentsRef } from '@dataconnect/generated';


// Call the `listAssignmentsRef()` function to get a reference to the query.
const ref = listAssignmentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAssignmentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assignments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assignments);
});
```

## GetMySubmission
You can execute the `GetMySubmission` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMySubmission(vars: GetMySubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMySubmissionData, GetMySubmissionVariables>;

interface GetMySubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMySubmissionVariables): QueryRef<GetMySubmissionData, GetMySubmissionVariables>;
}
export const getMySubmissionRef: GetMySubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMySubmission(dc: DataConnect, vars: GetMySubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMySubmissionData, GetMySubmissionVariables>;

interface GetMySubmissionRef {
  ...
  (dc: DataConnect, vars: GetMySubmissionVariables): QueryRef<GetMySubmissionData, GetMySubmissionVariables>;
}
export const getMySubmissionRef: GetMySubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMySubmissionRef:
```typescript
const name = getMySubmissionRef.operationName;
console.log(name);
```

### Variables
The `GetMySubmission` query requires an argument of type `GetMySubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMySubmissionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMySubmission` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMySubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMySubmissionData {
  submission?: {
    status: string;
    grade?: number | null;
  };
}
```
### Using `GetMySubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMySubmission, GetMySubmissionVariables } from '@dataconnect/generated';

// The `GetMySubmission` query requires an argument of type `GetMySubmissionVariables`:
const getMySubmissionVars: GetMySubmissionVariables = {
  id: ..., 
};

// Call the `getMySubmission()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMySubmission(getMySubmissionVars);
// Variables can be defined inline as well.
const { data } = await getMySubmission({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMySubmission(dataConnect, getMySubmissionVars);

console.log(data.submission);

// Or, you can use the `Promise` API.
getMySubmission(getMySubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission);
});
```

### Using `GetMySubmission`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMySubmissionRef, GetMySubmissionVariables } from '@dataconnect/generated';

// The `GetMySubmission` query requires an argument of type `GetMySubmissionVariables`:
const getMySubmissionVars: GetMySubmissionVariables = {
  id: ..., 
};

// Call the `getMySubmissionRef()` function to get a reference to the query.
const ref = getMySubmissionRef(getMySubmissionVars);
// Variables can be defined inline as well.
const ref = getMySubmissionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMySubmissionRef(dataConnect, getMySubmissionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.submission);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.submission);
});
```

## ListMySubmissions
You can execute the `ListMySubmissions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMySubmissions(options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;

interface ListMySubmissionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySubmissionsData, undefined>;
}
export const listMySubmissionsRef: ListMySubmissionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMySubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;

interface ListMySubmissionsRef {
  ...
  (dc: DataConnect): QueryRef<ListMySubmissionsData, undefined>;
}
export const listMySubmissionsRef: ListMySubmissionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMySubmissionsRef:
```typescript
const name = listMySubmissionsRef.operationName;
console.log(name);
```

### Variables
The `ListMySubmissions` query has no variables.
### Return Type
Recall that executing the `ListMySubmissions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMySubmissionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMySubmissionsData {
  submissions: ({
    status: string;
    grade?: number | null;
  })[];
}
```
### Using `ListMySubmissions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMySubmissions } from '@dataconnect/generated';


// Call the `listMySubmissions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMySubmissions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMySubmissions(dataConnect);

console.log(data.submissions);

// Or, you can use the `Promise` API.
listMySubmissions().then((response) => {
  const data = response.data;
  console.log(data.submissions);
});
```

### Using `ListMySubmissions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMySubmissionsRef } from '@dataconnect/generated';


// Call the `listMySubmissionsRef()` function to get a reference to the query.
const ref = listMySubmissionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMySubmissionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.submissions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.submissions);
});
```

## GetAnnouncement
You can execute the `GetAnnouncement` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAnnouncement(vars: GetAnnouncementVariables, options?: ExecuteQueryOptions): QueryPromise<GetAnnouncementData, GetAnnouncementVariables>;

interface GetAnnouncementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAnnouncementVariables): QueryRef<GetAnnouncementData, GetAnnouncementVariables>;
}
export const getAnnouncementRef: GetAnnouncementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAnnouncement(dc: DataConnect, vars: GetAnnouncementVariables, options?: ExecuteQueryOptions): QueryPromise<GetAnnouncementData, GetAnnouncementVariables>;

interface GetAnnouncementRef {
  ...
  (dc: DataConnect, vars: GetAnnouncementVariables): QueryRef<GetAnnouncementData, GetAnnouncementVariables>;
}
export const getAnnouncementRef: GetAnnouncementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAnnouncementRef:
```typescript
const name = getAnnouncementRef.operationName;
console.log(name);
```

### Variables
The `GetAnnouncement` query requires an argument of type `GetAnnouncementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAnnouncementVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAnnouncement` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAnnouncementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAnnouncementData {
  announcement?: {
    content: string;
    createdAt: TimestampString;
  };
}
```
### Using `GetAnnouncement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAnnouncement, GetAnnouncementVariables } from '@dataconnect/generated';

// The `GetAnnouncement` query requires an argument of type `GetAnnouncementVariables`:
const getAnnouncementVars: GetAnnouncementVariables = {
  id: ..., 
};

// Call the `getAnnouncement()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAnnouncement(getAnnouncementVars);
// Variables can be defined inline as well.
const { data } = await getAnnouncement({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAnnouncement(dataConnect, getAnnouncementVars);

console.log(data.announcement);

// Or, you can use the `Promise` API.
getAnnouncement(getAnnouncementVars).then((response) => {
  const data = response.data;
  console.log(data.announcement);
});
```

### Using `GetAnnouncement`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAnnouncementRef, GetAnnouncementVariables } from '@dataconnect/generated';

// The `GetAnnouncement` query requires an argument of type `GetAnnouncementVariables`:
const getAnnouncementVars: GetAnnouncementVariables = {
  id: ..., 
};

// Call the `getAnnouncementRef()` function to get a reference to the query.
const ref = getAnnouncementRef(getAnnouncementVars);
// Variables can be defined inline as well.
const ref = getAnnouncementRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAnnouncementRef(dataConnect, getAnnouncementVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.announcement);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.announcement);
});
```

## ListAnnouncements
You can execute the `ListAnnouncements` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAnnouncements(options?: ExecuteQueryOptions): QueryPromise<ListAnnouncementsData, undefined>;

interface ListAnnouncementsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAnnouncementsData, undefined>;
}
export const listAnnouncementsRef: ListAnnouncementsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAnnouncements(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAnnouncementsData, undefined>;

interface ListAnnouncementsRef {
  ...
  (dc: DataConnect): QueryRef<ListAnnouncementsData, undefined>;
}
export const listAnnouncementsRef: ListAnnouncementsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAnnouncementsRef:
```typescript
const name = listAnnouncementsRef.operationName;
console.log(name);
```

### Variables
The `ListAnnouncements` query has no variables.
### Return Type
Recall that executing the `ListAnnouncements` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAnnouncementsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAnnouncementsData {
  announcements: ({
    content: string;
  })[];
}
```
### Using `ListAnnouncements`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAnnouncements } from '@dataconnect/generated';


// Call the `listAnnouncements()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAnnouncements();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAnnouncements(dataConnect);

console.log(data.announcements);

// Or, you can use the `Promise` API.
listAnnouncements().then((response) => {
  const data = response.data;
  console.log(data.announcements);
});
```

### Using `ListAnnouncements`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAnnouncementsRef } from '@dataconnect/generated';


// Call the `listAnnouncementsRef()` function to get a reference to the query.
const ref = listAnnouncementsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAnnouncementsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.announcements);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.announcements);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  name: string;
  email: string;
  role: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  name: ..., 
  email: ..., 
  role: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ name: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  name: ..., 
  email: ..., 
  role: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ name: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  name?: string | null;
  email?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  name: ..., // optional
  email: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ name: ..., email: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  name: ..., // optional
  email: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ name: ..., email: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateClass
You can execute the `CreateClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createClass(vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface CreateClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
}
export const createClassRef: CreateClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createClass(dc: DataConnect, vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface CreateClassRef {
  ...
  (dc: DataConnect, vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
}
export const createClassRef: CreateClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createClassRef:
```typescript
const name = createClassRef.operationName;
console.log(name);
```

### Variables
The `CreateClass` mutation requires an argument of type `CreateClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateClassVariables {
  className: string;
  teacherId: UUIDString;
  room?: string | null;
  schedule?: string | null;
}
```
### Return Type
Recall that executing the `CreateClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateClassData {
  class_insert: Class_Key;
}
```
### Using `CreateClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createClass, CreateClassVariables } from '@dataconnect/generated';

// The `CreateClass` mutation requires an argument of type `CreateClassVariables`:
const createClassVars: CreateClassVariables = {
  className: ..., 
  teacherId: ..., 
  room: ..., // optional
  schedule: ..., // optional
};

// Call the `createClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createClass(createClassVars);
// Variables can be defined inline as well.
const { data } = await createClass({ className: ..., teacherId: ..., room: ..., schedule: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createClass(dataConnect, createClassVars);

console.log(data.class_insert);

// Or, you can use the `Promise` API.
createClass(createClassVars).then((response) => {
  const data = response.data;
  console.log(data.class_insert);
});
```

### Using `CreateClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createClassRef, CreateClassVariables } from '@dataconnect/generated';

// The `CreateClass` mutation requires an argument of type `CreateClassVariables`:
const createClassVars: CreateClassVariables = {
  className: ..., 
  teacherId: ..., 
  room: ..., // optional
  schedule: ..., // optional
};

// Call the `createClassRef()` function to get a reference to the mutation.
const ref = createClassRef(createClassVars);
// Variables can be defined inline as well.
const ref = createClassRef({ className: ..., teacherId: ..., room: ..., schedule: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createClassRef(dataConnect, createClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.class_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.class_insert);
});
```

## UpdateClass
You can execute the `UpdateClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateClass(vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;

interface UpdateClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
}
export const updateClassRef: UpdateClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateClass(dc: DataConnect, vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;

interface UpdateClassRef {
  ...
  (dc: DataConnect, vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
}
export const updateClassRef: UpdateClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateClassRef:
```typescript
const name = updateClassRef.operationName;
console.log(name);
```

### Variables
The `UpdateClass` mutation requires an argument of type `UpdateClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateClassVariables {
  id: UUIDString;
  room?: string | null;
}
```
### Return Type
Recall that executing the `UpdateClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateClassData {
  class_update?: Class_Key | null;
}
```
### Using `UpdateClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateClass, UpdateClassVariables } from '@dataconnect/generated';

// The `UpdateClass` mutation requires an argument of type `UpdateClassVariables`:
const updateClassVars: UpdateClassVariables = {
  id: ..., 
  room: ..., // optional
};

// Call the `updateClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateClass(updateClassVars);
// Variables can be defined inline as well.
const { data } = await updateClass({ id: ..., room: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateClass(dataConnect, updateClassVars);

console.log(data.class_update);

// Or, you can use the `Promise` API.
updateClass(updateClassVars).then((response) => {
  const data = response.data;
  console.log(data.class_update);
});
```

### Using `UpdateClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateClassRef, UpdateClassVariables } from '@dataconnect/generated';

// The `UpdateClass` mutation requires an argument of type `UpdateClassVariables`:
const updateClassVars: UpdateClassVariables = {
  id: ..., 
  room: ..., // optional
};

// Call the `updateClassRef()` function to get a reference to the mutation.
const ref = updateClassRef(updateClassVars);
// Variables can be defined inline as well.
const ref = updateClassRef({ id: ..., room: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateClassRef(dataConnect, updateClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.class_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.class_update);
});
```

## DeleteClass
You can execute the `DeleteClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteClass(vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;

interface DeleteClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
}
export const deleteClassRef: DeleteClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteClass(dc: DataConnect, vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;

interface DeleteClassRef {
  ...
  (dc: DataConnect, vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
}
export const deleteClassRef: DeleteClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteClassRef:
```typescript
const name = deleteClassRef.operationName;
console.log(name);
```

### Variables
The `DeleteClass` mutation requires an argument of type `DeleteClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteClassVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteClassData {
  class_delete?: Class_Key | null;
}
```
### Using `DeleteClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteClass, DeleteClassVariables } from '@dataconnect/generated';

// The `DeleteClass` mutation requires an argument of type `DeleteClassVariables`:
const deleteClassVars: DeleteClassVariables = {
  id: ..., 
};

// Call the `deleteClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteClass(deleteClassVars);
// Variables can be defined inline as well.
const { data } = await deleteClass({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteClass(dataConnect, deleteClassVars);

console.log(data.class_delete);

// Or, you can use the `Promise` API.
deleteClass(deleteClassVars).then((response) => {
  const data = response.data;
  console.log(data.class_delete);
});
```

### Using `DeleteClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteClassRef, DeleteClassVariables } from '@dataconnect/generated';

// The `DeleteClass` mutation requires an argument of type `DeleteClassVariables`:
const deleteClassVars: DeleteClassVariables = {
  id: ..., 
};

// Call the `deleteClassRef()` function to get a reference to the mutation.
const ref = deleteClassRef(deleteClassVars);
// Variables can be defined inline as well.
const ref = deleteClassRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteClassRef(dataConnect, deleteClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.class_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.class_delete);
});
```

## CreateEnrollment
You can execute the `CreateEnrollment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEnrollment(vars: CreateEnrollmentVariables): MutationPromise<CreateEnrollmentData, CreateEnrollmentVariables>;

interface CreateEnrollmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEnrollmentVariables): MutationRef<CreateEnrollmentData, CreateEnrollmentVariables>;
}
export const createEnrollmentRef: CreateEnrollmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEnrollment(dc: DataConnect, vars: CreateEnrollmentVariables): MutationPromise<CreateEnrollmentData, CreateEnrollmentVariables>;

interface CreateEnrollmentRef {
  ...
  (dc: DataConnect, vars: CreateEnrollmentVariables): MutationRef<CreateEnrollmentData, CreateEnrollmentVariables>;
}
export const createEnrollmentRef: CreateEnrollmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEnrollmentRef:
```typescript
const name = createEnrollmentRef.operationName;
console.log(name);
```

### Variables
The `CreateEnrollment` mutation requires an argument of type `CreateEnrollmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateEnrollmentVariables {
  classId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateEnrollment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEnrollmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEnrollmentData {
  enrollment_insert: Enrollment_Key;
}
```
### Using `CreateEnrollment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEnrollment, CreateEnrollmentVariables } from '@dataconnect/generated';

// The `CreateEnrollment` mutation requires an argument of type `CreateEnrollmentVariables`:
const createEnrollmentVars: CreateEnrollmentVariables = {
  classId: ..., 
};

// Call the `createEnrollment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEnrollment(createEnrollmentVars);
// Variables can be defined inline as well.
const { data } = await createEnrollment({ classId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEnrollment(dataConnect, createEnrollmentVars);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
createEnrollment(createEnrollmentVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

### Using `CreateEnrollment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEnrollmentRef, CreateEnrollmentVariables } from '@dataconnect/generated';

// The `CreateEnrollment` mutation requires an argument of type `CreateEnrollmentVariables`:
const createEnrollmentVars: CreateEnrollmentVariables = {
  classId: ..., 
};

// Call the `createEnrollmentRef()` function to get a reference to the mutation.
const ref = createEnrollmentRef(createEnrollmentVars);
// Variables can be defined inline as well.
const ref = createEnrollmentRef({ classId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEnrollmentRef(dataConnect, createEnrollmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

## DeleteEnrollment
You can execute the `DeleteEnrollment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteEnrollment(vars: DeleteEnrollmentVariables): MutationPromise<DeleteEnrollmentData, DeleteEnrollmentVariables>;

interface DeleteEnrollmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteEnrollmentVariables): MutationRef<DeleteEnrollmentData, DeleteEnrollmentVariables>;
}
export const deleteEnrollmentRef: DeleteEnrollmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteEnrollment(dc: DataConnect, vars: DeleteEnrollmentVariables): MutationPromise<DeleteEnrollmentData, DeleteEnrollmentVariables>;

interface DeleteEnrollmentRef {
  ...
  (dc: DataConnect, vars: DeleteEnrollmentVariables): MutationRef<DeleteEnrollmentData, DeleteEnrollmentVariables>;
}
export const deleteEnrollmentRef: DeleteEnrollmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteEnrollmentRef:
```typescript
const name = deleteEnrollmentRef.operationName;
console.log(name);
```

### Variables
The `DeleteEnrollment` mutation requires an argument of type `DeleteEnrollmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteEnrollmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteEnrollment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteEnrollmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteEnrollmentData {
  enrollment_delete?: Enrollment_Key | null;
}
```
### Using `DeleteEnrollment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteEnrollment, DeleteEnrollmentVariables } from '@dataconnect/generated';

// The `DeleteEnrollment` mutation requires an argument of type `DeleteEnrollmentVariables`:
const deleteEnrollmentVars: DeleteEnrollmentVariables = {
  id: ..., 
};

// Call the `deleteEnrollment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteEnrollment(deleteEnrollmentVars);
// Variables can be defined inline as well.
const { data } = await deleteEnrollment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteEnrollment(dataConnect, deleteEnrollmentVars);

console.log(data.enrollment_delete);

// Or, you can use the `Promise` API.
deleteEnrollment(deleteEnrollmentVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_delete);
});
```

### Using `DeleteEnrollment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteEnrollmentRef, DeleteEnrollmentVariables } from '@dataconnect/generated';

// The `DeleteEnrollment` mutation requires an argument of type `DeleteEnrollmentVariables`:
const deleteEnrollmentVars: DeleteEnrollmentVariables = {
  id: ..., 
};

// Call the `deleteEnrollmentRef()` function to get a reference to the mutation.
const ref = deleteEnrollmentRef(deleteEnrollmentVars);
// Variables can be defined inline as well.
const ref = deleteEnrollmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteEnrollmentRef(dataConnect, deleteEnrollmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_delete);
});
```

## CreateAssignment
You can execute the `CreateAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAssignment(vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;

interface CreateAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
}
export const createAssignmentRef: CreateAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAssignment(dc: DataConnect, vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;

interface CreateAssignmentRef {
  ...
  (dc: DataConnect, vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
}
export const createAssignmentRef: CreateAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAssignmentRef:
```typescript
const name = createAssignmentRef.operationName;
console.log(name);
```

### Variables
The `CreateAssignment` mutation requires an argument of type `CreateAssignmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAssignmentVariables {
  classId: UUIDString;
  title: string;
  dueDate: TimestampString;
}
```
### Return Type
Recall that executing the `CreateAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAssignmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAssignmentData {
  assignment_insert: Assignment_Key;
}
```
### Using `CreateAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAssignment, CreateAssignmentVariables } from '@dataconnect/generated';

// The `CreateAssignment` mutation requires an argument of type `CreateAssignmentVariables`:
const createAssignmentVars: CreateAssignmentVariables = {
  classId: ..., 
  title: ..., 
  dueDate: ..., 
};

// Call the `createAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAssignment(createAssignmentVars);
// Variables can be defined inline as well.
const { data } = await createAssignment({ classId: ..., title: ..., dueDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAssignment(dataConnect, createAssignmentVars);

console.log(data.assignment_insert);

// Or, you can use the `Promise` API.
createAssignment(createAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.assignment_insert);
});
```

### Using `CreateAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAssignmentRef, CreateAssignmentVariables } from '@dataconnect/generated';

// The `CreateAssignment` mutation requires an argument of type `CreateAssignmentVariables`:
const createAssignmentVars: CreateAssignmentVariables = {
  classId: ..., 
  title: ..., 
  dueDate: ..., 
};

// Call the `createAssignmentRef()` function to get a reference to the mutation.
const ref = createAssignmentRef(createAssignmentVars);
// Variables can be defined inline as well.
const ref = createAssignmentRef({ classId: ..., title: ..., dueDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAssignmentRef(dataConnect, createAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assignment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assignment_insert);
});
```

## UpdateAssignment
You can execute the `UpdateAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAssignment(vars: UpdateAssignmentVariables): MutationPromise<UpdateAssignmentData, UpdateAssignmentVariables>;

interface UpdateAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssignmentVariables): MutationRef<UpdateAssignmentData, UpdateAssignmentVariables>;
}
export const updateAssignmentRef: UpdateAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAssignment(dc: DataConnect, vars: UpdateAssignmentVariables): MutationPromise<UpdateAssignmentData, UpdateAssignmentVariables>;

interface UpdateAssignmentRef {
  ...
  (dc: DataConnect, vars: UpdateAssignmentVariables): MutationRef<UpdateAssignmentData, UpdateAssignmentVariables>;
}
export const updateAssignmentRef: UpdateAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAssignmentRef:
```typescript
const name = updateAssignmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateAssignment` mutation requires an argument of type `UpdateAssignmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAssignmentVariables {
  id: UUIDString;
  title?: string | null;
}
```
### Return Type
Recall that executing the `UpdateAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAssignmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAssignmentData {
  assignment_update?: Assignment_Key | null;
}
```
### Using `UpdateAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAssignment, UpdateAssignmentVariables } from '@dataconnect/generated';

// The `UpdateAssignment` mutation requires an argument of type `UpdateAssignmentVariables`:
const updateAssignmentVars: UpdateAssignmentVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAssignment(updateAssignmentVars);
// Variables can be defined inline as well.
const { data } = await updateAssignment({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAssignment(dataConnect, updateAssignmentVars);

console.log(data.assignment_update);

// Or, you can use the `Promise` API.
updateAssignment(updateAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.assignment_update);
});
```

### Using `UpdateAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAssignmentRef, UpdateAssignmentVariables } from '@dataconnect/generated';

// The `UpdateAssignment` mutation requires an argument of type `UpdateAssignmentVariables`:
const updateAssignmentVars: UpdateAssignmentVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateAssignmentRef()` function to get a reference to the mutation.
const ref = updateAssignmentRef(updateAssignmentVars);
// Variables can be defined inline as well.
const ref = updateAssignmentRef({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAssignmentRef(dataConnect, updateAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assignment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assignment_update);
});
```

## DeleteAssignment
You can execute the `DeleteAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAssignment(vars: DeleteAssignmentVariables): MutationPromise<DeleteAssignmentData, DeleteAssignmentVariables>;

interface DeleteAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAssignmentVariables): MutationRef<DeleteAssignmentData, DeleteAssignmentVariables>;
}
export const deleteAssignmentRef: DeleteAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAssignment(dc: DataConnect, vars: DeleteAssignmentVariables): MutationPromise<DeleteAssignmentData, DeleteAssignmentVariables>;

interface DeleteAssignmentRef {
  ...
  (dc: DataConnect, vars: DeleteAssignmentVariables): MutationRef<DeleteAssignmentData, DeleteAssignmentVariables>;
}
export const deleteAssignmentRef: DeleteAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAssignmentRef:
```typescript
const name = deleteAssignmentRef.operationName;
console.log(name);
```

### Variables
The `DeleteAssignment` mutation requires an argument of type `DeleteAssignmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAssignmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAssignmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAssignmentData {
  assignment_delete?: Assignment_Key | null;
}
```
### Using `DeleteAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAssignment, DeleteAssignmentVariables } from '@dataconnect/generated';

// The `DeleteAssignment` mutation requires an argument of type `DeleteAssignmentVariables`:
const deleteAssignmentVars: DeleteAssignmentVariables = {
  id: ..., 
};

// Call the `deleteAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAssignment(deleteAssignmentVars);
// Variables can be defined inline as well.
const { data } = await deleteAssignment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAssignment(dataConnect, deleteAssignmentVars);

console.log(data.assignment_delete);

// Or, you can use the `Promise` API.
deleteAssignment(deleteAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.assignment_delete);
});
```

### Using `DeleteAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAssignmentRef, DeleteAssignmentVariables } from '@dataconnect/generated';

// The `DeleteAssignment` mutation requires an argument of type `DeleteAssignmentVariables`:
const deleteAssignmentVars: DeleteAssignmentVariables = {
  id: ..., 
};

// Call the `deleteAssignmentRef()` function to get a reference to the mutation.
const ref = deleteAssignmentRef(deleteAssignmentVars);
// Variables can be defined inline as well.
const ref = deleteAssignmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAssignmentRef(dataConnect, deleteAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assignment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assignment_delete);
});
```

## CreateSubmission
You can execute the `CreateSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSubmission(vars: CreateSubmissionVariables): MutationPromise<CreateSubmissionData, CreateSubmissionVariables>;

interface CreateSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubmissionVariables): MutationRef<CreateSubmissionData, CreateSubmissionVariables>;
}
export const createSubmissionRef: CreateSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSubmission(dc: DataConnect, vars: CreateSubmissionVariables): MutationPromise<CreateSubmissionData, CreateSubmissionVariables>;

interface CreateSubmissionRef {
  ...
  (dc: DataConnect, vars: CreateSubmissionVariables): MutationRef<CreateSubmissionData, CreateSubmissionVariables>;
}
export const createSubmissionRef: CreateSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSubmissionRef:
```typescript
const name = createSubmissionRef.operationName;
console.log(name);
```

### Variables
The `CreateSubmission` mutation requires an argument of type `CreateSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSubmissionVariables {
  assignmentId: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `CreateSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSubmissionData {
  submission_insert: Submission_Key;
}
```
### Using `CreateSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSubmission, CreateSubmissionVariables } from '@dataconnect/generated';

// The `CreateSubmission` mutation requires an argument of type `CreateSubmissionVariables`:
const createSubmissionVars: CreateSubmissionVariables = {
  assignmentId: ..., 
  status: ..., 
};

// Call the `createSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSubmission(createSubmissionVars);
// Variables can be defined inline as well.
const { data } = await createSubmission({ assignmentId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSubmission(dataConnect, createSubmissionVars);

console.log(data.submission_insert);

// Or, you can use the `Promise` API.
createSubmission(createSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission_insert);
});
```

### Using `CreateSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSubmissionRef, CreateSubmissionVariables } from '@dataconnect/generated';

// The `CreateSubmission` mutation requires an argument of type `CreateSubmissionVariables`:
const createSubmissionVars: CreateSubmissionVariables = {
  assignmentId: ..., 
  status: ..., 
};

// Call the `createSubmissionRef()` function to get a reference to the mutation.
const ref = createSubmissionRef(createSubmissionVars);
// Variables can be defined inline as well.
const ref = createSubmissionRef({ assignmentId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSubmissionRef(dataConnect, createSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_insert);
});
```

## UpdateSubmission
You can execute the `UpdateSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSubmission(vars: UpdateSubmissionVariables): MutationPromise<UpdateSubmissionData, UpdateSubmissionVariables>;

interface UpdateSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSubmissionVariables): MutationRef<UpdateSubmissionData, UpdateSubmissionVariables>;
}
export const updateSubmissionRef: UpdateSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSubmission(dc: DataConnect, vars: UpdateSubmissionVariables): MutationPromise<UpdateSubmissionData, UpdateSubmissionVariables>;

interface UpdateSubmissionRef {
  ...
  (dc: DataConnect, vars: UpdateSubmissionVariables): MutationRef<UpdateSubmissionData, UpdateSubmissionVariables>;
}
export const updateSubmissionRef: UpdateSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSubmissionRef:
```typescript
const name = updateSubmissionRef.operationName;
console.log(name);
```

### Variables
The `UpdateSubmission` mutation requires an argument of type `UpdateSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSubmissionVariables {
  id: UUIDString;
  grade?: number | null;
}
```
### Return Type
Recall that executing the `UpdateSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSubmissionData {
  submission_update?: Submission_Key | null;
}
```
### Using `UpdateSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSubmission, UpdateSubmissionVariables } from '@dataconnect/generated';

// The `UpdateSubmission` mutation requires an argument of type `UpdateSubmissionVariables`:
const updateSubmissionVars: UpdateSubmissionVariables = {
  id: ..., 
  grade: ..., // optional
};

// Call the `updateSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSubmission(updateSubmissionVars);
// Variables can be defined inline as well.
const { data } = await updateSubmission({ id: ..., grade: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSubmission(dataConnect, updateSubmissionVars);

console.log(data.submission_update);

// Or, you can use the `Promise` API.
updateSubmission(updateSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission_update);
});
```

### Using `UpdateSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSubmissionRef, UpdateSubmissionVariables } from '@dataconnect/generated';

// The `UpdateSubmission` mutation requires an argument of type `UpdateSubmissionVariables`:
const updateSubmissionVars: UpdateSubmissionVariables = {
  id: ..., 
  grade: ..., // optional
};

// Call the `updateSubmissionRef()` function to get a reference to the mutation.
const ref = updateSubmissionRef(updateSubmissionVars);
// Variables can be defined inline as well.
const ref = updateSubmissionRef({ id: ..., grade: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSubmissionRef(dataConnect, updateSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_update);
});
```

## DeleteSubmission
You can execute the `DeleteSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSubmission(vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;

interface DeleteSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
}
export const deleteSubmissionRef: DeleteSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSubmission(dc: DataConnect, vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;

interface DeleteSubmissionRef {
  ...
  (dc: DataConnect, vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
}
export const deleteSubmissionRef: DeleteSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSubmissionRef:
```typescript
const name = deleteSubmissionRef.operationName;
console.log(name);
```

### Variables
The `DeleteSubmission` mutation requires an argument of type `DeleteSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSubmissionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSubmissionData {
  submission_delete?: Submission_Key | null;
}
```
### Using `DeleteSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSubmission, DeleteSubmissionVariables } from '@dataconnect/generated';

// The `DeleteSubmission` mutation requires an argument of type `DeleteSubmissionVariables`:
const deleteSubmissionVars: DeleteSubmissionVariables = {
  id: ..., 
};

// Call the `deleteSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSubmission(deleteSubmissionVars);
// Variables can be defined inline as well.
const { data } = await deleteSubmission({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSubmission(dataConnect, deleteSubmissionVars);

console.log(data.submission_delete);

// Or, you can use the `Promise` API.
deleteSubmission(deleteSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission_delete);
});
```

### Using `DeleteSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSubmissionRef, DeleteSubmissionVariables } from '@dataconnect/generated';

// The `DeleteSubmission` mutation requires an argument of type `DeleteSubmissionVariables`:
const deleteSubmissionVars: DeleteSubmissionVariables = {
  id: ..., 
};

// Call the `deleteSubmissionRef()` function to get a reference to the mutation.
const ref = deleteSubmissionRef(deleteSubmissionVars);
// Variables can be defined inline as well.
const ref = deleteSubmissionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSubmissionRef(dataConnect, deleteSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_delete);
});
```

## CreateAnnouncement
You can execute the `CreateAnnouncement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAnnouncement(vars: CreateAnnouncementVariables): MutationPromise<CreateAnnouncementData, CreateAnnouncementVariables>;

interface CreateAnnouncementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAnnouncementVariables): MutationRef<CreateAnnouncementData, CreateAnnouncementVariables>;
}
export const createAnnouncementRef: CreateAnnouncementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAnnouncement(dc: DataConnect, vars: CreateAnnouncementVariables): MutationPromise<CreateAnnouncementData, CreateAnnouncementVariables>;

interface CreateAnnouncementRef {
  ...
  (dc: DataConnect, vars: CreateAnnouncementVariables): MutationRef<CreateAnnouncementData, CreateAnnouncementVariables>;
}
export const createAnnouncementRef: CreateAnnouncementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAnnouncementRef:
```typescript
const name = createAnnouncementRef.operationName;
console.log(name);
```

### Variables
The `CreateAnnouncement` mutation requires an argument of type `CreateAnnouncementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAnnouncementVariables {
  classId: UUIDString;
  content: string;
}
```
### Return Type
Recall that executing the `CreateAnnouncement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAnnouncementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAnnouncementData {
  announcement_insert: Announcement_Key;
}
```
### Using `CreateAnnouncement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAnnouncement, CreateAnnouncementVariables } from '@dataconnect/generated';

// The `CreateAnnouncement` mutation requires an argument of type `CreateAnnouncementVariables`:
const createAnnouncementVars: CreateAnnouncementVariables = {
  classId: ..., 
  content: ..., 
};

// Call the `createAnnouncement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAnnouncement(createAnnouncementVars);
// Variables can be defined inline as well.
const { data } = await createAnnouncement({ classId: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAnnouncement(dataConnect, createAnnouncementVars);

console.log(data.announcement_insert);

// Or, you can use the `Promise` API.
createAnnouncement(createAnnouncementVars).then((response) => {
  const data = response.data;
  console.log(data.announcement_insert);
});
```

### Using `CreateAnnouncement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAnnouncementRef, CreateAnnouncementVariables } from '@dataconnect/generated';

// The `CreateAnnouncement` mutation requires an argument of type `CreateAnnouncementVariables`:
const createAnnouncementVars: CreateAnnouncementVariables = {
  classId: ..., 
  content: ..., 
};

// Call the `createAnnouncementRef()` function to get a reference to the mutation.
const ref = createAnnouncementRef(createAnnouncementVars);
// Variables can be defined inline as well.
const ref = createAnnouncementRef({ classId: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAnnouncementRef(dataConnect, createAnnouncementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.announcement_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.announcement_insert);
});
```

## UpdateAnnouncement
You can execute the `UpdateAnnouncement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAnnouncement(vars: UpdateAnnouncementVariables): MutationPromise<UpdateAnnouncementData, UpdateAnnouncementVariables>;

interface UpdateAnnouncementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAnnouncementVariables): MutationRef<UpdateAnnouncementData, UpdateAnnouncementVariables>;
}
export const updateAnnouncementRef: UpdateAnnouncementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAnnouncement(dc: DataConnect, vars: UpdateAnnouncementVariables): MutationPromise<UpdateAnnouncementData, UpdateAnnouncementVariables>;

interface UpdateAnnouncementRef {
  ...
  (dc: DataConnect, vars: UpdateAnnouncementVariables): MutationRef<UpdateAnnouncementData, UpdateAnnouncementVariables>;
}
export const updateAnnouncementRef: UpdateAnnouncementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAnnouncementRef:
```typescript
const name = updateAnnouncementRef.operationName;
console.log(name);
```

### Variables
The `UpdateAnnouncement` mutation requires an argument of type `UpdateAnnouncementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAnnouncementVariables {
  id: UUIDString;
  content?: string | null;
}
```
### Return Type
Recall that executing the `UpdateAnnouncement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAnnouncementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAnnouncementData {
  announcement_update?: Announcement_Key | null;
}
```
### Using `UpdateAnnouncement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAnnouncement, UpdateAnnouncementVariables } from '@dataconnect/generated';

// The `UpdateAnnouncement` mutation requires an argument of type `UpdateAnnouncementVariables`:
const updateAnnouncementVars: UpdateAnnouncementVariables = {
  id: ..., 
  content: ..., // optional
};

// Call the `updateAnnouncement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAnnouncement(updateAnnouncementVars);
// Variables can be defined inline as well.
const { data } = await updateAnnouncement({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAnnouncement(dataConnect, updateAnnouncementVars);

console.log(data.announcement_update);

// Or, you can use the `Promise` API.
updateAnnouncement(updateAnnouncementVars).then((response) => {
  const data = response.data;
  console.log(data.announcement_update);
});
```

### Using `UpdateAnnouncement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAnnouncementRef, UpdateAnnouncementVariables } from '@dataconnect/generated';

// The `UpdateAnnouncement` mutation requires an argument of type `UpdateAnnouncementVariables`:
const updateAnnouncementVars: UpdateAnnouncementVariables = {
  id: ..., 
  content: ..., // optional
};

// Call the `updateAnnouncementRef()` function to get a reference to the mutation.
const ref = updateAnnouncementRef(updateAnnouncementVars);
// Variables can be defined inline as well.
const ref = updateAnnouncementRef({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAnnouncementRef(dataConnect, updateAnnouncementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.announcement_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.announcement_update);
});
```

## DeleteAnnouncement
You can execute the `DeleteAnnouncement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAnnouncement(vars: DeleteAnnouncementVariables): MutationPromise<DeleteAnnouncementData, DeleteAnnouncementVariables>;

interface DeleteAnnouncementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAnnouncementVariables): MutationRef<DeleteAnnouncementData, DeleteAnnouncementVariables>;
}
export const deleteAnnouncementRef: DeleteAnnouncementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAnnouncement(dc: DataConnect, vars: DeleteAnnouncementVariables): MutationPromise<DeleteAnnouncementData, DeleteAnnouncementVariables>;

interface DeleteAnnouncementRef {
  ...
  (dc: DataConnect, vars: DeleteAnnouncementVariables): MutationRef<DeleteAnnouncementData, DeleteAnnouncementVariables>;
}
export const deleteAnnouncementRef: DeleteAnnouncementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAnnouncementRef:
```typescript
const name = deleteAnnouncementRef.operationName;
console.log(name);
```

### Variables
The `DeleteAnnouncement` mutation requires an argument of type `DeleteAnnouncementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAnnouncementVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAnnouncement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAnnouncementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAnnouncementData {
  announcement_delete?: Announcement_Key | null;
}
```
### Using `DeleteAnnouncement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAnnouncement, DeleteAnnouncementVariables } from '@dataconnect/generated';

// The `DeleteAnnouncement` mutation requires an argument of type `DeleteAnnouncementVariables`:
const deleteAnnouncementVars: DeleteAnnouncementVariables = {
  id: ..., 
};

// Call the `deleteAnnouncement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAnnouncement(deleteAnnouncementVars);
// Variables can be defined inline as well.
const { data } = await deleteAnnouncement({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAnnouncement(dataConnect, deleteAnnouncementVars);

console.log(data.announcement_delete);

// Or, you can use the `Promise` API.
deleteAnnouncement(deleteAnnouncementVars).then((response) => {
  const data = response.data;
  console.log(data.announcement_delete);
});
```

### Using `DeleteAnnouncement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAnnouncementRef, DeleteAnnouncementVariables } from '@dataconnect/generated';

// The `DeleteAnnouncement` mutation requires an argument of type `DeleteAnnouncementVariables`:
const deleteAnnouncementVars: DeleteAnnouncementVariables = {
  id: ..., 
};

// Call the `deleteAnnouncementRef()` function to get a reference to the mutation.
const ref = deleteAnnouncementRef(deleteAnnouncementVars);
// Variables can be defined inline as well.
const ref = deleteAnnouncementRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAnnouncementRef(dataConnect, deleteAnnouncementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.announcement_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.announcement_delete);
});
```

