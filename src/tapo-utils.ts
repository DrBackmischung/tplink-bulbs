import { base64Decode } from "./tplink-cipher"
import { TapoDevice } from "./types"
import { TapoErrorMessages } from './tapo-errors';

export const augmentTapoDevice = async (deviceInfo: TapoDevice): Promise<TapoDevice> => {
    if (isTapoDevice(deviceInfo.deviceType)) {
      return {
        ...deviceInfo,
        alias: base64Decode(deviceInfo.alias)
      }
    } else {
      return deviceInfo
    }
  }
  
  export const isTapoDevice = (deviceType: string) => {
    switch (deviceType) {
      case 'SMART.TAPOPLUG':
      case 'SMART.TAPOBULB':
      case 'SMART.IPCAMERA':
      return true
      default: return false
    }
  }
  
  export const checkError = (responseData: any) => {
    const errorCode = responseData["error_code"];
    if (!errorCode) {
      return;
    }

    if (errorCode === 0) {
      return;
    }

    const message = TapoErrorMessages[errorCode];
    if (message) {
      throw new Error(message);
    }
    throw new Error(`Unrecognised Error Code: ${errorCode} (${responseData["msg"]})`);
  }