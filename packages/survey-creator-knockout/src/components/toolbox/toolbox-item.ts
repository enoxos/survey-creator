import * as ko from "knockout";
import { SurveyCreator } from "../../creator";
import { editorLocalization } from "@survey/creator";
import { IQuestionToolboxItem } from "@survey/creator";
const template = require("./toolbox-item.html");

export class KnockoutToolboxItemViewModel {
  public title: ko.Observable<string> = ko.observable("");
  public iconName: ko.Observable<string> = ko.observable("");

  constructor(
    protected item: IQuestionToolboxItem,
    protected creator: SurveyCreator,
    public isCompact = true
  ) {
    var icon = item.iconName;
    if (item.iconName.indexOf("icon-") === -1) {
      icon = "icon-" + icon;
    }

    this.iconName(icon);
    this.title(item.title);
  }
  public get ariaLabel() {
    return (
      this.item.tooltip +
      " " +
      editorLocalization.getString("toolbox") +
      " item"
    );
  }
}

ko.components.register("svc-toolbox-item", {
  viewModel: {
    createViewModel: (params: any, componentInfo: any) => {
      return new KnockoutToolboxItemViewModel(
        params.item,
        params.creator,
        params.isCompact
      );
    }
  },
  template: template
});
