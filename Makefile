check: lint test

lint:
	./node_modules/.bin/jshint *.js bin test

test:
	./node_modules/.bin/tap test/*.js

.PHONY: check lint test
