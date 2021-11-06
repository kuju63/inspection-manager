import { InspectionType } from "../../entities";

export interface IInspectionTypePresenter {
  state: InspectionType[];
  editItem: InspectionType;

  getById(id: number): InspectionType | undefined;
  getIds(keyword: string): Array<number>;
  getTypeName(id: number): string | undefined;
  inspectionTypeTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void
  ): JSX.Element;
}
