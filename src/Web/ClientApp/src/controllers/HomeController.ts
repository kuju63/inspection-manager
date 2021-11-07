import { InspectionSheet } from "../entities";
import {
  IHomeController,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class HomeController implements IHomeController {
  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  /**
   * Initializes a new instance of HomeController class
   * @param typeUseCase IInspectionTypeInteractor object.
   * @param groupUseCase IInspectionGroupInteractor object.
   * @param sheetUseCase IInspectionSheetInteractor object.
   */
  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor,
    sheetUseCase: IInspectionSheetInteractor,
  ) {
    this.typeUseCase = typeUseCase;
    this.groupUseCase = groupUseCase;
    this.sheetUseCase = sheetUseCase;
  }

  async fetchDisplayData(): Promise<void> {
    await this.typeUseCase.fetchInspectionTypes();
    await this.groupUseCase.fetchInspectionGroups();
  }

  getGroupIds(keyword: string): number[] {
    return this.groupUseCase.getIds(keyword);
  }

  getTypeIds(keyword: string): number[] {
    return this.typeUseCase.getIds(keyword);
  }

  exportExcelInspectionSheet(sheet: InspectionSheet): void {
    this.exportInspectionSheet(
      `excelsheet/${sheet.sheetId}`,
      `${sheet.sheetName}.xlsx`
    );
  }

  exportJsonInspectionSheet(sheet: InspectionSheet): void {
    this.exportInspectionSheet(
      `jsonexport/${sheet.sheetId}`,
      `${sheet.sheetName}.json`
    );
  }

  private exportInspectionSheet(exportUrl: string, fileName: string): void {
    fetch(exportUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = fileName;
        a.href = url;
        a.click();
        a.remove();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1e4);
      })
      .catch(console.error);
  }
}
