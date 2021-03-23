﻿//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InspectionGroupController : ControllerBase
    {
        private readonly ICategoryRepository _repository;
        private readonly ILogger<InspectionGroupController> _logger;

        /// <summary>
        /// Initializes a new instance of InspectionGroupController class.
        /// </summary>
        /// <param name="repository">repository object</param>
        /// /// <param name="logger">logger object</param>
        public InspectionGroupController(
            ICategoryRepository repository,
            ILogger<InspectionGroupController> logger
        )
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<string[]> GetAllGroups()
        {
            try
            {
                _logger.LogInformation("try to get all inspection groups");
                // TODO: データ取得
                return Ok(new string[] { "hoge", "foo", "var" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpPost]
        public ActionResult<string[]> CreateGroups(string[]? groups)
        {
            try
            {
                _logger.LogInformation("try to create inspection sheet");
                if (groups == null)
                {
                    return BadRequest();
                }
                else
                {
                    // TODO: データ登録処理
                    var result = new string[] { "hoge1", "foo2", "var3" };
                    return CreatedAtAction(nameof(GetAllGroups), result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new inspection sheet"
                );
            }
        }
    }
}
