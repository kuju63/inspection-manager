import { Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { EquipmentForm } from "../components";
import { InputStyle, LabelStyle } from "../components/stylesheets";
import { Equipment, InspectionGroup, InspectionSheet, InspectionType } from "../entities";
import {
  ICreatePresenter,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class CreatePresenter implements ICreatePresenter {
  readonly selectionSheets: InspectionSheet[];

  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  /**
   * Initializes a new instance of CreatePresenter class
   * @param typeUseCase IInspectionTypeInteractor object.
   * @param groupUseCase IInspectionGroupInteractor object.
   * @param sheetUseCase IInspectionSheetInteractor object.
   */
  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor,
    sheetUseCase: IInspectionSheetInteractor
  ) {
    this.selectionSheets = sheetUseCase.sheets;
    this.typeUseCase = typeUseCase;
    this.groupUseCase = groupUseCase;
    this.sheetUseCase = sheetUseCase;
  }

  /** @inheritdoc */
  getEditContent(
    isEdit: boolean,
    handleAddItem: any,
    handleEditItem: any
  ): JSX.Element {
    const contents = isEdit ? (
      <Grid item xs={12}>
        <TextField
          sx={InputStyle}
          disabled
          label="点検シートID"
          variant="outlined"
          size="small"
          name="sheetId"
          defaultValue={this.sheetUseCase.sheet.sheetId}
          InputProps={{ readOnly: true }}
        />
      </Grid>
    ) : (
      <></>
    );

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box sx={LabelStyle}>点検シート情報</Box>
        </Grid>
        {contents}
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            required
            autoFocus
            label="点検シート名"
            variant="outlined"
            size="small"
            name="sheetName"
            value={this.sheetUseCase.sheet.sheetName}
            onChange={(e) => this.sheetUseCase.updateField(e)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            select
            label="点検グループ"
            variant="outlined"
            size="small"
            name="inspectionGroupId"
            value={this.sheetUseCase.sheet.inspectionGroupId}
            onChange={(e) => this.sheetUseCase.updateField(e)}
          >
            {this.groupUseCase.groups.map((group: InspectionGroup) => (
              <MenuItem
                key={group.inspectionGroupId}
                value={group.inspectionGroupId}
              >
                {group.description}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={InputStyle}
            select
            label="点検タイプ"
            variant="outlined"
            size="small"
            name="inspectionTypeId"
            value={this.sheetUseCase.sheet.inspectionTypeId}
            onChange={(e) => this.sheetUseCase.updateField(e)}
          >
            {this.typeUseCase.types.map((type: InspectionType) => (
              <MenuItem
                key={type.inspectionTypeId}
                value={type.inspectionTypeId}
              >
                {type.description}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {this.sheetUseCase.sheet.equipments.map(
          (equipment: Equipment, index: number) => (
            // eslint-disable-next-line
            <Grid item xs={12} key={`equipment-${index}`}>
              <EquipmentForm
                index={index}
                equipment={equipment}
                handleAddItem={handleAddItem}
                handleEditItem={handleEditItem}
              // storeHistory={storeHistory}
              />
            </Grid>
          )
        )}
      </Grid>
    );
  }
}
