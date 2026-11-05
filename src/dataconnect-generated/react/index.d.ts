import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, GetUserData, ListUsersData, CreateClassData, CreateClassVariables, UpdateClassData, UpdateClassVariables, DeleteClassData, DeleteClassVariables, GetClassData, GetClassVariables, ListClassesData, CreateEnrollmentData, CreateEnrollmentVariables, DeleteEnrollmentData, DeleteEnrollmentVariables, ListMyEnrollmentsData, CreateAssignmentData, CreateAssignmentVariables, UpdateAssignmentData, UpdateAssignmentVariables, DeleteAssignmentData, DeleteAssignmentVariables, GetAssignmentData, GetAssignmentVariables, ListAssignmentsData, CreateSubmissionData, CreateSubmissionVariables, UpdateSubmissionData, UpdateSubmissionVariables, DeleteSubmissionData, DeleteSubmissionVariables, GetMySubmissionData, GetMySubmissionVariables, ListMySubmissionsData, CreateAnnouncementData, CreateAnnouncementVariables, UpdateAnnouncementData, UpdateAnnouncementVariables, DeleteAnnouncementData, DeleteAnnouncementVariables, GetAnnouncementData, GetAnnouncementVariables, ListAnnouncementsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetUser(options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;
export function useGetUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useCreateClass(options?: useDataConnectMutationOptions<CreateClassData, FirebaseError, CreateClassVariables>): UseDataConnectMutationResult<CreateClassData, CreateClassVariables>;
export function useCreateClass(dc: DataConnect, options?: useDataConnectMutationOptions<CreateClassData, FirebaseError, CreateClassVariables>): UseDataConnectMutationResult<CreateClassData, CreateClassVariables>;

export function useUpdateClass(options?: useDataConnectMutationOptions<UpdateClassData, FirebaseError, UpdateClassVariables>): UseDataConnectMutationResult<UpdateClassData, UpdateClassVariables>;
export function useUpdateClass(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateClassData, FirebaseError, UpdateClassVariables>): UseDataConnectMutationResult<UpdateClassData, UpdateClassVariables>;

export function useDeleteClass(options?: useDataConnectMutationOptions<DeleteClassData, FirebaseError, DeleteClassVariables>): UseDataConnectMutationResult<DeleteClassData, DeleteClassVariables>;
export function useDeleteClass(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteClassData, FirebaseError, DeleteClassVariables>): UseDataConnectMutationResult<DeleteClassData, DeleteClassVariables>;

export function useGetClass(vars: GetClassVariables, options?: useDataConnectQueryOptions<GetClassData>): UseDataConnectQueryResult<GetClassData, GetClassVariables>;
export function useGetClass(dc: DataConnect, vars: GetClassVariables, options?: useDataConnectQueryOptions<GetClassData>): UseDataConnectQueryResult<GetClassData, GetClassVariables>;

export function useListClasses(options?: useDataConnectQueryOptions<ListClassesData>): UseDataConnectQueryResult<ListClassesData, undefined>;
export function useListClasses(dc: DataConnect, options?: useDataConnectQueryOptions<ListClassesData>): UseDataConnectQueryResult<ListClassesData, undefined>;

export function useCreateEnrollment(options?: useDataConnectMutationOptions<CreateEnrollmentData, FirebaseError, CreateEnrollmentVariables>): UseDataConnectMutationResult<CreateEnrollmentData, CreateEnrollmentVariables>;
export function useCreateEnrollment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateEnrollmentData, FirebaseError, CreateEnrollmentVariables>): UseDataConnectMutationResult<CreateEnrollmentData, CreateEnrollmentVariables>;

export function useDeleteEnrollment(options?: useDataConnectMutationOptions<DeleteEnrollmentData, FirebaseError, DeleteEnrollmentVariables>): UseDataConnectMutationResult<DeleteEnrollmentData, DeleteEnrollmentVariables>;
export function useDeleteEnrollment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteEnrollmentData, FirebaseError, DeleteEnrollmentVariables>): UseDataConnectMutationResult<DeleteEnrollmentData, DeleteEnrollmentVariables>;

export function useListMyEnrollments(options?: useDataConnectQueryOptions<ListMyEnrollmentsData>): UseDataConnectQueryResult<ListMyEnrollmentsData, undefined>;
export function useListMyEnrollments(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyEnrollmentsData>): UseDataConnectQueryResult<ListMyEnrollmentsData, undefined>;

export function useCreateAssignment(options?: useDataConnectMutationOptions<CreateAssignmentData, FirebaseError, CreateAssignmentVariables>): UseDataConnectMutationResult<CreateAssignmentData, CreateAssignmentVariables>;
export function useCreateAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAssignmentData, FirebaseError, CreateAssignmentVariables>): UseDataConnectMutationResult<CreateAssignmentData, CreateAssignmentVariables>;

export function useUpdateAssignment(options?: useDataConnectMutationOptions<UpdateAssignmentData, FirebaseError, UpdateAssignmentVariables>): UseDataConnectMutationResult<UpdateAssignmentData, UpdateAssignmentVariables>;
export function useUpdateAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAssignmentData, FirebaseError, UpdateAssignmentVariables>): UseDataConnectMutationResult<UpdateAssignmentData, UpdateAssignmentVariables>;

export function useDeleteAssignment(options?: useDataConnectMutationOptions<DeleteAssignmentData, FirebaseError, DeleteAssignmentVariables>): UseDataConnectMutationResult<DeleteAssignmentData, DeleteAssignmentVariables>;
export function useDeleteAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAssignmentData, FirebaseError, DeleteAssignmentVariables>): UseDataConnectMutationResult<DeleteAssignmentData, DeleteAssignmentVariables>;

export function useGetAssignment(vars: GetAssignmentVariables, options?: useDataConnectQueryOptions<GetAssignmentData>): UseDataConnectQueryResult<GetAssignmentData, GetAssignmentVariables>;
export function useGetAssignment(dc: DataConnect, vars: GetAssignmentVariables, options?: useDataConnectQueryOptions<GetAssignmentData>): UseDataConnectQueryResult<GetAssignmentData, GetAssignmentVariables>;

export function useListAssignments(options?: useDataConnectQueryOptions<ListAssignmentsData>): UseDataConnectQueryResult<ListAssignmentsData, undefined>;
export function useListAssignments(dc: DataConnect, options?: useDataConnectQueryOptions<ListAssignmentsData>): UseDataConnectQueryResult<ListAssignmentsData, undefined>;

export function useCreateSubmission(options?: useDataConnectMutationOptions<CreateSubmissionData, FirebaseError, CreateSubmissionVariables>): UseDataConnectMutationResult<CreateSubmissionData, CreateSubmissionVariables>;
export function useCreateSubmission(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSubmissionData, FirebaseError, CreateSubmissionVariables>): UseDataConnectMutationResult<CreateSubmissionData, CreateSubmissionVariables>;

export function useUpdateSubmission(options?: useDataConnectMutationOptions<UpdateSubmissionData, FirebaseError, UpdateSubmissionVariables>): UseDataConnectMutationResult<UpdateSubmissionData, UpdateSubmissionVariables>;
export function useUpdateSubmission(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSubmissionData, FirebaseError, UpdateSubmissionVariables>): UseDataConnectMutationResult<UpdateSubmissionData, UpdateSubmissionVariables>;

export function useDeleteSubmission(options?: useDataConnectMutationOptions<DeleteSubmissionData, FirebaseError, DeleteSubmissionVariables>): UseDataConnectMutationResult<DeleteSubmissionData, DeleteSubmissionVariables>;
export function useDeleteSubmission(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteSubmissionData, FirebaseError, DeleteSubmissionVariables>): UseDataConnectMutationResult<DeleteSubmissionData, DeleteSubmissionVariables>;

export function useGetMySubmission(vars: GetMySubmissionVariables, options?: useDataConnectQueryOptions<GetMySubmissionData>): UseDataConnectQueryResult<GetMySubmissionData, GetMySubmissionVariables>;
export function useGetMySubmission(dc: DataConnect, vars: GetMySubmissionVariables, options?: useDataConnectQueryOptions<GetMySubmissionData>): UseDataConnectQueryResult<GetMySubmissionData, GetMySubmissionVariables>;

export function useListMySubmissions(options?: useDataConnectQueryOptions<ListMySubmissionsData>): UseDataConnectQueryResult<ListMySubmissionsData, undefined>;
export function useListMySubmissions(dc: DataConnect, options?: useDataConnectQueryOptions<ListMySubmissionsData>): UseDataConnectQueryResult<ListMySubmissionsData, undefined>;

export function useCreateAnnouncement(options?: useDataConnectMutationOptions<CreateAnnouncementData, FirebaseError, CreateAnnouncementVariables>): UseDataConnectMutationResult<CreateAnnouncementData, CreateAnnouncementVariables>;
export function useCreateAnnouncement(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAnnouncementData, FirebaseError, CreateAnnouncementVariables>): UseDataConnectMutationResult<CreateAnnouncementData, CreateAnnouncementVariables>;

export function useUpdateAnnouncement(options?: useDataConnectMutationOptions<UpdateAnnouncementData, FirebaseError, UpdateAnnouncementVariables>): UseDataConnectMutationResult<UpdateAnnouncementData, UpdateAnnouncementVariables>;
export function useUpdateAnnouncement(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAnnouncementData, FirebaseError, UpdateAnnouncementVariables>): UseDataConnectMutationResult<UpdateAnnouncementData, UpdateAnnouncementVariables>;

export function useDeleteAnnouncement(options?: useDataConnectMutationOptions<DeleteAnnouncementData, FirebaseError, DeleteAnnouncementVariables>): UseDataConnectMutationResult<DeleteAnnouncementData, DeleteAnnouncementVariables>;
export function useDeleteAnnouncement(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAnnouncementData, FirebaseError, DeleteAnnouncementVariables>): UseDataConnectMutationResult<DeleteAnnouncementData, DeleteAnnouncementVariables>;

export function useGetAnnouncement(vars: GetAnnouncementVariables, options?: useDataConnectQueryOptions<GetAnnouncementData>): UseDataConnectQueryResult<GetAnnouncementData, GetAnnouncementVariables>;
export function useGetAnnouncement(dc: DataConnect, vars: GetAnnouncementVariables, options?: useDataConnectQueryOptions<GetAnnouncementData>): UseDataConnectQueryResult<GetAnnouncementData, GetAnnouncementVariables>;

export function useListAnnouncements(options?: useDataConnectQueryOptions<ListAnnouncementsData>): UseDataConnectQueryResult<ListAnnouncementsData, undefined>;
export function useListAnnouncements(dc: DataConnect, options?: useDataConnectQueryOptions<ListAnnouncementsData>): UseDataConnectQueryResult<ListAnnouncementsData, undefined>;
