import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateConfigurationDto } from './create-configuration.dto';

export class UpdateConfigurationDto extends PartialType(
  OmitType(CreateConfigurationDto, ['key']),
) {}
