# Contributing to Edtr.io

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Edtr.io. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## How Can I Contribute?

### Reporting Bugs
If you find a bug, please [file an issue on GitHub](https://github.com/schul-cloud/edtrio/issues/new) that gives information on how to reproduce the bug.

### Suggesting enhancements
Enhancement suggestions are tracked as GitHub issues. [Create an issue](https://github.com/schul-cloud/edtrio/issues/new) and provide the following information:

* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most Atom users and isn't something that can or should be implemented as a [community package](#atom-and-packages).
* **List some other editors or applications where this enhancement exists.**

## Styleguides

### Git Commit Messages
* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with a [gitmoji](https://gitmoji.carloscuesta.me/):
    * :art: `:art:` when improving the format/structure of the code
    * :zap: `:zap:` when improving performance
    * :fire: `:fire:` when removing code or files
    * ...
    * For a full list have a look at the [Gitmoji Overview](https://gitmoji.carloscuesta.me/)

### Branching Workflow
This project relies on a loose [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

It basically works as such: All changes are done inside `feature` branches which then get squash-merged into the `development` branch upon completion.

Version-tagged releases are then merged into `master`.

### Naming Branches
Branches should be named `feature/#<issue>-<name>` or `fix/#<issue>-<name>`. E.g. `feature/#12-save-button` or `fix/#42-fix-popup`.
