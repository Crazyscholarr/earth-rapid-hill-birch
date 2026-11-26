import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GRADES, type Grade, type Job } from "@/game/content";
import { input, isCoarse } from "@/game/input";
import {
  buy,
  dropHeld,
  getSnap,
  openShop,
  pauseGame,
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
      return `Vòi · ${GRADES.find((g) => g.id === grade)?.name ?? grade}`;
    case "charger":
      return "Sạc EV";
    case "sponge":
      return "Miếng rửa";
    case "burger":
      return "Hamburger";
    case "cap":
      return "Nắp đỏ";
    case "taser":
      return "Súng điện";
    case "cash":
      return `$${cashAmt}`;
    case "mirror":
      return "Gương xe";
    case "hat":
      return "Mũ khách";
    case "cheese":
      return "Phô mai";
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
      return "Hamburger";
    case "cap":
      return "Nắp đỏ";
    case "charge":
      return "Sạc 18 kWh";
  }
}

function smartTouchAction(aimKind: string, hold: Hold): { label: string; tone: "gold" | "go" | "fuel" } {
  if (aimKind === "fuel" && (hold === "nozzle" || hold === "charger")) {
    return { label: hold === "charger" ? "Giữ sạc" : "Giữ bơm", tone: "gold" };
  }
  if (aimKind === "body" && hold === "sponge") return { label: "Giữ rửa", tone: "gold" };
  if (aimKind === "mirror" && hold === "none") return { label: "Giữ tháo", tone: "gold" };
  if (aimKind === "bill") return { label: "Nhặt $", tone: "go" };
  if (aimKind === "gold" && hold === "cash") return { label: "Nạp $", tone: "gold" };
  if (aimKind === "go") return { label: "Cho đi", tone: "go" };
  if (aimKind === "skull") return { label: "Khóa làn", tone: "gold" };
  if (aimKind === "shred" && hold !== "none") return { label: "Thu hồi", tone: "gold" };
  if (aimKind === "window") {
    if (hold === "taser") return { label: "Giật điện", tone: "gold" };
    if (hold === "burger" || hold === "cap" || hold === "hat") return { label: "Đưa đồ", tone: "go" };
    return { label: "Tương tác", tone: "fuel" };
  }
  if (
    aimKind === "nozzle" ||
    aimKind === "charger" ||
    aimKind === "sponge" ||
    aimKind === "burger" ||
    aimKind === "cap" ||
    aimKind === "taser" ||
    aimKind === "mdrop" ||
    aimKind === "loot"
  ) {
    return { label: "Cầm", tone: "gold" };
  }
  return { label: "Dùng", tone: "fuel" };
}

export function Hud() {
  const snap = useSyncExternalStore(subscribe, getSnap, getSnap);
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const sync = () => setCoarse(isCoarse() || window.innerWidth < 740);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const holdText = holdLabel(snap.hold, snap.grade, snap.cashAmt);
  const car = snap.carInfo;

  return (
    <div className="pointer-events-none absolute inset-0 text-cream select-none">
      {snap.phase === "play" ? (
        <>
          {/* Top-Left: Ultra-Clean Consolidated Status Card */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 sm:top-3 sm:left-3 sm:gap-2">
            <div className="panel max-w-[14.5rem] px-3 py-2 text-xs leading-snug sm:max-w-[18rem] sm:px-3.5 sm:py-2.5 sm:text-sm">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                <span>Ngày {snap.day}</span>
                <span className="opacity-50">·</span>
                <span>{snap.night ? "Đêm" : "Ngày"}</span>
                {snap.skull ? (
                  <span className="ml-auto rounded bg-danger px-1.5 py-0.5 text-[9px] text-white">KHÓA</span>
                ) : null}
              </div>
              <p className="mt-0.5 truncate font-semibold text-cream">{snap.objective}</p>

              {/* On mobile, integrate patience bar right inside this single card to save vertical space! */}
              {coarse && car && !car.caught && !car.served ? (
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full w-full origin-left transition-transform duration-150 will-change-transform ${
                      car.patience > 0.45 ? "bg-go" : car.patience > 0.22 ? "bg-gold" : "bg-danger"
                    }`}
                    style={{ transform: `scaleX(${Math.max(0, Math.min(1, car.patience)).toFixed(3)})` }}
                  />
                </div>
              ) : null}
            </div>

            {/* Separate customer detail card only on roomy desktop screens */}
            {!coarse && car ? (
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
                      className={`h-full w-full origin-left transition-transform duration-150 will-change-transform ${
                        car.patience > 0.45 ? "bg-go" : car.patience > 0.22 ? "bg-gold" : "bg-danger"
                      }`}
                      style={{ transform: `scaleX(${Math.max(0, Math.min(1, car.patience)).toFixed(3)})` }}
                    />
                  </div>
                ) : null}
                {car.dirty && car.job !== "wash" && !car.caught ? (
                  <p className="mt-1 text-[11px] text-cream-dim/90">Mẹo: Xe bẩn — rửa thêm để được boa +$22</p>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Top-Right: Money + Spaced Utility Bar (Out of Thumb-Look Zone!) */}
          <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1.5 sm:top-3 sm:right-3 sm:gap-2">
            <div className="flex items-center gap-1.5">
              {coarse ? (
                <div className="pointer-events-auto flex items-center gap-1.5" data-ui>
                  <button
                    className={`rounded-xl border px-2.5 py-1.5 text-xs font-semibold ${
                      snap.poster ? "border-gold bg-canopy text-white" : "border-white/15 bg-panel/95 text-cream"
                    }`}
                    onClick={togglePoster}
                  >
                    Tờ nã
                  </button>
                  {car && !car.caught && !car.served ? (
                    <button
                      className={`rounded-xl border px-2.5 py-1.5 text-xs font-semibold ${
                        snap.skull ? "border-danger bg-danger text-white" : "border-white/15 bg-panel/95 text-cream"
                      }`}
                      onClick={uiSkull}
                    >
                      Khóa
                    </button>
                  ) : null}
                  <button
                    className="rounded-xl border border-white/15 bg-panel/95 px-2.5 py-1.5 text-xs font-semibold text-cream"
                    onClick={openShop}
                  >
                    Nâng cấp
                  </button>
                  <button
                    className="rounded-xl border border-white/15 bg-panel/95 px-2.5 py-1.5 text-xs font-semibold text-cream-dim"
                    onClick={pauseGame}
                    aria-label="Tạm dừng"
                  >
                    ⏸
                  </button>
                </div>
              ) : null}

              <div className="panel flex items-baseline gap-2 px-3 py-1.5 sm:block sm:px-3.5 sm:py-2 sm:text-right">
                <p className="font-display text-xl leading-none tracking-wide text-gold sm:text-2xl">${snap.money}</p>
                <p className="text-[11px] text-cream-dim sm:mt-0.5 sm:text-xs">★ {snap.stars}</p>
              </div>
            </div>

            {holdText ? (
              <button
                data-ui
                onClick={() => {
                  if (coarse && snap.hold !== "cash") dropHeld();
                }}
                className={`panel flex items-center gap-1.5 px-2.5 py-1 text-xs ${
                  coarse && snap.hold !== "cash" ? "pointer-events-auto active:scale-95" : ""
                }`}
              >
                <span className="text-cream-dim">Cầm:</span>
                <span className="font-semibold text-gold">{holdText}</span>
                {coarse && snap.hold !== "cash" ? <span className="ml-0.5 text-cream-dim">✕</span> : null}
              </button>
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
            <div className="absolute top-14 left-1/2 w-[min(86vw,26rem)] -translate-x-1/2 rounded-xl border border-gold/45 bg-panel/96 px-3.5 py-1.5 text-center text-xs font-semibold text-cream shadow-md sm:top-20 sm:py-2 sm:text-sm">
              {snap.toast}
            </div>
          ) : null}

          {/* Compact Segmented Fuel Grade Picker (Never overlaps mobile thumbs!) */}
          {snap.showGrades ? (
            <div
              className={`pointer-events-auto absolute left-1/2 flex -translate-x-1/2 gap-1.5 ${
                coarse ? "bottom-16" : "bottom-36 gap-2"
              }`}
              data-ui
            >
              {GRADES.map((g, i) => {
                const active = snap.grade === g.id;
                const wanted = car?.job === "fuel" && car.grade === g.id;
                return (
                  <button
                    key={g.id}
                    className={`flex items-center gap-1 rounded-xl font-semibold transition-transform active:scale-95 ${
                      coarse ? "min-h-9 px-2.5 py-1.5 text-xs" : "btn btn-fuel text-xs sm:text-sm"
                    } ${active ? "bg-canopy text-white ring-2 ring-gold" : "bg-ink-soft/95 text-cream"}`}
                    onClick={() => setGrade(g.id as Grade)}
                  >
                    <span className="inline-block h-2 w-2 rounded-full" style={{ background: g.color }} />
                    <span>{coarse ? g.name.replace("Ron ", "") : `${i + 1} · ${g.name}`}</span>
                    {wanted ? <span className="rounded bg-gold px-1 text-[9px] font-bold text-ink">Cần</span> : null}
                  </button>
                );
              })}
            </div>
          ) : null}

          {/* Prompt Pill (Compact on mobile, hidden when idle on mobile to keep screen airy) */}
          {snap.prompt && (!coarse || snap.aimKind) ? (
            <div
              className={`absolute left-1/2 max-w-[62vw] -translate-x-1/2 truncate rounded-full border border-white/18 bg-panel/95 px-3.5 py-1.5 text-center font-semibold shadow-md ${
                coarse ? "bottom-4 text-xs" : "bottom-20 max-w-[90vw] px-4 py-2 text-sm"
              }`}
            >
              {snap.prompt}
            </div>
          ) : null}

          {coarse ? (
            <Touch
              hold={snap.hold}
              aimKind={snap.aimKind}
              canDispatch={Boolean(car && (car.served || car.caught))}
            />
          ) : null}

          {/* Desktop Keyboard Hint */}
          {!coarse ? (
            <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-panel/92 px-4 py-1.5 text-[11px] text-cream-dim md:flex">
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
          ) : null}
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
    <div className="pointer-events-auto absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/85 via-ink/25 to-transparent p-4 sm:items-end sm:justify-start sm:p-8">
      <div className="panel w-full max-w-md p-4 text-center sm:p-5 sm:text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold sm:text-xs">Sa mạc · Ca đêm · Tiền mặt</p>
        <h1 className="font-display mt-1 text-4xl leading-none tracking-wide text-canopy sm:text-6xl">WANTED FUEL</h1>
        <p className="mt-2.5 text-xs leading-relaxed text-cream-dim sm:mt-3 sm:text-sm">
          Đổ đúng xăng bên hông xe, rửa bùn, đưa bánh, lắp nắp đỏ. So tờ truy nã, khóa làn rồi giật điện đúng mặt tội phạm. Nhặt tiền xong nạp vào nút $ vàng!
        </p>
        <button
          className="btn btn-go mt-4 w-full text-base shadow-lg sm:mt-5 sm:text-lg"
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
    <div className="pointer-events-auto absolute inset-0 grid place-items-center bg-ink/75 p-4">
      <div className="panel w-full max-w-sm p-5 text-center sm:p-6">
        <p className="font-display text-3xl tracking-wide sm:text-4xl">Tạm dừng</p>
        <p className="mt-2 text-xs text-cream-dim sm:text-sm">Bấm Tiếp tục để quay lại ca trực.</p>
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
    <div className="pointer-events-auto absolute inset-0 grid place-items-center bg-ink/78 p-4">
      <div className="panel max-h-[88dvh] w-full max-w-md overflow-auto p-4 sm:p-5">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-2xl tracking-wide sm:text-3xl">Nâng trạm</p>
          <p className="font-display text-xl text-gold sm:text-2xl">${snap.money}</p>
        </div>
        <p className="mt-1 text-xs text-cream-dim">{snap.tip}</p>
        <ul className="mt-3 space-y-2">
          {snap.shop.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2">
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
          Đóng
        </button>
      </div>
    </div>
  );
}

function Touch({
  hold,
  aimKind,
  canDispatch,
}: {
  hold: Hold;
  aimKind: string;
  canDispatch: boolean;
}) {
  const act = smartTouchAction(aimKind, hold);
  return (
    <div className="pointer-events-none absolute inset-0">
      <Stick />
      {/* Single Spacious Right Thumb Action Button (+ GO dispatch pill only when car is ready!) */}
      <div className="pointer-events-auto absolute right-4 bottom-4 flex flex-col items-end gap-2.5" data-ui>
        {canDispatch ? (
          <button
            className="rounded-full border border-white/20 bg-go px-4 py-2 text-xs font-bold text-white shadow-md active:scale-95"
            data-ui
            onClick={uiGo}
          >
            GO · Cho xe đi ▸
          </button>
        ) : null}

        <HoldButton label={act.label} tone={act.tone} />
      </div>
    </div>
  );
}

function HoldButton({ label, tone }: { label: string; tone: "gold" | "go" | "fuel" }) {
  const toneCls =
    tone === "gold"
      ? "border-gold bg-gold text-ink ring-2 ring-gold/40"
      : tone === "go"
        ? "border-white/25 bg-go text-white"
        : "border-white/25 bg-ink-soft/95 text-cream";
  return (
    <button
      className={`flex h-16 min-w-[5.25rem] items-center justify-center rounded-2xl border-2 px-4 text-sm font-bold shadow-lg transition-transform active:scale-95 ${toneCls}`}
      data-ui
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        uiUse(true);
      }}
      onPointerUp={() => uiUse(false)}
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
    const max = 34;
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
      className="pointer-events-auto absolute bottom-4 left-4 h-24 w-24 rounded-full border-2 border-white/25 bg-ink/45"
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
      onPointerCancel={(e) => {
        if (e.pointerId !== id.current) return;
        id.current = null;
        setKnob({ x: 0, y: 0 });
        input.touchX = 0;
        input.touchY = 0;
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 h-10 w-10 rounded-full bg-cream/90 shadow-md"
        style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }}
      />
    </div>
  );
}
