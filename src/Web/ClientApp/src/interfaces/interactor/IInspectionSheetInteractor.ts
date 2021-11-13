import React from "react";
import { InspectionSheet, InspectionItem } from "../../entities";

export interface IInspectionSheetInteractor {
  sheets: InspectionSheet[];
  filteredSheets: InspectionSheet[];
  sheet: InspectionSheet;

  /**
   * Gets all inspection sheets from database.
   */
  fetchAllInspectionSheets(): Promise<void>;

  /**
   * Gets the specified inspection sheets from database.
   * @param id InspectionSheet ID to get.
   */
  fetchInspectionSheetById(id: number): Promise<void>;

  /**
   * Filters inspection sheet by using the specified group ID, type ID, and sheet name.
   * @param groupIds Inspection group ID to be filtered.
   * @param typeIds Inspection type ID to be filtered.
   * @param sheetKeyword Inspection sheet name to be filtered.
   */
  searchInspectionSheet(
    groupIds: number[],
    typeIds: number[],
    sheetKeyword: string
  ): void;

  /**
   * Resets filtered inspection sheets.
   */
  resetSearchedInspectionSheets(): void;

  createInspectionSheet(): Promise<void>;
  updateInspectionSheet(): Promise<void>;

  /**
   * Removes the specified inspection sheet.
   * @param id Inspection sheet ID to be removed.
   */
  removeInspectionSheet(id: number): Promise<void>;

  /**
   * Sets inspection sheet by using the specified data.
   * @param sheet Inspection sheet data to set.
   */
  setSheet(sheet: InspectionSheet): void;

  /**
   * Sets inspection sheet name.
   * @param sheetName sheet name to set.
   */
  setSheetName(sheetName: string): void

  /**
   * Sets inspection group ID.
   * @param groupId Group ID to set.
   */
  setGroupId(groupId: number): void;

  /**
   * Sets inspection type ID.
   * @param typeId Group ID to set.
   */
  setTypeId(typeId: number): void;

  /**
   * Add a new equipment to inspection sheet.
   */
  addEquipment(): void;

  removeEquipment(index: number): void;
  updateEquipment(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ): void;
  swapEquipment(srcIndex: number, dstIndex: number): void;
  addInspectionItem(index: number, item: InspectionItem): void;
  removeInspectionItem(equipmentIndex: number, itemIndex: number): void;
  updateInspectionItem(
    equipmentIndex: number,
    itemIndex: number,
    item: InspectionItem
  ): void;
  swapInspectionItem(
    equipmentIndex: number,
    srcIndex: number,
    dstIndex: number
  ): void;
}
