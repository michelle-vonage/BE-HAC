import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IpDocument = HydratedDocument<Ip>;

const IP_REGEX =
  /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(([0-9a-fA-F]{1,4}:)*:([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}))$/;

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
