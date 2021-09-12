import React, { FC, useRef, useContext } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails, IconButton,
  Grid, Paper, TextField,
} from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { InspectionItemForm } from './InspectionItemForm';
import { InspectionSheetContext } from '../../../App';
import { ItemType } from '../../../entities';
import { Equipment, InspectionItem } from '../../../entities';
import { CancelIconButton } from '../../common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    equipmentLabel: {
      backgroundColor: theme.palette.primary.main,
      color: '#FFFFFF',
      fontSize: 20,
    },
    paperElement: {
      margin: 4
    },
    menuIcon: {
      color: '#FFFFFF',
    },
  })
);

interface DragItem {
  index: number,
};

interface EquipmentFormProps {
  index: number,
  equipment: Equipment,
  handleAddItem: (equipmentIndex: number) => void,
  handleEditItem: (equipmentIndex: number, inspectionItemIndex: number, inspectionItem: InspectionItem) => void,
  storeHistory: () => void,
};

export const EquipmentForm: FC<EquipmentFormProps> = ({
  index,
  equipment,
  handleAddItem,
  handleEditItem,
  storeHistory
}): JSX.Element => {
  const classes = useStyles();
  const { sheetController } = useContext(InspectionSheetContext);
  const dropRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.EQUIPMENT,
    drop(item: DragItem) {
      if (!dropRef.current || item.index === index) {
        return;
      }
      sheetController.swapEquipment(index, item.index);
    }
  })
  const [, drag, preview] = useDrag({
    type: ItemType.EQUIPMENT,
    item: { index: index },
  })
  preview(drop(dropRef));
  drag(dragRef);

  return (
    <Paper variant='outlined' >
      <Accordion>
        <AccordionSummary
          className={classes.equipmentLabel}
          expandIcon={<ExpandMoreIcon className={classes.menuIcon} />}
          ref={dropRef}
        >
          <IconButton size='small' color='inherit' ref={dragRef}>
            <DragHandleIcon />
          </IconButton>
          <div>{equipment.equipment_name}</div>
          <CancelIconButton
            onClick={() => sheetController.removeEquipment(index)}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} className={classes.paperElement}>
              <TextField
                required
                label='点検機器名'
                variant='outlined'
                size='small'
                name='equipment_name'
                value={equipment.equipment_name}
                onChange={e => sheetController.updateEquipment(e, index)}
              />
            </Grid>
            <Grid item xs={12}>
              <InspectionItemForm
                equipmentIndex={index}
                inspectionItems={equipment.inspection_items}
                editInspectionItem={handleEditItem}
                addInspectionItem={handleAddItem}
                storeHistory={storeHistory}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper >
  );
}