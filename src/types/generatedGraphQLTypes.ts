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
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type CreateProjectInput = {
  creatorId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  goal?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  plan?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSprintInput = {
  creatorId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['DateTime']['input'];
  projectId: Scalars['ID']['input'];
  status?: InputMaybe<SprintStatus>;
  tasks?: InputMaybe<Array<Scalars['ID']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateTaskInput = {
  assigneeId?: InputMaybe<Scalars['ID']['input']>;
  creatorId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectId: Scalars['ID']['input'];
  sprintId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TaskStatus>;
  title: Scalars['String']['input'];
};

export type CreateTeamInput = {
  creatorId: Scalars['ID']['input'];
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assineTask: ResponseMessage;
  createProject: Project;
  createSprint: Sprint;
  createTask: Task;
  createTeam: Team;
  registerUser: ResponseMessage;
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


export type MutationRegisterUserArgs = {
  input: UserRegisterInput;
};


export type MutationUpdateTaskStatusArgs = {
  status: TaskStatus;
  taskId: Scalars['ID']['input'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator: User;
  description: Scalars['String']['output'];
  goal?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  plan?: Maybe<Scalars['String']['output']>;
  sprints?: Maybe<Array<Maybe<Sprint>>>;
  status?: Maybe<ProjectStatus>;
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
  getUserById: User;
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
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Role =
  | 'Admin'
  | 'User';

export type Sprint = {
  __typename?: 'Sprint';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creatorId: User;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  project?: Maybe<Project>;
  status?: Maybe<SprintStatus>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SprintStatus =
  | 'Active'
  | 'Cancelled'
  | 'Completed'
  | 'Planned';

export type Task = {
  __typename?: 'Task';
  _id: Scalars['ID']['output'];
  assignee?: Maybe<User>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator: User;
  description?: Maybe<Scalars['String']['output']>;
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
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator: User;
  members?: Maybe<Array<Maybe<User>>>;
  name: Scalars['String']['output'];
  projects?: Maybe<Array<Maybe<Project>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type UserRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
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



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AssignTaskInput: AssignTaskInput;
  AuthData: ResolverTypeWrapper<AuthData>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateProjectInput: CreateProjectInput;
  CreateSprintInput: CreateSprintInput;
  CreateTaskInput: CreateTaskInput;
  CreateTeamInput: CreateTeamInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Project: ResolverTypeWrapper<Project>;
  ProjectStatus: ProjectStatus;
  Query: ResolverTypeWrapper<{}>;
  ResponseMessage: ResolverTypeWrapper<ResponseMessage>;
  Role: Role;
  Sprint: ResolverTypeWrapper<Sprint>;
  SprintStatus: SprintStatus;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  TaskStatus: TaskStatus;
  Team: ResolverTypeWrapper<Team>;
  User: ResolverTypeWrapper<User>;
  UserRegisterInput: UserRegisterInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AssignTaskInput: AssignTaskInput;
  AuthData: AuthData;
  Boolean: Scalars['Boolean']['output'];
  CreateProjectInput: CreateProjectInput;
  CreateSprintInput: CreateSprintInput;
  CreateTaskInput: CreateTaskInput;
  CreateTeamInput: CreateTeamInput;
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  Project: Project;
  Query: {};
  ResponseMessage: ResponseMessage;
  Sprint: Sprint;
  String: Scalars['String']['output'];
  Task: Task;
  Team: Team;
  User: User;
  UserRegisterInput: UserRegisterInput;
};

export type AuthDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  assineTask?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationAssineTaskArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  createSprint?: Resolver<ResolversTypes['Sprint'], ParentType, ContextType, RequireFields<MutationCreateSprintArgs, 'input'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'input'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'input'>>;
  registerUser?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  updateTaskStatus?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationUpdateTaskStatusArgs, 'status' | 'taskId'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  goal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plan?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sprints?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sprint']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ProjectStatus']>, ParentType, ContextType>;
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
  getSprintById?: Resolver<ResolversTypes['Sprint'], ParentType, ContextType, RequireFields<QueryGetSprintByIdArgs, 'id'>>;
  getTaskById?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<QueryGetTaskByIdArgs, 'id'>>;
  getTeamById?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<QueryGetTeamByIdArgs, 'id'>>;
  getUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
};

export type ResponseMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseMessage'] = ResolversParentTypes['ResponseMessage']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SprintResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sprint'] = ResolversParentTypes['Sprint']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['SprintStatus']>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  assignee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  sprint?: Resolver<Maybe<ResolversTypes['Sprint']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TaskStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = {
  AuthData?: AuthDataResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponseMessage?: ResponseMessageResolvers<ContextType>;
  Sprint?: SprintResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

