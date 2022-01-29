import { Probot, Context } from "probot";

import { commentBody } from "./markdown";

import { IWorkflowReporter } from "./model/workflow-reporter";
import { IReporterStat, IWorkflowStat, IJobStat, IStepStat } from "./model/stats";

export = (app: Probot) => {
  // When app gets loaded
  app.log.info("workflow-reporter on task");

  const config_file: string = "workflow-reporter.yml";
  let default_config: IWorkflowReporter = {
    workflowStat: true,
    jobStat: true,
    salutation: "Hi",
    body: "",
    workflows: []
  };

  let workflow_stat: IWorkflowStat = {};
  let job_stat: IJobStat = {};
  let step_stat: IStepStat = {};

  app.on("issues.opened", async (context: Context<"issues.opened">) => {
    console.log("event:", context.name);
  });

  app.on("issue_comment.created", async (context: Context<"issue_comment.created">) => {
    console.log("event:", context.name);
  });

  app.on("workflow_job.completed", async (context: Context<"workflow_job.completed">) => {
    let payload = context.payload.workflow_job;

    if (payload.conclusion === "failure") {
      // Building job stat map
      job_stat["name"] = payload.name;
      job_stat["status"] = payload.status;
      job_stat["conclusion"] = payload.conclusion;

      // Clear with every new workflow_job completed event
      step_stat = {};

      // we get the workflow steps from "workflow_job.completed" event
      let workflow_steps = payload.steps;

      // for each step in steps list
      workflow_steps.forEach((step) => {
        if (step.conclusion === "failure") {
          // Building step map
          step_stat["name"] = step.name;
          step_stat["status"] = step.status;
          step_stat["conclusion"] = step.conclusion;
        }
      });
    }
  });


  app.on("workflow_run.completed", async (context: Context<"workflow_run.completed">) => {
    try {
      workflow_stat = {};

      let payload = context.payload.workflow_run;
      let workflow_conclusion = payload.conclusion;
      console.log("workflow run conclusion: ", workflow_conclusion);

      if (workflow_conclusion === "failure") {
        // Get the event from "workflow_run.completed" payload
        let workflow_event = payload.event;
        // Get the conclusion from "workflow_run.completed" payload
        console.log("workflow run event: ", workflow_event);

        // Create a comment on the pull request number,
        // if the event on which the workflow run was triggered is "pull_request".
        if (workflow_event === "pull_request") {
          // Build workflow_stat map
          workflow_stat["name"] = payload.name;
          workflow_stat["status"] = payload.status;
          workflow_stat["conclusion"] = payload.conclusion;
          workflow_stat["path"] = context.payload.workflow.path;
          workflow_stat["workflowUrl"] = payload.html_url;
          workflow_stat["runNumber"] = payload.run_number;

          // Get owner and repo from the context
          let { owner, repo } = context.repo();

          // Get pull request number from the payload
          var pr_number: number = payload.pull_requests[0].number;
          console.log("Pull Request number: ", pr_number);

          // Get the pull request from context
          let pr = await context.octokit.pulls.get({
            owner,
            repo,
            pull_number: pr_number,
          });

          // Get the pull request creator
          let pr_creator: string = pr.data.user!.login;

          // Get the configuration file
          const config = await context.config<IWorkflowReporter>(config_file, default_config);

          // Create comment on the pull request number
          let stats: IReporterStat = {
            workflowStat: workflow_stat,
            jobStat: job_stat,
            stepStat: step_stat,
          };

          await context.octokit.issues
            .createComment({
              owner,
              repo,
              issue_number: +pr_number,
              body: commentBody(pr_creator, stats, config ?? ({} as IWorkflowReporter)),
            })
            .finally(() => {
              workflow_stat = {};
              job_stat = {};
              step_stat = {};
            });
        }
      }
    } catch (err) {
      console.log("Error Caught: ", err);
    }
  });
};
