export type Grade = "92" | "95" | "98" | "diesel";
export type Job = "fuel" | "wash" | "food" | "cap" | "charge";
export type FaceId = "worst" | "thief" | "bully";

export const GRADES: { id: Grade; name: string; pay: number; color: string }[] = [
  { id: "92", name: "Ron 92", pay: 36, color: "#10b981" },
  { id: "95", name: "Ron 95", pay: 48, color: "#f59e0b" },
  { id: "98", name: "Ron 98", pay: 72, color: "#ef4444" },
  { id: "diesel", name: "Dầu", pay: 54, color: "#3b82f6" },
];

export const WARRANTS: {
  id: FaceId;
  name: string;
  hat: string | null;
  shirt: string;
  bounty: number;
  line: string;
}[] = [
  {
    id: "worst",
    name: "Nhân viên tệ nhất",
    hat: "#2d9d5c",
    shirt: "#6ee7b7",
    bounty: 180,
    line: "Mũ xanh lá, áo bạc hà, cười nhe nguyên hàm răng",
  },
  {
    id: "thief",
    name: "Kẻ trộm nắp bình",
    hat: null,
    shirt: "#1f2937",
    bounty: 240,
    line: "Không mũ, áo đen, mắt trợn tròn như sắp rớt",
  },
  {
    id: "bully",
    name: "Kẻ bắt nạt",
    hat: "#2563eb",
    shirt: "#ea580c",
    bounty: 210,
    line: "Mũ xanh dương, áo cam, lông mày cau có",
  },
];

export const TIPS = [
  "Mẹo: Bấm X hoặc Chuột phải để cất nhanh đồ đang cầm.",
  "Đổ đúng loại xăng trên bong bóng thì khách mới chịu trả tiền.",
  "Bấm Q để giơ tờ truy nã, so kỹ mặt, mũ và áo tài xế!",
  "Thấy tội phạm? Bấm R (đầu lâu) khóa làn, rồi giật điện 2 phát.",
  "Tiền nhặt xong nhớ đập vào nút $ vàng trên quầy.",
  "Tháo gương chiếu hậu bỏ máy nghiền kiếm thêm... miễn đừng nghiền người.",
  "Xe lấm lem bùn đất? Rửa sạch luôn được khách boa thêm $22!",
  "Xe điện màu xanh lá chỉ cắm sạc 18 kWh, đừng dí vòi xăng vào.",
  "Sừng quỷ thực ra là băng đô Shopee. Giật về đội cho oách!",
  "Thấy miếng phô mai thiu trong xe quỷ? Tịch thu bỏ máy thu hồi ngay.",
];

export const SHOP: { id: string; name: string; desc: string; cost: number; repeat?: boolean }[] = [
  { id: "pump", name: "Bơm nhanh", desc: "Đầy bình nhanh gấp đôi", cost: 180 },
  { id: "scrub", name: "Bọt đặc", desc: "Rửa xe mau hơn", cost: 150 },
  { id: "scanner", name: "Kính soi", desc: "Tội phạm có viền đỏ", cost: 240 },
  { id: "recycle", name: "Lưỡi thu hồi", desc: "Máy nghiền trả đậm hơn", cost: 280 },
  { id: "snack", name: "Thùng bánh", desc: "+3 hamburger", cost: 40, repeat: true },
  { id: "caps", name: "Nắp đỏ", desc: "+2 nắp bình xăng", cost: 60, repeat: true },
];

export const NAMES = ["An", "Bình", "Chi", "Dũng", "Hà", "Khoa", "Linh", "Minh", "Ngọc", "Phát", "Quân", "Trang", "Vy", "Anna", "Bo"];

export const CAR_COLORS = ["#2c4a6e", "#355e4b", "#7f2929", "#b07d32", "#4b5563", "#5b3b5c", "#2d6473", "#8c4a27"];
