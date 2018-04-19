// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-mocha-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-tfs-reporter'),
      require('karma-sourcemap-loader'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './src/test.ts', watched: false },
      {
        pattern: '**/*.js.map',
        included: false,
      },
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './src/test.ts': ['sourcemap'],
    },

    coverageIstanbulReporter: {
      reports: ['html', 'cobertura', 'json'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      thresholds: {
        statements: 80,
        lines: 80,
        branches: 80,
        functions: 80,
      },
      'report-config': {
        // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html',
        },
        cobertura: {
          file: './cobertura/cobertura.txt',
        },
        json: {
          file: './json/coverage-final.json',
        },
      },
    },
    angularCli: {
      environment: 'dev',
    },
    reporters: ['mocha', 'kjhtml', 'tfs'],
    port: 9876,
    colors: true,
    logLevel: config.INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    mochaReporter: {
      showDiff: true,
      ignoreSkipped: true,
    },
    tfsReporter: {
      outputDir: 'coverage',
      outputFile: 'tfs_testresults_${date}.xml',
    },
  });
};
