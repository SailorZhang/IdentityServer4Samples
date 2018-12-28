// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),      
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-junit-reporter'),
      require('karma-mocha-reporter')     
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    coverageIstanbulReporter: {
      dir: './coverage',
      reports: ['html','cobertura','text-summary'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      
  },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['mocha','coverage-istanbul', 'junit', 'kjhtml'],
    
    junitReporter: {
      outputDir: './reports', 
      outputFile: 'testResults.xml',
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};










