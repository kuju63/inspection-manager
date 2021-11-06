import React, { useState } from "react";
import {
  IInspectionGroupInteractor,
  IInspectionGroupRepository,
} from "../interfaces";
import { InspectionGroup } from "../entities";

export class InspectionGroupInteractor implements IInspectionGroupInteractor {
  readonly groups: InspectionGroup[];

  private readonly setGroups: React.Dispatch<
    React.SetStateAction<InspectionGroup[]>
  >;

  private readonly repository: IInspectionGroupRepository;

  constructor(repository: IInspectionGroupRepository) {
    const [groups, setGroups] = useState<InspectionGroup[]>([]);
    this.groups = groups;
    this.setGroups = setGroups;
    this.repository = repository;
  }

  get(): void {
    this.repository
      .get()
      .then((res) => {
        this.setGroups(res);
      })
      .catch(console.error);
  }

  getById(id: number): InspectionGroup | undefined {
    return this.groups.find((x) => x.inspectionGroupId === id);
  }

  async create(inspectionGroup: InspectionGroup): Promise<void> {
    const res = await this.repository.post(inspectionGroup);
    this.setGroups(this.groups.concat(res));
  }

  async update(inspectionGroup: InspectionGroup): Promise<void> {
    const res = await this.repository.put(inspectionGroup);
    this.setGroups(
      this.groups.map((x) =>
        x.inspectionGroupId === res.inspectionGroupId ? res : x
      )
    );
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
    this.setGroups(
      this.groups.filter((x: InspectionGroup) => x.inspectionGroupId !== id)
    );
  }
}
