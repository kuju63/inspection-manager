﻿//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Entities;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InspectionManager.Infrastructure
{
    public class InspectionSheetRepository : IInspectionSheetRepository
    {
        private readonly InspectionContext _context;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of InspectionSheetRepository class.
        /// </summary>
        /// <param name="context">Database context</param>
        /// <param name="mapper">O/R mapper object</param>
        public InspectionSheetRepository(InspectionContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <inheritdoc/>
        public bool InspectionSheetExists(int id)
        {
            if (_context.InspectionSheets != null)
            {
                var sheetExists = _context.InspectionSheets.Any(s => s.SheetId == id);
                return sheetExists;
            }
            else
            {
                return false;
            }
        }

        /// <inheritdoc/>
        public IEnumerable<InspectionSheetDto> GetAllInspectionSheets()
        {
            if (_context.InspectionSheets != null)
            {
                var entities = _context.InspectionSheets
                    .Select(x => _mapper.Map<InspectionSheetDto>(x))
                    .ToList();
                return entities;
            }
            else
            {
                return new List<InspectionSheetDto>();
            }
        }

        /// <inheritdoc/>
        public InspectionSheetDto? GetInspectionSheet(int id)
        {
            if (_context.InspectionSheets != null)
            {
                var entity = _context.InspectionSheets.Single(x => x.SheetId == id);
                if (_context.InspectionGroups != null)
                {
                    entity.InspectionGroup = _context.InspectionGroups
                        .Single(x => x.InspectionGroupId == entity.InspectionGroupId);
                }
                if (_context.InspectionTypes != null)
                {
                    entity.InspectionType = _context.InspectionTypes
                        .Single(x => x.InspectionTypeId == entity.InspectionTypeId);
                }
                if (_context.Equipments != null)
                {
                    entity.Equipments = _context.Equipments
                        .Where(x => x.InspectionSheetId == entity.SheetId)
                        .OrderBy(x => x.OrderIndex)
                        .ToList();
                }
                if (_context.InspectionItems != null)
                {
                    foreach (var equipment in entity.Equipments)
                    {
                        equipment.InspectionItems = _context.InspectionItems
                            .Where(x => x.EquipmentId == equipment.EquipmentId)
                            .OrderBy(x => x.OrderIndex)
                            .ToList();
                    }
                }
                if (_context.Choices != null)
                {
                    foreach (var equipment in entity.Equipments)
                    {
                        foreach (var inspectionItem in equipment.InspectionItems)
                        {
                            inspectionItem.Choices = _context.Choices
                                .Where(x => x.InspectionItemId == inspectionItem.InspectionItemId)
                                .OrderBy(x => x.OrderIndex)
                                .ToList();
                        }
                    }
                }
                var dto = _mapper.Map<InspectionSheetDto>(entity);

                return dto;
            }
            else
            {
                return null;
            }
        }

        /// <inheritdoc/>
        public async Task<InspectionSheetDto> CreateInspectionSheetAsync(InspectionSheetDto dto)
        {
            if (_context.InspectionSheets != null)
            {
                var entity = _mapper.Map<InspectionSheet>(dto);
                int equipmentOrder = 0;
                foreach (var equipment in entity.Equipments)
                {
                    equipment.OrderIndex = equipmentOrder;

                    var itemOrder = 0;
                    foreach (var inspectionItem in equipment.InspectionItems)
                    {
                        inspectionItem.OrderIndex = itemOrder;
                        if (_context.InputTypes != null)
                        {
                            inspectionItem.InputType = _context.InputTypes
                                .Single(x => x.InputTypeId == inspectionItem.InputTypeId);
                        }
                        itemOrder++;
                    }

                    equipmentOrder++;
                }

                if (_context.InspectionTypes != null && _context.InspectionGroups != null)
                {
                    entity.InspectionGroup = _context.InspectionGroups
                        .Single(x => x.InspectionGroupId == entity.InspectionGroupId);
                    entity.InspectionType = _context.InspectionTypes
                        .Single(x => x.InspectionTypeId == entity.InspectionTypeId);
                }
                await _context.InspectionSheets.AddAsync(entity);
                await _context.SaveChangesAsync();

                return _mapper.Map<InspectionSheetDto>(entity);
            }
            else
            {
                return new InspectionSheetDto();
            }
        }

        /// <inheritdoc/>
        public async Task<InspectionSheetDto> UpdateInspectionSheetAsync(InspectionSheetDto dto)
        {
            if (_context.InspectionSheets != null)
            {
                var entity = _mapper.Map<InspectionSheet>(dto);
                int equipmentOrder = 0;
                foreach (var equipment in entity.Equipments)
                {
                    equipment.OrderIndex = equipmentOrder;

                    var itemOrder = 0;
                    foreach (var inspectionItem in equipment.InspectionItems)
                    {
                        inspectionItem.OrderIndex = itemOrder;
                        if (_context.InputTypes != null)
                        {
                            inspectionItem.InputType = _context.InputTypes
                                .Single(x => x.InputTypeId == inspectionItem.InputTypeId);
                        }
                        itemOrder++;
                    }

                    equipmentOrder++;
                }

                if (_context.InspectionTypes != null && _context.InspectionGroups != null)
                {
                    entity.InspectionGroup = _context.InspectionGroups
                        .Single(x => x.InspectionGroupId == entity.InspectionGroupId);
                    entity.InspectionType = _context.InspectionTypes
                        .Single(x => x.InspectionTypeId == entity.InspectionTypeId);
                }

                if (_context.Equipments != null)
                {
                    var equipmentIds = entity.Equipments.Select(x => x.EquipmentId);
                    var equipments = _context.Equipments
                        .Where(x => x.InspectionSheetId == entity.SheetId)
                        .Where(x => !equipmentIds.Contains(x.EquipmentId));
                    _context.Equipments.RemoveRange(equipments);
                }

                if (_context.InspectionItems != null)
                {
                    foreach (var equipment in entity.Equipments)
                    {
                        var inspectionItemIds = equipment.InspectionItems.Select(x => x.InspectionItemId);
                        var inspectionItems = _context.InspectionItems
                            .Where(x => x.EquipmentId == equipment.EquipmentId)
                            .Where(x => !inspectionItemIds.Contains(x.InspectionItemId));
                        _context.InspectionItems.RemoveRange(inspectionItems);
                    }
                }

                if (_context.Choices != null)
                {
                    foreach (var equipment in entity.Equipments)
                    {
                        foreach (var inspectionItem in equipment.InspectionItems)
                        {
                            var choiceIds = inspectionItem.Choices.Select(x => x.ChoiceId);
                            var choices = _context.Choices
                                .Where(x => x.ChoiceId == inspectionItem.InspectionItemId)
                                .Where(x => !choiceIds.Contains(x.ChoiceId));
                            _context.Choices.RemoveRange(choices);
                        }
                    }
                }

                _context.InspectionSheets.Update(entity);
                await _context.SaveChangesAsync();

                return _mapper.Map<InspectionSheetDto>(entity);
            }
            else
            {
                return new InspectionSheetDto();
            }
        }

        /// <inheritdoc/>
        public async Task<InspectionSheetDto> DeleteInspectionSheetAsync(int id)
        {
            if (_context.InspectionSheets != null)
            {
                var entity = _context.InspectionSheets
                    .Single(s => s.SheetId == id);
                if (entity != null)
                {
                    _context.InspectionSheets.Remove(entity);
                    await _context.SaveChangesAsync();
                    return _mapper.Map<InspectionSheetDto>(entity);
                }
                else
                {
                    return new InspectionSheetDto();
                }
            }
            else
            {
                return new InspectionSheetDto();
            }
        }
    }
}
