const core = require('@actions/core');
const run = require('./run');

const NODE_ENV = process.env['NODE_ENV'];

// If you want to run it locally, set the environment variables like `$ export GITHUB_TOKEN=<your token>`
const GITHUB_TOKEN = process.env['GITHUB_TOKEN'];

let input;
if (NODE_ENV != 'local') {
  input = {
    assignees: core.getInput('assignees'),
    excludeAssignees: core.getInput('exclude-assignees'),
    reviewers: core.getInput('reviewers'),
    maxNumOfReviewers: core.getInput('max-num-of-reviewers'),
    draftKeyword: core.getInput('draft-keyword'),
    readyComment: core.getInput('ready-comment'),
    mergedComment: core.getInput('merged-comment'),
    githubToken: core.getInput('github-token'),
    eventJson: core.getInput('event-json'),
  };
} else {
  event = {
    action: 'opened',
    changes: {
      title: {
        from: 'this is pre title'
      }
    },
    pull_request: {
      draft: false,
      number: 1,
      state: 'open',
      title: 'this is title',
      merged: false,
      user: {
        login: 'hkusu',
      },
    },
    repository: {
      full_name: 'hkusu/review-assign-action',
    },
  };
  input = {
    assignees: 'hkusu',
    excludeAssignees: '',
    reviewers: 'hkusu, foo, bar',
    maxNumOfReviewers: '2',
    draftKeyword: 'wip',
    readyComment: 'Ready for Review :rocket: `<reviewers>`',
    mergedComment: 'Thanks for your review :smiley: `<reviewers>`',
    githubToken: GITHUB_TOKEN,
    eventJson: JSON.stringify(event),
  };
}

run(input)
  .then(result => {
    core.setOutput('result', 'success');
  })
  .catch(error => {
    core.setOutput('result', 'failure');
    core.setFailed(error.message);
  });