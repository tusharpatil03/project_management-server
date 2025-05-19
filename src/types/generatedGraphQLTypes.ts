import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
};

export type AssignTaskInput = {
  assigneeId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
};

export type Auth = {
  __typename?: 'Auth';
  accessToken?: Maybe<Scalars['String']['output']>;
  authData?: Maybe<AuthData>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  expiresIn?: Maybe<Scalars['Int']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  idToken?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  scope?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  tokenType?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type AuthData = {
  __typename?: 'AuthData';
  accessToken: Scalars['String']['output'];
  user: User;
  userProfile: UserProfile;
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateSprintInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['DateTime']['input'];
  projectId: Scalars['ID']['input'];
  status?: InputMaybe<SprintStatus>;
  tasks?: InputMaybe<Array<CreateTaskInput>>;
  title: Scalars['String']['input'];
};

export type CreateTaskInput = {
  assigneeId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['DateTime']['input'];
  projectId: Scalars['ID']['input'];
  sprintId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TaskStatus>;
  title: Scalars['String']['input'];
};

export type CreateTeamInput = {
  name: Scalars['String']['input'];
};

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
  addTeamMember: Team;
  assineTask: ResponseMessage;
  createProject: Project;
  createSprint: Sprint;
  createTask: Task;
  createTeam: Team;
  login: AuthData;
  logout: Scalars['Boolean']['output'];
  removeAssineeOfTask: Task;
  removeProject?: Maybe<ResponseMessage>;
  removeSprint?: Maybe<ResponseMessage>;
  removeTask?: Maybe<ResponseMessage>;
  removeTeam?: Maybe<ResponseMessage>;
  removeTeamMember: Team;
  signup: AuthData;
  updateTaskStatus: ResponseMessage;
};


export type MutationAddTeamMemberArgs = {
  memberId: Scalars['ID']['input'];
  role: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};


export type MutationAssineTaskArgs = {
  input: AssignTaskInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateSprintArgs = {
  input: CreateSprintInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRemoveAssineeOfTaskArgs = {
  taskId: Scalars['ID']['input'];
};


export type MutationRemoveProjectArgs = {
  projectId: Scalars['ID']['input'];
};


export type MutationRemoveSprintArgs = {
  projectId: Scalars['ID']['input'];
  sprintId: Scalars['ID']['input'];
};


export type MutationRemoveTaskArgs = {
  projectId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
};


export type MutationRemoveTeamArgs = {
  teamId: Scalars['ID']['input'];
};


export type MutationRemoveTeamMemberArgs = {
  memberId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateTaskStatusArgs = {
  projectId: Scalars['ID']['input'];
  status: TaskStatus;
  taskId: Scalars['ID']['input'];
};

export type Project = {
  __typename?: 'Project';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creatorId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ProjectStatus>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProjectStatus =
  | 'DONE'
  | 'IN_PROGRESS'
  | 'TODO';

export type ProjectTeam = {
  __typename?: 'ProjectTeam';
  id: Scalars['ID']['output'];
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  project?: Maybe<Project>;
  projectId: Scalars['ID']['output'];
  team?: Maybe<Team>;
  teamId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllProjects?: Maybe<Array<Maybe<Project>>>;
  getAllSprints: Array<Maybe<Sprint>>;
  getAllTasks: Array<Maybe<Task>>;
  getAllUserTeams: Array<Maybe<Team>>;
  getProjectById: Project;
  getSprintById: Sprint;
  getTaskById: Task;
  getTeamById: Team;
  getUserById: User;
};


export type QueryGetAllSprintsArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetAllTasksArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetAllUserTeamsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetProjectByIdArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetSprintByIdArgs = {
  id: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type QueryGetTaskByIdArgs = {
  taskId: Scalars['ID']['input'];
};


export type QueryGetTeamByIdArgs = {
  teamId: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['ID']['input'];
};

export type ResponseMessage = {
  __typename?: 'ResponseMessage';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Role =
  | 'Admin'
  | 'User';

export type SignupInput = {
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Social = {
  __typename?: 'Social';
  createdAt: Scalars['DateTime']['output'];
  facebook?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  linkedin?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Sprint = {
  __typename?: 'Sprint';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['String']['output']>;
  status: SprintStatus;
  tasks: Array<Maybe<Task>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SprintStatus =
  | 'DONE'
  | 'IN_PROGRESS'
  | 'TODO';

export type Task = {
  __typename?: 'Task';
  assignee?: Maybe<TaskAssignee>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  creator?: Maybe<TaskCreator>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  projectId?: Maybe<Scalars['String']['output']>;
  sprintId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<TaskStatus>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type TaskAssignee = {
  __typename?: 'TaskAssignee';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type TaskCreator = {
  __typename?: 'TaskCreator';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
};

export type TaskStatus =
  | 'DONE'
  | 'IN_PROGRESS'
  | 'TODO';

export type Team = {
  __typename?: 'Team';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creatorId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  members?: Maybe<Array<Maybe<User>>>;
  name?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<Project>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UnauthenticatedError = Error & {
  __typename?: 'UnauthenticatedError';
  message: Scalars['String']['output'];
};

export type UnauthorizedError = Error & {
  __typename?: 'UnauthorizedError';
  message: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  assignedTasks?: Maybe<Array<Maybe<Task>>>;
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdTasks?: Maybe<Array<Maybe<Task>>>;
  createdTeams?: Maybe<Array<Maybe<Team>>>;
  email: Scalars['EmailAddress']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<Project>>>;
  role?: Maybe<Role>;
  social?: Maybe<Social>;
  sprints?: Maybe<Array<Maybe<Sprint>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userProfile?: Maybe<UserProfile>;
  username: Scalars['String']['output'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  social?: Maybe<Social>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type UserTeam = {
  __typename?: 'UserTeam';
  id: Scalars['ID']['output'];
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<MemberRole>;
  team?: Maybe<Team>;
  teamId: Scalars['ID']['output'];
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
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
  Error: ( UnauthenticatedError ) | ( UnauthorizedError );
  FieldError: never;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AssignTaskInput: AssignTaskInput;
  Auth: ResolverTypeWrapper<Auth>;
  AuthData: ResolverTypeWrapper<AuthData>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateProjectInput: CreateProjectInput;
  CreateSprintInput: CreateSprintInput;
  CreateTaskInput: CreateTaskInput;
  CreateTeamInput: CreateTeamInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Error']>;
  ExtendSession: ResolverTypeWrapper<ExtendSession>;
  FieldError: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['FieldError']>;
  Gender: Gender;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Json: ResolverTypeWrapper<Scalars['Json']['output']>;
  LoginInput: LoginInput;
  MemberRole: MemberRole;
  Mutation: ResolverTypeWrapper<{}>;
  Project: ResolverTypeWrapper<Project>;
  ProjectStatus: ProjectStatus;
  ProjectTeam: ResolverTypeWrapper<ProjectTeam>;
  Query: ResolverTypeWrapper<{}>;
  ResponseMessage: ResolverTypeWrapper<ResponseMessage>;
  Role: Role;
  SignupInput: SignupInput;
  Social: ResolverTypeWrapper<Social>;
  Sprint: ResolverTypeWrapper<Sprint>;
  SprintStatus: SprintStatus;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  TaskAssignee: ResolverTypeWrapper<TaskAssignee>;
  TaskCreator: ResolverTypeWrapper<TaskCreator>;
  TaskStatus: TaskStatus;
  Team: ResolverTypeWrapper<Team>;
  UnauthenticatedError: ResolverTypeWrapper<UnauthenticatedError>;
  UnauthorizedError: ResolverTypeWrapper<UnauthorizedError>;
  User: ResolverTypeWrapper<User>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
  UserTeam: ResolverTypeWrapper<UserTeam>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AssignTaskInput: AssignTaskInput;
  Auth: Auth;
  AuthData: AuthData;
  Boolean: Scalars['Boolean']['output'];
  CreateProjectInput: CreateProjectInput;
  CreateSprintInput: CreateSprintInput;
  CreateTaskInput: CreateTaskInput;
  CreateTeamInput: CreateTeamInput;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  Error: ResolversInterfaceTypes<ResolversParentTypes>['Error'];
  ExtendSession: ExtendSession;
  FieldError: ResolversInterfaceTypes<ResolversParentTypes>['FieldError'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Json: Scalars['Json']['output'];
  LoginInput: LoginInput;
  Mutation: {};
  Project: Project;
  ProjectTeam: ProjectTeam;
  Query: {};
  ResponseMessage: ResponseMessage;
  SignupInput: SignupInput;
  Social: Social;
  Sprint: Sprint;
  String: Scalars['String']['output'];
  Task: Task;
  TaskAssignee: TaskAssignee;
  TaskCreator: TaskCreator;
  Team: Team;
  UnauthenticatedError: UnauthenticatedError;
  UnauthorizedError: UnauthorizedError;
  User: User;
  UserProfile: UserProfile;
  UserTeam: UserTeam;
};

export type AuthDirectiveArgs = { };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RoleDirectiveArgs = {
  requires?: Maybe<Role>;
};

export type RoleDirectiveResolver<Result, Parent, ContextType = any, Args = RoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authData?: Resolver<Maybe<ResolversTypes['AuthData']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiresIn?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  scope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userProfile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType>;
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

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType: TypeResolveFn<'UnauthenticatedError' | 'UnauthorizedError', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ExtendSessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExtendSession'] = ResolversParentTypes['ExtendSession']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldError'] = ResolversParentTypes['FieldError']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Json'], any> {
  name: 'Json';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addTeamMember?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationAddTeamMemberArgs, 'memberId' | 'role' | 'teamId'>>;
  assineTask?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationAssineTaskArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  createSprint?: Resolver<ResolversTypes['Sprint'], ParentType, ContextType, RequireFields<MutationCreateSprintArgs, 'input'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'input'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'input'>>;
  login?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  removeAssineeOfTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationRemoveAssineeOfTaskArgs, 'taskId'>>;
  removeProject?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveProjectArgs, 'projectId'>>;
  removeSprint?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveSprintArgs, 'projectId' | 'sprintId'>>;
  removeTask?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveTaskArgs, 'projectId' | 'taskId'>>;
  removeTeam?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveTeamArgs, 'teamId'>>;
  removeTeamMember?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationRemoveTeamMemberArgs, 'memberId' | 'teamId'>>;
  signup?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  updateTaskStatus?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationUpdateTaskStatusArgs, 'projectId' | 'status' | 'taskId'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ProjectStatus']>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectTeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectTeam'] = ResolversParentTypes['ProjectTeam']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  teamId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  getAllSprints?: Resolver<Array<Maybe<ResolversTypes['Sprint']>>, ParentType, ContextType, RequireFields<QueryGetAllSprintsArgs, 'projectId'>>;
  getAllTasks?: Resolver<Array<Maybe<ResolversTypes['Task']>>, ParentType, ContextType, RequireFields<QueryGetAllTasksArgs, 'projectId'>>;
  getAllUserTeams?: Resolver<Array<Maybe<ResolversTypes['Team']>>, ParentType, ContextType, RequireFields<QueryGetAllUserTeamsArgs, 'userId'>>;
  getProjectById?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryGetProjectByIdArgs, 'projectId'>>;
  getSprintById?: Resolver<ResolversTypes['Sprint'], ParentType, ContextType, RequireFields<QueryGetSprintByIdArgs, 'id' | 'projectId'>>;
  getTaskById?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<QueryGetTaskByIdArgs, 'taskId'>>;
  getTeamById?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<QueryGetTeamByIdArgs, 'teamId'>>;
  getUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'userId'>>;
};

export type ResponseMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseMessage'] = ResolversParentTypes['ResponseMessage']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialResolvers<ContextType = any, ParentType extends ResolversParentTypes['Social'] = ResolversParentTypes['Social']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SprintResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sprint'] = ResolversParentTypes['Sprint']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SprintStatus'], ParentType, ContextType>;
  tasks?: Resolver<Array<Maybe<ResolversTypes['Task']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  assignee?: Resolver<Maybe<ResolversTypes['TaskAssignee']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['TaskCreator']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sprintId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TaskStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskAssigneeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskAssignee'] = ResolversParentTypes['TaskAssignee']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskCreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskCreator'] = ResolversParentTypes['TaskCreator']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnauthenticatedErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnauthenticatedError'] = ResolversParentTypes['UnauthenticatedError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnauthorizedErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnauthorizedError'] = ResolversParentTypes['UnauthorizedError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  assignedTasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdTasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  createdTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  social?: Resolver<Maybe<ResolversTypes['Social']>, ParentType, ContextType>;
  sprints?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sprint']>>>, ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userProfile?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  social?: Resolver<Maybe<ResolversTypes['Social']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserTeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserTeam'] = ResolversParentTypes['UserTeam']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['MemberRole']>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  teamId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Auth?: AuthResolvers<ContextType>;
  AuthData?: AuthDataResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  ExtendSession?: ExtendSessionResolvers<ContextType>;
  FieldError?: FieldErrorResolvers<ContextType>;
  Json?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectTeam?: ProjectTeamResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponseMessage?: ResponseMessageResolvers<ContextType>;
  Social?: SocialResolvers<ContextType>;
  Sprint?: SprintResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskAssignee?: TaskAssigneeResolvers<ContextType>;
  TaskCreator?: TaskCreatorResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  UnauthenticatedError?: UnauthenticatedErrorResolvers<ContextType>;
  UnauthorizedError?: UnauthorizedErrorResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
  UserTeam?: UserTeamResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  role?: RoleDirectiveResolver<any, any, ContextType>;
};
