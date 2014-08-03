SASS_PATH = public/sass
CSS_PATH = public/css

.PHONY: css

all: css

css:
	@./bin/build-css.sh $(SASS_PATH) $(CSS_PATH)

clean:
	rm -rf $(CSS_PATH)
