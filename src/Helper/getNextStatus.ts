import {SD_Status, StatusColor} from './../Interfaces/enums';

const getNextStatus = (status: SD_Status): StatusColor => {
  switch (status) {
    case SD_Status.CONFIRMED:
      return {color: 'info', value: SD_Status.BEING_COOKED};
    case SD_Status.BEING_COOKED:
      return {color: 'warning', value: SD_Status.READY_FOR_PICKUP};
    case SD_Status.READY_FOR_PICKUP:
      return {color: 'success', value: SD_Status.COMPLETED};
    case SD_Status.CANCELLED:
      return {color: 'danger', value: SD_Status.COMPLETED};
    default:
      return {color: 'dark', value: ''};
  }
};



export default getNextStatus;
