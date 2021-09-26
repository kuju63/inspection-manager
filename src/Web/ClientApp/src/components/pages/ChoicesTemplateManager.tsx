import React, { FC, useState, useEffect, useContext } from "react";
import { BottomNavigation, TableContainer, Grid, Paper } from "@mui/material";
import nameof from "ts-nameof.macro";
import { ChoiceTemplate } from "../../entities";
import {
  BottomNavigationAdd,
  Notification,
  NotificationInitState,
  NotificationStateInteractor,
} from "../utilities";
import { ChoiceTemplateEditDialog } from "../dialog";
import { DIContainerContext } from "../../App";
import {
  IChoiceTemplateController,
  IChoiceTemplatePresenter,
} from "../../interfaces";

export const ChoicesTemplateManager: FC = (): JSX.Element => {
  const container = useContext(DIContainerContext);
  const controller: IChoiceTemplateController = container.inject(
    nameof<IChoiceTemplateController>()
  );
  const presenter: IChoiceTemplatePresenter = container.inject(
    nameof<IChoiceTemplatePresenter>()
  );

  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<ChoiceTemplate>({
    choiceTemplateId: 0,
    choices: [],
  });
  const notification = new NotificationStateInteractor(
    useState(NotificationInitState)
  );

  useEffect(() => {
    presenter.get();
  }, []);

  /**
   * Creates new template set.
   */
  const handleAddTemplate = () => {
    setTarget({
      choiceTemplateId: 0,
      choices: [],
    });
    setIsUpdate(false);
    setOpen(true);
  };

  /**
   * Edit the specified template.
   * @param id The template ID to be edited.
   */
  const handleUpdateTemplate = (id: number) => {
    const template = presenter.getById(id);
    if (template != null) {
      setTarget(template);
      setIsUpdate(true);
      setOpen(true);
    }
  };

  /**
   * Add new template set.
   */
  const handleRegistration = () => {
    if (isUpdate) {
      controller
        .update(target)
        .then(() => {
          notification.setMessageState("success", "更新に成功しました");
        })
        .catch((error) => {
          console.error(error);
          notification.setMessageState("error", "更新に失敗しました");
        });
    } else {
      controller
        .create(target)
        .then(() => {
          notification.setMessageState("success", "追加に成功しました");
        })
        .catch((error) => {
          console.error(error);
          notification.setMessageState("error", "追加に失敗しました");
        });
    }
    setOpen(false);
  };

  /**
   * Removes the specified template.
   * @param id The template ID to be removed.
   */
  const handleDeleteTemplate = (id: number) => {
    controller
      .delete(id)
      .then(() => {
        notification.setMessageState("success", "削除に成功しました");
      })
      .catch((error) => {
        console.error(error);
        notification.setMessageState("error", "削除に失敗しました");
      });
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>選択肢テンプレート</h1>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            {presenter.choiceTemplateTable(
              handleUpdateTemplate,
              handleDeleteTemplate
            )}
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <BottomNavigation showLabels>
            <BottomNavigationAdd
              label="テンプレート追加"
              onClick={handleAddTemplate}
            />
          </BottomNavigation>
        </Grid>
      </Grid>
      <ChoiceTemplateEditDialog
        open={open}
        target={target}
        setTarget={setTarget}
        onOkButtonClick={() => handleRegistration()}
        onCancelButtonClick={() => setOpen(false)}
      />
      <Notification
        open={notification.state.isOpen}
        severity={notification.state.severity}
        message={notification.state.message}
        onClose={() => {
          notification.hideDisplay();
        }}
      />
    </>
  );
};
ChoicesTemplateManager.displayName = ChoicesTemplateManager.name;