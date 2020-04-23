# Description
<!--
  This is a template to give as much as possible Informations to the pull request, to help the person which will do the review and is a checklist for you. Points to recognize are set in the comments, please read and keep them in mind:
  
    - Code should be selfexplain and share your knowlege with others
    - Document code that is not selfexplain
    - Think about Bugs and keep security in mind
    - Write tests (Unit and Integration), also for error cases
    - Main logic should hided behind the api, never trust the client
    - Visibile changes should be discussed with the UX-Team from the begining of Programming, they also have to accept them at the end
    - Keep changes also in changelog
    - Remove not needed lines or set them as comment
-->

## Links to Tickets or other pull requests
<!--
Base Links to copie from
- https://github.com/schul-cloud/schulcloud-server/pull/????
- https://ticketsystem.schul-cloud.org/browse/SC-????
-->

## Changes
<!--
  Short notice if a ticket exists, more detailed if not
-->

[//]: ## Datasecurity
<!--
  Notice about model changes, logging of user data and other user data stuff, should be noticed here. If you are not sure if it is relevant, ask the datasecureity team. 

-->

[//]: ## Deployment
<!--
  Keep in mind to change seed data, if changes are done by migration scripts.
  Changes to the infrastructure have to discussed with the devops

  This point should includes following informations:
  - Envirement variables like FEATURE_XY=true
  - Migration scripts to run, to get it run
-->

[//]: ## New Repos, NPM pakages or vendor scripts
<!--
  Keep in mind the stability, performance, aktivity, actuality and author.

  Discripe why the it is needed.
-->

## Screenshots of changes
<!--
  only needed for visiual stuff
-->

## Approval for review
[ ] All points were discussed with the ticket creator, support-team or product owner. The code resolved all quaility giddeline writen in comments.

> Notice: Please remove the WIP label if the PR is ready to review, otherwise nobody will review it.

## Link to Definiton of Done
More and detailed Informations to the definition of Done are[in Confluence](https://docs.schul-cloud.org/pages/viewpage.action?pageId=92831762)
