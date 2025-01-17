import * as ko from "knockout";
import {
  SurveyTemplateRendererViewModel,
  QuestionImageModel
} from "survey-core";
import { QuestionImageAdornerViewModel } from "@survey/creator";
import { createQuestionViewModel } from "./question";
const questionTemplate = require("./question.html");
const template = require("./question-image.html");

ko.components.register("svc-image-question", {
  viewModel: {
    createViewModel: (
      params: SurveyTemplateRendererViewModel,
      componentInfo: any
    ) => {
      const model = new QuestionImageAdornerViewModel(
        params.componentData,
        params.templateData.data as QuestionImageModel,
        params.templateData,
        componentInfo.element.parentElement
      );
      createQuestionViewModel(params, componentInfo, model);
      model["adornerComponent"] = "svc-image-question-adorner";
      return model;
    }
  },
  template: questionTemplate
});
ko.components.register("svc-image-question-adorner", {
  viewModel: {
    createViewModel: (params: any, componentInfo: any) => {
      return params.model;
    }
  },
  template: template
});
