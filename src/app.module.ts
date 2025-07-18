import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KVSchema, KV } from './kv.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/kvs'),
    MongooseModule.forFeature([{ name: KV.name, schema: KVSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
