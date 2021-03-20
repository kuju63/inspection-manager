﻿//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using Microsoft.Extensions.Logging;
using NPOI.SS.UserModel;

namespace InspectionManager.ApplicationCore.Interfaces
{
    public class ExcelDownloadService : IExcelDownloadService
    {
        private readonly IInspectionSheetRepository _repository;
        private readonly ILogger<ExcelDownloadService> _logger;

        /// <summary>
        /// Initializes a new instance of ExcelDownloadService class.
        /// </summary>
        /// <param name="repository">Inspection data access object</param>
        /// <param name="logger">logger object</param>
        public ExcelDownloadService(
            IInspectionSheetRepository repository,
            ILogger<ExcelDownloadService> logger
        )
        {
            _repository = repository;
            _logger = logger;
        }

        public IWorkbook CreateXlsx(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}
