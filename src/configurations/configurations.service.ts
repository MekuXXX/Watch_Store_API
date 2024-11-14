import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleDB } from 'src/db/drizzle';
import { configurations } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ConfigurationsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createConfigurationDto: CreateConfigurationDto) {
    const configuration = (
      await this.db
        .insert(configurations)
        .values(createConfigurationDto)
        .returning()
    )[0];

    return {
      success: true,
      message: 'Configuration created successfully',
      data: { configuration },
    };
  }

  async findAll() {
    return await this.db.select().from(configurations);
  }

  async findOne(key: string) {
    const configuration = (
      await this.db
        .select()
        .from(configurations)
        .where(eq(configurations.key, key))
    )[0];

    if (!Object.keys(configuration).length) {
      throw new NotFoundException('Configuration key is not found');
    }

    return {
      success: true,
      message: 'Configuration has gotten successfully',
      data: { configuration },
    };
  }

  async update(key: string, updateConfigurationDto: UpdateConfigurationDto) {
    if (!Object.keys(updateConfigurationDto).length) {
      throw new BadRequestException(
        'Must provide data for update configuration',
      );
    }

    const oldConfiguration = (
      await this.db
        .select()
        .from(configurations)
        .where(eq(configurations.key, key))
    )[0];

    if (!Object.keys(oldConfiguration).length) {
      throw new NotFoundException('Configuration key is not found');
    }

    const configuration = await this.db
      .update(configurations)
      .set(updateConfigurationDto)
      .where(eq(configurations.id, oldConfiguration.id))
      .returning()[0];

    return {
      success: true,
      message: 'Configuration updated successfully',
      data: { configuration },
    };
  }

  async remove(key: string) {
    const configuration = (
      await this.db
        .select()
        .from(configurations)
        .where(eq(configurations.key, key))
    )[0];

    if (!Object.keys(configuration).length) {
      throw new NotFoundException('Configuration key is not found');
    }

    await this.db
      .delete(configurations)
      .where(eq(configurations.id, configuration.id));

    return {
      success: true,
      message: 'Configuration deleted successfully',
      data: { configuration },
    };
  }
}
