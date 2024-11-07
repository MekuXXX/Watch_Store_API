import { ValidateNested } from 'class-validator';
import { CartItemDto } from './cart-item.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentOrderDto {
  @ApiProperty({
    example: [
      {
        product_id: '3bae0f35-f08f-4086-9169-c9e2036aadc1',
        quantity: 5,
      },
      {
        product_id: 'd4335b9a-2a13-4acf-9dc9-7a565c989585',
        quantity: 3,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  cart_items: CartItemDto[];
}
