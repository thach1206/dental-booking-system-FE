import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Alert, Modal, notification } from 'antd';

const SUCCESS_NOTIFICATION = 'success';
const WARNING_NOTIFICATION = 'warning';
const ERROR_NOTIFICATION = 'error';
const INFO_NOTIFICATION = 'info';

const openNotificationWithIcon = (type, title, message, onClose) => {
  const opt = {
    message: title,
    description: message,
    style: {
      zIndex: 9999,
    },
  };
  if (onClose !== undefined) {
    opt.onClose = onClose;
  }
  notification[type](opt);
};

export const showSuccessNotification = (message) => {
  openNotificationWithIcon(SUCCESS_NOTIFICATION, 'Success', message);
};

export const showWarningNotification = (message, onClose) => {
  openNotificationWithIcon(WARNING_NOTIFICATION, 'Warning', message, onClose);
};

export const showErrorNotification = (message) => {
  openNotificationWithIcon(ERROR_NOTIFICATION, 'Error', message);
};

export const showInfoNotification = (title, message) => {
  openNotificationWithIcon(INFO_NOTIFICATION, title, message);
};

export const showConfirmPopup = (message, handleOk) => {
  Modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleOutlined />,
    content: message,
    onOk: handleOk,
    okText: 'Ok',
    cancelText: 'Cancel',
  });
};

export const showWarningAlert = (msg) => {
  return (
    <Alert
      message={msg}
      type="warning"
      closable
      style={{ marginTop: 10 }}
      // onClose={onClose}
    />
  );
};
