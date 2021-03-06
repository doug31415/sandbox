module.exports = {
  "modulePath": "src/common/modules/",
  "vendor"    : {
    "js"   : [
      "src/common/bower_components/jquery/dist/jquery.js",
      "src/common/bower_components/lodash/lodash.js",
      "src/common/bower_components/moment/moment.js",
      "src/common/bower_components/socket.io-client/socket.io.js",
      "src/common/bower_components/angular/angular.js",
      "src/common/bower_components/angular-component.js/dist/angular-component.js",
      "src/common/bower_components/angular-animate/angular-animate.js",
      "src/common/bower_components/angular-filter/dist/angular-filter.js",
      "src/common/bower_components/angular-messages/angular-messages.js",
      "src/common/bower_components/angular-translate/angular-translate.js",
      "src/common/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
      "src/common/bower_components/angular-ui-router/release/angular-ui-router.js",
      "src/common/bower_components/angular-animate/angular-animate.js",
      "src/common/bower_components/angular-sanitize/angular-sanitize.js",
      "src/common/bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.js",
      "src/common/bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.migrate.js",
      "src/common/bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.js"
    ],
    "mocks": [
      "src/common/bower_components/angular-mocks/angular-mocks.js",
      "test/unit/test.setup.js"
    ],
    "fonts": []
  },
  "module"    : {
    "modules": [
      "src/common/modules/**/*.module.js"
    ],
    "js"     : [
      "src/common/modules/**/*.js"
    ],
    "html"   : [
      "src/common/modules/**/*.html",
      "src/common/assets/**/*.html"
    ],
    "assets" : {
      "images": [
        "src/common/assets/images/**/*"
      ],
      "vendor": {
        "js": [
          "src/common/assets/plugins/**/*.js"
        ]
      }
    },
    "mocks"  : [
      "test/unit/common/commonUnitTestMocks.js"
    ],
    "tests"  : [
      "test/unit/common/**/*.test.js"
    ]
  }
};
