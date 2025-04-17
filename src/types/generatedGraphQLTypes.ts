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
  DateTime: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
};

export type AssignTaskInput = {
  assignee: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};

export type AuthData = {
  __typename?: 'AuthData';
  accessToken: Scalars['String']['output'];
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
};

export type CreateProjectInput = {
  description: Scalars['String']['input'];
  goal?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  plan?: InputMaybe<Scalars['String']['input']>;
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
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type CreateTeamInput = {
  creatorId: Scalars['ID']['input'];
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name: Scalars['String']['input'];
};

export type Error = {
  message: Scalars['String']['output'];
};

export type FieldError = {
  message: Scalars['String']['output'];
  path: Array<Scalars['String']['output']>;
};

export type Gender =
  | 'Female'
  | 'Male'
  | 'Other';

export type Mutation = {
  __typename?: 'Mutation';
  assineTask: ResponseMessage;
  createProject: Project;
  createSprint: Sprint;
  createTask: Task;
  createTeam: Team;
  removeProject?: Maybe<ResponseMessage>;
  removeSprint?: Maybe<ResponseMessage>;
  removeTask?: Maybe<ResponseMessage>;
  signin: AuthData;
  signup: AuthData;
  updateTaskStatus: ResponseMessage;
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


export type MutationSigninArgs = {
  input: AuthInput;
};


export type MutationSignupArgs = {
  input: AuthInput;
};


export type MutationUpdateTaskStatusArgs = {
  status: TaskStatus;
  taskId: Scalars['ID']['input'];
};

export type Project = {
  __typename?: 'Project';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator: User;
  description: Scalars['String']['output'];
  goal?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  plan?: Maybe<Scalars['String']['output']>;
  sprints?: Maybe<Array<Maybe<Sprint>>>;
  status: ProjectStatus;
  tasks?: Maybe<Array<Maybe<Task>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProjectStatus =
  | 'Active'
  | 'Cancelled'
  | 'Completed'
  | 'OnHold';

export type Query = {
  __typename?: 'Query';
  getAllProjects?: Maybe<Array<Maybe<Project>>>;
  getAllSprints: Array<Maybe<Sprint>>;
  getAllTasks: Array<Maybe<Task>>;
  getProjectById: Project;
  getSprintById: Sprint;
  getTaskById: Task;
  getTeamById: Team;
  getUserById: UserProfile;
};


export type QueryGetAllSprintsArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetAllTasksArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetSprintByIdArgs = {
  id: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type QueryGetTaskByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTeamByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
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

export type Social = {
  __typename?: 'Social';
  facebook?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
};

export type Sprint = {
  __typename?: 'Sprint';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creatorId: User;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  project?: Maybe<Project>;
  status?: Maybe<SprintStatus>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SprintStatus =
  | 'Active'
  | 'Cancelled'
  | 'Completed'
  | 'Planned';

export type Task = {
  __typename?: 'Task';
  assignee?: Maybe<User>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator: User;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  project?: Maybe<Project>;
  sprint?: Maybe<Sprint>;
  status?: Maybe<TaskStatus>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TaskStatus =
  | 'DONE'
  | 'IN_PROGRESS'
  | 'TODO';

export type Team = {
  __typename?: 'Team';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator: User;
  id: Scalars['ID']['output'];
  members?: Maybe<Array<Maybe<User>>>;
  name: Scalars['String']['output'];
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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdTasks?: Maybe<Array<Maybe<Task>>>;
  createdTeams?: Maybe<Array<Maybe<Team>>>;
  email?: Maybe<Scalars['EmailAddress']['output']>;
  id: Scalars['ID']['output'];
  projects?: Maybe<Array<Maybe<Project>>>;
  sprints?: Maybe<Array<Maybe<Sprint>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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
  AuthData: ResolverTypeWrapper<AuthData>;
  AuthInput: AuthInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateProjectInput: CreateProjectInput;
  CreateSprintInput: CreateSprintInput;
  CreateTaskInput: CreateTaskInput;
  CreateTeamInput: CreateTeamInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Error']>;
  FieldError: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['FieldError']>;
  Gender: Gender;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Project: ResolverTypeWrapper<Project>;
  ProjectStatus: ProjectStatus;
  Query: ResolverTypeWrapper<{}>;
  ResponseMessage: ResolverTypeWrapper<ResponseMessage>;
  Role: Role;
  Social: ResolverTypeWrapper<Social>;
  Sprint: ResolverTypeWrapper<Sprint>;
  SprintStatus: SprintStatus;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  TaskStatus: TaskStatus;
  Team: ResolverTypeWrapper<Team>;
  UnauthenticatedError: ResolverTypeWrapper<UnauthenticatedError>;
  UnauthorizedError: ResolverTypeWrapper<UnauthorizedError>;
  User: ResolverTypeWrapper<User>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AssignTaskInput: AssignTaskInput;
  AuthData: AuthData;
  AuthInput: AuthInput;
  Boolean: Scalars['Boolean']['output'];
  CreateProjectInput: CreateProjectInput;
  CreateSprintInput: CreateSprintInput;
  CreateTaskInput: CreateTaskInput;
  CreateTeamInput: CreateTeamInput;
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  Error: ResolversInterfaceTypes<ResolversParentTypes>['Error'];
  FieldError: ResolversInterfaceTypes<ResolversParentTypes>['FieldError'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Project: Project;
  Query: {};
  ResponseMessage: ResponseMessage;
  Social: Social;
  Sprint: Sprint;
  String: Scalars['String']['output'];
  Task: Task;
  Team: Team;
  UnauthenticatedError: UnauthenticatedError;
  UnauthorizedError: UnauthorizedError;
  User: User;
  UserProfile: UserProfile;
};

export type AuthDirectiveArgs = { };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RoleDirectiveArgs = {
  requires?: Maybe<Role>;
};

export type RoleDirectiveResolver<Result, Parent, ContextType = any, Args = RoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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

export type FieldErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldError'] = ResolversParentTypes['FieldError']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  assineTask?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationAssineTaskArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  createSprint?: Resolver<ResolversTypes['Sprint'], ParentType, ContextType, RequireFields<MutationCreateSprintArgs, 'input'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'input'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'input'>>;
  removeProject?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveProjectArgs, 'projectId'>>;
  removeSprint?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveSprintArgs, 'projectId' | 'sprintId'>>;
  removeTask?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationRemoveTaskArgs, 'projectId' | 'taskId'>>;
  signin?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<MutationSigninArgs, 'input'>>;
  signup?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  updateTaskStatus?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationUpdateTaskStatusArgs, 'status' | 'taskId'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  goal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plan?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sprints?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sprint']>>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ProjectStatus'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  getAllSprints?: Resolver<Array<Maybe<ResolversTypes['Sprint']>>, ParentType, ContextType, RequireFields<QueryGetAllSprintsArgs, 'projectId'>>;
  getAllTasks?: Resolver<Array<Maybe<ResolversTypes['Task']>>, ParentType, ContextType, RequireFields<QueryGetAllTasksArgs, 'projectId'>>;
  getProjectById?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryGetProjectByIdArgs, 'id'>>;
  getSprintById?: Resolver<ResolversTypes['Sprint'], ParentType, ContextType, RequireFields<QueryGetSprintByIdArgs, 'id' | 'projectId'>>;
  getTaskById?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<QueryGetTaskByIdArgs, 'id'>>;
  getTeamById?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<QueryGetTeamByIdArgs, 'id'>>;
  getUserById?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
};

export type ResponseMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseMessage'] = ResolversParentTypes['ResponseMessage']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialResolvers<ContextType = any, ParentType extends ResolversParentTypes['Social'] = ResolversParentTypes['Social']> = {
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SprintResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sprint'] = ResolversParentTypes['Sprint']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['SprintStatus']>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  assignee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  sprint?: Resolver<Maybe<ResolversTypes['Sprint']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TaskStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdTasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  createdTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['EmailAddress']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  sprints?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sprint']>>>, ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthData?: AuthDataResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  FieldError?: FieldErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponseMessage?: ResponseMessageResolvers<ContextType>;
  Social?: SocialResolvers<ContextType>;
  Sprint?: SprintResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  UnauthenticatedError?: UnauthenticatedErrorResolvers<ContextType>;
  UnauthorizedError?: UnauthorizedErrorResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  role?: RoleDirectiveResolver<any, any, ContextType>;
};
