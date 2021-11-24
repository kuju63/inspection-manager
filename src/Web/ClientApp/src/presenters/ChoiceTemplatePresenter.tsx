import {
  IChoiceTemplateInteractor,
  IChoiceTemplatePresenter,
} from "../interfaces";
import { ChoiceTemplate } from "../entities";

export class ChoiceTemplatePresenter implements IChoiceTemplatePresenter {
  readonly state: ChoiceTemplate[];

  readonly target: ChoiceTemplate;

  private readonly useCase: IChoiceTemplateInteractor;

  /**
   * Initializes a new instance of ChoiceTemplatePresenter class.
   * @param useCase Object implements IChoiceTemplateInteractor interface/
   */
  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase;
    this.state = useCase.templates;
    this.target = useCase.target;
  }

  getById(id: number): ChoiceTemplate | undefined {
    return this.state.find((x) => x.choiceTemplateId === id);
  }

  getByIndex(index: number): ChoiceTemplate | undefined {
    return this.useCase.templates[index];
  }
}
