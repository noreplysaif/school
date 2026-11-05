import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Announcement_Key {
  id: UUIDString;
  __typename?: 'Announcement_Key';
}

export interface Assignment_Key {
  id: UUIDString;
  __typename?: 'Assignment_Key';
}

export interface Class_Key {
  id: UUIDString;
  __typename?: 'Class_Key';
}

export interface CreateAnnouncementData {
  announcement_insert: Announcement_Key;
}

export interface CreateAnnouncementVariables {
  classId: UUIDString;
  content: string;
}

export interface CreateAssignmentData {
  assignment_insert: Assignment_Key;
}

export interface CreateAssignmentVariables {
  classId: UUIDString;
  title: string;
  dueDate: TimestampString;
}

export interface CreateClassData {
  class_insert: Class_Key;
}

export interface CreateClassVariables {
  className: string;
  teacherId: UUIDString;
  room?: string | null;
  schedule?: string | null;
}

export interface CreateEnrollmentData {
  enrollment_insert: Enrollment_Key;
}

export interface CreateEnrollmentVariables {
  classId: UUIDString;
}

export interface CreateSubmissionData {
  submission_insert: Submission_Key;
}

export interface CreateSubmissionVariables {
  assignmentId: UUIDString;
  status: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  name: string;
  email: string;
  role: string;
}

export interface DeleteAnnouncementData {
  announcement_delete?: Announcement_Key | null;
}

export interface DeleteAnnouncementVariables {
  id: UUIDString;
}

export interface DeleteAssignmentData {
  assignment_delete?: Assignment_Key | null;
}

export interface DeleteAssignmentVariables {
  id: UUIDString;
}

export interface DeleteClassData {
  class_delete?: Class_Key | null;
}

export interface DeleteClassVariables {
  id: UUIDString;
}

export interface DeleteEnrollmentData {
  enrollment_delete?: Enrollment_Key | null;
}

export interface DeleteEnrollmentVariables {
  id: UUIDString;
}

export interface DeleteSubmissionData {
  submission_delete?: Submission_Key | null;
}

export interface DeleteSubmissionVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface Enrollment_Key {
  id: UUIDString;
  __typename?: 'Enrollment_Key';
}

export interface GetAnnouncementData {
  announcement?: {
    content: string;
    createdAt: TimestampString;
  };
}

export interface GetAnnouncementVariables {
  id: UUIDString;
}

export interface GetAssignmentData {
  assignment?: {
    title: string;
    dueDate: TimestampString;
  };
}

export interface GetAssignmentVariables {
  id: UUIDString;
}

export interface GetClassData {
  class?: {
    className: string;
    teacher: {
      name: string;
    };
  };
}

export interface GetClassVariables {
  id: UUIDString;
}

export interface GetMySubmissionData {
  submission?: {
    status: string;
    grade?: number | null;
  };
}

export interface GetMySubmissionVariables {
  id: UUIDString;
}

export interface GetUserData {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export interface ListAnnouncementsData {
  announcements: ({
    content: string;
  })[];
}

export interface ListAssignmentsData {
  assignments: ({
    title: string;
  })[];
}

export interface ListClassesData {
  classes: ({
    className: string;
  })[];
}

export interface ListMyEnrollmentsData {
  enrollments: ({
    class: {
      className: string;
    };
  })[];
}

export interface ListMySubmissionsData {
  submissions: ({
    status: string;
    grade?: number | null;
  })[];
}

export interface ListUsersData {
  users: ({
    name: string;
    email: string;
  })[];
}

export interface Submission_Key {
  id: UUIDString;
  __typename?: 'Submission_Key';
}

export interface UpdateAnnouncementData {
  announcement_update?: Announcement_Key | null;
}

export interface UpdateAnnouncementVariables {
  id: UUIDString;
  content?: string | null;
}

export interface UpdateAssignmentData {
  assignment_update?: Assignment_Key | null;
}

export interface UpdateAssignmentVariables {
  id: UUIDString;
  title?: string | null;
}

export interface UpdateClassData {
  class_update?: Class_Key | null;
}

export interface UpdateClassVariables {
  id: UUIDString;
  room?: string | null;
}

export interface UpdateSubmissionData {
  submission_update?: Submission_Key | null;
}

export interface UpdateSubmissionVariables {
  id: UUIDString;
  grade?: number | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  name?: string | null;
  email?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
  operationName: string;
}
export const createClassRef: CreateClassRef;

export function createClass(vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;
export function createClass(dc: DataConnect, vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface UpdateClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
  operationName: string;
}
export const updateClassRef: UpdateClassRef;

export function updateClass(vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;
export function updateClass(dc: DataConnect, vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;

interface DeleteClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
  operationName: string;
}
export const deleteClassRef: DeleteClassRef;

export function deleteClass(vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;
export function deleteClass(dc: DataConnect, vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;

interface GetClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetClassVariables): QueryRef<GetClassData, GetClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetClassVariables): QueryRef<GetClassData, GetClassVariables>;
  operationName: string;
}
export const getClassRef: GetClassRef;

export function getClass(vars: GetClassVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassData, GetClassVariables>;
export function getClass(dc: DataConnect, vars: GetClassVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassData, GetClassVariables>;

interface ListClassesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClassesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListClassesData, undefined>;
  operationName: string;
}
export const listClassesRef: ListClassesRef;

export function listClasses(options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;
export function listClasses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;

interface CreateEnrollmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEnrollmentVariables): MutationRef<CreateEnrollmentData, CreateEnrollmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateEnrollmentVariables): MutationRef<CreateEnrollmentData, CreateEnrollmentVariables>;
  operationName: string;
}
export const createEnrollmentRef: CreateEnrollmentRef;

export function createEnrollment(vars: CreateEnrollmentVariables): MutationPromise<CreateEnrollmentData, CreateEnrollmentVariables>;
export function createEnrollment(dc: DataConnect, vars: CreateEnrollmentVariables): MutationPromise<CreateEnrollmentData, CreateEnrollmentVariables>;

interface DeleteEnrollmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteEnrollmentVariables): MutationRef<DeleteEnrollmentData, DeleteEnrollmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteEnrollmentVariables): MutationRef<DeleteEnrollmentData, DeleteEnrollmentVariables>;
  operationName: string;
}
export const deleteEnrollmentRef: DeleteEnrollmentRef;

export function deleteEnrollment(vars: DeleteEnrollmentVariables): MutationPromise<DeleteEnrollmentData, DeleteEnrollmentVariables>;
export function deleteEnrollment(dc: DataConnect, vars: DeleteEnrollmentVariables): MutationPromise<DeleteEnrollmentData, DeleteEnrollmentVariables>;

interface ListMyEnrollmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyEnrollmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyEnrollmentsData, undefined>;
  operationName: string;
}
export const listMyEnrollmentsRef: ListMyEnrollmentsRef;

export function listMyEnrollments(options?: ExecuteQueryOptions): QueryPromise<ListMyEnrollmentsData, undefined>;
export function listMyEnrollments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyEnrollmentsData, undefined>;

interface CreateAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
  operationName: string;
}
export const createAssignmentRef: CreateAssignmentRef;

export function createAssignment(vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;
export function createAssignment(dc: DataConnect, vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;

interface UpdateAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssignmentVariables): MutationRef<UpdateAssignmentData, UpdateAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAssignmentVariables): MutationRef<UpdateAssignmentData, UpdateAssignmentVariables>;
  operationName: string;
}
export const updateAssignmentRef: UpdateAssignmentRef;

export function updateAssignment(vars: UpdateAssignmentVariables): MutationPromise<UpdateAssignmentData, UpdateAssignmentVariables>;
export function updateAssignment(dc: DataConnect, vars: UpdateAssignmentVariables): MutationPromise<UpdateAssignmentData, UpdateAssignmentVariables>;

interface DeleteAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAssignmentVariables): MutationRef<DeleteAssignmentData, DeleteAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAssignmentVariables): MutationRef<DeleteAssignmentData, DeleteAssignmentVariables>;
  operationName: string;
}
export const deleteAssignmentRef: DeleteAssignmentRef;

export function deleteAssignment(vars: DeleteAssignmentVariables): MutationPromise<DeleteAssignmentData, DeleteAssignmentVariables>;
export function deleteAssignment(dc: DataConnect, vars: DeleteAssignmentVariables): MutationPromise<DeleteAssignmentData, DeleteAssignmentVariables>;

interface GetAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssignmentVariables): QueryRef<GetAssignmentData, GetAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAssignmentVariables): QueryRef<GetAssignmentData, GetAssignmentVariables>;
  operationName: string;
}
export const getAssignmentRef: GetAssignmentRef;

export function getAssignment(vars: GetAssignmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssignmentData, GetAssignmentVariables>;
export function getAssignment(dc: DataConnect, vars: GetAssignmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssignmentData, GetAssignmentVariables>;

interface ListAssignmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAssignmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAssignmentsData, undefined>;
  operationName: string;
}
export const listAssignmentsRef: ListAssignmentsRef;

export function listAssignments(options?: ExecuteQueryOptions): QueryPromise<ListAssignmentsData, undefined>;
export function listAssignments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAssignmentsData, undefined>;

interface CreateSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubmissionVariables): MutationRef<CreateSubmissionData, CreateSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSubmissionVariables): MutationRef<CreateSubmissionData, CreateSubmissionVariables>;
  operationName: string;
}
export const createSubmissionRef: CreateSubmissionRef;

export function createSubmission(vars: CreateSubmissionVariables): MutationPromise<CreateSubmissionData, CreateSubmissionVariables>;
export function createSubmission(dc: DataConnect, vars: CreateSubmissionVariables): MutationPromise<CreateSubmissionData, CreateSubmissionVariables>;

interface UpdateSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSubmissionVariables): MutationRef<UpdateSubmissionData, UpdateSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSubmissionVariables): MutationRef<UpdateSubmissionData, UpdateSubmissionVariables>;
  operationName: string;
}
export const updateSubmissionRef: UpdateSubmissionRef;

export function updateSubmission(vars: UpdateSubmissionVariables): MutationPromise<UpdateSubmissionData, UpdateSubmissionVariables>;
export function updateSubmission(dc: DataConnect, vars: UpdateSubmissionVariables): MutationPromise<UpdateSubmissionData, UpdateSubmissionVariables>;

interface DeleteSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
  operationName: string;
}
export const deleteSubmissionRef: DeleteSubmissionRef;

export function deleteSubmission(vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;
export function deleteSubmission(dc: DataConnect, vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;

interface GetMySubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMySubmissionVariables): QueryRef<GetMySubmissionData, GetMySubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMySubmissionVariables): QueryRef<GetMySubmissionData, GetMySubmissionVariables>;
  operationName: string;
}
export const getMySubmissionRef: GetMySubmissionRef;

export function getMySubmission(vars: GetMySubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMySubmissionData, GetMySubmissionVariables>;
export function getMySubmission(dc: DataConnect, vars: GetMySubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMySubmissionData, GetMySubmissionVariables>;

interface ListMySubmissionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySubmissionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMySubmissionsData, undefined>;
  operationName: string;
}
export const listMySubmissionsRef: ListMySubmissionsRef;

export function listMySubmissions(options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;
export function listMySubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;

interface CreateAnnouncementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAnnouncementVariables): MutationRef<CreateAnnouncementData, CreateAnnouncementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAnnouncementVariables): MutationRef<CreateAnnouncementData, CreateAnnouncementVariables>;
  operationName: string;
}
export const createAnnouncementRef: CreateAnnouncementRef;

export function createAnnouncement(vars: CreateAnnouncementVariables): MutationPromise<CreateAnnouncementData, CreateAnnouncementVariables>;
export function createAnnouncement(dc: DataConnect, vars: CreateAnnouncementVariables): MutationPromise<CreateAnnouncementData, CreateAnnouncementVariables>;

interface UpdateAnnouncementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAnnouncementVariables): MutationRef<UpdateAnnouncementData, UpdateAnnouncementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAnnouncementVariables): MutationRef<UpdateAnnouncementData, UpdateAnnouncementVariables>;
  operationName: string;
}
export const updateAnnouncementRef: UpdateAnnouncementRef;

export function updateAnnouncement(vars: UpdateAnnouncementVariables): MutationPromise<UpdateAnnouncementData, UpdateAnnouncementVariables>;
export function updateAnnouncement(dc: DataConnect, vars: UpdateAnnouncementVariables): MutationPromise<UpdateAnnouncementData, UpdateAnnouncementVariables>;

interface DeleteAnnouncementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAnnouncementVariables): MutationRef<DeleteAnnouncementData, DeleteAnnouncementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAnnouncementVariables): MutationRef<DeleteAnnouncementData, DeleteAnnouncementVariables>;
  operationName: string;
}
export const deleteAnnouncementRef: DeleteAnnouncementRef;

export function deleteAnnouncement(vars: DeleteAnnouncementVariables): MutationPromise<DeleteAnnouncementData, DeleteAnnouncementVariables>;
export function deleteAnnouncement(dc: DataConnect, vars: DeleteAnnouncementVariables): MutationPromise<DeleteAnnouncementData, DeleteAnnouncementVariables>;

interface GetAnnouncementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAnnouncementVariables): QueryRef<GetAnnouncementData, GetAnnouncementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAnnouncementVariables): QueryRef<GetAnnouncementData, GetAnnouncementVariables>;
  operationName: string;
}
export const getAnnouncementRef: GetAnnouncementRef;

export function getAnnouncement(vars: GetAnnouncementVariables, options?: ExecuteQueryOptions): QueryPromise<GetAnnouncementData, GetAnnouncementVariables>;
export function getAnnouncement(dc: DataConnect, vars: GetAnnouncementVariables, options?: ExecuteQueryOptions): QueryPromise<GetAnnouncementData, GetAnnouncementVariables>;

interface ListAnnouncementsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAnnouncementsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAnnouncementsData, undefined>;
  operationName: string;
}
export const listAnnouncementsRef: ListAnnouncementsRef;

export function listAnnouncements(options?: ExecuteQueryOptions): QueryPromise<ListAnnouncementsData, undefined>;
export function listAnnouncements(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAnnouncementsData, undefined>;

