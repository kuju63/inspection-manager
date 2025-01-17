/* tslint:disable */
/* eslint-disable */
/**
 * API Specification
 * クライアント-サーバー間のデータ通信仕様
 *
 * The version of the OpenAPI document: 0.4.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InspectionSheet
 */
export interface InspectionSheet {
    /**
     * 
     * @type {number}
     * @memberof InspectionSheet
     */
    sheet_id: number;
    /**
     * 
     * @type {string}
     * @memberof InspectionSheet
     */
    sheet_name: string;
    /**
     * 
     * @type {number}
     * @memberof InspectionSheet
     */
    inspection_type_id: number;
    /**
     * 
     * @type {string}
     * @memberof InspectionSheet
     */
    inspection_type: string;
    /**
     * 
     * @type {number}
     * @memberof InspectionSheet
     */
    inspection_group_id: number;
    /**
     * 
     * @type {string}
     * @memberof InspectionSheet
     */
    inspection_group: string;
}

export function InspectionSheetFromJSON(json: any): InspectionSheet {
    return InspectionSheetFromJSONTyped(json, false);
}

export function InspectionSheetFromJSONTyped(json: any, ignoreDiscriminator: boolean): InspectionSheet {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sheet_id': json['sheet_id'],
        'sheet_name': json['sheet_name'],
        'inspection_type_id': json['inspection_type_id'],
        'inspection_type': json['inspection_type'],
        'inspection_group_id': json['inspection_group_id'],
        'inspection_group': json['inspection_group'],
    };
}

export function InspectionSheetToJSON(value?: InspectionSheet | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'sheet_id': value.sheet_id,
        'sheet_name': value.sheet_name,
        'inspection_type_id': value.inspection_type_id,
        'inspection_type': value.inspection_type,
        'inspection_group_id': value.inspection_group_id,
        'inspection_group': value.inspection_group,
    };
}


