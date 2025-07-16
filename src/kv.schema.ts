import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as _Schema } from 'mongoose';

export type KVDocument = HydratedDocument<KV>;

@Schema()
export class KV {
  @Prop()
  key: string;

  @Prop({ type: _Schema.Types.Mixed, required: true })
  value: any;

  @Prop()
  timestamp: number;
}

export const KVSchema = SchemaFactory.createForClass(KV);
