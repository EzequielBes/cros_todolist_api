import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountRepositoryTypeorm } from './account-repository-typeorm';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async (config: ConfigService) => {
        try {
          const dataSource = new DataSource(config.get('typeorm'));
          await dataSource.initialize();
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
