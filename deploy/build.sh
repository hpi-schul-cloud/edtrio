#! /bin/bash

# ----------------
# DECLERATIONS
# ----------------

set -e # fail with exit 1 on any error

echo "DOCKERTAG" $DOCKERTAG
echo "GITSHA" $GIT_SHA

# ----------------
# SCRIPTS
# ----------------

dockerPush(){
	# $1: Project Name
	# $2: docker tag to use

	# Log in to the docker CLI
	echo "$MY_DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin

	# Push Image
	docker push schulcloud/edtrio:$1
}

# BUILD SCRIPTS

buildEdtrio(){
	docker build \
		-t schulcloud/edtrio:$DOCKERTAG \
		-t schulcloud/edtrio:$GIT_SHA \
		-f Dockerfile \
		../

	dockerPush $DOCKERTAG
	dockerPush $GIT_SHA
}

# ----------------
# MAIN SCRIPT
# ----------------

cd deploy

source ./buildAndDeployFilter.sh
buildAndDeployFilter

bash ./decryptSecrets.sh

buildEdtrio

exit 0
