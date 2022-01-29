export interface IReporterStat {
    workflowStat: IWorkflowStat,
    jobStat: IJobStat,
    stepStat: IStepStat
}

export interface IWorkflowStat {
    name?: string;
    status?: string;
    conclusion?: string;
    path?: string;
    workflowUrl?: string;
    runNumber?: number;
}

export interface IJobStat {
    name?: string;
    status?: string;
    conclusion?: string;
}

export interface IStepStat {
    name?: string;
    status?: string;
    conclusion?: string;
}