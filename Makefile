imageName = mmm-noaa-nhc
pwd ::= $(shell pwd)
updateContainer = ${imageName}-lock-update

image: Dockerfile
	podman build -t ${imageName} .

serve: image
	-podman stop ${imageName}
	podman run --rm -d \
		--name ${imageName} \
		-p 8080:8080 \
		${imageName}
	echo "Server running on http://localhost:8080"

test:
	podman run --rm -v ${pwd}:/data:ro cytopia/eslint .

update: package.json
	-podman stop ${updateContainer}
	-podman rm ${updateContainer}
	podman run \
		--name ${updateContainer} \
		-v ${pwd}/package.json:/package.json:ro \
		-w / \
		docker.io/node:17-alpine npm install --package-lock
	podman cp ${updateContainer}:/package-lock.json .
	podman stop ${updateContainer}
	podman rm ${updateContainer}
