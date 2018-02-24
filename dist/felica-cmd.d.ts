export declare enum FELICA_COMMAND {
    CC_POLLING = 0,
    RC_POLLING = 1,
    CC_REQUEST_SERVICE = 2,
    RC_REQUEST_SERVICE = 3,
    CC_REQUEST_RESPONCE = 4,
    RC_REQUEST_RESPONCE = 5,
    CC_READ_WITHOUT_ENCRYPTION = 6,
    RC_READ_WITHOUT_ENCRYPTION = 7,
    CC_WRITE_WITHOUT_ENCRYPTION = 8,
    RC_WRITE_WITHOUT_ENCRYPTION = 9,
    CC_SEARCH_SERVICE_CODE = 10,
    RC_SEARCH_SERVICE_CODE = 11,
    CC_REQUEST_SYSTEM_CODE = 12,
    RC_REQUEST_SYSTEM_CODE = 13,
    CC_AUTHENTICATION1 = 16,
    RC_AUTHENTICATION1 = 17,
    CC_AUTHENTICATION2 = 18,
    RC_AUTHENTICATION2 = 19,
    CC_READ = 20,
    RC_READ = 21,
    CC_Write = 22,
    RC_Write = 23,
    CC_REQUEST_SERVICE_V2 = 50,
    RC_REQUEST_SERVICE_V2 = 51,
    CC_GET_SYSTEM_STATUS = 56,
    RC_GET_SYSTEM_STATUS = 57,
    CC_REQUEST_SPECIFICATION_VERSION = 60,
    RC_REQUEST_SPECIFICATION_VERSION = 60,
    CC_RESET_MODE = 62,
    RC_RESET_MODE = 62,
    CC_AUTHENTICATION1V2 = 64,
    RC_AUTHENTICATION1V2 = 65,
    CC_AUTHENTICATION2V2 = 66,
    RC_AUTHENTICATION2V2 = 67,
    CC_ReadV2 = 68,
    RC_ReadV2 = 69,
    CC_WriteV2 = 70,
    RC_WriteV2 = 71,
    CC_UPDATE_RANDOM_ID = 76,
    RC_UPDATE_RANDOM_ID = 76,
}
export declare enum ServiceAttribute {
    RANDOM_SERVICE_READ_WRITE_ACCESS_AUTHENTICATION_REQUIRED = 8,
    RANDOM_SERVICE_READ_WRITE_ACCESS_AUTHENTICATION_NOT_REQUIRED = 9,
    RANDOM_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_REQUIRED = 10,
    RANDOM_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_NOT_REQUIRED = 11,
    CYCLE_SERVICE_READ_WRITE_ACCESS_AUTHENTICATION_REQUIRED = 12,
    CYCLE_SERVICE_READ_WRITE_ACCESS_AUTHENTICATION_NOT_REQUIRED = 13,
    CYCLE_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_REQUIRED = 14,
    CYCLE_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_NOT_REQUIRED = 15,
    PURSE_SERVICE_DIRECT_ACCESS_AUTHENTICATION_REQUIRED = 16,
    PURSE_SERVICE_DIRECT_ACCESS_AUTHENTICATION_NOT_REQUIRED = 17,
    PURSE_SERVICE_CALLBACK_ACCESS_DECREMENT_ACCESS_AUTHENTICATION_REQUIRED = 18,
    PURSE_SERVICE_CALLBACK_ACCESS_DECREMENT_ACCESS_AUTHENTICATION_NOT_REQUIRED = 19,
    PURSE_SERVICE_DECREMENT_ACCESS_AUTHENTICATION_REQUIRED = 20,
    PURSE_SERVICE_DECREMENT_ACCESS_AUTHENTICATION_NOT_REQUIRED = 21,
    PURSE_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_REQUIRED = 22,
    PURSE_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_NOT_REQUIRED = 23,
}
export declare enum BlockElementAccessMode {
    NOT_CASHBACK_ACCESS_TO_PURSE_SERVICE = 0,
    CASHBACK_ACCESS_TO_PURSE_SERVICE = 1,
}
export interface IIDm {
    manufacturerCode: number;
    cardIdentificationNumber: number;
}
export interface IPMm {
    icCode: number;
    maximumResponseTimeParameters: number;
}
export interface IAreaCode {
    areaNumber: number;
    areaAttribute: 0b000000 | 0b000001;
}
export interface IServiceCode {
    serviceNumber: number;
    serviceAttribute: ServiceAttribute;
}
export interface ICCPolling {
    commandCode: FELICA_COMMAND.CC_POLLING;
    systemCode: number;
    requestCode: 0x00 | 0x01 | 0x02;
    timeSlot: 0x00 | 0x01 | 0x03 | 0x07 | 0x0F;
}
export interface IRCPolling {
    responseCode: FELICA_COMMAND.RC_POLLING;
    idm: number[];
    pmm: number[];
    requestData?: number;
}
export interface ICCRequestService {
    commandCode: FELICA_COMMAND.CC_REQUEST_SERVICE;
    idm: number[];
    numberOfNode: number;
    nodeCodeList: number[];
}
export interface IRCRequestService {
    responseCode: FELICA_COMMAND.RC_REQUEST_SERVICE;
    idm: number[];
    numberOfNode: number;
    nodeKeyVersionList: number[];
}
export interface ICCRequestResponce {
    commandCode: FELICA_COMMAND.CC_REQUEST_RESPONCE;
    idm: number[];
}
export interface IRCRequestResponce {
    responseCode: FELICA_COMMAND.RC_REQUEST_RESPONCE;
    idm: number[];
    mode: 0x01 | 0x01 | 0x02 | 0x03;
}
export interface IByteBlockElement {
    length: number;
    serviceCodeListOrder: number;
    accessMode: number;
    blockNumber: number;
}
export interface ITwoByteBlockElement extends IByteBlockElement {
    length: 0b1;
}
export interface IThreeByteBlockElement extends IByteBlockElement {
    length: 0b0;
}
export interface ICCReadWithoutEncryption {
    commandCode: FELICA_COMMAND.CC_READ_WITHOUT_ENCRYPTION;
    idm: number[];
    numberOfService: number;
    serviceCodeList: number[];
    numberOfBlock: number;
    blockList: IByteBlockElement[];
}
export interface IRCReadWithoutEncryption {
    responseCode: FELICA_COMMAND.RC_READ_WITHOUT_ENCRYPTION;
    idm: number[];
    statusFlag1: number;
    statusFlag2: number;
    numberOfBlock: number;
    blockData: number[];
}
export interface ICCWriteWithoutEncryption {
    commandCode: FELICA_COMMAND.CC_WRITE_WITHOUT_ENCRYPTION;
    idm: number[];
    numberOfService: number;
    serviceCodeList: number[];
    numberOfBlock: number;
    blockList: IByteBlockElement[];
}
export interface IRCWriteWithoutEncryption {
    responseCode: FELICA_COMMAND.RC_WRITE_WITHOUT_ENCRYPTION;
    idm: number[];
    statusFlag1: number;
    statusFlag2: number;
}
export interface ICCRequestSystemCode {
    commandCode: FELICA_COMMAND.CC_REQUEST_SYSTEM_CODE;
    idm: number[];
}
export interface IRCRequestSystemCode {
    responseCode: FELICA_COMMAND.RC_REQUEST_SYSTEM_CODE;
    idm: number[];
    numberOfSystemCode: number;
    systemCodeList: number[];
}
export interface ICCRequestServiceV2 {
    commandCode: FELICA_COMMAND.CC_REQUEST_SERVICE_V2;
    idm: number[];
    numberOfNode: number;
    nodeCodeList: number[];
}
export interface IRCRequestServiceV2 {
    responseCode: FELICA_COMMAND.RC_REQUEST_SERVICE_V2;
    idm: number[];
    statusFlag1: number;
    statusFlag2: number;
    encryptionIdentifier: number;
    numberOfNode: number;
    NodeKeyVersionListAES: number[];
    NodeKeyVersionListDES: number[];
}
export interface ICCRequestSpecificationVersion {
    commandCode: FELICA_COMMAND.CC_REQUEST_SPECIFICATION_VERSION;
    idm: number[];
    reserved: number;
}
export interface IRCRequestSpecificationVersion {
    responseCode: FELICA_COMMAND.RC_REQUEST_SPECIFICATION_VERSION;
    idm: number[];
    statusFlag1: number;
    statusFlag2: number;
    formatVersion: number;
    basicVersion: number;
    numberOfOption: number;
    optionVersionList: number[];
}
export interface ICCResetMode {
    commandCode: FELICA_COMMAND.CC_RESET_MODE;
    idm: number[];
    reserved: 0x0000;
}
export interface IRCResetMode {
    commandCode: FELICA_COMMAND.RC_RESET_MODE;
    idm: number[];
    statusFlag1: number;
    statusFlag2: number;
}
