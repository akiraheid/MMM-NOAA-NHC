imageName = mmm-noaa-nhc
pwd ::= $(shell pwd)

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
