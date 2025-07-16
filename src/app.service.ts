import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KV } from './kv.schema';
import { Model } from 'mongoose';
import { orderBy } from 'lodash';

@Injectable()
export class AppService {
  constructor(@InjectModel(KV.name) private kvModel: Model<KV>) {}

  async validateKV(kv: any) {
    if (kv === null || kv === undefined) {
      throw new BadRequestException('KV should includes key - value');
    }
    if (typeof kv !== 'object') {
      throw new BadRequestException('KV should includes key - value');
    }

    if (Object.keys(kv).length !== 1) {
      throw new BadRequestException('KV should includes ONLY ONE key - value');
    }
  }

  async upsert(kv: any) {
    this.validateKV(kv);
    const timestamp = new Date().getTime();
    const key = Object.keys(kv)[0];
    const value = kv[key];
    const doc = {
      key,
      value,
      timestamp,
    };
    await this.kvModel.insertOne(doc);
    return doc;
  }

  async query(key: string, timestamp?: number) {
    const condition = { key };
    if (timestamp) {
      condition['timestamp'] = { $lt: timestamp };
    }
    const docs = await this.kvModel.find(condition).lean();

    if (docs.length === 0) {
      throw new NotFoundException('not found this kv');
    }
    if (docs.length === 1) {
      const { key, value } = docs[0];
      return { [key]: value };
    }

    //order
    if (docs.length > 1) {
      const orderred = orderBy(docs, 'timestamp', 'desc');
      const { key, value } = orderred[0];
      return { [key]: value };
    }

    throw new BadRequestException('internal server error during query');
  }
}
