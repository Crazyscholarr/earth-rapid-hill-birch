import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GRADES, type Grade, type Job } from "@/game/content";
import { input, isCoarse } from "@/game/input";
import {
  buy,
  dropHeld,
  getSnap,
  openShop,
  requestLock,
  resumeGame,
  setGrade,
  startGame,
  subscribe,
  togglePoster,
  uiGo,
  uiSkull,
  uiUse,
  wipeSave,
  type Hold,
} from "@/game/sim";

function holdLabel(hold: Hold, grade: Grade, cashAmt: number) {
  switch (hold) {
    case "nozzle":
      return `Vòi xăng · ${GRADES.find((g) => g.id === grade)?.name ?? grade}`;
    case "charger":
      return "Đầu sạc EV";
    case "sponge":
      return "Miếng rửa xe";
    case "burger":
      return "Bánh hamburger";
    case "cap":
      return "Nắp bình đỏ";
    case "taser":
      return "Súng điện";
    case "cash":
      return `Tiền mặt $${cashAmt}`;
    case "mirror":
      return "Gương chiếu hậu";
    case "hat":
      return "Mũ tài xế";
    case "cheese":
      return "Phô mai tịch thu";
    default:
      return "";
  }
}

function jobLabel(job: Job, grade: Grade) {
  switch (job) {
    case "fuel":
      return `Đổ ${GRADES.find((g) => g.id === grade)?.name ?? grade}`;
    case "wash":
      return "Rửa xe";
    case "food":
      return "Ăn hamburger";
    case "cap":
      return "Lắp nắp đỏ";
    case "charge":
      return "Sạc 18 kWh";
  }
}

export function Hud() {
  const snap = useSyncExternalStore(subscribe, getSnap, getSnap);
  const [coarse, setCoarse] = useState(false);
  useEffect(() => setCoarse(isCoarse()), []);

  const holdText = holdLabel(snap.hold, snap.grade, snap.cashAmt);
  const car = snap.carInfo;

  return (
    <div className="pointer-events-none absolute inset-0 text-cream select-none">
      {snap.phase === "play" ? (
        <>
          {/* Top-Left: Objective + Active Customer */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div className="panel max-w-[18rem] px-3.5 py-2.5 text-sm leading-snug">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gold">
                <span>Ngày {snap.day}</span>
                <span className="opacity-50">·</span>
                <span>{snap.night ? "Ca đêm" : "Ban ngày"}</span>
                {snap.skull ? (
                  <span className="ml-auto rounded bg-danger/90 px-1.5 py-0.5 text-[9px] text-white">KHÓA LÀN</span>
                ) : null}
              </div>
              <p className="mt-0.5 font-semibold text-cream">{snap.objective}</p>
            </div>

            {car ? (
              <div className="panel max-w-[18rem] px-3.5 py-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-cream">{car.name}</span>
                  <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-medium text-gold">
                    {car.caught ? "Đã bắt" : car.asleep ? "Đang ngủ Zzz" : car.served ? "Đã xong" : jobLabel(car.job, car.grade)}
                  </span>
                </div>
                {!car.caught && !car.served ? (
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full transition-all duration-150 ${
                        car.patience > 0.45 ? "bg-go" : car.patience > 0.22 ? "bg-gold" : "bg-danger"
                      }`}
                      style={{ width: `${Math.round(car.patience * 100)}%` }}
                    />
                  </div>
                ) : null}
                {car.dirty && car.job !== "wash" && !car.caught ? (
                  <p className="mt-1 text-[11px] text-cream-dim/90">Mẹo: Xe bẩn — rửa thêm để được boa +$22</p>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Top-Right: Money, Stars, Held Item */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
            <div className="panel px-3.5 py-2 text-right">
              <p className="font-display text-2xl leading-none tracking-wide text-gold">${snap.money}</p>
              <p className="mt-0.5 text-xs text-cream-dim">★ {snap.stars}</p>
            </div>
            {holdText ? (
              <div className="panel flex items-center gap-2 px-3 py-1.5 text-xs">
                <span className="text-cream-dim">Đang cầm:</span>
                <span className="font-semibold text-gold">{holdText}</span>
              </div>
            ) : null}
          </div>

          {/* Center Crosshair + Progress Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {snap.aimProgress > 0 ? (
              <svg className="h-11 w-11 -rotate-90" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3.5" />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="#f0b429"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 18}
                  strokeDashoffset={2 * Math.PI * 18 * (1 - snap.aimProgress)}
                />
              </svg>
            ) : null}
            <div
              className={`crosshair absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
                snap.aimKind ? "hot" : ""
              }`}
            />
          </div>

          {/* Toast */}
          {snap.toast ? (
            <div className="absolute top-20 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2 rounded-xl border border-gold/40 bg-panel/95 px-4 py-2 text-center text-sm font-semibold text-cream shadow-lg backdrop-blur-md">
              {snap.toast}
            </div>
          ) : null}

          {/* Fuel Grade Picker */}
          {snap.showGrades ? (
            <div className="pointer-events-auto absolute bottom-36 left-1/2 flex -translate-x-1/2 gap-2" data-ui>
              {GRADES.map((g, i) => {
                const active = snap.grade === g.id;
                const wanted = car?.job === "fuel" && car.grade === g.id;
                return (
                  <button
                    key={g.id}
                    className={`btn btn-fuel flex items-center gap-1.5 text-xs sm:text-sm ${active ? "on ring-2 ring-gold" : ""}`}
                    onClick={() => setGrade(g.id as Grade)}
                  >
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: g.color }} />
                    <span>
                      {i + 1} · {g.name}
                    </span>
                    {wanted ? <span className="rounded bg-gold px-1 text-[10px] font-bold text-ink">Cần</span> : null}
                  </button>
                );
              })}
            </div>
          ) : null}

          {/* Prompt Pill */}
          {snap.prompt ? (
            <div className="absolute bottom-20 left-1/2 max-w-[90vw] -translate-x-1/2 rounded-full border border-white/15 bg-panel/90 px-4 py-2 text-center text-sm font-semibold shadow-lg backdrop-blur-md">
              {snap.prompt}
            </div>
          ) : null}

          {coarse ? <Touch hold={snap.hold} /> : null}

          {/* Bottom Controls Hint */}
          <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ink/75 px-4 py-1.5 text-[11px] text-cream-dim backdrop-blur-sm sm:flex">
            <span>WASD đi</span>
            <span>·</span>
            <span>Kéo chuột / Mũi tên xoay nhìn</span>
            <span>·</span>
            <span>E / Chuột trái dùng</span>
            <span>·</span>
            <span>X / Chuột phải cất</span>
            <span>·</span>
            <span>Q tờ</span>
            <span>·</span>
            <span>R khóa làn</span>
            <span>·</span>
            <span>G đi</span>
            <span>·</span>
            <span>B cửa hàng</span>
            <span>·</span>
            <span>P tạm dừng</span>
          </div>
        </>
      ) : null}

      {snap.phase === "title" ? <Title /> : null}
      {snap.phase === "pause" ? <Pause /> : null}
      {snap.phase === "shop" ? <Shop snap={snap} /> : null}
    </div>
  );
}

function Title() {
  return (
    <div className="pointer-events-auto absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/85 via-ink/25 to-transparent p-5 sm:items-end sm:justify-start sm:p-8">
      <div className="panel w-full max-w-md p-5 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Sa mạc · Ca đêm · Tiền mặt</p>
        <h1 className="font-display mt-1 text-5xl leading-none tracking-wide text-canopy sm:text-6xl">WANTED FUEL</h1>
        <p className="mt-3 text-sm leading-relaxed text-cream-dim">
          Đổ đúng xăng, rửa xe lấm bùn, đưa bánh, lắp nắp đỏ. So tờ truy nã (<kbd className="rounded bg-white/10 px-1">Q</kbd>), khóa làn đầu lâu (<kbd className="rounded bg-white/10 px-1">R</kbd>) rồi giật điện đúng mặt. Tiền nhặt xong đập vào nút $ vàng!
        </p>
        <button
          className="btn btn-go mt-5 w-full text-lg shadow-lg"
          onClick={() => {
            startGame();
            requestLock();
          }}
        >
          Vào ca ngay
        </button>
      </div>
    </div>
  );
}

function Pause() {
  return (
    <div className="pointer-events-auto absolute inset-0 grid place-items-center bg-ink/60 p-4 backdrop-blur-xs">
      <div className="panel w-full max-w-sm p-6 text-center">
        <p className="font-display text-4xl tracking-wide">Tạm dừng</p>
        <p className="mt-2 text-sm text-cream-dim">Chuột đang thả. Bấm Tiếp tục để khóa góc nhìn lại.</p>
        <button
          className="btn btn-go mt-4 w-full"
          onClick={() => {
            resumeGame();
            requestLock();
          }}
        >
          Tiếp tục
        </button>
        <button className="btn btn-fuel mt-2 w-full" onClick={openShop}>
          Cửa hàng nâng cấp
        </button>
        <button className="btn btn-stop mt-2 w-full" onClick={wipeSave}>
          Xóa hồ sơ chơi lại
        </button>
      </div>
    </div>
  );
}

function Shop({ snap }: { snap: ReturnType<typeof getSnap> }) {
  return (
    <div className="pointer-events-auto absolute inset-0 grid place-items-center bg-ink/65 p-4 backdrop-blur-xs">
      <div className="panel max-h-[88dvh] w-full max-w-md overflow-auto p-5">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-3xl tracking-wide">Nâng trạm</p>
          <p className="font-display text-2xl text-gold">${snap.money}</p>
        </div>
        <p className="mt-1 text-xs text-cream-dim">{snap.tip}</p>
        <ul className="mt-3 space-y-2">
          {snap.shop.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-cream-dim">{item.desc}</p>
              </div>
              <button className="btn btn-go shrink-0" disabled={item.owned || snap.money < item.cost} onClick={() => buy(item.id)}>
                {item.owned ? "Đã mua" : `$${item.cost}`}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-fuel mt-4 w-full"
          onClick={() => {
            resumeGame();
            requestLock();
          }}
        >
          Đóng (B / Esc)
        </button>
      </div>
    </div>
  );
}

function Touch({ hold }: { hold: Hold }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Stick />
      <div className="pointer-events-auto absolute right-3 bottom-6 grid grid-cols-2 gap-2" data-ui>
        <HoldButton label="Dùng" />
        <button className="btn btn-go" data-ui onClick={uiGo}>
          GO
        </button>
        <button className="btn btn-stop" data-ui onClick={uiSkull}>
          Đầu lâu
        </button>
        <button className="btn btn-fuel" data-ui onClick={togglePoster}>
          Tờ
        </button>
        {hold !== "none" && hold !== "cash" ? (
          <button className="btn btn-gold col-span-2" data-ui onClick={dropHeld}>
            Cất đồ
          </button>
        ) : null}
        <button className="btn btn-fuel col-span-2" data-ui onClick={openShop}>
          Cửa hàng
        </button>
      </div>
    </div>
  );
}

function HoldButton({ label }: { label: string }) {
  return (
    <button
      className="btn btn-fuel"
      data-ui
      onPointerDown={(e) => {
        e.preventDefault();
        uiUse(true);
      }}
      onPointerUp={() => uiUse(false)}
      onPointerLeave={() => uiUse(false)}
      onPointerCancel={() => uiUse(false)}
    >
      {label}
    </button>
  );
}

function Stick() {
  const id = useRef<number | null>(null);
  const origin = useRef({ x: 0, y: 0 });
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const setAxis = (x: number, y: number) => {
    const max = 46;
    const m = Math.hypot(x, y) || 1;
    const k = Math.min(max, m);
    const nx = (x / m) * k;
    const ny = (y / m) * k;
    setKnob({ x: nx, y: ny });
    input.touchX = nx / max;
    input.touchY = ny / max;
  };
  return (
    <div
      data-ui
      className="pointer-events-auto absolute bottom-6 left-4 h-32 w-32 rounded-full border border-white/30 bg-ink/35"
      onPointerDown={(e) => {
        id.current = e.pointerId;
        origin.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (e.pointerId !== id.current) return;
        setAxis(e.clientX - origin.current.x, e.clientY - origin.current.y);
      }}
      onPointerUp={(e) => {
        if (e.pointerId !== id.current) return;
        id.current = null;
        setKnob({ x: 0, y: 0 });
        input.touchX = 0;
        input.touchY = 0;
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 h-14 w-14 rounded-full bg-cream/90"
        style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }}
      />
    </div>
  );
}
