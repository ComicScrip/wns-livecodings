import { InsertOrUpdateOptions } from "../query-builder/InsertOrUpdateOptions";
/**
 * Special options passed to Repository#upsert
 */
export interface UpsertOptions<Entity> extends InsertOrUpdateOptions {
    conflictPaths: string[] | {
        [P in keyof Entity]?: true;
    };
    /**
     * If true, postgres will skip the update if no values would be changed (reduces writes)
     */
    skipUpdateIfNoValuesChanged?: boolean;
}
