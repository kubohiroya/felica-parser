export enum FELICA_COMMAND  {
  CC_POLLING = 0x00,
  RC_POLLING = 0x01,
  CC_REQUEST_SERVICE = 0x02,
  RC_REQUEST_SERVICE = 0x03,
  CC_REQUEST_RESPONCE = 0x04,
  RC_REQUEST_RESPONCE = 0x05,
  CC_READ_WITHOUT_ENCRYPTION = 0x06,
  RC_READ_WITHOUT_ENCRYPTION = 0x07,
  CC_WRITE_WITHOUT_ENCRYPTION = 0x08,
  RC_WRITE_WITHOUT_ENCRYPTION = 0x09,
  CC_SEARCH_SERVICE_CODE = 0x0A,
  RC_SEARCH_SERVICE_CODE = 0x0B,
  CC_REQUEST_SYSTEM_CODE = 0x0C,
  RC_REQUEST_SYSTEM_CODE = 0x0D,
  CC_AUTHENTICATION1 = 0x10,
  RC_AUTHENTICATION1 = 0x11,
  CC_AUTHENTICATION2 = 0x12,
  RC_AUTHENTICATION2 = 0x13,
  CC_READ = 0x14,
  RC_READ = 0x15,
  CC_Write = 0x16,
  RC_Write = 0x17,
  CC_REQUEST_SERVICE_V2 = 0x32,
  RC_REQUEST_SERVICE_V2 = 0x33,
  CC_GET_SYSTEM_STATUS = 0x38,
  RC_GET_SYSTEM_STATUS = 0x39,
  CC_REQUEST_SPECIFICATION_VERSION = 0x3C,
  RC_REQUEST_SPECIFICATION_VERSION = 0x3C,
  CC_RESET_MODE = 0x3E,
  RC_RESET_MODE = 0x3E,
  CC_AUTHENTICATION1V2 = 0x40,
  RC_AUTHENTICATION1V2 = 0x41,
  CC_AUTHENTICATION2V2 = 0x42,
  RC_AUTHENTICATION2V2 = 0x43,
  CC_ReadV2 = 0x44,
  RC_ReadV2 = 0x45,
  CC_WriteV2 = 0x46,
  RC_WriteV2 = 0x47,
  CC_UPDATE_RANDOM_ID = 0x4C,
  RC_UPDATE_RANDOM_ID = 0x4C,
}
export enum ServiceAttribute {
  RANDOM_SERVICE_READ_WRITE_ACCESS_AUTHENTICATION_REQUIRED                   = 0b001000,
  RANDOM_SERVICE_READ_WRITE_ACCESS_AUTHENTICATION_NOT_REQUIRED               = 0b001001,
  RANDOM_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_REQUIRED                    = 0b001010,
  RANDOM_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_NOT_REQUIRED                = 0b001011,

  CYCLE_SERVICE_READ_WRITE_ACCESS_AUTHENTICATION_REQUIRED                    = 0b001100,
  CYCLE_SERVICE_READ_WRITE_ACCESS_AUTHENTICATION_NOT_REQUIRED                = 0b001101,
  CYCLE_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_REQUIRED                     = 0b001110,
  CYCLE_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_NOT_REQUIRED                 = 0b001111,

  PURSE_SERVICE_DIRECT_ACCESS_AUTHENTICATION_REQUIRED                        = 0b010000,
  PURSE_SERVICE_DIRECT_ACCESS_AUTHENTICATION_NOT_REQUIRED                    = 0b010001,
  PURSE_SERVICE_CALLBACK_ACCESS_DECREMENT_ACCESS_AUTHENTICATION_REQUIRED     = 0b010010,
  PURSE_SERVICE_CALLBACK_ACCESS_DECREMENT_ACCESS_AUTHENTICATION_NOT_REQUIRED = 0b010011,
  PURSE_SERVICE_DECREMENT_ACCESS_AUTHENTICATION_REQUIRED                     = 0b010100,
  PURSE_SERVICE_DECREMENT_ACCESS_AUTHENTICATION_NOT_REQUIRED                 = 0b010101,
  PURSE_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_REQUIRED                     = 0b010110,
  PURSE_SERVICE_READ_ONLY_ACCESS_AUTHENTICATION_NOT_REQUIRED                 = 0b010111,
}
export enum BlockElementAccessMode {
  NOT_CASHBACK_ACCESS_TO_PURSE_SERVICE = 0b000,
  CASHBACK_ACCESS_TO_PURSE_SERVICE     = 0b001,
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
  timeSlot: 0x00 | 0x01 |0x03 | 0x07 | 0x0F;
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
  numberOfNode: number; // 1 <= n <= 32
  nodeCodeList: number[]; // little endian
}
export interface IRCRequestService {
  responseCode: FELICA_COMMAND.RC_REQUEST_SERVICE;
  idm: number[];
  numberOfNode: number;
  nodeKeyVersionList: number[]; // little endian
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
  numberOfService: number; // 1 <= n <= 16
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
  numberOfService: number; // 1 <= n <= 16
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
  numberOfNode: number; // 1 <= n <= 32
  nodeCodeList: number[]; // little endian
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
