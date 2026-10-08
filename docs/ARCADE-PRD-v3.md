# ARCADE.exe — Complete Product and Experience PRD v3.0

Status: implementation specification. Platform: desktop/laptop browsers first. Source: dhwanib-del/aracdegame. Production: Vercel.

## 1. Product vision

ARCADE.exe is a visually rich, browser-based carnival with real motion-controlled basketball and skee-ball. The experience starts in a glowing nighttime arcade room with two full-height physical-looking game machines and a collectible sticker vending cabinet. Players explicitly choose a game and input mode, calibrate one hand if using the webcam, play a complete game, and earn a score receipt and unlockable stickers. Manual mouse and keyboard controls remain equally playable.

Success is defined by the complete interaction, not by a static rendering. An illustrated cabinet cannot substitute for working camera setup, a believable ball trajectory, accurate collision-based scoring, and meaningful rewards.

## 2. Non-negotiable rules

- NEVER use native iOS/Apple emojis or emoji glyphs for icons, mascots, basketballs, trophies, arrows, stickers, buttons, error states, decorative art, or placeholders.
- Create original vector or pixel-art SVG icons and game artwork, following one asset system.
- Maintain the user's supplied render references as the visual target: glossy arcade cabinets, physical controls, dramatic warm bulbs, electric cyan, layered signage, and a sticker dispenser.
- Do not place a static screenshot behind invisible buttons and call it an implementation. Interface controls must be real, accessible, independently layered elements.
- Never fabricate player totals, social activity, rankings, earned tokens, completion counts, or rewards.
- Never upload or store webcam video. Ask permission only after explicit user interaction.
- Both games must finish successfully using keyboard and mouse even if tracking is unavailable.

## 3. Visual direction and tokens

The site should feel like standing at an upscale boardwalk arcade at night: orange enamel-painted metal; navy, cyan, and cream signboards; warm circular marquee bulbs; inset LED red score counters; translucent acrylic buttons; bolts, seams, polished beveled edges, scuffed materials and controlled neon reflections.

Colors: Night Navy #071327; Cabinet Navy #102540; Shadow Plum #241725; Carnival Orange #FF6535; Hot Red #EE452B; Electric Cyan #18C4E4; Retro Blue #1268AA; Marquee Yellow #FFCB55; Ticket Cream #FCE8C5; LED Red #FF4045. Primary call to action orange for basketball and cyan for skee-ball; results retain a warm cream ticket surface.

Typography: original condensed angular display lettering on cabinets, readable sans serif for instructions, accurate seven-segment numeric style for LED panels. Avoid decorative fonts for technical errors or controls. Contrast to meet WCAG AA on all controls and text.

All graphic elements should be part of a single visual family: 8-bit mascot, pixel-hand/open hand/pinch hand, custom basketball, skee-ball, star, medal, camera, speaker, pause, gear, arrow, ticket, lightning, crown, smile, sticker machine. Prefer original SVG and glTF 3D assets. No standard emoji icons anywhere.

Lighting motion: gentle individual bulb glow with minor sequencing, not flashing. Buttons depress 4px on press. Cabinets push toward viewer around 350–500ms when selected. Reduced motion uses a fade. No excessive clutter over gameplay.

## 4. Information architecture and screens

Flow: Lobby > Choose game > Choose input > Permission (camera mode only) > Calibration > Practice > Start round > Gameplay > Reward machine > Replay / Change game. Returning users retain settings and local best scores but still explicitly start camera each visit. Exit stops camera streams.

### Screen A: Lobby arcade room

Composition uses one gigantic ARCADE.exe sign above two side-by-side full-size cabinets. Basketball is orange/red on the left; skee-ball is cyan/blue on the right. A narrow sticker machine stands beside them, with transparent compartments and original sticker illustrations. The room background is moody and softly defocused so controls remain readable.

Top navigation contains original branded wordmark; Play; How it works; Settings. Remove fake avatar accounts until real local personalization exists. The marquee displays YOUR HANDS. REAL GAMES. ANYWHERE. Large illustrated game names, an independently animated ball and hoop/roll lane inside each screen, a succinct instruction, real webcam/manual capability labels, and large lit PLAY NOW cabinet buttons. Bottom panel should state true product facts (two games, local scores, no account), NOT manufactured live-player counts.

Keyboard Tab focuses each cabinet, Enter selects. Hover animates lights and machine preview, selection zooms into the chosen cabinet, with a low-motion equivalent.

### Screen B: Input selection

Render as an inset metal control deck, not generic SaaS cards. Two large illuminated options: PLAY WITH HANDS and MOUSE + KEYBOARD with original consistent graphic icons. Camera option explains pinch, lift/aim, release and data privacy. Manual option explains pointer movement, drag/release and keyboard alternatives. Back to Lobby and Next are always visible. Choosing manual must never request camera permission.

### Screen C: Camera permission and calibration

Render as the GET SET UP carnival cabinet. Left panel holds live mirrored camera view with optional animated 21-point landmark overlay. Right column contains four illuminated tutorial cards: show your hand; pinch to grab; open to release; make a practice throw. Below: dominant-hand (left/right), mirror preview toggle, sensitivity, camera on/off and a huge Continue control.

Stages:
1. Camera off: describe use, privacy, secure HTTPS and show ENABLE CAMERA.
2. Permission pending: show waiting text, allow cancellation.
3. Camera active: show live preview but do not claim tracking until model initializes.
4. Model loading: show accurate loading status; avoid black unresponsive video.
5. Stable hand: require consistent landmarks for a dwell time around 500ms.
6. Pinch: compare thumb/index tip distance normalized by palm width; measure closed-pinch threshold.
7. Open: measure open distance; use separate thresholds/hysteresis and 30–80ms debounce.
8. Range: map comfortable side-to-side/up-down movement, avoiding large arm requirements.
9. Practice: player grabs and releases a ball into oversized target, then explicitly presses START ROUND.

Camera denied, not available, in use, WebGL error, model 404, WASM load failure, slow initialization and tracking loss each have distinct actionable messages and retry/manual fallback. Do not hide the failure in a generic catch. Stop tracks on exit. Never punish player for technical tracking loss.

### Screen D: Hoop Dreams gameplay

One complete basketball cabinet fills the view. Top marquee says HOOP DREAMS. The play area contains textured hardwood, a visible backboard, real hoop ring, net, physically rendered basketball and readable pickup point. Top physical HUD includes RED LED score, time, streak. Place trajectory guides inside playfield only as helpful overlay; small camera preview optional.

Rules: 60 second round; unlimited balls; successful basket 2 points; swish 3 points; third consecutive basket and later baskets have 2× multiplier, ending on a miss. Timing pauses when paused/tab hidden. Shots released before zero must finish resolving. A valid basket must cross hoop plane top-to-bottom inside rim opening after release. Rim and backboard contacts affect swish. Score each shot ID exactly once.

Manual: click/drag from ball, aim and release, with arrow keys for aim and power, Space for a controlled release. Camera: pinch near pickup ball, move naturally, open pinch to release. Velocity from short smoothed hand motion history and assisted arc; no random scoring and no ball teleporting into hoop.

Feedback: ball enlarges on grab, aim arc, release whoosh, physical bounce, LED tick-up, combo bulbs, net swish and minimal celebration. Pause button or P brings Resume / Restart / Change input / Settings / Exit. Resume shows 3-second countdown.

### Screen E: Roll With It gameplay

A full skee-ball cabinet fills the viewport, with a wood roll lane receding into targets, physical side barriers, raised rings labeled 10/20/30/40/50 and two higher 100 pockets. Top panel has scoreboard and nine ball indicators. No flat generic scoreboard card.

Rules: exactly nine valid launches; no time limit; 0 for misses; one scoring result per exclusive captured pocket. End only after ball nine resolves. Maintain meaningful power and side aim; rolling friction, walls, ramp and pocket detection should be predictable.

Manual: drag/aim and release or keyboard arrows plus Space. Camera: pinch, draw back and forward underhand release; estimate strength from screen-space movement with on-screen power adjustment rather than inaccurate webcam depth. Short roll trails, rolling sound, pocket lights, score popup and 100-point jackpot celebration.

### Screen F: Results / YOUR REWARDS

A sticker vending machine is the entire results screen, not a paper receipt floating on a plain background. Huge lit YOUR REWARDS marquee; left digital LED final score with starburst NEW PERSONAL BEST if earned, honest stats and physical orange PLAY AGAIN and cyan BACK TO LOBBY buttons. Right original collectible sticker grid of 12 compartments. Showcase actual earned stickers and locked silhouettes with conditions, not a fake token vending mechanic.

Possible collection illustrations: original pixel mascot, basketball, skee target, crown, bolt, retro sneaker, cassette, planet, pixel heart as drawn vector, gold ticket, arcade controller and custom smile badge. Unlock based on rules: first completion, first basket, first 100 pocket, streak milestone and new best. Persist unlocked stickers locally. Ticket export should produce a real PNG with honest score and stats. Share uses native share or copy URL only where supported. No dead buttons.

Result metrics: basketball score, valid attempts, made baskets, accuracy, swishes, best streak and previous best. Skee-ball score, exactly nine launches, score per ball, best pocket and number of 100-point hits.

## 5. Camera engine — highest priority technical blocker

The current GitHub Pages/Vercel implementation failed with dynamic imports from cdn.jsdelivr.net and unpkg.com. Fix at architecture level, NOT by swapping CDN URLs. Install @mediapipe/tasks-vision as a pinned npm dependency. Bundle JavaScript locally through Vite. Serve WASM assets and the .task hand model from the app's own Vercel paths, verified present in built files. MediaPipe initialization must run only on browser after explicit permission; GPU fallback to CPU. Use a persistent video element and one inference loop.

Landmarks: wrist 0, thumb 4, index 8, index MCP 5, middle MCP 9, pinky MCP 17. Pinch normalization uses hand width; hysteresis prevents duplicate pinch/release. Track recent smoothed palm positions about 150ms to estimate velocity. Transform camera coordinates and mirrored coordinates through one mapper. Gesture state machine: IDLE > HOVER > HOLD > RELEASE CANDIDATE > IN FLIGHT > RESOLVED > COOLDOWN, plus TRACKING LOST recovery. If tracking disappears while holding, cancel safely after brief recovery window; DO NOT automatically release.

Targets on supported devices: ~20–30 inference updates/s, ~60 rendering frames/s, <100ms gesture-to-launch visual latency. These are targets to test, not claimed current benchmarks. Model, WASM and any weights must be downloadable at HTTPS same-origin paths with correct status and MIME.

Test: camera stream granted, visible landmarks, pinch/release feedback, 20 consecutive real throws with no duplicate shots on Chrome; test Safari, Mac and Windows where possible. Camera permission working alone does not mean hand tracking is fixed.

## 6. Code architecture and implementation

React + TypeScript + Vite, Three.js / React Three Fiber for cabinet and active game scenes, Rapier physics for colliders and sensor crossings, MediaPipe tasks-vision for landmarks, state store for gameplay, Web Audio or Howler for sounds, localStorage for scores/stickers, Vercel connected to GitHub main. Game physics and input layers remain independent of visuals. Use accessible DOM controls layered on top of graphics.

Modules: CameraManager; HandTrackingService; GestureInterpreter; CoordinateMapper; InputAdapter; BasketballEngine; SkeeBallEngine; ScoreResolver with idempotent shot IDs; SessionStore; RewardService; SettingsStore; shared components Marquee, CabinetShell, LedScore, PhysicalButton, ControlRail, CameraScreen, CalibrationStep, RewardCompartment and ErrorScreen.

No Supabase required for MVP. Optional P1 server leaderboard requires score validation, moderation and anti-cheat protections; never pretend local scores are trusted global rankings.

## 7. Detailed motion and sound

Animation timings: hover 120–180ms; cabinet select 350–550ms; pickup 120–160ms; score popup 400–650ms; goal celebration 450–800ms; printed ticket 650–1100ms. No animations may block the next shot. In reduce-motion mode omit travel and camera zoom, retain clear static state feedback.

Sound families: localized warm arcade ambience, tactile button depression, basketball pickup, whoosh, rim metallic clank, backboard knock, net swish, skee rolling friction, sidewall hit, pocket tone, reward printer, sticker unlock sparkle. All audio opt-in following browser interaction; independent music/effects mute controls; visual alternatives for essential sounds. No audio spikes.

## 8. Error handling and recovery

- Camera permission denied: explain how to enable, offer mouse instantly.
- No camera device: explain device missing, manual path.
- Device in use: close competing app, retry.
- Model/WASM missing: technical diagnostics plus manual path; log failed asset stage. Do not say "camera denied".
- GPU unavailable: CPU mode, show processing status.
- Tracking lost: clear feedback, pause/recover or safely reset held ball, no false throw.
- Browser/tab hidden: auto-pause timer/physics.
- WebGL context lost: pause, attempt recovery, offer tested 2D fallback if implemented.
- Sound blocked: keep gameplay silent; user can activate on click.
- Storage blocked: continue gameplay with clear saved-score limitation.
- Slow internet: show loading/cancel, never an inert black screen.

## 9. Accessibility and responsive requirements

Visible keyboard focus, semantic actionable buttons, real form labels, aria-live scoring updates without overwhelming screen readers, no score communicated only by color, contrast AA, adequate text sizing, no forced overhead gestures, seated gameplay, left/right hand, sensitivity and mirror controls, no excessive flicker. During gameplay all critical controls visible without scrolling at 1280×720. 1440×900 desktop composition; small laptop adaptive HUD; tablet responsive lobby and manual play; mobile lobby and honest camera compatibility notice. Touch support only when tested; don't claim mobile webcam gaming in MVP.

## 10. Performance and asset quality

Create original cabinet assets with modeled geometry and physically plausible inset controls, high-quality glTF meshes or layered vector art. Optimize textures and lazy-load machine/game-specific assets. Keep environment from dominating CPU/GPU, prioritize input latency. No fake screenshot background. Ensure primary CTAs are independently clickable and accessible. Responsive layout must not crop marquee, game lanes, calibration controls or scores.

## 11. Verification / definition of done

P0 deployment must:
1. Serve MediaPipe module bundled with app, not cross-origin runtime ESM.
2. Serve model and WASM successfully from same-origin Vercel paths.
3. Recognize stable hand, pinch, release and recovery on real supported laptop.
4. Allow fully playable mouse/keyboard round in each game.
5. Award basketball points based on actual validated ball/hoop crossing; not pointer guesswork.
6. Run nine valid skee-ball releases and score exclusive real target pockets.
7. Provide pause/replay/exit; stop camera; persist true finalized scores.
8. Render reference-quality immersive arcade cabinet compositions and original icon artwork with ZERO native emojis.
9. Display real sticker inventory, honest local metrics, and functioning share/download.
10. Verify keyboard navigation, reduced motion, failure states, representative screen sizes and browsers.
11. Pass build, typecheck, tests and deployed browser smoke test.
12. Confirm Vercel deployment is READY and camera use is tested, not merely assumed.

## 12. Delivery sequence

Milestone 0 — fix local-bundled MediaPipe with Vite and same-origin assets, verify pinch sandbox in browser.
Milestone 1 — establish game-state architecture and deterministic manual inputs, unit tests.
Milestone 2 — physics vertical slices for basket and skee-ball with score idempotency.
Milestone 3 — high-fidelity cabinets, layered interactive parts and original pixel icon library.
Milestone 4 — reward vending cabinet, collectible stickers, downloadable ticket, original sound.
Milestone 5 — rigorous camera and browser QA, performance, accessibility and launch.

**Release rule:** do not present the app as camera-functional until real webcam tests have succeeded. No UI can compensate for unreliable controls.
