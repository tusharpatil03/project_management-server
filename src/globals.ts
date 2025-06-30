import 'dotenv/config';

export const DATABASE_URL = process.env.DATABASE_URL;
export const SEVER_PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const UNAUTHORIZED_USER = Object.freeze({
    code: "user.unauthorized",
    message: "UnauthorizedError"
})

export const UNAUTHENTICATED_ERROR = Object.freeze({
    MESSAGE: "UnauthenticatedError",
    CODE: "user.notAuthenticated",
});


export const ALREADY_PART_OF_SPRINT = Object.freeze({
    MESSAGE: "issue is already in sprint",
    CODE: "sprint.issueAlreadyPresent",
})

export const  SPRINT_NOT_FOUND = Object.freeze({
    MESSAGE: "sprint not found",
    CODE: "sprint.notFound"
})

export const  ISSUE_NOT_FOUND = Object.freeze({
    MESSAGE: "issue not found",
    CODE: "issue.notFound"
})

export const  SPRINT_FAILED_TO_UPDATE = Object.freeze({
    MESSAGE: "sprint failed to update",
    CODE: "sprint.updateFailed"
})

export const TEAM_NOT_FOUND = Object.freeze({
    MESSAGE: "team not found",
    CODE: "team.notFound"
})


export const MEMEBER_NOT_FOUND_ERROR = Object.freeze({
    MESSAGE: "team member not found",
    CODE: "team.member.notFound"
})

export const ALREADY_MEMBER_OF_TEAM = Object.freeze({
    MESSAGE: "already member of team",
    CODE: "team.member.alreadyExist"
})

export const ASSIGNEE_NOT_FOUND = Object.freeze({
    MESSAGE: "Assignee not found",
    CODE: "assignee.notFound"
});

export const PROJECT_NOT_FOUND = Object.freeze({
    MESSAGE: "Project not found",
    CODE: "project.notFound"
});

export const ALREADY_ASSIGNED_ISSUE = Object.freeze({
    MESSAGE: "Issue is already assigned to this user",
    CODE: "issue.alreadyAssigned"
});

export const ASSIGNEE_NOT_MEMBER = Object.freeze({
    MESSAGE: "Assignee is not a member of the project",
    CODE: "assignee.notMember"
});

export const ASSIGNEE_NOT_CONTRIBUTOR = Object.freeze({
    MESSAGE: "Assignee is not a contributor of this project",
    CODE: "assignee.notContributor"
});

export const INVALID_ISSUE_TYPE = Object.freeze({
    MESSAGE: "Issue types Epic and Story can not be Assigned",
    CODE: "issue.invalidType"
});