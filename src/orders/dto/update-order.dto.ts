import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { ORDER_STATUS, OrderStatus } from 'src/db/schema';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'The status of the order',
    enum: ORDER_STATUS.enumValues,
    example: 'shipping',
  })
  @IsIn(ORDER_STATUS.enumValues, { message: 'Invalid order status' })
  status: OrderStatus;
}
