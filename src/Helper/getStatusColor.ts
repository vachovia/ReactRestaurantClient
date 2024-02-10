import { SD_Status } from "./../Interfaces/enums";

const getStatusColor = (status:SD_Status) => {
    switch (status) {
      case SD_Status.CONFIRMED:
        return 'primary';
      case SD_Status.PENDING:
        return 'secondary';
      case SD_Status.CANCELLED:
        return 'danger';
      case SD_Status.COMPLETED:
        return 'success';
      case SD_Status.BEING_COOKED:
        return 'info';
      case SD_Status.READY_FOR_PICKUP:
        return 'warning';
      default:
        return '';
    }
}

export default getStatusColor;