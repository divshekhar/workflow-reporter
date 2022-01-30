<!-- Project Important -->
<div align="center">
<img src="./img/logo.png" alt="Workflow Reporter Logo">
<h1>Workflow Reporter</h1>
</div>

<div align="center">

<img alt="GitHub" src="https://img.shields.io/github/license/divshekhar/workflow-reporter">

<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/divshekhar/workflow-reporter">

<img alt="GitHub package.json dependency version (prod)" src="https://img.shields.io/github/package-json/dependency-version/divshekhar/workflow-reporter/probot">

</div>

<!-- Project Specification -->
<div align="center">

<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/divshekhar/workflow-reporter"> 

<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/divshekhar/workflow-reporter"> 


<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/divshekhar/workflow-reporter">


<img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/divshekhar/workflow-reporter"> 

<img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/divshekhar/workflow-reporter">

</div>

<!-- Repository Stats -->
<div align="center">
<img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/divshekhar"> 

<img alt="GitHub all releases" src="https://img.shields.io/github/downloads/divshekhar/workflow-reporter/total"> 

<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/divshekhar/workflow-reporter">

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/divshekhar/workflow-reporter?style=social">
</div>

</br>

> A GitHub App built with [Probot](https://github.com/probot/probot) that reports failed workflow job actions and notify the pull request creator with custom report message for the failed workflow job step.

## Purpose

Do you have hard time **notifying the pull request creator** about what went wrong with the **workflow job step** and **how to fix it**? If yes, workflow reporter is there for you to automate this process.

Workflow Reporter will automatically tag the pull request creator and notify about the failed workflow job step with your custom report message for the failed job step.

### Demo

<div align="center"> 

<img src="./img/workflow-reporter-comment.png" alt="Workflow Reporter Github app">

</div>

Workflow reporter also provides necessary information about the workflow, job and the step on which the github action failed.

Setup your workflow reporter now!

## Setup

Install the app on GitHub repository from GitHub Marketplace.

Add a `.github/workflow-reporter.yml` file to your repository and then run the bot against it.

If the workflow-reporter file is empty or doesn't exist, the bot will not run.

```yml
# Receive the workflow stats
workflowStat: true

# Receive the workflow job stats
jobStat: true

# Salutation for the user
# Eg. Hello @divshekhar, / Hi @divshekhar,
salutation: Hello

# Custom body message
# This will come after salutation
body: The continuous integration workflow has failed. It is requested to look after the issue and create a new PR.

workflows:
  - name: CI
    jobs:
      - name: build
        steps:
          - name: Install Dependencies
            # custom report message when the check check fails on this step
            report: Check if syntax in the dependency file is correct.

          - name: Check Code Formatting
            # custom report message when the check check fails on this step
            report: The code formatting check has failed. Run `flutter format --set-exit-if-changed lib` and remove the formatting issue.
```

## Development Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Contributing

If you have suggestions for how workflow-reporter could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Chat

<img alt="Discord" src="https://img.shields.io/discord/781027163377238037">

Join our Discord server to become a part of our developer community!

## Social

<img alt="GitHub followers" src="https://img.shields.io/github/followers/divshekhar?style=social">

<img alt="Twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fdshekhar17">

## License

[ISC](LICENSE) © 2022 Divyanshu Shekhar.
