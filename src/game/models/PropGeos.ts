import {
  BoxGeometry,
  CapsuleGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  LatheGeometry,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  type BufferGeometry,
} from "three";
import { mergeParts, placeGeo } from "@/game/geo";

// Singleton lazily-built sculpted prop geometries shared between Station shelves & First-Person Hands
// (Zero duplicate VRAM buffers, 2-3 draw calls per complex prop instead of 8-12!)

let _props: ReturnType<typeof createAllPropGeos> | null = null;

export function getPropGeos() {
  if (!_props) _props = createAllPropGeos();
  return _props;
}

function createAllPropGeos() {
  // 1. Sculpted Mechanic Glove & Sleeve (Left / Right via X-mirror)
  const sleeveGeo = mergeParts([
    placeGeo(new CylinderGeometry(0.04, 0.052, 0.24, 12), [0, -0.055, 0.17], [Math.PI / 2 - 0.22, 0, 0]),
    placeGeo(new TorusGeometry(0.04, 0.008, 6, 12), [0, -0.025, 0.06], [-0.22, 0, 0]),
  ]);

  const buildGlovePalm = (side: -1 | 1) => {
    const parts: BufferGeometry[] = [
      // Anatomical palm & metacarpal arch
      placeGeo(new BoxGeometry(0.072, 0.042, 0.082), [0, 0.0, 0.008], [0.08, 0, 0]),
      // Padded knuckle protector ridge
      placeGeo(new CapsuleGeometry(0.013, 0.052, 4, 8), [0, 0.022, -0.02], [0, 0, Math.PI / 2]),
      // Articulated 2-segment thumb wrapping inward around handle
      placeGeo(new CapsuleGeometry(0.014, 0.032, 4, 8), [-side * 0.036, 0.012, 0.008], [0.3, side * 0.45, 0.25]),
      placeGeo(new CapsuleGeometry(0.012, 0.026, 4, 8), [-side * 0.026, 0.026, -0.022], [0.1, side * 0.85, 0.4]),
    ];
    // 4 Sculpted curled fingers (proximal + distal segments)
    for (let i = 0; i < 4; i++) {
      const fz = -0.028 + i * 0.019;
      const lenScale = i === 1 || i === 2 ? 1.06 : 0.94;
      parts.push(
        placeGeo(
          new CapsuleGeometry(0.0105, 0.034 * lenScale, 4, 8),
          [side * 0.024, 0.008 - i * 0.002, fz],
          [0, 0, Math.PI / 2 - side * 0.25],
        ),
      );
      parts.push(
        placeGeo(
          new CapsuleGeometry(0.0095, 0.026 * lenScale, 4, 8),
          [side * 0.008, -0.012 - i * 0.002, fz],
          [0, 0, side * 0.35],
        ),
      );
    }
    return mergeParts(parts);
  };

  // 2. OPW-Style Automatic Fuel Nozzle (Aluminum body + Trigger guard + Bent spout | Colored boot | Hose)
  const spoutCurve = new CatmullRomCurve3([
    new Vector3(0, 0.044, -0.09),
    new Vector3(0, 0.046, -0.155),
    new Vector3(0, 0.022, -0.235),
  ]);
  const nozzleMetalGeo = mergeParts([
    // Die-cast lower pistol grip & valve body
    placeGeo(new CapsuleGeometry(0.016, 0.088, 4, 8), [0, -0.018, 0.022], [0.42, 0, 0]),
    // Full enclosed trigger guard loop
    placeGeo(new BoxGeometry(0.014, 0.008, 0.095), [0, -0.048, -0.018], [0.18, 0, 0]),
    placeGeo(new BoxGeometry(0.014, 0.058, 0.008), [0, -0.015, -0.062], [-0.15, 0, 0]),
    // Squeeze lever trigger + hold-open latch
    placeGeo(new BoxGeometry(0.01, 0.012, 0.065), [0, -0.014, -0.018], [0.28, 0, 0]),
    // Brass hose swivel nut
    placeGeo(new CylinderGeometry(0.02, 0.02, 0.032, 10), [0, -0.068, 0.048], [0.45, 0, 0]),
    // Curved stainless steel spout
    new TubeGeometry(spoutCurve, 10, 0.0115, 8, false),
  ]);
  const nozzleBootGeo = mergeParts([
    // Ergonomic polymer scuff-guard valve cover with side grip ribs
    placeGeo(new CapsuleGeometry(0.029, 0.085, 6, 10), [0, 0.04, -0.032], [Math.PI / 2 - 0.16, 0, 0]),
    placeGeo(new BoxGeometry(0.062, 0.036, 0.08), [0, 0.038, -0.028], [-0.16, 0, 0]),
  ]);
  const nozzleSplashGeo = mergeParts([
    // Corrugated vapor-recovery splash collar
    placeGeo(new CylinderGeometry(0.026, 0.032, 0.034, 12), [0, 0.043, -0.115], [Math.PI / 2 - 0.05, 0, 0]),
    placeGeo(new TorusGeometry(0.028, 0.005, 6, 12), [0, 0.044, -0.128]),
  ]);

  // 3. Gourmet Diner Cheeseburger + Crispy Fries Combo
  const burgerBasketGeo = mergeParts([
    placeGeo(new CylinderGeometry(0.145, 0.115, 0.036, 14), [0, -0.024, 0], [0, 0, 0], [1.15, 1, 0.95]),
  ]);
  const burgerBunAndFriesGeo = mergeParts([
    // Bottom toasted bun + domed sesame brioche crown
    placeGeo(new CylinderGeometry(0.095, 0.088, 0.024, 14), [-0.015, -0.002, 0.005]),
    placeGeo(new SphereGeometry(0.098, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.54), [-0.015, 0.058, 0.005]),
    // Golden French fries tucked neatly on side of basket!
    placeGeo(new BoxGeometry(0.014, 0.065, 0.014), [0.095, 0.018, -0.025], [0.2, 0.1, -0.45]),
    placeGeo(new BoxGeometry(0.014, 0.072, 0.014), [0.102, 0.022, -0.005], [0.05, 0, -0.52]),
    placeGeo(new BoxGeometry(0.014, 0.068, 0.014), [0.098, 0.02, 0.016], [-0.15, -0.1, -0.48]),
    placeGeo(new BoxGeometry(0.014, 0.06, 0.014), [0.086, 0.016, 0.032], [-0.25, 0.15, -0.4]),
  ]);
  const burgerPattyGeo = placeGeo(new CylinderGeometry(0.102, 0.102, 0.028, 14), [-0.015, 0.02, 0.005]);
  const burgerCheeseGeo = mergeParts([
    placeGeo(new BoxGeometry(0.158, 0.007, 0.158), [-0.015, 0.036, 0.005], [0, 0.45, 0]),
    placeGeo(new BoxGeometry(0.152, 0.006, 0.152), [-0.015, 0.038, 0.005], [0, 1.15, 0]),
  ]);
  const burgerLettuceGeo = mergeParts([
    // Wavy ruffled lettuce leaf edge
    placeGeo(new CylinderGeometry(0.108, 0.104, 0.012, 12), [-0.015, 0.046, 0.005]),
    placeGeo(new TorusGeometry(0.096, 0.009, 5, 12), [-0.015, 0.046, 0.005], [Math.PI / 2, 0, 0]),
  ]);
  const burgerTomatoGeo = mergeParts([
    placeGeo(new CylinderGeometry(0.052, 0.052, 0.01, 10), [-0.042, 0.053, 0.028]),
    placeGeo(new CylinderGeometry(0.052, 0.052, 0.01, 10), [0.018, 0.053, -0.022]),
  ]);

  // 4. Figure-8 Bone-Shaped Car Wash Sponge
  const spongeYellowGeo = mergeParts([
    placeGeo(new CapsuleGeometry(0.046, 0.045, 5, 10), [-0.042, 0, 0], [Math.PI / 2, 0, 0]),
    placeGeo(new CapsuleGeometry(0.036, 0.035, 4, 8), [0, 0, 0], [Math.PI / 2, 0, 0]),
    placeGeo(new CapsuleGeometry(0.046, 0.045, 5, 10), [0.042, 0, 0], [Math.PI / 2, 0, 0]),
  ]);
  const spongeGreenGeo = mergeParts([
    placeGeo(new CapsuleGeometry(0.042, 0.042, 4, 10), [-0.042, 0.032, 0], [Math.PI / 2, 0, 0]),
    placeGeo(new CapsuleGeometry(0.033, 0.032, 4, 8), [0, 0.03, 0], [Math.PI / 2, 0, 0]),
    placeGeo(new CapsuleGeometry(0.042, 0.042, 4, 10), [0.042, 0.032, 0], [Math.PI / 2, 0, 0]),
  ]);

  // 5. OEM Click-Torque Threaded Red Fuel Cap
  const capPts = [
    new Vector2(0, -0.042),
    new Vector2(0.058, -0.042),
    new Vector2(0.062, -0.012),
    new Vector2(0.078, -0.008),
    new Vector2(0.078, 0.0),
    new Vector2(0, 0.0),
  ];
  const capDarkGeo = mergeParts([
    new LatheGeometry(capPts, 16),
    // Rubber O-ring gasket + tether cord loop
    placeGeo(new TorusGeometry(0.068, 0.008, 6, 16), [0, -0.006, 0], [Math.PI / 2, 0, 0]),
    placeGeo(new TorusGeometry(0.055, 0.005, 5, 12, Math.PI * 1.3), [0.055, -0.025, 0], [0.4, 0, 0]),
  ]);
  const capRedGeo = mergeParts([
    placeGeo(new CylinderGeometry(0.098, 0.104, 0.036, 16), [0, 0.018, 0]),
    // Raised ergonomic finger-twist bar with flared ends
    placeGeo(new BoxGeometry(0.175, 0.034, 0.032), [0, 0.046, 0]),
    placeGeo(new CylinderGeometry(0.02, 0.02, 0.034, 8), [-0.082, 0.046, 0]),
    placeGeo(new CylinderGeometry(0.02, 0.02, 0.034, 8), [0.082, 0.046, 0]),
  ]);

  // 6. Tactical Pistol-Grip X26 Stun Gun / Taser
  const taserYellowGeo = mergeParts([
    // Sculpted upper polymer receiver with angled front nose
    placeGeo(new BoxGeometry(0.052, 0.066, 0.165), [0, 0.032, -0.035]),
    placeGeo(new BoxGeometry(0.056, 0.032, 0.11), [0, 0.048, -0.015]),
  ]);
  const taserDarkGeo = mergeParts([
    // Angled ergonomic pistol grip + trigger guard + cartridge bay + iron sights
    placeGeo(new CapsuleGeometry(0.02, 0.082, 4, 8), [0, -0.028, 0.026], [0.34, 0, 0]),
    placeGeo(new BoxGeometry(0.014, 0.008, 0.052), [0, -0.018, -0.012]),
    placeGeo(new BoxGeometry(0.014, 0.038, 0.008), [0, 0.0, -0.035]),
    placeGeo(new BoxGeometry(0.048, 0.052, 0.036), [0, 0.032, -0.125]),
    placeGeo(new BoxGeometry(0.012, 0.012, 0.02), [0, 0.07, -0.095]),
    placeGeo(new BoxGeometry(0.022, 0.01, 0.015), [0, 0.07, 0.035]),
  ]);
  const taserArcGeo = mergeParts([
    placeGeo(new CylinderGeometry(0.007, 0.007, 0.038, 6), [-0.015, 0.034, -0.152], [Math.PI / 2, 0, 0]),
    placeGeo(new CylinderGeometry(0.007, 0.007, 0.038, 6), [0.015, 0.034, -0.152], [Math.PI / 2, 0, 0]),
    // Electric plasma arc bar between prongs
    placeGeo(new CylinderGeometry(0.0035, 0.0035, 0.03, 5), [0, 0.034, -0.166], [0, 0, Math.PI / 2]),
  ]);

  // 7. Ergonomic CCS2 DC Fast-Charger Gun
  const chargerDarkGeo = mergeParts([
    // Angled D-grip handle + upper barrel + dual-pin CCS2 plug face
    placeGeo(new CapsuleGeometry(0.02, 0.095, 4, 8), [0, -0.015, 0.025], [0.42, 0, 0]),
    placeGeo(new CapsuleGeometry(0.03, 0.12, 6, 10), [0, 0.036, -0.035], [Math.PI / 2 - 0.16, 0, 0]),
    placeGeo(new CylinderGeometry(0.016, 0.016, 0.05, 8), [0, -0.042, -0.015], [Math.PI / 2 - 0.16, 0, 0]),
    placeGeo(new CylinderGeometry(0.036, 0.038, 0.05, 12), [0, 0.044, -0.12], [Math.PI / 2 - 0.1, 0, 0]),
    placeGeo(new CapsuleGeometry(0.016, 0.028, 4, 8), [0, 0.02, -0.12], [0, 0, Math.PI / 2]),
  ]);
  const chargerCyanGeo = mergeParts([
    placeGeo(new BoxGeometry(0.018, 0.01, 0.105), [0, 0.068, -0.03], [-0.16, 0, 0]),
    placeGeo(new TorusGeometry(0.034, 0.006, 6, 12), [0, 0.045, -0.144], [-0.1, 0, 0]),
  ]);

  return {
    sleeveGeo,
    leftGloveGeo: buildGlovePalm(-1),
    rightGloveGeo: buildGlovePalm(1),
    nozzleMetalGeo,
    nozzleBootGeo,
    nozzleSplashGeo,
    burgerBasketGeo,
    burgerBunAndFriesGeo,
    burgerPattyGeo,
    burgerCheeseGeo,
    burgerLettuceGeo,
    burgerTomatoGeo,
    spongeYellowGeo,
    spongeGreenGeo,
    capDarkGeo,
    capRedGeo,
    taserYellowGeo,
    taserDarkGeo,
    taserArcGeo,
    chargerDarkGeo,
    chargerCyanGeo,
  };
}
