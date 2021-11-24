import {
  IChoiceTemplateController,
  IChoiceTemplateInteractor,
} from "../interfaces";
import { ChoiceTemplate } from "../entities";

export class ChoiceTemplateController implements IChoiceTemplateController {
  private readonly useCase: IChoiceTemplateInteractor;

  /**
   * Initializes a new instance of ChoiceTemplateController class.
   * @param useCase Objects implements IChoiceTemplateInteractor interface.
   */
  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase;
  }

  /** @inheritdoc */
  setUpNewChoiceTemplate(): void {
    this.useCase.setUpNewChoiceTemplate();
  }

  /** @inheritdoc */
  addChoice(): void {
    this.useCase.addChoice();
  }

  /** @inheritdoc */
  updateChoice(index: number, input: string): void {
    this.useCase.updateChoice(index, input);
  }

  /** @inheritdoc */
  removeChoice(index: number): void {
    this.useCase.removeChoice(index);
  }

  /** @inheritdoc */
  async getAllChoiceTemplates(): Promise<void> {
    await this.useCase.fetchAllChoiceTemplates();
  }

  /** @inheritdoc */
  async create(): Promise<void> {
    await this.useCase.create();
  }

  async update(choiceTemplate: ChoiceTemplate): Promise<void> {
    await this.useCase.update(choiceTemplate);
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.useCase.delete(id);
  }
}
