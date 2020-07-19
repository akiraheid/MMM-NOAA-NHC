pwd ::= $(shell pwd)

test:
	docker run --rm -v ${pwd}:/data:ro cytopia/eslint .
