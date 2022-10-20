/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query Wilders {\n  wilders {\n    id\n    name\n    skills {\n      id\n      name\n      votes\n    }\n  }\n}": types.WildersDocument,
};

export function graphql(source: "query Wilders {\n  wilders {\n    id\n    name\n    skills {\n      id\n      name\n      votes\n    }\n  }\n}"): (typeof documents)["query Wilders {\n  wilders {\n    id\n    name\n    skills {\n      id\n      name\n      votes\n    }\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;