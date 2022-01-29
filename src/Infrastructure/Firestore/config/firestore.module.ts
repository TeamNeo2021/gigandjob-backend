import { Module, DynamicModule } from '@nestjs/common';
import { Firestore, Settings } from '@google-cloud/firestore';
import { applyDecorators, SetMetadata } from "@nestjs/common";

export function Collection(name: string) {
    return applyDecorators(
        SetMetadata('COLLECTION_NAME', name)
    )
}

//REFERENCIA: https://ricardoromanj.com/posts/firestore-with-nestjs

const FirestoreOptionsProvider = 'firestoreOptions'
const FirestoreDatabaseProvider = 'firestoreDb'

type FirestoreModuleOptions = {
  imports: any[]
  useFactory: (...args: any[]) => Settings
  inject: any[]
  collections: any[]
};

@Module({})
export class FirestoreModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
	  const optionsProvider = {
      provide: FirestoreOptionsProvider,
      useFactory: options.useFactory,
      inject: options.inject,
    };

    const dbProvider = {
      provide: FirestoreDatabaseProvider,
      useFactory: (config) => new Firestore(config),
      inject: [FirestoreOptionsProvider],
    };

    const collectionProviders = options.collections.flatMap(collectionName => {
      return{
          provide: collectionName,
          useFactory: (db) => db.collection(collectionName),
          inject: [FirestoreDatabaseProvider],
      }
    });

    return {
        global: true,
        module: FirestoreModule,
        imports: options.imports,
        providers: [optionsProvider, dbProvider, ...collectionProviders],
        exports: [dbProvider, ...collectionProviders],
    };
  }
}
