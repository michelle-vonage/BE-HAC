import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IpDocument = HydratedDocument<Ip>;

@Schema({ timestamps: true })
export class Ip {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop()
  description: string;
}

export const IpSchema = SchemaFactory.createForClass(Ip);
