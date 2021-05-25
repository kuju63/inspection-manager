import React, { createContext } from 'react';
import { InspectionItem, InspectionSheet, InspectionSheetContextType } from '../Types';
import { initialState } from '../operator/InspectionSheetOperator';

export const InspectionSheetContext = createContext<InspectionSheetContextType>({
  inspectionSheet: initialState(),
  setSheet: (sheet: InspectionSheet): void => { },
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => { },
  addEquipment: (): void => { },
  removeEquipment: (index: number): void => { },
  updateEquipment: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => { },
  swapEquipment: (srdIndex: number, dstIndex: number): void => { },
  addInspectionItem: (index: number, item: InspectionItem): void => { },
  removeInspectionItem: (equipmentIndex: number, itemIndex: number): void => { },
  updateInspectionItem: (id: number, item: InspectionItem): void => { },
  swapInspectionItem: (equipmentId: number, srcId: number, dstId: number) => { },
});
