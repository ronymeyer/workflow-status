import * as core from '@actions/core';
import * as github from '@actions/github';
import {
  getFirst,
  getOptionalInput,
  getOwnerAndRepo,
  getRepository,
  logWarning,
  waitTime
} from './utils';

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', {required: true});
    const workflow = core.getInput('workflow', {required: true});
    const branch = core.getInput('branch');
    const event = getOptionalInput('event');
    const wait = core.getBooleanInput('wait');
    let fullRepo = getOptionalInput('repo');
    if (fullRepo === undefined) {
      fullRepo = getRepository();
    }

    const [owner, repo] = getOwnerAndRepo(fullRepo);

    core.info(`Checking result of ${workflow} from ${fullRepo}:${branch}`);

    const octokit = github.getOctokit(token);

    let status: string | null = null;
    let conclusion: string | null = null;

    octokit.rest.actions
      .listWorkflowRuns({
        owner,
        repo,
        workflow_id: workflow,
        branch,
        event,
        per_page: 1
      })
      .then(({ data }) => {
        // handle data
        status = data?.status ?? null;
        conclusion = data?.conclusion ?? null;
    });


    if (status !== null && conclusion !== null) {
      core.info(`status: ${status}`);
      core.info(`conclusion: ${conclusion}`);

      core.setOutput('status', status);
      core.setOutput('conclusion', conclusion);
    } else {
      logWarning('Workflow run is missing');
    }
  } catch (err) {
    core.setFailed(`Failed with error: ${err.message}`);
  }
}

run();
