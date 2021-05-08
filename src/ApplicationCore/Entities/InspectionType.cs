﻿//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System.Collections.Generic;

namespace InspectionManager.ApplicationCore.Entities
{
    public class InspectionType
    {
        public int InspectionTypeId { get; set; }
        public string Description { get; set; } = string.Empty;
        public List<InspectionSheet> InspectionSheets { get; set; } = new List<InspectionSheet>();
    }
}
