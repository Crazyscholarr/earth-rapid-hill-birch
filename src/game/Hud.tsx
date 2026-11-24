import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GRADES, type Grade } from "@/game/content";
import { input, isCoarse } from "@/game/input";
import {
  buy,
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
} from "@/game/sim";

export function Hud() {
  const snap = useSyncExternalStore(subscribe, getSnap, getSnap);
  const [coarse, setCoarse] = useState(false);
  useEffect(() => setCoarse(isCoarse()), []);
  return (
    <div className="pointer-events-none absolute inset-0 text-cream">
      {snap.phase === "play" ? (
        <>
          <div className="absolute top-3 left-3 max-w-[16rem] rounded-xl bg-ink/75 px-3 py-2 text-sm leading-snug shadow">
            <p className="text-[10px] uppercase tracking-widest text-gold">Ngày {snap.day}</p>
            <p className="font-semibold">{snap.objective}</p>
          </div>
          <div className="absolute top-3 right-3 rounded-xl bg-ink/75 px-3 py-2 text-right">
            <p className="font-display text-2xl leading-none text-gold">${snap.money}</p>
            <p className="text-xs text-cream-dim">★ {snap.stars}</p>
          </div>
          <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/90 shadow" />
          {snap.prompt ? (
            <div className="absolute bottom-28 left-1/2 max-w-[90vw] -translate-x-1/2 rounded-full bg-ink/80 px-4 py-2 text-center text-sm font-semibold">
              {snap.prompt}
            </div>
          ) : null}
          {snap.toast ? (
            <div className="absolute top-20 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2 rounded-xl bg-cream px-4 py-2 text-center text-sm font-semibold text-ink">
              {snap.toast}
            </div>
          ) : null}
          {snap.showGrades ? (
            <div className="pointer-events-auto absolute bottom-40 left-1/2 flex -translate-x-1/2 gap-2" data-ui>
              {GRADES.map((g, i) => (
                <button
                  key={g.id}
                  className={`btn btn-fuel ${snap.grade === g.id ? "on" : ""}`}
                  onClick={() => setGrade(g.id as Grade)}
                >
                  {i + 1} {g.name}
                </button>
              ))}
            </div>
          ) : null}
          {coarse ? <Touch /> : null}
          <p className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 text-[11px] text-white/80 sm:block">
            WASD · chuột nhìn · E dùng · giữ để đổ/rửa · Q tờ · R đầu lâu · G đi · 1-4 xăng · B cửa hàng
          </p>
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
    <div className="pointer-events-auto absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink via-ink/55 to-transparent p-6 sm:items-center">
      <div className="panel w-full max-w-md p-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">sa mạc · ca đêm · tiền mặt</p>
        <h1 className="font-display text-5xl leading-none text-canopy sm:text-6xl">WANTED FUEL</h1>
        <p className="mt-3 text-sm leading-relaxed text-cream-dim">
          Đổ đúng xăng, rửa xe bẩn, đưa bánh, lắp nắp đỏ. Giơ tờ truy nã lên so mặt. Khóa làn bằng nút đầu lâu, giật điện đúng người. Tiền nhặt bằng tay, đập vào nút vàng. Đồ thừa bỏ vào máy thu hồi.
        </p>
        <button
          className="btn btn-go mt-5 w-full text-lg"
          onClick={() => {
            startGame();
            requestLock();
          }}
        >
          Vào ca
        </button>
      </div>
    </div>
  );
}

function Pause() {
  return (
    <div className="pointer-events-auto absolute inset-0 grid place-items-center bg-ink/55 p-4">
      <div className="panel w-full max-w-sm p-6 text-center">
        <p className="font-display text-4xl">Tạm dừng</p>
        <p className="mt-2 text-sm text-cream-dim">Chuột đang thả. Bấm tiếp tục để khóa nhìn lại.</p>
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
          Cửa hàng
        </button>
        <button className="btn btn-stop mt-2 w-full" onClick={wipeSave}>
          Xóa hồ sơ
        </button>
      </div>
    </div>
  );
}

function Shop({ snap }: { snap: ReturnType<typeof getSnap> }) {
  return (
    <div className="pointer-events-auto absolute inset-0 grid place-items-center bg-ink/60 p-4">
      <div className="panel max-h-[88dvh] w-full max-w-md overflow-auto p-5">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-3xl">Nâng trạm</p>
          <p className="text-gold">${snap.money}</p>
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
                {item.owned ? "Có rồi" : `$${item.cost}`}
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

function Touch() {
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
