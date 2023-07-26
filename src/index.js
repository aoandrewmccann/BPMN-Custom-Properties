import Modeler from "bpmn-js/lib/Modeler";

import camundaModdlePackage from "camunda-bpmn-moddle/resources/camunda";

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule,
  ElementTemplatesPropertiesProviderModule
} from "bpmn-js-properties-panel";

import "bpmn-js-properties-panel/dist/assets/properties-panel.css";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import translate from "diagram-js/lib/i18n/translate/translate";

import "./styles.css";

import diagram from "./diagram.bpmn";

const container = document.getElementById("container");

function customTranslate(template, replacements) {
  if (template === "General") {
    template = "Foo";
  }

  return translate(template, replacements);
}

const CustomTranslateModule = {
  translate: ["value", customTranslate]
};

const modeler = new Modeler({
  container,
  keyboard: {
    bindTo: document
  },
  additionalModules: [
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    CamundaPlatformPropertiesProviderModule,
    ElementTemplatesPropertiesProviderModule,
    CustomTranslateModule
  ],
  moddleExtensions: {
    camunda: camundaModdlePackage
  },
  propertiesPanel: {
    parent: "#properties-panel-container"
  }
});

modeler
  .importXML(diagram)
  .then(({ warnings }) => {
    if (warnings.length) {
      console.log(warnings);
    }

    const canvas = modeler.get("canvas");

    canvas.zoom("fit-viewport");
  })
  .catch((err) => {
    console.log(err);
  });
