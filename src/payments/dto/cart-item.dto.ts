import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CartItemDto {
  
  @ApiProperty({example: "afc81383-2f9f-4af9-906e-e8cd09c1d96e"})
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  product_id: string;


  @ApiProperty({example: 2})
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}