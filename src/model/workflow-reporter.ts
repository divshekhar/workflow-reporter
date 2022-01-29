// import Joi = require("joi");

/*
[workflow-reporter.yml]

workflowStat: boolean
jobStat: boolean

salutation: string
body: string

workflows: <Workflow>[]
    - name: string
    jobs: <Job>[]
        - name: string
        steps: []
            - name: string
            report: string 
*/

export interface IWorkflowReporter {
    workflowStat: boolean;
    jobStat: boolean;
    salutation: string;
    body: string;
    workflows: IWorkflows[];
}

export interface IWorkflows {
    name: string;
    jobs: IJobs[];
}

export interface IJobs {
    name: string;
    steps: ISteps[];
}

export interface ISteps {
    name: string;
    report: string;
}


// Joi Schema
// export const WRSchema = Joi.object().keys({
//     workflowStat: Joi.boolean().default(true),
//     jobStat: Joi.boolean().default(true),
//     salutation: Joi.string().default("Hi"),
//     body: Joi.string().default(""),
//     workflows: Joi.array().items(
//         Joi.object().keys({
//             name: Joi.string().required(),
//             jobs: Joi.array().items(
//                 Joi.object().keys({
//                     name: Joi.string().required(),
//                     steps: Joi.array().items(
//                         Joi.object().keys({
//                             name: Joi.string().required(),
//                             report: Joi.string().required()
//                         })
//                     )
//                 })
//             )
//         })
//     )
// });
