(function () {
  'use strict';

  angular.module('isc.forms')
    .directive('iscForm', iscForm);

  /**
   * iscForm - A directive for displaying a form
   *
   * Parameters:
   *
   * formKey    : The unique identifier for the form definition.
   * formType   : The category to which the form belongs. This is defined in the form's FDN.
   * mode       : 'edit' or 'view'
   * id         : If provided, form data with this value is retrieved and loaded into this form instance.
   * model      : If provided, this is used as the form data model.
   *
   * formConfig : A configuration object that may include some or all of the following behavior configuration:
   *   additionalModelInit
   *     A function or expression to be invoked during form init, which may populate additional data models.
   *
   *   useOriginalFormKey
   *     If loading an existing form in edit mode and this property is truthy, the formKey of the persisted form
   *     is used, even if this differs from the active formKey of type formType.
   *     Default: false
   *
   *   annotationsApi
   *     The API to use for annotations in this form, if applicable. These properties may be defined:
   *       getFormAnnotations
   *       closeAnnotationPanel
   *       initAnnotationQueue
   *       processAnnotationQueue
   *     Default: none
   *
   * buttonConfig : A configuration object for form button configuration. This is an object with
   *   properties that represent buttons at the end of the main (parent) form.
   *   By default, the following two buttons are defined:
   *
   *   cancel
   *     configuration for the cancel button
   *     Defaults:
   *       afterClick: goes back one page in the browser history
   *       cssClass  : 'cancel button large float-left'
   *       text      : if mode is 'view', 'Forms_Back_Button', else 'Forms_Cancel_Button'
   *       order     : 1
   *
   *   submit
   *     configuration for the submit button
   *     Defaults:
   *       onClick   : submits the form to iscFormDataApi
   *       afterClick: returns the user to his or her landing page
   *       cssClass  : 'button large float-right'
   *       text      : 'Forms_Submit_Button'
   *       hide      : hidden if mode is 'view'
   *       order     : 2
   *
   *   [other properties]
   *     configuration for other buttons at the bottom of the form
   *     Defaults: none
   *
   *
   *   button configurations are objects with the following properties:
   *     onClick    : a function to call when the button is clicked
   *     afterClick : a function callback called after the button click event has completed
   *     cssClass   : css styles to apply to the button
   *     text       : an i18n translation key or literal text to render on the button
   *     order      : order in which to render the button
   *     hide       : if truthy, the button will not be rendered in the UI
   *
   *
   *   Example usage:
   *   to change the text of the submit button to "Complete" and add a "Home" button in the middle:
   *     buttonConfig : {
   *       submit : {
   *         text  : 'Complete',
   *         order : 3
   *       },
   *       home : {
   *         text    : 'Back Home',
   *         cssClass: 'button',
   *         onClick : function() {
   *           // ... custom business logic
   *         },
   *         order   : 2
   *       }
   *     }
   *
   */


  /**
   * @ngDoc directive
   * @memberOf isc.Forms
   * @param $stateParams
   * @param $q
   * @param $window
   * @param iscSessionModel
   * @param iscNavContainerModel
   * @param iscFormsModel
   * @param iscFormsValidationService
   * @param iscFormDataApi
   * @returns {{restrict: string, replace: boolean, controllerAs: string, scope: {formType: string, formKey: string, mode: string, id: string, model: string, formConfig: string, buttonConfig: string}, bindToController: boolean, controller: controller, templateUrl: directive.templateUrl}}
   * @description
   *    * iscForm - A directive for displaying a form
   *
   * Parameters:
   *
   * formKey    : The unique identifier for the form definition.
   * formType   : The category to which the form belongs. This is defined in the form's FDN.
   * mode       : 'edit' or 'view'
   * id         : If provided, form data with this value is retrieved and loaded into this form instance.
   * model      : If provided, this is used as the form data model.
   *
   * formConfig : A configuration object that may include some or all of the following behavior configuration:
   *   additionalModelInit
   *     A function or expression to be invoked during form init, which may populate additional data models.
   *
   *   useOriginalFormKey
   *     If loading an existing form in edit mode and this property is truthy, the formKey of the persisted form
   *     is used, even if this differs from the active formKey of type formType.
   *     Default: false
   *
   *   annotationsApi
   *     The API to use for annotations in this form, if applicable. These properties may be defined:
   *       getFormAnnotations
   *       closeAnnotationPanel
   *       initAnnotationQueue
   *       processAnnotationQueue
   *     Default: none
   *
   * buttonConfig : A configuration object for form button configuration. This is an object with
   *   properties that represent buttons at the end of the main (parent) form.
   *   By default, the following two buttons are defined:
   *
   *   cancel
   *     configuration for the cancel button
   *     Defaults:
   *       afterClick: goes back one page in the browser history
   *       cssClass  : 'cancel button large float-left'
   *       text      : if mode is 'view', 'Forms_Back_Button', else 'Forms_Cancel_Button'
   *       order     : 1
   *
   *   submit
   *     configuration for the submit button
   *     Defaults:
   *       onClick   : submits the form to iscFormDataApi
   *       afterClick: returns the user to his or her landing page
   *       cssClass  : 'button large float-right'
   *       text      : 'Forms_Submit_Button'
   *       hide      : hidden if mode is 'view'
   *       order     : 2
   *
   *   [other properties]
   *     configuration for other buttons at the bottom of the form
   *     Defaults: none
   *
   *
   *   button configurations are objects with the following properties:
   *     onClick    : a function to call when the button is clicked
   *     afterClick : a function callback called after the button click event has completed
   *     cssClass   : css styles to apply to the button
   *     text       : an i18n translation key or literal text to render on the button
   *     order      : order in which to render the button
   *     hide       : if truthy, the button will not be rendered in the UI
   *
   * @example
   *   Example usage:
   *   to change the text of the submit button to "Complete" and add a "Home" button in the middle:
   *     buttonConfig : {
   *       submit : {
   *         text  : 'Complete',
   *         order : 3
   *       },
   *       home : {
   *         text    : 'Back Home',
   *         cssClass: 'button',
   *         onClick : function() {
   *           // ... custom business logic
   *         },
   *         order   : 2
   *       }
   *     }
   *

   */
  /* @ngInject */
  function iscForm($stateParams, $q, $window,
                   iscSessionModel, iscNavContainerModel,
                   iscFormsModel, iscFormsValidationService, iscFormDataApi) {//jshint ignore:line
    var directive = {
      restrict        : 'E',
      replace         : true,
      controllerAs    : 'formCtrl',
      scope           : {
        formType    : '@',
        formKey     : '@',
        mode        : '@',
        id          : '@?',
        model       : '=?',
        formConfig  : '=',
        buttonConfig: '='
      },
      bindToController: true,
      controller      : controller,
      templateUrl     : function (elem, attrs) {
        return attrs.templateUrl || 'forms/widgets/iscForm/iscForm.html';
      }
    };

    return directive;

    /**
     * @memberOf iscForm
     */
    function controller() {
      var self = this;

      var defaultFormConfig   = getFormDefaults();
      self.formConfig         = self.formConfig || {};
      self.internalFormConfig = _.defaultsDeep(self.formConfig, defaultFormConfig);

      var defaultButtonConfig   = getButtonDefaults();
      self.buttonConfig         = self.buttonConfig || {};
      self.internalButtonConfig = _.defaultsDeep(self.buttonConfig, defaultButtonConfig);

      _.merge(self, {
        localFormKey          : self.formKey,
        formDefinition        : {},
        internalFormDefinition: {},
        validationDefinition  : [],
        model                 : {},
        options               : {
          formState: {
            _mode: self.mode
          }
        }
      });

      // Empty stubs for annotations, to remove dependency
      /**
       * @memberOf iscForm
       * @returns {*}
         */
      function emptyAnnotationData() { return $q.when([]); }

      /**
       * @memberOf iscForm
       */
      function emptyFunction() { }

      self.validateFormApi = function () {
        return iscFormsValidationService.validateCollections(self.model, self.validationDefinition);
      };

      init();


      // Private/helper functions
      var originalFormKey;

      /**
       * @memberOf iscForm
       * @returns {{annotationsApi: {getFormAnnotations: iscForm.emptyAnnotationData, closeAnnotationPanel: iscForm.emptyFunction, initAnnotationQueue: iscForm.emptyFunction, processAnnotationQueue: iscForm.emptyFunction}, additionalModels: {}}}
         */
      function getFormDefaults() {
        // Empty annotations API if not provided
        var annotationsApi = {
          getFormAnnotations    : emptyAnnotationData,
          closeAnnotationPanel  : emptyFunction,
          initAnnotationQueue   : emptyFunction,
          processAnnotationQueue: emptyFunction
        };

        return {
          annotationsApi  : annotationsApi,
          additionalModels: {}
        };
      }

      /**
       * @memberOf iscForm
       * @returns {{cancel: {onClick: iscForm.emptyFunction, afterClick: afterCancel, cssClass: string, text: string}, submit: {onClick: onSubmit, afterClick: afterSubmit, cssClass: string, text: string}}}
         */
      function getButtonDefaults() {
        // Default api for submitting a form is to submit to iscFormDataApi
        function onSubmit() {
          var formDefinition = self.formDefinition.form;
          // Wrap data with additional information and metadata
          var formWrapper    = {
            formDefinition  : formDefinition,
            additionalModels: self.formConfig.additionalModels,
            formData        : {
              formKey    : self.localFormKey,
              formName   : formDefinition.name,
              formType   : formDefinition.formType,
              id         : self.id ? parseInt(self.id) : undefined,
              author     : iscSessionModel.getCurrentUser(),
              completedOn: moment().toISOString(),
              data       : self.model
            }
          };

          if (self.id) {
            return iscFormDataApi.put(parseInt(self.id), formWrapper).then(_updateAnnotations);
          }
          else {
            return iscFormDataApi.post(formWrapper).then(_updateAnnotations);
          }

          function _updateAnnotations(form) {
            self.formConfig.annotationsApi.processAnnotationQueue(form.id);
          }
        }

        /**
         * @memberOf iscForm
         */
        function afterSubmit() {
          iscNavContainerModel.navigateToUserLandingPage();
        }

        /**
         * @memberOf iscForm
         */
        function afterCancel() {
          $window.history.back();
        }

        return {
          cancel: {
            onClick   : emptyFunction,
            afterClick: afterCancel,
            cssClass  : 'cancel button large float-left',
            text      : self.mode === 'view' ? 'Forms_Back_Button' : 'Forms_Cancel_Button'
          },
          submit: {
            onClick   : onSubmit,
            afterClick: afterSubmit,
            cssClass  : 'button large float-right',
            text      : 'Forms_Submit_Button'
          }
        };
      }

      /**
       * @memberOf iscForm
       */
      function init() {
        // Resolve default formKey if not provided,
        // and if not using formKey previously persisted with form
        if (!self.localFormKey && !(self.id && self.formConfig.useOriginalFormKey)) {
          iscFormsModel.getActiveForm(self.formType).then(function (form) {
            self.localFormKey = form.formKey;
            getFormData();
          });
        }
        else {
          getFormData();
        }
      }

      /**
       * @memberOf iscForm
       */
      function getFormData() {
        self.formConfig.annotationsApi.initAnnotationQueue();

        getAnnotationData().then(function () {
          if (self.id) {
            iscFormDataApi.get(self.id).then(function (formData) {
              originalFormKey = formData.formKey;

              // Option to force using the formKey saved in the form previously
              if (!self.localFormKey && self.formConfig.useOriginalFormKey) {
                self.localFormKey = originalFormKey;
              }
              self.model = formData.data;

              getFormDefinition();
            });
          }
          else {
            getFormDefinition();
          }
        });
      }

      /**
       * @memberOf iscForm
       * @returns {*}
         */
      function getAnnotationData() {
        var getApi = _.get(self.formConfig, 'annotationsApi.getFormAnnotations');
        if (getApi && _.isFunction(getApi)) {
          return getApi(self.id).then(function (annotations) {
            self.options.formState._annotations = {
              index: self.id,
              data : annotations
            };
            return annotations;
          });
        }
        else {
          $q.when([]);
        }
      }

      /**
       * @memberOf iscForm
       */
      function getFormDefinition() {
        iscFormsModel.getFormDefinition(self.localFormKey, self.mode)
          .then(function (formDefinition) {
            self.formDefinition                = formDefinition;
            self.options.formState._validateOn = formDefinition.validateOn;

            reconcileModelWithFormDefinition();

            populateAdditionalModels(self.formDefinition.form.dataModelInit);
          });
      }


      /**
       * @memberOf iscForm
       * @description
       *  If the original/persisted formKey differs from the formKey of the definition,
       * we need to process the implicit data model of the new formDefinition to ensure
       * it does not contain properties that are not supported by the new definition.
       */
      function reconcileModelWithFormDefinition() {
        if (originalFormKey && originalFormKey !== self.localFormKey) {
          var form = self.formDefinition.form,
              data = self.model;

          self.model = _mergeFormAndData();
        }

        /**
         * @memberOf iscForm
         * @description
         * Prunes any properties in data that are not keyed by fields in form.
         * @returns {Object}
         * @private
         */
        function _mergeFormAndData() {
          var model = {};

          _.forEach(form.pages, function (page) {
            _processFields(page.fields);
          });

          return model;

          function _processFields(fields, parentPath, isCollection) {
            _.forEach(fields, function (field) {
              // Field groups are just arrays of fields
              if (field.fieldGroup) {
                _processFields(field.fieldGroup, parentPath, isCollection);
              }
              else {
                if (field.key) {
                  var key            = field.key,
                      fullPath       = (parentPath ? parentPath + '.' : '') + key;
                  // templateOptions.fields is populated with subform fields for embedded forms
                  var embeddedFields = _.get(field, 'templateOptions.fields'),
                      isEfCollection = field.type === 'embeddedFormCollection' || field.extends === 'embeddedFormCollection';

                  if (embeddedFields) {
                    // If a collection, initialize the size of the new array to match data's size of this collection
                    if (isEfCollection) {
                      var sourceCollectionSize = _.get(data, fullPath, []).length;
                      if (sourceCollectionSize) {
                        _.set(model, fullPath, new Array(sourceCollectionSize));
                        _.fill(model[fullPath], {});
                      }
                    }
                    _processFields(embeddedFields, fullPath, isEfCollection);
                  }
                  else {
                    // If saving a collection, iterate all items in data and save this verified property
                    if (isCollection) {
                      var sourceData = _.get(data, parentPath, []);

                      _.forEach(sourceData, function (item, index) {
                        var indexedKey = [parentPath, '[', index, ']', '.', key].join(''),
                            value      = _.get(data, indexedKey);
                        if (value !== undefined) {
                          _.set(model, indexedKey, value);
                        }
                      });
                    }
                    else {
                      var value = _.get(data, key);

                      if (value !== undefined) {
                        _.set(model, key, value);
                      }
                    }
                  }
                }
              }
            });
          }
        }
      }

      /**
       * @memberOf iscForm
       * @param fdnScript
       * @description
       * If provided, call init function/expression to populate additional dynamic data models, such as patients
         */
      function populateAdditionalModels(fdnScript) {
        //
        evalScript(fdnScript);
        evalScript(self.formConfig.additionalModelInit);

        getValidationDefinition();

        function evalScript(script) {
          if (script && _.isFunction(script)) {
            script(self.formConfig.additionalModels, $stateParams);
          }
        }
      }

      /**
       * @memberOf iscForm
       */
      function getValidationDefinition() {
        iscFormsModel.getValidationDefinition(self.localFormKey)
          .then(function (validationDefinition) {
            self.validationDefinition = validationDefinition;
            self.showInternal         = true;
          });
      }
    }
  }
})();
