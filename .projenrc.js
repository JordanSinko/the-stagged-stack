const {
  AwsCdkConstructLibrary,
  NodePackageManager,
  FileBase,
} = require("projen");

class ReadOnlyFile extends FileBase {
  constructor(project, filePath, options) {
    super(project, filePath, { ...options, readonly: true });
    this.data = options.data;
  }

  synthesizeContent() {
    return this.data;
  }
}

const project = new AwsCdkConstructLibrary({
  packageManager: NodePackageManager.NPM,
  authorAddress: "jordan5sinko@gmail.com",
  authorName: "Jordan Sinko",
  cdkVersion: "1.67.0",
  name: "the-tagged-stack",
  repository: "https://github.com/jordan5sinko/the-tagged-stack.git",
  buildWorkflow: false,
  releaseWorkflow: false,

  cdkDependencies: ["@aws-cdk/core"],
  cdkTestDependencies: ["@aws-cdk/assert"],
  dependencies: {
    deepmerge: "^4.2.2",
  },
  devDependencies: {
    prettier: "^2.1.2",
    husky: "^4.3.0",
    commitlint: "^11.0.0",
    "pretty-quick": "^3.0.2",
  },
});

project.addFields({
  prettier: {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    semi: true,
  },
  husky: {
    hooks: {
      "pre-commit": "run-s format",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    },
  },
  commitlint: {
    extends: ["@commitlint/config-conventional"],
  },
});

project.addScript('format', 'pretty-quick --staged')
project.synth();
