import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IP_REGEX } from '../../common/constants';

export type IpDocument = HydratedDocument<Ip>;

@Schema({ timestamps: true })
export class Ip {
  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => IP_REGEX.test(v),
      message: (props: { value: string }) =>
        `${props.value} is not a valid IP address`,
    },
  })
  address: string;

  @Prop()
  description: string;
}

export const IpSchema = SchemaFactory.createForClass(Ip);
