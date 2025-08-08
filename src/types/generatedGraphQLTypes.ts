import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { MyContext } from '../db';
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

export type AssignIssueInput = {
  assigneeId: Scalars['ID']['input'];
  issueId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
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
  profile?: Maybe<Profile>;
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type CreateIssueInput = {
  assigneeId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['DateTime']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
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
  assignee?: Maybe<IssueAssignee>;
  childrens?: Maybe<Array<Maybe<Issue>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<IssueCreator>;
  creatorId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  parent?: Maybe<Issue>;
  parentId?: Maybe<Scalars['String']['output']>;
  projectId?: Maybe<Scalars['String']['output']>;
  sprintId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<IssueStatus>;
  title: Scalars['String']['output'];
  type?: Maybe<IssueType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type IssueAssignee = {
  __typename?: 'IssueAssignee';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type IssueCreator = {
  __typename?: 'IssueCreator';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
};

export type IssueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<IssueType>;
};

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
  password: Scalars['Password']['input'];
};

export type MemberRole =
  | 'Admin'
  | 'Contributor'
  | 'Viewer';

export type Mutation = {
  __typename?: 'Mutation';
  addIssueInSprint?: Maybe<ResponseMessage>;
  addProjectTeam?: Maybe<ResponseMessage>;
  addTeamMember: Team;
  assineIssue: ResponseMessage;
  createIssue: ResponseMessage;
  createProject: Project;
  createSprint: ResponseMessage;
  createTeam: Team;
  login: AuthData;
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
  updateIssueStatus: ResponseMessage;
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


export type MutationUpdateIssueStatusArgs = {
  issueId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
  status: IssueStatus;
};


export type MutationVerifyUserArgs = {
  token: Scalars['String']['input'];
};

export type Project = {
  __typename?: 'Project';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  issues?: Maybe<Array<Maybe<Issue>>>;
  key: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  sprints?: Maybe<Array<Maybe<Sprint>>>;
  status?: Maybe<ProjectStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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
  getProjectTeamsMembers?: Maybe<Array<Maybe<User>>>;
  getRecentProject?: Maybe<Project>;
  getSprintById: Sprint;
  getTeamById: Team;
  getUserById: User;
  getUserInfo?: Maybe<User>;
};


export type QueryGetActiveSprintArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetAllIssuesArgs = {
  projectId: Scalars['ID']['input'];
  sprintId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllSprintsArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryGetAllTeamsArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetIssueByIdArgs = {
  issueId: Scalars['ID']['input'];
};


export type QueryGetProjectArgs = {
  projectId?: InputMaybe<Scalars['String']['input']>;
  projectKey?: InputMaybe<Scalars['String']['input']>;
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
  email?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
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
  issues?: Maybe<Array<Maybe<Issue>>>;
  key: Scalars['String']['output'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<SprintStatus>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SprintStatus =
  | 'ACTIVE'
  | 'COMPLETE'
  | 'PLANNED';

export type Team = {
  __typename?: 'Team';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creatorId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<Project>>>;
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

export type User = {
  __typename?: 'User';
  assignedIssues?: Maybe<Array<Maybe<Issue>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdIssues?: Maybe<Array<Maybe<Issue>>>;
  createdTeams?: Maybe<Array<Maybe<Team>>>;
  email?: Maybe<Scalars['EmailAddress']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  projects?: Maybe<Array<Maybe<Project>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
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
  role: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};

export type Profile = {
  __typename?: 'profile';
  avatar?: Maybe<Scalars['String']['output']>;
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
  Error: ( UnauthenticatedError ) | ( UnauthorizedError );
  FieldError: never;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AssignIssueInput: AssignIssueInput;
  Auth: ResolverTypeWrapper<Auth>;
  AuthData: ResolverTypeWrapper<AuthData>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateIssueInput: CreateIssueInput;
  CreateProjectInput: CreateProjectInput;
  CreateSprintInput: CreateSprintInput;
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
  Issue: ResolverTypeWrapper<Issue>;
  IssueAssignee: ResolverTypeWrapper<IssueAssignee>;
  IssueCreator: ResolverTypeWrapper<IssueCreator>;
  IssueInput: IssueInput;
  IssueStatus: IssueStatus;
  IssueType: IssueType;
  Json: ResolverTypeWrapper<Scalars['Json']['output']>;
  LoginInput: LoginInput;
  MemberRole: MemberRole;
  Mutation: ResolverTypeWrapper<{}>;
  Name: ResolverTypeWrapper<Scalars['Name']['output']>;
  Password: ResolverTypeWrapper<Scalars['Password']['output']>;
  Project: ResolverTypeWrapper<Project>;
  ProjectStatus: ProjectStatus;
  ProjectTeam: ResolverTypeWrapper<ProjectTeam>;
  Query: ResolverTypeWrapper<{}>;
  ResponseMessage: ResolverTypeWrapper<ResponseMessage>;
  SignupInput: SignupInput;
  Social: ResolverTypeWrapper<Social>;
  Sprint: ResolverTypeWrapper<Sprint>;
  SprintStatus: SprintStatus;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Team: ResolverTypeWrapper<Team>;
  UnauthenticatedError: ResolverTypeWrapper<UnauthenticatedError>;
  UnauthorizedError: ResolverTypeWrapper<UnauthorizedError>;
  User: ResolverTypeWrapper<User>;
  UserTeam: ResolverTypeWrapper<UserTeam>;
  addIssueInput: AddIssueInput;
  addProjectTeamInput: AddProjectTeamInput;
  addTeamMemberInput: AddTeamMemberInput;
  profile: ResolverTypeWrapper<Profile>;
  removeIssueInput: RemoveIssueInput;
  removeSprintInput: RemoveSprintInput;
  removeTeamMemberInput: RemoveTeamMemberInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AssignIssueInput: AssignIssueInput;
  Auth: Auth;
  AuthData: AuthData;
  Boolean: Scalars['Boolean']['output'];
  CreateIssueInput: CreateIssueInput;
  CreateProjectInput: CreateProjectInput;
  CreateSprintInput: CreateSprintInput;
  CreateTeamInput: CreateTeamInput;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  Error: ResolversInterfaceTypes<ResolversParentTypes>['Error'];
  ExtendSession: ExtendSession;
  FieldError: ResolversInterfaceTypes<ResolversParentTypes>['FieldError'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Issue: Issue;
  IssueAssignee: IssueAssignee;
  IssueCreator: IssueCreator;
  IssueInput: IssueInput;
  Json: Scalars['Json']['output'];
  LoginInput: LoginInput;
  Mutation: {};
  Name: Scalars['Name']['output'];
  Password: Scalars['Password']['output'];
  Project: Project;
  ProjectTeam: ProjectTeam;
  Query: {};
  ResponseMessage: ResponseMessage;
  SignupInput: SignupInput;
  Social: Social;
  Sprint: Sprint;
  String: Scalars['String']['output'];
  Team: Team;
  UnauthenticatedError: UnauthenticatedError;
  UnauthorizedError: UnauthorizedError;
  User: User;
  UserTeam: UserTeam;
  addIssueInput: AddIssueInput;
  addProjectTeamInput: AddProjectTeamInput;
  addTeamMemberInput: AddTeamMemberInput;
  profile: Profile;
  removeIssueInput: RemoveIssueInput;
  removeSprintInput: RemoveSprintInput;
  removeTeamMemberInput: RemoveTeamMemberInput;
};

export type AuthDirectiveArgs = { };

export type AuthDirectiveResolver<Result, Parent, ContextType = MyContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RoleDirectiveArgs = {
  requires?: Maybe<MemberRole>;
};

export type RoleDirectiveResolver<Result, Parent, ContextType = MyContext, Args = RoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authData?: Resolver<Maybe<ResolversTypes['AuthData']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiresIn?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthDataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['profile']>, ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
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
  assignee?: Resolver<Maybe<ResolversTypes['IssueAssignee']>, ParentType, ContextType>;
  childrens?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['IssueCreator']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sprintId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['IssueStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['IssueType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueAssigneeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['IssueAssignee'] = ResolversParentTypes['IssueAssignee']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['profile']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueCreatorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['IssueCreator'] = ResolversParentTypes['IssueCreator']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Json'], any> {
  name: 'Json';
}

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addIssueInSprint?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationAddIssueInSprintArgs, 'input'>>;
  addProjectTeam?: Resolver<Maybe<ResolversTypes['ResponseMessage']>, ParentType, ContextType, RequireFields<MutationAddProjectTeamArgs, 'input'>>;
  addTeamMember?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationAddTeamMemberArgs, 'input'>>;
  assineIssue?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationAssineIssueArgs, 'input'>>;
  createIssue?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationCreateIssueArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  createSprint?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationCreateSprintArgs, 'input'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'input'>>;
  login?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
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
  updateIssueStatus?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationUpdateIssueStatusArgs, 'issueId' | 'projectId' | 'status'>>;
  verifyUser?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<MutationVerifyUserArgs, 'token'>>;
};

export interface NameScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Name'], any> {
  name: 'Name';
}

export interface PasswordScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Password'], any> {
  name: 'Password';
}

export type ProjectResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sprints?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sprint']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ProjectStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
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
  getAllIssues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType, RequireFields<QueryGetAllIssuesArgs, 'projectId'>>;
  getAllProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  getAllSprints?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sprint']>>>, ParentType, ContextType, RequireFields<QueryGetAllSprintsArgs, 'projectId'>>;
  getAllTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<QueryGetAllTeamsArgs, 'name'>>;
  getAllUserTeams?: Resolver<Array<Maybe<ResolversTypes['UserTeam']>>, ParentType, ContextType>;
  getIssueById?: Resolver<ResolversTypes['Issue'], ParentType, ContextType, RequireFields<QueryGetIssueByIdArgs, 'issueId'>>;
  getProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, Partial<QueryGetProjectArgs>>;
  getProjectTeamsMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryGetProjectTeamsMembersArgs, 'projectId'>>;
  getRecentProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  getSprintById?: Resolver<ResolversTypes['Sprint'], ParentType, ContextType, RequireFields<QueryGetSprintByIdArgs, 'id' | 'projectId'>>;
  getTeamById?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<QueryGetTeamByIdArgs, 'teamId'>>;
  getUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<QueryGetUserByIdArgs>>;
  getUserInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type ResponseMessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ResponseMessage'] = ResolversParentTypes['ResponseMessage']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Social'] = ResolversParentTypes['Social']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SprintResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Sprint'] = ResolversParentTypes['Sprint']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['SprintStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
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
  assignedIssues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdIssues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Issue']>>>, ParentType, ContextType>;
  createdTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['EmailAddress']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['profile']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
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

export type ProfileResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['profile'] = ResolversParentTypes['profile']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  Auth?: AuthResolvers<ContextType>;
  AuthData?: AuthDataResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  ExtendSession?: ExtendSessionResolvers<ContextType>;
  FieldError?: FieldErrorResolvers<ContextType>;
  Issue?: IssueResolvers<ContextType>;
  IssueAssignee?: IssueAssigneeResolvers<ContextType>;
  IssueCreator?: IssueCreatorResolvers<ContextType>;
  Json?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Name?: GraphQLScalarType;
  Password?: GraphQLScalarType;
  Project?: ProjectResolvers<ContextType>;
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
  profile?: ProfileResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = MyContext> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  role?: RoleDirectiveResolver<any, any, ContextType>;
};
