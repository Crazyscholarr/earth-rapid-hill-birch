export type Grade = "92" | "95" | "98" | "diesel";
export type Job = "fuel" | "wash" | "food" | "cap" | "charge";
export type FaceId = "worst" | "thief" | "bully";

export const GRADES: { id: Grade; name: string; pay: number }[] = [
  { id: "92", name: "Ron 92", pay: 36 },
  { id: "95", name: "Ron 95", pay: 48 },
  { id: "98", name: "Ron 98", pay: 72 },
  { id: "diesel", name: "Dầu", pay: 54 },
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
    hat: "#22c55e",
    shirt: "#86efac",
    bounty: 180,
    line: "Mũ xanh lá, áo xanh, cười hở răng",
  },
  {
    id: "thief",
    name: "Kẻ trộm nắp",
    hat: null,
    shirt: "#1f2937",
    bounty: 240,
    line: "Áo đen, không mũ, mắt trợn",
  },
  {
    id: "bully",
    name: "Kẻ bắt nạt",
    hat: "#2563eb",
    shirt: "#fb923c",
    bounty: 210,
    line: "Mũ xanh dương, áo cam",
  },
];

export const TIPS = [
  "Khách thích được đội mũ và được cho ăn.",
  "Đổ đúng loại trên bong bóng thì họ mới trả.",
  "Giơ tờ truy nã lên so với mặt tài xế.",
  "Nút đầu lâu khóa làn. Rồi mới giật điện.",
  "Đồ rơi sàn sẽ biến mất. Đập tiền vào nút $.",
  "Tháo gương, bỏ vào máy thu hồi. Người thì không.",
  "Xe bẩn thì rửa. Khách vui trả nhiều hơn.",
  "Xe điện thì cắm sạc, không đổ xăng.",
  "Sừng quỷ chỉ là băng đô. Giật được thì đội.",
  "Phô mai trong xe là hàng tịch thu, bỏ vào máy nghiền.",
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

export const CAR_COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#f59e0b", "#a855f7", "#fb7185", "#38bdf8", "#f97316"];
