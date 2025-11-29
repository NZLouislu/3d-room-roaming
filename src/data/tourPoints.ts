export interface TourPoint {
  position: [number, number, number];
  lookAt: [number, number, number];
  duration: number;
  title: string;
  description: string;
}

// 房子尺寸约 54x40x35，中心在 [0, 0, 0]
// 房子范围大约: X: -27 到 27, Y: -20 到 20, Z: -17 到 17
export const DOUBLE_FLOOR_HOUSE_TOUR: TourPoint[] = [
  // === 外部远景 ===
  {
    position: [50, 30, 50], // 远距离斜上方俯视
    lookAt: [0, 0, 0],
    duration: 3,
    title: "欢迎来到您的梦想之家",
    description: "这座精美的两层别墅采用现代建筑设计，配备高端装修"
  },
  // === 外部环绕 ===
  {
    position: [40, 10, 30], // 右前方近景
    lookAt: [0, 0, 0],
    duration: 3,
    title: "正面外观",
    description: "优雅的砖石外墙和大面积落地窗，提供充足的自然采光"
  },
  {
    position: [-40, 10, 25], // 左前方
    lookAt: [0, 0, 0],
    duration: 3,
    title: "侧面花园",
    description: "宽敞的侧院和精心设计的花园区域"
  },
  {
    position: [0, 15, -40], // 后方
    lookAt: [0, 0, 0],
    duration: 3,
    title: "后院景观",
    description: "美丽的后花园，配有露台和户外休闲区"
  },
  // === 靠近入口 ===
  {
    position: [10, -10, 25], // 靠近正门（一楼高度约 y=-10）
    lookAt: [0, -10, 0],
    duration: 3,
    title: "主入口",
    description: "宽敞的入口门廊，彰显尊贵气质"
  },
  // === 进入室内一楼 (y 约 -15 到 -5) ===
  {
    position: [0, -12, 8], // 进入门厅
    lookAt: [0, -12, -5],
    duration: 3,
    title: "门厅",
    description: "步入宽敞明亮的门厅，感受家的温馨"
  },
  {
    position: [0, -12, 0], // 一楼中央
    lookAt: [-10, -12, 0],
    duration: 3,
    title: "一楼客厅",
    description: "开放式客厅设计，采光充足，视野开阔"
  },
  {
    position: [-5, -12, -5], // 一楼左侧
    lookAt: [5, -12, -8],
    duration: 3,
    title: "餐厅区域",
    description: "精致的餐厅空间，适合家庭聚餐"
  },
  // === 上楼到二楼 (y 约 5 到 15) ===
  {
    position: [3, 5, 0], // 楼梯位置
    lookAt: [0, 10, -5],
    duration: 3,
    title: "楼梯间",
    description: "优雅的楼梯设计，连接上下两层"
  },
  {
    position: [0, 8, 0], // 二楼中央
    lookAt: [10, 8, 0],
    duration: 3,
    title: "二楼走廊",
    description: "宽敞的二楼走廊，通往各个卧室"
  },
  {
    position: [8, 8, 5], // 主卧方向
    lookAt: [15, 8, 8],
    duration: 3,
    title: "主卧室",
    description: "豪华主卧套房，配有独立卫浴和衣帽间"
  },
  // === 返回外部俯视 ===
  {
    position: [50, 35, 50], // 高空俯视结束
    lookAt: [0, 0, 0],
    duration: 3,
    title: "鸟瞰全景",
    description: "Tour 结束！您现在可以使用 WASD 键自由探索"
  }
];
