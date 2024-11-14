import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ConfigurationsService } from './configurations.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { Roles } from 'src/decorators/role';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Configurations')
@Roles(['admin'])
@UseInterceptors(CacheInterceptor)
@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new configuration',
    description:
      'Create a configuration entry. Only admins can access this route.',
  })
  @ApiBody({
    type: CreateConfigurationDto,
    examples: {
      example: {
        summary: 'Example create configuration request',
        value: {
          key: 'tax_rate',
          value: '15%',
          description: 'Tax rate for orders',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Configuration created successfully',
    schema: {
      example: {
        success: true,
        message: 'Configuration created successfully',
        data: { configuration: { id: '1234', key: 'tax_rate', value: '15%' } },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only admins can access this route',
    schema: { example: { success: false, message: 'Forbidden' } },
  })
  create(@Body() createConfigurationDto: CreateConfigurationDto) {
    return this.configurationsService.create(createConfigurationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all configurations',
    description:
      'Retrieve a list of all configurations. Only admins can access this route.',
  })
  @ApiOkResponse({
    description: 'All configurations retrieved successfully',
    schema: { example: [{ id: '1234', key: 'tax_rate', value: '15%' }] },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only admins can access this route',
    schema: { example: { success: false, message: 'Forbidden' } },
  })
  findAll() {
    return this.configurationsService.findAll();
  }

  @Get(':key')
  @ApiOperation({
    summary: 'Get a configuration by key',
    description:
      'Retrieve a specific configuration by its key. Only admins can access this route.',
  })
  @ApiParam({
    name: 'key',
    description: 'The key of the configuration to retrieve',
    example: 'tax_rate',
  })
  @ApiOkResponse({
    description: 'Configuration retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Configuration has gotten successfully',
        data: { configuration: { id: '1234', key: 'tax_rate', value: '15%' } },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Configuration key is not found',
    schema: {
      example: { success: false, message: 'Configuration key is not found' },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only admins can access this route',
    schema: { example: { success: false, message: 'Forbidden' } },
  })
  findOne(@Param('key') key: string) {
    return this.configurationsService.findOne(key);
  }

  @Patch(':key')
  @ApiOperation({
    summary: 'Update a configuration by key',
    description:
      'Update a configuration entry by key. Only admins can access this route.',
  })
  @ApiParam({
    name: 'key',
    description: 'The key of the configuration to update',
    example: 'tax_rate',
  })
  @ApiBody({
    type: UpdateConfigurationDto,
    examples: {
      example: {
        summary: 'Example update configuration request',
        value: { value: '18%' },
      },
    },
  })
  @ApiOkResponse({
    description: 'Configuration updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Configuration updated successfully',
        data: { configuration: { id: '1234', key: 'tax_rate', value: '18%' } },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Must provide data for update configuration',
    schema: {
      example: {
        success: false,
        message: 'Must provide data for update configuration',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Configuration key is not found',
    schema: {
      example: { success: false, message: 'Configuration key is not found' },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only admins can access this route',
    schema: { example: { success: false, message: 'Forbidden' } },
  })
  update(
    @Param('key') key: string,
    @Body() updateConfigurationDto: UpdateConfigurationDto,
  ) {
    return this.configurationsService.update(key, updateConfigurationDto);
  }

  @ApiOperation({
    summary: 'Delete a configuration by key',
    description:
      'Delete a specific configuration entry by its key. Only admins can access this route.',
  })
  @ApiParam({
    name: 'key',
    description: 'The key of the configuration to delete',
    example: 'tax_rate',
  })
  @ApiOkResponse({
    description: 'Configuration deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'Configuration deleted successfully',
        data: { configuration: { id: '1234', key: 'tax_rate', value: '15%' } },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Configuration key is not found',
    schema: {
      example: { success: false, message: 'Configuration key is not found' },
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Only admins can access this route',
    schema: { example: { success: false, message: 'Forbidden' } },
  })
  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.configurationsService.remove(key);
  }
}
