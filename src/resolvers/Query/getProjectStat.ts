import { QueryResolvers } from "../../types/generatedGraphQLTypes";

// this resolver will fetch the project statistics

export const getProjectStat: QueryResolvers["getProjectStat"] = async (
    _,
    args,
    context
) => {
    if (!args.projectId) {
        return {};
    }
    type IssueStat = [
        {
            total_issues: number;
            open_issues: number;
            closed_issues: number;
            in_progress_issues: number;
        },
    ];

    type SprintStat = [
        {
            total_sprints: number;
        },
    ];

    type ActiveSprintIssueStat = [
        {
            active_sprint_total_issues: number;
            active_sprint_open_issues: number;
            active_sprint_closed_issues: number;
            active_sprint_in_progress_issues: number;
        },
    ];

    const issueStats: IssueStat = await context.client.$queryRaw`
        SELECT 
            COUNT(*) as total_issues,
            COUNT(CASE WHEN status = 'TODO' THEN 1 END) as open_issues,
            COUNT(CASE WHEN status = 'DONE' THEN 1 END) as closed_issues,
            COUNT(CASE WHEN status = 'IN_PROGRESS' THEN 1 END) as in_progress_issues
        FROM "issues" 
        WHERE "project_id" = ${args.projectId}
    `;

    const sprintStats: SprintStat = await context.client.$queryRaw`
        SELECT 
            COUNT(*) as total_sprints
        FROM "sprints" 
        WHERE "project_id" = ${args.projectId}
    `;

    const activeSprintIssueStats: ActiveSprintIssueStat = await context.client.$queryRaw<ActiveSprintIssueStat>`
            SELECT 
                COUNT(i.*) as active_sprint_total_issues,
                COUNT(CASE WHEN i.status = 'TODO' THEN 1 END) as active_sprint_open_issues,
                COUNT(CASE WHEN i.status = 'DONE' THEN 1 END) as active_sprint_closed_issues,
                COUNT(CASE WHEN i.status = 'IN_PROGRESS' THEN 1 END) as active_sprint_in_progress_issues
            FROM "issues" i
            INNER JOIN "sprints" s ON i."sprint_id" = s.id
            WHERE s."project_id" = ${args.projectId} 
            AND s.status = 'ACTIVE'
        `;


    return {
        totalIssues: Number(issueStats[0]?.total_issues),
        openIssues: Number(issueStats[0]?.open_issues),
        closedIssues: Number(issueStats[0]?.closed_issues),
        inProgressIssues: Number(issueStats[0]?.in_progress_issues),
        totalSprints: Number(sprintStats[0]?.total_sprints),
        activeSprintStat: {
            totalIssues: Number(activeSprintIssueStats[0]?.active_sprint_total_issues),
            openIssues: Number(activeSprintIssueStats[0]?.active_sprint_open_issues),
            closedIssues: Number(activeSprintIssueStats[0]?.active_sprint_closed_issues),
            inProgressIssues: Number(activeSprintIssueStats[0]?.active_sprint_in_progress_issues)
        }
    };
};
