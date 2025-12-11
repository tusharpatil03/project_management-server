import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { MyContext } from '../config/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  Json: { input: any; output: any; }
  Name: { input: any; output: any; }
  Password: { input: any; output: any; }
};

export type Activity = {
  __typename?: 'Activity';
  action: ActivityAction;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  entityId?: Maybe<Scalars['String']['output']>;
  entityName?: Maybe<Scalars['String']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  issue?: Maybe<Issue>;
  project?: Maybe<Project>;
  sprint?: Maybe<Sprint>;
  team?: Maybe<Team>;
  user?: Maybe<User>;
};

export type ActivityAction =
  | 'COMMENTED'
  | 'COMMENT_DELETED'
  | 'ISSUE_ADDED_TO_SPRINT'
  | 'ISSUE_ASSIGNED'
  | 'ISSUE_CREATED'
  | 'ISSUE_DELETED'
  | 'ISSUE_PRIORITY_CHANGED'
  | 'ISSUE_REMOVED_FROM_SPRINT'
  | 'ISSUE_STATUS_CHANGED'
  | 'ISSUE_UNASSIGNED'
  | 'ISSUE_UPDATED'
  | 'LOGGED_TIME'
  | 'PROJECT_CREATED'
  | 'PROJECT_DELETED'
  | 'PROJECT_TEAM_ADDED'
  | 'PROJECT_TEAM_REMOVED'
  | 'PROJECT_UPDATED'
  | 'SPRINT_COMPLETED'
  | 'SPRINT_CREATED'
  | 'SPRINT_REMOVED'
  | 'SPRINT_STARTED'
  | 'SPRINT_UPDATED'
  | 'TEAM_CREATED'
  | 'TEAM_MEMBER_ADDED'
  | 'TEAM_MEMBER_REMOVED'
  | 'TEAM_MEMBER_ROLE_CHANGED'
  | 'TEAM_UPDATED';

export type AssignIssueInput = {
  assigneeId: Scalars['ID']['input'];
  issueId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};

export type AuthData = {
  __typename?: 'AuthData';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  issue?: Maybe<Issue>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateIssueInput = {
  assigneeId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['DateTime']['input'];
  projectId: Scalars['ID']['input'];
  sprintId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<IssueStatus>;
  title: Scalars['String']['input'];
  type: IssueType;
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateSprintInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['DateTime']['input'];
  issues?: InputMaybe<Array<InputMaybe<IssueInput>>>;
  projectId: Scalars['ID']['input'];
  status?: InputMaybe<SprintStatus>;
  title: Scalars['String']['input'];
};

export type CreateTeamInput = {
  name: Scalars['String']['input'];
};

export type EntityType =
  | 'COMMENT'
  | 'ISSUE'
  | 'PROJECT'
  | 'SPRINT'
  | 'TEAM'
  | 'USER';

export type Error = {
  message: Scalars['String']['output'];
};

export type ExtendSession = {
  __typename?: 'ExtendSession';
  accessToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type FieldError = {
  message: Scalars['String']['output'];
  path: Array<Scalars['String']['output']>;
};

export type Gender =
  | 'Female'
  | 'Male'
  | 'Other';

export type Issue = {
  __typename?: 'Issue';
  activities?: Maybe<Array<Maybe<Activity>>>;
  assignee?: Maybe<User>;
  assigneeId?: Maybe<Scalars['ID']['output']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  priority?: Maybe<IssuePriority>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['ID']['output']>;
  sprint?: Maybe<Sprint>;
  sprintId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<IssueStatus>;
  title: Scalars['String']['output'];
  type?: Maybe<IssueType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type IssueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<IssueType>;
};

export type IssuePriority =
  | 'CRITICAL'
  | 'HIGH'
  | 'LOW'
  | 'MEDIUM';

export type IssueStatus =
  | 'DONE'
  | 'IN_PROGRESS'
  | 'TODO';

export type IssueType =
  | 'BUG'
  | 'EPIC'
  | 'STORY'
  | 'TASK';

export type LoginInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};

export type MemberRole =
  | 'Admin'
  | 'Contributor'
  | 'Viewer';

export type Mutation = {
  __typename?: 'Mutation';
  addIssueInSprint?: Maybe<ResponseMessage>;
  addProjectTeam?: Maybe<ResponseMessage>;
  addTeamMember: UserTeam;
  assineIssue: ResponseMessage;
  createIssue: ResponseMessage;
  createProject: ResponseMessage;
  createSprint: ResponseMessage;
  createTeam: Team;
  login?: Maybe<AuthData>;
  logout: Scalars['Boolean']['output'];
  refreshToken: ExtendSession;
  removeAssineeOfIssue?: Maybe<ResponseMessage>;
  removeIssue?: Maybe<ResponseMessage>;
  removeProject?: Maybe<ResponseMessage>;
  removeSprint?: Maybe<ResponseMessage>;
  removeTeam?: Maybe<ResponseMessage>;
  removeTeamMember: Team;
  sendVerificationLink?: Maybe<ResponseMessage>;
  signup: ResponseMessage;
  updateIssue: ResponseMessage;
  updateIssueStatus: ResponseMessage;
  updateUserProfile: ResponseMessage;
  verifyUser: AuthData;
};


export type MutationAddIssueInSprintArgs = {
  input: AddIssueInput;
};


export type MutationAddProjectTeamArgs = {
  input: AddProjectTeamInput;
};


export type MutationAddTeamMemberArgs = {
  input: AddTeamMemberInput;
};


export type MutationAssineIssueArgs = {
  input: AssignIssueInput;
};


export type MutationCreateIssueArgs = {
  input: CreateIssueInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateSprintArgs = {
  input: CreateSprintInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRemoveAssineeOfIssueArgs = {
  issueId: Scalars['ID']['input'];
};


export type MutationRemoveIssueArgs = {
  input: RemoveIssueInput;
};


export type MutationRemoveProjectArgs = {
  projectId: Scalars['ID']['input'];
};


export type MutationRemoveSprintArgs = {
  input: RemoveSprintInput;
};


export type MutationRemoveTeamArgs = {
  teamId: Scalars['ID']['input'];
};


export type MutationRemoveTeamMemberArgs = {
  input: RemoveTeamMemberInput;
};


export type MutationSendVerificationLinkArgs = {
  email: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateIssueArgs = {
  input: UpdateIssueInput;
};


export type MutationUpdateIssueStatusArgs = {
  issueId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
  status: IssueStatus;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationVerifyUserArgs = {
  token: Scalars['String']['input'];
};

export type ProfileInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  social?: InputMaybe<SocialInput>;
};

export type Project = {
  __typename?: 'Project';
  activities?: Maybe<Array<Maybe<Activity>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  issues?: Maybe<Array<Maybe<Issue>>>;
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  sprints?: Maybe<Array<Maybe<Sprint>>>;
  starred?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<ProjectStatus>;
  teams?: Maybe<Array<Maybe<ProjectTeam>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProjectStat = {
  __typename?: 'ProjectStat';
  activeSprintStat?: Maybe<ActiveSprintStat>;
  closedIssues?: Maybe<Scalars['Int']['output']>;
  inProgressIssues?: Maybe<Scalars['Int']['output']>;
  openIssues?: Maybe<Scalars['Int']['output']>;
  totalIssues?: Maybe<Scalars['Int']['output']>;
  totalSprints?: Maybe<Scalars['Int']['output']>;
};

export type ProjectStatus =
  | 'ACTIVE'
  | 'COMPLETE'
  | 'PLANNED';

export type ProjectTeam = {
  __typename?: 'ProjectTeam';
  id: Scalars['ID']['output'];
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['ID']['output']>;
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['ID']['output']>;
};

export type Query = {
  __typename?: 'Query';
  checkAuth?: Maybe<User>;
  getActiveSprint?: Maybe<Sprint>;
  getAllIssues?: Maybe<Array<Maybe<Issue>>>;
  getAllProjects?: Maybe<Array<Maybe<Project>>>;
  getAllSprints?: Maybe<Array<Maybe<Sprint>>>;
  getAllTeams?: Maybe<Array<Maybe<Team>>>;
  getAllUserTeams: Array<Maybe<UserTeam>>;
  getIssueById: Issue;
  getProject?: Maybe<Project>;
  getProjectStat?: Maybe<ProjectStat>;
  getProjectTeamsMembers?: Maybe<Array<Maybe<User>>>;
  getRecentProject?: Maybe<Project>;
  getSprintById: Sprint;
  getTeamById: Team;
  getUserById?: Maybe<User>;
  getUserInfo?: Maybe<User>;
  getUsersBySearch: Array<Maybe<User>>;
};


export type QueryGetActiveSprintArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetAllIssuesArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  projectId: Scalars['ID']['input'];
  sprintId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllSprintsArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetIssueByIdArgs = {
  issueId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type QueryGetProjectArgs = {
  projectId?: InputMaybe<Scalars['String']['input']>;
  projectKey?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetProjectStatArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetProjectTeamsMembersArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetSprintByIdArgs = {
  id: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type QueryGetTeamByIdArgs = {
  teamId: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUsersBySearchArgs = {
  search: Scalars['String']['input'];
};

export type ResponseMessage = {
  __typename?: 'ResponseMessage';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SignupInput = {
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['Password']['input'];
};

export type Social = {
  __typename?: 'Social';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  facebook?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  linkedin?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SocialInput = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  github?: InputMaybe<Scalars['String']['input']>;
  linkedin?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
};

export type Sprint = {
  __typename?: 'Sprint';
  activities?: Maybe<Array<Maybe<Activity>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  issues?: Maybe<Array<Maybe<Issue>>>;
  key: Scalars['String']['output'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['ID']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<SprintStatus>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SprintStatus =
  | 'ACTIVE'
  | 'COMPLETE'
  | 'PLANNED';

export type Team = {
  __typename?: 'Team';
  activities?: Maybe<Array<Maybe<Activity>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<ProjectTeam>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<Maybe<UserTeam>>>;
};

export type UnauthenticatedError = Error & {
  __typename?: 'UnauthenticatedError';
  message: Scalars['String']['output'];
};

export type UnauthorizedError = Error & {
  __typename?: 'UnauthorizedError';
  message: Scalars['String']['output'];
};

export type UpdateIssueInput = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  issueId: Scalars['String']['input'];
  priority?: InputMaybe<IssuePriority>;
  projectId: Scalars['String']['input'];
  status?: InputMaybe<IssueStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<IssueType>;
};

export type UpdateProfileInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileInput>;
};

export type User = {
  __typename?: 'User';
  activities?: Maybe<Array<Maybe<Activity>>>;
  assignedIssues?: Maybe<Array<Maybe<Issue>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdIssues?: Maybe<Array<Maybe<Issue>>>;
  createdTeams?: Maybe<Array<Maybe<Team>>>;
  email: Scalars['EmailAddress']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  projects?: Maybe<Array<Maybe<Project>>>;
  teams?: Maybe<Array<Maybe<UserTeam>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserTeam = {
  __typename?: 'UserTeam';
  id: Scalars['ID']['output'];
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<MemberRole>;
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['ID']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type ActiveSprintStat = {
  __typename?: 'activeSprintStat';
  closedIssues?: Maybe<Scalars['Int']['output']>;
  inProgressIssues?: Maybe<Scalars['Int']['output']>;
  openIssues?: Maybe<Scalars['Int']['output']>;
  totalIssues?: Maybe<Scalars['Int']['output']>;
};

export type AddIssueInput = {
  id: Scalars['ID']['input'];
  sprintId: Scalars['ID']['input'];
};

export type AddProjectTeamInput = {
  projectId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};

export type AddTeamMemberInput = {
  memberId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
  role: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};

export type Profile = {
  __typename?: 'profile';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  social?: Maybe<Social>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type RemoveIssueInput = {
  issueId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};

export type RemoveSprintInput = {
  projectId: Scalars['ID']['input'];
  sprintId: Scalars['ID']['input'];
};

export type RemoveTeamMemberInput = {
  memberId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info?: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info?: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Error: ( Partial<UnauthenticatedError> ) | ( Partial<UnauthorizedError> );
  FieldError: never;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Activity: ResolverTypeWrapper<Partial<Activity>>;
  ActivityAction: ResolverTypeWrapper<Partial<ActivityAction>>;
  AssignIssueInput: ResolverTypeWrapper<Partial<AssignIssueInput>>;
  AuthData: ResolverTypeWrapper<Partial<AuthData>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']['output']>>;
  Comment: ResolverTypeWrapper<Partial<Comment>>;
  CreateIssueInput: ResolverTypeWrapper<Partial<CreateIssueInput>>;
  CreateProjectInput: ResolverTypeWrapper<Partial<CreateProjectInput>>;
  CreateSprintInput: ResolverTypeWrapper<Partial<CreateSprintInput>>;
  CreateTeamInput: ResolverTypeWrapper<Partial<CreateTeamInput>>;
  Date: ResolverTypeWrapper<Partial<Scalars['Date']['output']>>;
  DateTime: ResolverTypeWrapper<Partial<Scalars['DateTime']['output']>>;
  EmailAddress: ResolverTypeWrapper<Partial<Scalars['EmailAddress']['output']>>;
  EntityType: ResolverTypeWrapper<Partial<EntityType>>;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Error']>;
  ExtendSession: ResolverTypeWrapper<Partial<ExtendSession>>;
  FieldError: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['FieldError']>;
  Gender: ResolverTypeWrapper<Partial<Gender>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']['output']>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']['output']>>;
  Issue: ResolverTypeWrapper<Partial<Issue>>;
  IssueInput: ResolverTypeWrapper<Partial<IssueInput>>;
  IssuePriority: ResolverTypeWrapper<Partial<IssuePriority>>;
  IssueStatus: ResolverTypeWrapper<Partial<IssueStatus>>;
  IssueType: ResolverTypeWrapper<Partial<IssueType>>;
  Json: ResolverTypeWrapper<Partial<Scalars['Json']['output']>>;
  LoginInput: ResolverTypeWrapper<Partial<LoginInput>>;
  MemberRole: ResolverTypeWrapper<Partial<MemberRole>>;
  Mutation: ResolverTypeWrapper<{}>;
  Name: ResolverTypeWrapper<Partial<Scalars['Name']['output']>>;
  Password: ResolverTypeWrapper<Partial<Scalars['Password']['output']>>;
  ProfileInput: ResolverTypeWrapper<Partial<ProfileInput>>;
  Project: ResolverTypeWrapper<Partial<Project>>;
  ProjectStat: ResolverTypeWrapper<Partial<ProjectStat>>;
  ProjectStatus: ResolverTypeWrapper<Partial<ProjectStatus>>;
  ProjectTeam: ResolverTypeWrapper<Partial<ProjectTeam>>;
  Query: ResolverTypeWrapper<{}>;
  ResponseMessage: ResolverTypeWrapper<Partial<ResponseMessage>>;
  SignupInput: ResolverTypeWrapper<Partial<SignupInput>>;
  Social: ResolverTypeWrapper<Partial<Social>>;
  SocialInput: ResolverTypeWrapper<Partial<SocialInput>>;
  Sprint: ResolverTypeWrapper<Partial<Sprint>>;
  SprintStatus: ResolverTypeWrapper<Partial<SprintStatus>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']['output']>>;
  Team: ResolverTypeWrapper<Partial<Team>>;
  UnauthenticatedError: ResolverTypeWrapper<Partial<UnauthenticatedError>>;
  UnauthorizedError: ResolverTypeWrapper<Partial<UnauthorizedError>>;
  UpdateIssueInput: ResolverTypeWrapper<Partial<UpdateIssueInput>>;
  UpdateProfileInput: ResolverTypeWrapper<Partial<UpdateProfileInput>>;
  User: ResolverTypeWrapper<Partial<User>>;
  UserTeam: ResolverTypeWrapper<Partial<UserTeam>>;
  activeSprintStat: ResolverTypeWrapper<Partial<ActiveSprintStat>>;
  addIssueInput: ResolverTypeWrapper<Partial<AddIssueInput>>;
  addProjectTeamInput: ResolverTypeWrapper<Partial<AddProjectTeamInput>>;
  addTeamMemberInput: ResolverTypeWrapper<Partial<AddTeamMemberInput>>;
  profile: ResolverTypeWrapper<Partial<Profile>>;
  removeIssueInput: ResolverTypeWrapper<Partial<RemoveIssueInput>>;
  removeSprintInput: ResolverTypeWrapper<Partial<RemoveSprintInput>>;
  removeTeamMemberInput: ResolverTypeWrapper<Partial<RemoveTeamMemberInput>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Activity: Partial<Activity>;
  AssignIssueInput: Partial<AssignIssueInput>;
  AuthData: Partial<AuthData>;
  Boolean: Partial<Scalars['Boolean']['output']>;
  Comment: Partial<Comment>;
  CreateIssueInput: Partial<CreateIssueInput>;
  CreateProjectInput: Partial<CreateProjectInput>;
  CreateSprintInput: Partial<CreateSprintInput>;
  CreateTeamInput: Partial<CreateTeamInput>;
  Date: Partial<Scalars['Date']['output']>;
  DateTime: Partial<Scalars['DateTime']['output']>;
  EmailAddress: Partial<Scalars['EmailAddress']['output']>;
  Error: ResolversInterfaceTypes<ResolversParentTypes>['Error'];
  ExtendSession: Partial<ExtendSession>;
  FieldError: ResolversInterfaceTypes<ResolversParentTypes>['FieldError'];
  ID: Partial<Scalars['ID']['output']>;
  Int: Partial<Scalars['Int']['output']>;
  Issue: Partial<Issue>;
  IssueInput: Partial<IssueInput>;
  Json: Partial<Scalars['Json']['output']>;
  LoginInput: Partial<LoginInput>;
  Mutation: {};
  Name: Partial<Scalars['Name']['output']>;
  Password: Partial<Scalars['Password']['output']>;
  ProfileInput: Partial<ProfileInput>;
  Project: Partial<Project>;
  ProjectStat: Partial<ProjectStat>;
  ProjectTeam: Partial<ProjectTeam>;
  Query: {};
  ResponseMessage: Partial<ResponseMessage>;
  SignupInput: Partial<SignupInput>;
  Social: Partial<Social>;
  SocialInput: Partial<SocialInput>;
  Sprint: Partial<Sprint>;
  String: Partial<Scalars['String']['output']>;
  Team: Partial<Team>;
  UnauthenticatedError: Partial<UnauthenticatedError>;
  UnauthorizedError: Partial<UnauthorizedError>;
  UpdateIssueInput: Partial<UpdateIssueInput>;
  UpdateProfileInput: Partial<UpdateProfileInput>;
  User: Partial<User>;
  UserTeam: Partial<UserTeam>;
  activeSprintStat: Partial<ActiveSprintStat>;
  addIssueInput: Partial<AddIssueInput>;
  addProjectTeamInput: Partial<AddProjectTeamInput>;
  addTeamMemberInput: Partial<AddTeamMemberInput>;
  profile: Partial<Profile>;
  removeIssueInput: Partial<RemoveIssueInput>;
  removeSprintInput: Partial<RemoveSprintInput>;
  removeTeamMemberInput: Partial<RemoveTeamMemberInput>;
};

export type AuthDirectiveArgs = { };

export type AuthDirectiveResolver<Result, Parent, ContextType = MyContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RoleDirectiveArgs = {
  requires: Array<Maybe<MemberRole>>;
};

export type RoleDirectiveResolver<Result, Parent, ContextType = MyContext, Args = RoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ActivityResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']> = {
  action?: Resolver<ResolversTypes['ActivityAction'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entityName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entityType?: Resolver<ResolversTypes['EntityType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issue?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  sprint?: Resolver<Maybe<ResolversTypes['Sprint']>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthDataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issue?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type ErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType: TypeResolveFn<'UnauthenticatedError' | 'UnauthorizedError', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ExtendSessionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ExtendSession'] = ResolversParentTypes['ExtendSession']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FieldError'] = ResolversParentTypes['FieldError']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
};

export type IssueResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Issue'] = ResolversParentTypes['Issue']> = {
  activities?: Resolver<Maybe<Array<Maybe<ResolversTypes['Activity']>>>, ParentType, ContextType>;
  assignee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  assigneeId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['IssuePriority']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  sprint?: Resolver<Maybe<ResolversTypes['Sprint']>, ParentType, ContextType>;
  sprintId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['IssueStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['IssueType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Json'], any> {
  name: 'Json';
}

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addIssueInSprint?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationAddIssueInSprintArgs, 'input'>>;
  addProjectTeam?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationAddProjectTeamArgs, 'input'>>;
  addTeamMember?: Resolver<ResolversTypes['UserTeam'], ParentType, ContextType, RequireFields<MutationAddTeamMemberArgs, 'input'>>;
  assineIssue?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationAssineIssueArgs, 'input'>>;
  createIssue?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationCreateIssueArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  createSprint?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationCreateSprintArgs, 'input'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'input'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthData']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['ExtendSession'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'refreshToken'>>;
  removeAssineeOfIssue?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveAssineeOfIssueArgs, 'issueId'>>;
  removeIssue?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveIssueArgs, 'input'>>;
  removeProject?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveProjectArgs, 'projectId'>>;
  removeSprint?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveSprintArgs, 'input'>>;
  removeTeam?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveTeamArgs, 'teamId'>>;
  removeTeamMember?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationRemoveTeamMemberArgs, 'input'>>;
  sendVerificationLink?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationSendVerificationLinkArgs, 'email'>>;
  signup?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  updateIssue?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationUpdateIssueArgs, 'input'>>;
  updateIssueStatus?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationUpdateIssueStatusArgs, 'issueId' | 'projectId' | 'status'>>;
  updateUserProfile?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationUpdateUserProfileArgs, 'input'>>;
  verifyUser?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<MutationVerifyUserArgs, 'token'>>;
};

export interface NameScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Name'], any> {
  name: 'Name';
}

export interface PasswordScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Password'], any> {
  name: 'Password';
}

export type ProjectResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  activities?: Resolver<Maybe<Array<Maybe<ResolversTypes['Activity']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sprints?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sprint']>>>, ParentType, ContextType>;
  starred?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ProjectStatus']>, ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectTeam']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectStatResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ProjectStat'] = ResolversParentTypes['ProjectStat']> = {
  activeSprintStat?: Resolver<Maybe<ResolversTypes['activeSprintStat']>, ParentType, ContextType>;
  closedIssues?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  inProgressIssues?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  openIssues?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalIssues?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalSprints?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectTeamResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ProjectTeam'] = ResolversParentTypes['ProjectTeam']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  teamId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  checkAuth?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getActiveSprint?: Resolver<Maybe<ResolversTypes['Sprint']>, ParentType, ContextType, RequireFields<QueryGetActiveSprintArgs, 'projectId'>>;
  getAllIssues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType, RequireFields<QueryGetAllIssuesArgs, 'page' | 'pageSize' | 'projectId'>>;
  getAllProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  getAllSprints?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sprint']>>>, ParentType, ContextType, RequireFields<QueryGetAllSprintsArgs, 'projectId'>>;
  getAllTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  getAllUserTeams?: Resolver<Array<Maybe<ResolversTypes['UserTeam']>>, ParentType, ContextType>;
  getIssueById?: Resolver<ResolversTypes['Issue'], ParentType, ContextType, RequireFields<QueryGetIssueByIdArgs, 'issueId' | 'projectId'>>;
  getProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, Partial<QueryGetProjectArgs>>;
  getProjectStat?: Resolver<Maybe<ResolversTypes['ProjectStat']>, ParentType, ContextType, RequireFields<QueryGetProjectStatArgs, 'projectId'>>;
  getProjectTeamsMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryGetProjectTeamsMembersArgs, 'projectId'>>;
  getRecentProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  getSprintById?: Resolver<ResolversTypes['Sprint'], ParentType, ContextType, RequireFields<QueryGetSprintByIdArgs, 'id' | 'projectId'>>;
  getTeamById?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<QueryGetTeamByIdArgs, 'teamId'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'userId'>>;
  getUserInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getUsersBySearch?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryGetUsersBySearchArgs, 'search'>>;
};

export type ResponseMessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ResponseMessage'] = ResolversParentTypes['ResponseMessage']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Social'] = ResolversParentTypes['Social']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SprintResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Sprint'] = ResolversParentTypes['Sprint']> = {
  activities?: Resolver<Maybe<Array<Maybe<ResolversTypes['Activity']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['SprintStatus']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  activities?: Resolver<Maybe<Array<Maybe<ResolversTypes['Activity']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectTeam']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserTeam']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnauthenticatedErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UnauthenticatedError'] = ResolversParentTypes['UnauthenticatedError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnauthorizedErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UnauthorizedError'] = ResolversParentTypes['UnauthorizedError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  activities?: Resolver<Maybe<Array<Maybe<ResolversTypes['Activity']>>>, ParentType, ContextType>;
  assignedIssues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdIssues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType>;
  createdTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['profile']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserTeam']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserTeamResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserTeam'] = ResolversParentTypes['UserTeam']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['MemberRole']>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  teamId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActiveSprintStatResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['activeSprintStat'] = ResolversParentTypes['activeSprintStat']> = {
  closedIssues?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  inProgressIssues?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  openIssues?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalIssues?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['profile'] = ResolversParentTypes['profile']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  social?: Resolver<Maybe<ResolversTypes['Social']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  Activity?: ActivityResolvers<ContextType>;
  AuthData?: AuthDataResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  ExtendSession?: ExtendSessionResolvers<ContextType>;
  FieldError?: FieldErrorResolvers<ContextType>;
  Issue?: IssueResolvers<ContextType>;
  Json?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Name?: GraphQLScalarType;
  Password?: GraphQLScalarType;
  Project?: ProjectResolvers<ContextType>;
  ProjectStat?: ProjectStatResolvers<ContextType>;
  ProjectTeam?: ProjectTeamResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponseMessage?: ResponseMessageResolvers<ContextType>;
  Social?: SocialResolvers<ContextType>;
  Sprint?: SprintResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  UnauthenticatedError?: UnauthenticatedErrorResolvers<ContextType>;
  UnauthorizedError?: UnauthorizedErrorResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserTeam?: UserTeamResolvers<ContextType>;
  activeSprintStat?: ActiveSprintStatResolvers<ContextType>;
  profile?: ProfileResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = MyContext> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  role?: RoleDirectiveResolver<any, any, ContextType>;
};
