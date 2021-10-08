import { APIConstants } from "./api-constants";

export class AppConstants {

    public static ROUTE_PATH_ITEM_MASTER_UPLOAD = "item-master-upload";
    public static ROUTE_PATH_CUSTOMER_MASTER_UPLOAD = "customer-master-upload";
    public static ROUTE_PATH_COMPONENT_MASTER_UPLOAD = "component-master-upload";
    public static ROUTE_PATH_ASSEMBLY_MASTER_UPLOAD = "assembly-master-upload";
    public static ROUTE_PATH_IM_RAW_MAT_MASTER_UPLOAD = "im-raw-materials-master-upload";

    public static ROUTE_PATH_ITEM_MASTER_ADD_OR_EDIT = "item-master";
    public static ROUTE_PATH_CUSTOMER_MASTER_ADD_OR_EDIT = "customer-master";
    public static ROUTE_PATH_COMPONENT_MASTER_ADD_OR_EDIT = "component-master";
    public static ROUTE_PATH_ASSEMBLY_MASTER_ADD_OR_EDIT = "assembly-master";
    public static ROUTE_PATH_IM_RAW_MAT_MASTER_ADD_OR_EDIT = "im-raw-materials-master";

    public static ROUTE_PATH_ITEM_MASTER_EXPORT = "item-master-export";
    public static ROUTE_PATH_CUSTOMER_MASTER_EXPORT = "customer-master-export";
    public static ROUTE_PATH_COMPONENT_MASTER_EXPORT = "component-master-export";
    public static ROUTE_PATH_ASSEMBLY_MASTER_EXPORT = "assembly-master-export";
    public static ROUTE_PATH_IM_RAW_MAT_MASTER_EXPORT = "im-raw-materials-master-export";

    
    public static FILE_PATH_ITEM_MASTER: string = "item-master/";
    public static FILE_PATH_CUSTOMER_MASTER: string = "customer-master/";
    public static FILE_PATH_COMPONENT_MASTER: string = "component-master/";
    public static FILE_PATH_ASSEMBLY_MASTER: string = "assembly-master/";
    public static FILE_PATH_IM_RAW_MAT_MASTER: string = "im-raw-mat-master/";
    
    public static FILE_NAME_FIELD_DETAILS: string = "field_details.json";
    public static FILE_NAME_FIELD_INFO: string = "field_info.json";

    public static FILE_PATH_UPLOAD: string = "./../../../../assets/json/";

    public static ERR_MSG_MISSING_MANDATORY_FIELDS: string = "Mandatory fields are missing ";
    public static ERR_MSG_INVALID_LENGTH_FIELDS: string = "Fields length has exceeded ";

    public static PAGE_TITLE_ITEM_MASTER_UPLOAD: string = "ITEM MASTER UPLOAD";
    public static PAGE_TITLE_CUSTOMER_MASTER_UPLOAD: string = "CUSTOMER MASTER UPLOAD";
    public static PAGE_TITLE_COMPONENT_MASTER_UPLOAD: string = "COMPONENT MASTER UPLOAD";
    public static PAGE_TITLE_ASSEMBLY_MASTER_UPLOAD: string = "ASSEMBLY MASTER UPLOAD";
    public static PAGE_TITLE_IM_RAW_MAT_MASTER_UPLOAD: string = "ITEM MASTER RAW MATERIALS UPLOAD";

    public static PAGE_TITLE_ITEM_MASTER_EXPORT: string = "ITEM MASTER EXPORT";
    public static PAGE_TITLE_CUSTOMER_MASTER_EXPORT: string = "CUSTOMER MASTER EXPORT";
    public static PAGE_TITLE_COMPONENT_MASTER_EXPORT: string = "COMPONENT MASTER EXPORT";
    public static PAGE_TITLE_ASSEMBLY_MASTER_EXPORT: string = "ASSEMBLY MASTER EXPORT";
    public static PAGE_TITLE_IM_RAW_MAT_MASTER_EXPORT: string = "ITEM MASTER RAW MATERIALS UPLOAD";

    public static PAGE_TITLE_ITEM_MASTER: string = "ITEM MASTER";
    public static PAGE_TITLE_CUSTOMER_MASTER: string = "CUSTOMER MASTER";
    public static PAGE_TITLE_COMPONENT_MASTER: string = "COMPONENT MASTER";
    public static PAGE_TITLE_ASSEMBLY_MASTER: string = "ASSEMBLY MASTER";
    public static PAGE_TITLE_IM_RAW_MAT_MASTER: string = "ITEM MASTER RAW MATERIALS UPLOAD";

    public static FORM_GROUP_TITLES: {[key: string]: string} = {
        // "itemMaster": "ITEM MASTER",
        "itemMasterProcessFlow": "PROCESS FLOW",
        "itemMasterFinishFlow": "FINISH FLOW",
        "itemMasterQA": "QUALITY ANALYSIS",
        "itemMasterAddon": "ADD-ON FIELDS",
        //"itemMasterImage": "IMAGES"
    }
    public static INPUT_VALUES_UPLOAD: {[key: string]: {}} = {
        [AppConstants.ROUTE_PATH_ITEM_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_ITEM_MASTER,
            "apiUrl": APIConstants.ITEM_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_ITEM_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_CUSTOMER_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_CUSTOMER_MASTER,
            "apiUrl": APIConstants.CUSTOMER_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_CUSTOMER_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_COMPONENT_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_COMPONENT_MASTER,
            "apiUrl": APIConstants.COMPONENT_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_COMPONENT_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_ASSEMBLY_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_ASSEMBLY_MASTER,
            "apiUrl": APIConstants.ASSEMBLY_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_ASSEMBLY_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_IM_RAW_MAT_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_IM_RAW_MAT_MASTER,
            "apiUrl": APIConstants.IM_RAW_MAT_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_IM_RAW_MAT_MASTER_UPLOAD,
        },
    }
    public static INPUT_VALUES_ADD_OR_EDIT: {[key: string]: {}} = {
        [AppConstants.ROUTE_PATH_ITEM_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_ITEM_MASTER,
            "apiUrl": APIConstants.ITEM_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_ITEM_MASTER,
            "searchUrl": APIConstants.ITEM_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_CUSTOMER_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_CUSTOMER_MASTER,
            "apiUrl": APIConstants.CUSTOMER_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_CUSTOMER_MASTER,
            "searchUrl": APIConstants.CUSTOMER_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_COMPONENT_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_COMPONENT_MASTER,
            "apiUrl": APIConstants.COMPONENT_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_COMPONENT_MASTER,
            "searchUrl": APIConstants.COMPONENT_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_ASSEMBLY_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_ASSEMBLY_MASTER,
            "apiUrl": APIConstants.ASSEMBLY_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_ASSEMBLY_MASTER,
            "searchUrl": APIConstants.ASSEMBLY_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_IM_RAW_MAT_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_IM_RAW_MAT_MASTER,
            "apiUrl": APIConstants.IM_RAW_MAT_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_IM_RAW_MAT_MASTER,
            "searchUrl": APIConstants.IM_RAW_MAT_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        }
    }

    public static INPUT_VALUES_EXCEL_EXPORT: {[key: string]: {}} = {
        [AppConstants.ROUTE_PATH_ITEM_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_ITEM_MASTER,
            "apiUrl": APIConstants.ITEM_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_ITEM_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_CUSTOMER_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_CUSTOMER_MASTER,
            "apiUrl": APIConstants.CUSTOMER_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_CUSTOMER_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_COMPONENT_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_COMPONENT_MASTER,
            "apiUrl": APIConstants.COMPONENT_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_COMPONENT_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_ASSEMBLY_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_ASSEMBLY_MASTER,
            "apiUrl": APIConstants.ASSEMBLY_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_ASSEMBLY_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_IM_RAW_MAT_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_IM_RAW_MAT_MASTER,
            "apiUrl": APIConstants.IM_RAW_MAT_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_IM_RAW_MAT_MASTER_EXPORT,
        }
    }
}