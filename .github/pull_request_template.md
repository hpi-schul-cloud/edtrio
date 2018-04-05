## Pull Request template
Please, go through these steps before you submit a PR.

1. Make sure that your PR is not a duplicate.
2. If not, then make sure that:

  2.1. You have done your changes in a separate branch. Branches MUST have descriptive names that start with either the `fix/` or `feature/` prefixes. Good examples are: `fix/#12-signin-issue` or `feature/#4-repo-maintenance`.

  2.2. You have a [descriptive commit message](https://chris.beams.io/posts/git-commit/) with a short title (first line). The commit message should start with a [Gitmoji](gitmoji.carloscuesta.me)

  2.3. You have only one commit (if not, squash them into one commit).

  2.4. `npm test` doesn't throw any error. If it does, fix them first and amend your commit (`git commit --amend`).

3. **After** these steps, you're ready to open a pull request.

  3.1. Your pull request MUST NOT target the `master` branch on this repository. You probably want to target `staging` instead.

  3.2. Give a descriptive title to your PR.

  3.3. Provide a description of your changes.

  3.4. Put `Fixes #XXXX` in your comment to auto-close the issue that your PR fixes (if such).

IMPORTANT: Please review the [CONTRIBUTING.md](../CONTRIBUTING.md) file for detailed contributing guidelines.

**PLEASE REMOVE THIS TEMPLATE BEFORE SUBMITTING**
