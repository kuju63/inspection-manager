﻿using System;
using System.ComponentModel.DataAnnotations;
using System.Net.Mime;
using System.Threading.Tasks;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers
{
    [ApiController]
    public class ChoiceTemplateController : ControllerBase
    {
        private readonly ICategoryRepository _repository;
        private readonly ILogger<ChoiceTemplateController> _logger;

        /// <summary>
        /// Initializes a new instance of ChoiceTemplateController class.
        /// </summary>
        /// <param name="repository">repository object</param>
        /// <param name="logger">logger object</param>
        public ChoiceTemplateController(
            ICategoryRepository repository,
            ILogger<ChoiceTemplateController> logger
        )
        {
            _repository = repository;
            _logger = logger;
        }

        /// <summary>
        /// Get all inspection types.
        /// </summary>
        /// <response code="200">A JSON array of InspectionType model</response>
        /// <response code="500">システムエラー Internal Server Error</response>
        [HttpGet]
        [Route("/v1/choice-templates")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ChoiceTemplateDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllChoiceTemplates()
        {
            try
            {
                _logger.LogInformation("try to get all choice template");
                var types = _repository.GetChoiceTemplates();
                return Ok(types);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpGet("{id:int}")]
        [Route("[controller]")]
        public ActionResult<ChoiceTemplateDto> GetChoiceTemplate(int id)
        {
            try
            {
                _logger.LogInformation($"try to get choice template {id}");

                var result = _repository.GetChoiceTemplate(id);
                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    return result;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpPost]
        [Route("[controller]")]
        public async Task<ActionResult<ChoiceTemplateDto>> CreateChoiceTemplate(ChoiceTemplateDto? dto)
        {
            try
            {
                _logger.LogInformation("try to create choice template");
                if (dto == null)
                {
                    return BadRequest();
                }
                else
                {
                    var result = await _repository.CreateChoiceTemplateAsync(dto);
                    return CreatedAtAction(nameof(GetChoiceTemplate),
                    new { id = result.ChoiceTemplateId }, result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new choice template"
                );
            }
        }

        [HttpPut("{id:int}")]
        [Route("[controller]")]
        public async Task<ActionResult<ChoiceTemplateDto>> UpdateChoiceTemplate(ChoiceTemplateDto dto)
        {
            try
            {
                _logger.LogInformation($"try to update choice template {dto.ChoiceTemplateId}");
                if (!_repository.ChoiceTemplateExists(dto.ChoiceTemplateId))
                {
                    return NotFound($"Template with Id = {dto.ChoiceTemplateId} not found");
                }
                return await _repository.UpdateChoiceTemplateAsync(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        [HttpDelete("{id:int}")]
        [Route("[controller]")]
        public async Task<ActionResult<ChoiceTemplateDto>> DeleteChoiceTemplateAsync(int id)
        {
            try
            {
                _logger.LogInformation($"try to delete choice template {id}");
                if (!_repository.ChoiceTemplateExists(id))
                {
                    return NotFound($"choice template with Id = {id} not found");
                }
                return await _repository.DeleteChoiceTemplateAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }
    }
}
