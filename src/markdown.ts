import { IWorkflowReporter } from "./model/workflow-reporter";
import { IReporterStat, IWorkflowStat, IJobStat, IStepStat } from "./model/stats";

export function commentBody(pr_creator: string,  stats: IReporterStat, config: IWorkflowReporter): string {
    let comment = "";
  
    let { workflowStat, jobStat, stepStat } = stats;
  
    // Get Header
    comment += getHeaderMarkdown(pr_creator, config.salutation, config.body);
  
    if (config.workflowStat) {
      comment += getWorkflowStatMarkdown(workflowStat);
    }
  
    if (config.jobStat) {
      comment += getJobStatMarkdown(jobStat);
    }
  
    comment +=
      getStepStatMarkdown(stepStat) + getReportMessageMarkdown(config, stats);
  
    return comment;
}
  
function getHeaderMarkdown(pr_creator: string, salutation: string, body: string): string {
    return `<p>${salutation} @${pr_creator},</br>
${body}</p>

<h4>Details:</h4>`;
}
  
function getWorkflowStatMarkdown(workflow_stat: IWorkflowStat): string {
    return `<details>
<summary>Workflow</summary>

- Name: **${workflow_stat["name"]}**
- Path: [${workflow_stat["path"]}](${workflow_stat["path"]})
- Workflow URL: ${workflow_stat["workflowUrl"]}
- Run number: ${workflow_stat["runNumber"]}
- Status: ${getStatusMarkdown(workflow_stat["status"])}
- Conclusion: ${getConclusionMarkdown(workflow_stat["conclusion"])}

</details>`;
}
  
function getJobStatMarkdown(job_stat: IJobStat): string {
    return `<details>
<summary>Job</summary>

- Name: **${job_stat["name"]}**
- Status: ${getStatusMarkdown(job_stat["status"])}
- Conclusion: ${getConclusionMarkdown(job_stat["conclusion"])}

</details>`;
}
  
function getStepStatMarkdown(step_stat: IStepStat) : string {
    return `<details open>
<summary>Step</summary>

- Name: **${step_stat["name"]}**
- Status: ${getStatusMarkdown(step_stat["status"])}
- Conclusion: ${getConclusionMarkdown(step_stat["conclusion"])}

</details>`;
}

function getReportMessageMarkdown(config: IWorkflowReporter, stats: IReporterStat) : string {
    return `<h4>Report:</h4>
<p>${getReportMessage(config, stats)}</p>`;
}
  
function getReportMessage(config: IWorkflowReporter, stats: IReporterStat) : string {
    /*
        [workflow-reporter.yml]

        workflows:
            - name: "test-workflow"
            jobs:
                - name: "test-job"
                steps:
                    - name: "test-step"
                    report: "Reporting Message" 
    */

    let { workflowStat, jobStat, stepStat } = stats;

    let report_message = "";

    config.workflows.forEach((workflow) => {
        if (workflow.name === workflowStat["name"]) {
        workflow.jobs.forEach((job) => {
            if (job.name === jobStat["name"]) {
            job.steps.forEach((step) => {
                if (step.name === stepStat["name"]) {
                report_message = step.report;
                }
            });
            }
        });
        }
    });

    return report_message === "" ? "No Report Message!" : report_message;
}

function getStatusMarkdown(status?: string) : string {
    return `✅ <span style="color:green">${status}</span>`;
}

function getConclusionMarkdown(conclusion?: string) : string {
    return `❌ <span style="color:red">${conclusion}</span>`;
}

  