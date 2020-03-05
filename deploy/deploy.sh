#! /bin/bash

# ----------------
# DECLERATIONS
# ----------------


# ----------------
# SCRIPTS
# ----------------

inform_live() {
	# $1: Project Name (client, storybook, vuepress)
  if [[ "$TRAVIS_EVENT_TYPE" != "cron" ]]
  then
  curl -X POST -H 'Content-Type: application/json' --data '{"text":":rocket: Die Produktivsysteme können aktualisiert werden: Schul-Cloud Edtrio! Dockertag: '$DOCKERTAG'"}' $WEBHOOK_URL_CHAT
  fi
}

inform_staging() {
  if [[ "$TRAVIS_EVENT_TYPE" != "cron" ]]
  then
    curl -X POST -H 'Content-Type: application/json' --data '{"text":":boom: Das Staging-System wurde aktualisiert: Schul-Cloud Edtrio! (Dockertag: '$DOCKERTAG')"}' $WEBHOOK_URL_CHAT
  fi
}

deploy(){
	SYSTEM=$1 # [staging, test, demo]

	DOCKER_IMAGE=$2 # (edtrio)
	DOCKER_TAG=$3 # version/tag of the image to use. Usually the branch name or a GIT_SHA
	DOCKER_SERVICE_NAME=$4 # docker service name on server

	COMPOSE_SRC=$5 # name of the docker-compose file which should be used as.
	COMPOSE_TARGET=$6 # name as which the compose file should be pushed to the server (auto prefixed with "docker-compose-")
	STACK_NAME=$7 # swarm stack name

	echo "deploy " $DOCKER_IMAGE ":" $DOCKER_TAG " to " $SYSTEM " as " $DOCKER_SERVICE_NAME
	echo "COMPOSEFILE: " $COMPOSE_SRC " => " $COMPOSE_TARGET

	# generate new compose file
	eval "echo \"$( cat $COMPOSE_SRC )\"" > docker-compose-$COMPOSE_TARGET

	# deploy new compose file
	scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa docker-compose-$COMPOSE_TARGET linux@$SYSTEM.schul-cloud.org:~
	ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@$SYSTEM.schul-cloud.org /usr/bin/docker stack deploy -c /home/linux/docker-compose-$COMPOSE_TARGET $STACK_NAME

	# deploy new dockerfile
	ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@$SYSTEM.schul-cloud.org /usr/bin/docker service update --force --image schulcloud/$DOCKER_IMAGE:$DOCKER_TAG $DOCKER_SERVICE_NAME
}

# ----------------
# MAIN SCRIPT
# ----------------
cd deploy

source ./buildAndDeployFilter.sh
buildAndDeployFilter

bash ./decryptSecrets.sh

echo "DOCKERTAG" $DOCKERTAG

if [ -z "$DOCKERTAG" ];
then
	echo "DOCKERTAG env is missing. Abort deployment."
	exit 1;
fi


case "$TRAVIS_BRANCH" in

	master)
		inform_live
		;;

	develop)
		echo "develop"
    # deploy $SYSTEM $DOCKERFILE $DOCKERTAG $DOCKER_SERVICENAME $COMPOSE_DUMMY $COMPOSE_FILE $COMPOSE_SERVICENAME
    deploy "test" "edtrio" $DOCKERTAG "test-schul-cloud_edtrio" "compose-edtrio_default.dummy" "edtrio.yml" "test-schul-cloud"
	release* | hotfix*)
    echo "release/hotfix"
    deploy "staging" "edtrio" $DOCKERTAG "staging_edtrio" "compose-edtrio_default.dummy" "edtrio_default.yml" "staging"
esac

exit 0
