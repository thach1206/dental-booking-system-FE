export const LOCAL_STORAGE = {
  ACCESS_TOKEN: 'access_token',
  ACCESS_TOKEN_EXPIRED: 'access_token_expired_at',
  REFRESH_TOKEN: 'refresh_token',
  REFRESH_TOKEN_EXPIRED: 'refresh_token_expired_at',
  USERNAME_KEY: 'username',
  LANGUAGE: 'i18nextLng',
};

export const Role = {
  ADMIN: 'admin',
  QA: 'qa',
  STORE: 'store',
  OPERATOR: 'operator',
  ACCOUNT: 'account',
  STAFF: 'staff',
};

export const DeviceStatus = {
  NEW: -1,
  GOOD: 0,
  ERROR: 1,
  OFFLINE: -2,
  STAND_BY: 2,
};

export const DeviceStatusList = [
  {
    value: DeviceStatus.NEW,
    title: 'New',
  },
  {
    value: DeviceStatus.GOOD,
    title: 'Good',
  },
  {
    value: DeviceStatus.ERROR,
    title: 'Error',
  },
  {
    value: DeviceStatus.OFFLINE,
    title: 'Offline',
  },
];

const statusMap = {};
statusMap[DeviceStatus.NEW] = 'New';
statusMap[DeviceStatus.GOOD] = 'Good';
statusMap[DeviceStatus.ERROR] = 'No device';
statusMap[DeviceStatus.OFFLINE] = 'Offline';
statusMap[DeviceStatus.STAND_BY] = 'Stand by';

export const StatusMap = statusMap;

export const SyncStatusColor = {
  BAD: '#d9f7be',
  NORMAL: '#95de64',
  GOOD: '#52c41a',
  EXCELLENT: '#237804',
};

export const TaskStatus = {
  FAILED: -1,
  UPLOADED: 0,
  NO_ANALYZE: 9,
  PROCESSING: 10,
  PROCESSED: 11,
  NO_AUDIO: 1,
  TRANSCRIBING: 2,
  TRANSCRIBED: 3,
  NO_VIDEO: 4,
  FAILED_THRESHOLD_EXCEEDED: 5,
  ANALYZING: 20,
  ANALYZED: 21,
  ANALYZE_FAILED: -2,
};

export const colorStatusMap = {
  sync: {
    BAD: '#d9f7be',
    NORMAL: '#95de64',
    GOOD: '#52c41a',
    EXCELLENT: '#237804',
  },
  audio: {
    BAD: '#bae7ff',
    NORMAL: '#69c0ff',
    GOOD: '#1890ff',
    EXCELLENT: '#0050b3',
  },
  video: {
    BAD: '#b5f5ec',
    NORMAL: '#5cdbd3',
    GOOD: '#13c2c2',
    EXCELLENT: '#006d75',
  },
};

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm:ss';

export const DEFAULT_VALUE = {
  PAGE: 1,
  LIMIT: 20,
};

export const CameraStatus = {
  ACTIVE: 1,
  INACTIVE: -1,
};

export const CustomerProfileMappedKeys = {
  cau_hoi_cua_nhan_vien: 'Câu hỏi của nhân viên',
  cau_hoi_ve_phau_thuat_cua_khach_hang: 'Câu hỏi về phẫu thuật của khách hàng',
  dac_diem_lien_quan: 'Đặc điểm liên quan',
  dich_vu_san_pham_ban_dau: 'Dịch vụ sản phẩm ban đầu',
  dich_vu_san_pham_khuyen_nghi: 'Dịch vụ sản phẩm khuyến nghị',
  diem_noi_bat_dich_vu_san_pham: 'Điểm nổi bật dịch vụ sản phẩm',
  do_manh_y_dinh_hen: 'Độ mạnh ý định hẹn',
  gia_duoc_de_xuat_ma_khong_hoi: 'Giá được đề xuất mà không hỏi',
  gia_duoc_de_xuat_truoc_khi_yeu_cau_giam_gia:
    'Giá được đề xuất trước khi yêu cầu giảm giá',
  ho_so_khach_hang: 'Hồ sơ khách hàng',
  ket_qua_cuoc_tro_chuyen: 'Kết quả cuộc trò chuyện',
  khach_hang_mua_lan_dau: 'Khách hàng mua lần đầu',
  khach_hang_tim_hieu_nha_cung_cap_khac:
    'Khách hàng tìm hiểu nhà cung cấp khác',
  lo_ngai_gia_cua_khach_hang: 'Lo ngại về giá của khách hàng',
  so_sanh_nha_cung_cap_cua_khach_hang: 'So sánh nhà cung cấp của khách hàng',
  thuong_hieu_tin_cay_chat_luong: 'Thương hiệu tin cậy chất lượng',
  ti_le_noi_nhan_vien_khach_hang: 'Tỉ lệ nói của nhân viên và khách hàng',
  so_cau_hoi_tinh_trang_khach_hang: 'Số câu hỏi tình trạng khách hàng',
  tom_tat_cuoc_hoi_thoai: 'Tóm tắt cuộc hội thoại',
  quyet_dinh_cuoi_hoi_thoai: 'Quyết định cuối hội thoại',
  khach_hang_tu_choi_dat_hen: 'Khách hàng từ chối đặt hẹn',
  danh_gia_muc_do_muon_phau_thuat: 'Đánh giá mức độ muốn phẫu thuật',
  dac_diem_the_chat_benh_ly: 'Đặc điểm thể chất bệnh lý',
  muc_do_hieu_biet_dich_vu: 'Mức độ hiểu biết dịch vụ',
  khach_hang_quan_ngai_tai_chinh: 'Khách hàng quan ngại tài chính',
  khach_hang_quan_tam_chat_luong: 'Khách hàng quan tâm chất lượng',
  khach_hang_quan_ngai_phau_thuat: 'Khách hàng quan ngại phẫu thuật',
};
