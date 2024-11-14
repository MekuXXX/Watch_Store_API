import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { ORDER_STATUS, OrderStatus } from 'src/db/schema';

export class UpdateOrderDto {
  @ApiProperty({
    description: `The status of the order (${ORDER_STATUS.enumValues.filter((status) => status !== 'await_payment').join(', ')})`,
    enum: ORDER_STATUS.enumValues.filter(
      (status) => status !== 'await_payment',
    ),
    example: 'shipping',
  })
  @IsIn(
    ORDER_STATUS.enumValues.filter((status) => status !== 'await_payment'),
    { message: 'Invalid order status' },
  )
  status: OrderStatus;
}
