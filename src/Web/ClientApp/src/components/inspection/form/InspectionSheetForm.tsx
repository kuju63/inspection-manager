import React, { FC, useContext, useEffect, useState } from 'react';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  BottomNavigation, BottomNavigationAction, Grid, Paper
} from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import { InspectionItemDialog } from '../dialog/InspectionItemDialog';
import { InspectionSheetContext, InspectionItemContext } from '../../../App';
import { InspectionItem, InspectionSheet } from '../../../entities';
import { InspectionGroup, InspectionType } from '../../../typescript-fetch';
import { BottomNavigationAdd } from '../../common';
import { InspectionGroupRepository, InspectionTypeRepository } from '../../../infrastructure';

interface InspectionSheetFormProps {
  isEdit: boolean,
};

export const InspectionSheetForm: FC<InspectionSheetFormProps> = ({ isEdit }): JSX.Element => {
  const { sheetPresenter, sheetController } = useContext(InspectionSheetContext);
  const { itemPresenter, itemController } = useContext(InspectionItemContext);
  const [groups, setGroups] = useState<InspectionGroup[]>([]);
  const [types, setTypes] = useState<InspectionType[]>([]);
  const [open, setOpen] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true);
  const [additional, setAdditional] = useState(false);
  const [equipmentIndex, setEquipmentIndex] = useState(0);
  const [inspectionItemIndex, setInspectionItemIndex] = useState(0);
  const [history, setHistory] = useState<InspectionSheet[]>([]);

  useEffect(() => {
    const groupApi = new InspectionGroupRepository();
    groupApi.get()
      .then(res => setGroups(res))
      .catch(console.error);
    const typeApi = new InspectionTypeRepository();
    typeApi.get()
      .then(res => setTypes(res))
      .catch(console.error);
  }, []);

  const storeHistory = () => {
    setHistory(history.concat(sheetPresenter.getState()));
    setUndoDisabled(false);
  }

  const getHistory = () => {
    const sheet = history.pop();
    if (sheet != null) {
      sheetController.setSheet(sheet);
      setUndoDisabled(!history.length);
    }
  };

  /**
   * Implements the process for managing inspection item of equipment.
   */
  const handleInspectionItem = () => {
    if (additional) {
      sheetController.addInspectionItem(equipmentIndex, itemPresenter.getState());
    } else {
      sheetController.updateInspectionItem(equipmentIndex, inspectionItemIndex, itemPresenter.getState());
    }
    storeHistory();
    setOpen(false);
  };

  /**
   * Implements the process for adding inspection item.
   */
  const handleAddItem = (equipmentId: number) => {
    setEquipmentIndex(equipmentId);
    setAdditional(true);
    itemController.initialize();
    setOpen(true);
  }

  /**
   * Implements the process for editing inspection item.
   */
  const handleEditItem = (equipmentIndex: number, inspectionItemIndex: number, inspectionItem: InspectionItem) => {
    setEquipmentIndex(equipmentIndex);
    setInspectionItemIndex(inspectionItemIndex);
    setAdditional(false);
    itemController.setItem(inspectionItem);
    setOpen(true);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper variant="outlined">
        {sheetPresenter.getEditContent(
          isEdit, groups, types,
          handleAddItem, handleEditItem, storeHistory
        )}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                disabled={undoDisabled}
                label="戻る"
                icon={<UndoIcon />}
                onClick={getHistory}
              />
            </BottomNavigation>
            <BottomNavigationAdd
              label="点検機器追加"
              onClick={() => sheetController.addEquipment()}
            />
          </Grid>
        </Grid>
      </Paper >
      <InspectionItemDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleInspectionItem={handleInspectionItem}
      />
    </DndProvider>
  );
}
InspectionSheetForm.displayName = InspectionSheetForm.name;