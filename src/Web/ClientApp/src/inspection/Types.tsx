export const ItemType = {
  EQUIPMENT: 'EQUIPMENT',
  INSPECTION_ITEM: 'INSPECTION_ITEM',
};

export const useInputTypes = [
  { value: 0, label: "テキスト入力" },
  { value: 1, label: "数値入力" },
  { value: 2, label: "項目選択" },
  { value: 5, label: "日付入力" },
];

export type Option = {
  option_id: number,
  description: string,
};

export type ChoiceTemplate = {
  choice_template_id: string,
  choices: Option[],
};

export type InspectionGroup = {
  inspection_group_id: number,
  description: string,
};

export type InspectionType = {
  inspection_type_id: number,
  description: string,
};

export type InspectionItem = {
  inspection_item_id: string,
  inspection_content: string,
  input_type: number,
  choices: string[],
};

export type Equipment = {
  equipment_id: string,
  equipment_name: string,
  inspection_items: InspectionItem[],
};

export type InspectionSheet = {
  sheet_id: number,
  sheet_name: string,
  inspection_type: string,
  inspection_group: string,
  equipments: Equipment[],
};

export type InspectionSheetSummary = {
  sheet_id: number,
  sheet_name: string,
  inspection_type: string,
  inspection_group: string,
};

export type InspectionItemAction = {
  type: string;
  payload?: {
    name?: string;
    value?: string;
    choice_index?: number;
    choices?: string[];
    item?: InspectionItem;
  };
};

export type InspectionSheetAction = {
  type: string;
  payload?: {
    name?: string;
    value?: string;
    equipment_id?: string;
    inspection_item_id?: string;
    swap_id?: string;
    sheet?: InspectionSheet;
    inspection_item?: InspectionItem;
  };
};

export interface InspectionItemContextType {
  inspectionItem: InspectionItem;
  setItem: (item: InspectionItem) => void;
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setChoices: (choices: string[]) => void;
  addChoice: () => void;
  removeChoice: (index: number) => void;
  updateChoice: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
};

export interface InspectionSheetContextType {
  inspectionSheet: InspectionSheet;
  setSheet: (sheet: InspectionSheet) => void;
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addEquipment: () => void;
  removeEquipment: (id: string) => void;
  updateEquipment: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => void;
  swapEquipment: (srdId: string, dstId: string) => void,
  addInspectionItem: (id: string, item: InspectionItem) => void;
  removeInspectionItem: (id: string, itemId: string) => void;
  updateInspectionItem: (id: string, item: InspectionItem) => void;
  swapInspectionItem: (equipmentId: string, srdId: string, dstId: string) => void;
};
