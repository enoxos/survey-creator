import { Base, SurveyModel, property } from "survey-core";
import { ICreatorPlugin, CreatorBase } from "../../creator-base";
import { getLocString } from "../../editorLocalization";
import { json } from "./embed-json";
import "./embed.scss";

export class EmbedModel extends Base {
  @property() survey: SurveyModel;
  constructor(creator: CreatorBase<SurveyModel>) {
    super();
    this.survey = creator.createSurvey(json, "embed");
    this.survey.onUpdateQuestionCssClasses.add(((_, options) => {
      if (options.question.getType() === "comment") {
        options.cssClasses.title = "sv-question-embed__title";
      }
  }));
  }
}

export class TabEmbedPlugin implements ICreatorPlugin {
  public model: EmbedModel;
  constructor(creator: CreatorBase<SurveyModel>) {
    this.model = new EmbedModel(creator);
    creator.tabs.push({
      id: "embed-new",
      title: getLocString("ed.embedSurvey"),
      component: "svc-tab-embed-new",
      data: this,
      action: () => {
        creator.makeNewViewActive("embed-new");
        this.activate();
      },
      active: () => creator.viewType === "embed-new",
    });
    creator.plugins["embed-new"] = this;
  }
  public activate(): void {
  }
  public deactivate(): boolean {
    return true;
  }
}