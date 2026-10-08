# ARCADE.exe — Comprehensive product requirements document

**Document version:** 4.0  
**Status:** Build specification; not a statement of implemented or tested capabilities  
**Owner:** Product and experience design  
**Repository:** dhwanib-del/aracdegame  
**Canonical file:** docs/prd.md  
**Target platform:** Modern desktop browsers, then responsive tablet/manual mode  
**Deployment:** Vercel connected to GitHub  
**MVP games:** Hoop Dreams (basketball) and Roll With It (skee-ball)  
**Reference roles:** Paper Throw is an interaction-quality reference; the supplied illustrated cabinets and prize-vending designs are art-direction references. This product must have its own original visual identity, assets, controls, and gameplay.

## 1. Product overview

### 1.1 Purpose of this document

This PRD defines the experience, game mechanics, input system, artwork, scene layout, physical feedback, functional requirements, edge cases, privacy rules, technical architecture, quality targets, testing gates, release sequencing, and full user-story inventory. It is intended to give engineering, art, motion, audio, QA, and product design sufficient specificity to implement and verify the complete experience without relying on an imagined interface or placeholder behavior.

A requirement marked **P0** blocks the first public release. **P1** is an expansion after MVP stabilization. **P2** is a future enhancement. Numeric targets in this document are initial design targets that must be measured and tuned in human playtests.

### 1.2 Product summary

The project is a browser-based physical-motion arcade. A player arrives in a richly illustrated virtual arcade, selects a game machine, chooses webcam hand control or mouse/keyboard control, completes setup and a practice throw, plays an actual physics-driven round, and receives a printed-ticket-style score and an original collectible sticker reward when conditions are met.

The arcade supports two distinct experiences: a 60-second basketball challenge emphasizing fast repeated throws and streaks, and a nine-ball skee-ball challenge emphasizing deliberate aim and rolling strength. Both share foundational input interpretation, lifecycle, audio preferences, persistence, and recovery systems, but have separate world geometries, trajectories, scoring rules, presentation and gameplay feedback.

The core promise is **real control, tactile feedback, fast onboarding, and a memorable visual world**. The site must never substitute static screenshots or random scores for real interaction.

### 1.3 Source-inspired principles

Paper Throw demonstrates a focused physical-action loop: approach an object, acquire it, change or aim it through hand movement, release it, observe a visible outcome, and receive immediate feedback. It also demonstrates camera-preview placement, brief gestural instruction, gesture smoothing and a game canvas as the primary surface. Use these as principles to study and validate, not as permission to reproduce its code, art, written copy, or branding.

The supplied arcade references contribute the cabinet compositions, night-time carnival lighting, enamel and plastic materials, layered depth, scoreboard placement, slanted skee-ball lane, and prize-machine presentation. The product must develop original versions of those ideas, preserving usability over decorative complexity.

### 1.4 Absolute art and content constraints

1. **No native iOS, Apple, operating-system, or Unicode emoji glyphs in the interface.** Never use an emoji as an icon, game object, sticker, loading placeholder, camera indicator, achievement, speech bubble, decorative bullet, error icon, or fallback.
2. Every visible icon comes from the original pixel/vector icon system. Balls and physical props are modeled 3D objects or custom 2D textures.
3. Avoid generic dashboard cards, default HTML button styling, mismatched libraries, unmodified stock illustrations, fake live player counts, fake leaderboard standings, nonfunctional reward controls, and decorative screenshots masquerading as interactive cabinets.
4. The user-facing UI should be restrained during active play: cabinet architecture surrounds the game, but the ball, target, aim and tracking state remain most prominent.
5. Design at high fidelity across every state, including permission denial, loading, calibration failure, pause, timeout, reduced motion and empty collection.

### 1.5 Scope and release levels

| Domain | MVP (P0) | Next (P1) | Future (P2) |
| --- | --- | --- | --- |
| Games | Basketball, skee-ball | Third game prototype | Expanded carnival |
| Input | One-hand camera and manual | Advanced sensitivity profiles | Two-hand mechanics |
| Identity | Anonymous local browser session | Optional nickname | Cross-device identity |
| Records | Local personal best and statistics | Shareable challenge link | Verified online leaderboard |
| Rewards | Deterministic local sticker unlocks | More original stickers | Seasonal sets |
| Sharing | Download result PNG, copy score | Native share refinements | Friend challenges |
| Environments | Polished original cabinets | Cabinet skins | Playable walk-through room |
| Accessibility | Full manual play, reduced motion | Advanced control remapping | Assistive device integrations |

## 2. Goals

### 2.1 User goals

- Start a game without downloading, registering or paying.
- Understand what their hands should do within a few seconds of an instructional demonstration.
- See the object follow a hand accurately while held, respond meaningfully to movement, then fly or roll predictably when released.
- Distinguish a missed shot from an unrecognized or interrupted gesture.
- Finish a complete enjoyable round on a laptop in a constrained physical space.
- Replay, switch games, change settings, use an alternative input, or stop the camera at any moment.
- Receive accurate scores and earned rewards without being misled by fake engagement data.
- Enjoy a visually coherent, distinctive arcade experience worthy of sharing or featuring in a creative-technology portfolio.

### 2.2 Product and business goals

- Demonstrate that one ordinary laptop webcam can enable intuitive short-form gesture gaming.
- Create a technically robust, recognizable interaction-design project with memorable original visual storytelling.
- Encourage voluntarily repeated game sessions and peer sharing without dark patterns.
- Establish reusable game infrastructure so a later game does not require reimplementing camera, calibration, scoring, results, or privacy.
- Obtain observable evidence of setup completion, intended-gesture recognition, game completion, and replay desirability through opt-in research, not fabricated public statistics.

### 2.3 Measurable launch hypotheses

| Measurement | Initial target | Measurement method |
| --- | --- | --- |
| Lobby usable | Within 3 seconds on defined test laptop/network | Lab performance run |
| Camera ready after permission | Within 5 seconds on tested hardware, where model cached or reasonably downloaded | Timed device matrix |
| Camera setup completion | At least 90% of supported tested sessions | Moderated setup sessions |
| First valid recognized release | At least 85% within 30 seconds after calibration | Moderated playtests |
| Full round completion | At least 80% of started sessions | Opt-in session telemetry or usability study |
| Voluntary replay | At least 50% of participants play again | Observed sessions |
| Visual render cadence | Target 60 FPS, no lower than 30 FPS sustained on supported baseline | Profiler |
| Hand inference | Target 20–30 updates/s | Timed instrumentation |
| Physical release to visible launch | Target less than 100 ms | Instrumented gesture timestamps |
| Duplicate score events | Zero for same shot ID | Unit/integration regression tests |

All measurements require precise event definitions, denominators, hardware profiles and tested build versions.

### 2.4 Non-goals

The MVP is not a full-body motion-capture product, sports coaching system, biomechanics model, online casino, VR game, in-game commerce platform, surveillance application, competitive verified esports service, video-recording service, social network, or multiplayer platform. It does not require login, biometrics, account registration, remote camera inference, server-side hand recognition, online matches, purchases or paid tickets.

## 3. User personas

### 3.1 Quick break player

A student or casual desktop user with two to five minutes between tasks. Wants almost zero setup, a self-explanatory first interaction, quick feedback and short play sessions. Friction sensitivity is high; camera loading that fails or a long tutorial causes abandonment. Their primary action is play immediately, perhaps with a mouse if permission is inconvenient.

### 3.2 Curious motion explorer

A design or technology enthusiast who wants to test a novel human-computer interaction. Tolerates a brief calibration, expects visible tracking and high input fidelity, and is quick to notice lag, accidental release or contradictory visual feedback. Likely to try both games and compare camera to mouse.

### 3.3 Social challenger

A player interested in improving personal bests and sending an authentic result ticket to a friend. Values clear rules, trustworthy scores, satisfying celebration and replay affordances. Does not need an account or real-time multiplayer in MVP.

### 3.4 Alternative-input player

A player who cannot or does not wish to use their camera or sustain large gestures. May play seated, have limited hand range, use one hand, prefer keyboard input, or have an inaccessible camera. Must complete both games with equivalent rules and without penalty. Controls must be discoverable and adjustable.

### 3.5 First-time privacy-conscious visitor

A visitor hesitant to allow webcam access. Needs to understand exactly when video begins, which processing is local, whether any frames are uploaded, how to turn camera off, and whether manual play is fully available.

### 3.6 Role-based access

MVP offers a single anonymous player role with access to both games, local settings, rewards and results. There is no administrator UI, account access control, login wall or server-owned player content. Browser permission governs camera use; it is separate from app authentication. Developer diagnostic capabilities are hidden from ordinary UI and must not expose raw camera frames or sensitive data.

## 4. Functional requirements

### 4.1 Brand, layout and design system

**FR-001 P0 — Original brand:** ARCADE.exe uses an original high-contrast carnival identity with a powerful illuminated marquee, tactile machine graphics, distinct orange basketball and cyan skee-ball identities, ticket-cream rewards, limited controlled neon and original custom assets.

**FR-002 P0 — No emoji:** Static scans and visual QA must establish that no native emoji glyphs appear in visible product surfaces, including error copy and loading screens.

**FR-003 P0 — Layered controls:** Physical-button graphics are independently operable semantic buttons with hit areas, focus states and pressed states; static imagery must not substitute for logic.

**FR-004 P0 — Consistency:** Shared spacing units (4, 8, 12, 16, 24, 32, 48 px), bevel depth, outline thickness, icon grid, typographic roles, control height, lighting intensity, score number styling and state colors are documented as design tokens.

**FR-005 P0 — Adaptive layout:** At 1440×900 show complete lobby composition; at 1280×720 primary machine selection and game controls remain reachable; below desktop width rearrange machines vertically; active gameplay never requires page scroll.

**FR-006 P0 — Motion:** Machine hover lift 120–180 ms; selection transition 350–550 ms; button depression ~100 ms; shot response immediate; celebrations brief and nonblocking. Reduced motion replaces spatial movement with opacity/state transitions.

### 4.2 Lobby and navigation

**FR-010 P0:** First visit loads without permission prompt or webcam initialization.

**FR-011 P0:** Two visible selectable arcade cabinets show name, preview, game type, estimated duration or ball count, control capabilities and clear start action.

**FR-012 P0:** Cabinet hover/focus provides a visually clear indication; click/Enter preserve selected game through setup.

**FR-013 P0:** Available navigation includes Play, How to play and Settings; all buttons must open functioning surfaces.

**FR-014 P0:** Sticker machine previews the real local sticker collection state; zero-unlock state is honest and inviting; no invented token economy.

**FR-015 P0:** Back navigation preserves game choice until explicitly changed; exit from active game requires clear decision about losing unfinished progress.

### 4.3 Input method and camera lifecycle

**FR-020 P0:** Player explicitly selects Camera or Mouse/Keyboard. Camera stream remains off in manual mode.

**FR-021 P0:** Camera setup describes local processing, browser permission, one-hand visibility and lighting before activation.

**FR-022 P0:** On explicit Enable Camera click, use getUserMedia with video only and audio disabled; show permission pending, granted, denied, missing, device busy and unsupported secure context separately.

**FR-023 P0:** Browser JavaScript dependency for MediaPipe is installed and pinned through npm and bundled with the project; do not use browser-time dynamic import from jsDelivr or unpkg.

**FR-024 P0:** MediaPipe WASM and hand model files are packaged and served through verified first-party Vercel URLs. CI/build documentation identifies exact assets and checks their deployed HTTP responses and content types. GPU is attempted where supported, CPU fallback is tested.

**FR-025 P0:** Real camera image is displayed in optional mirror mode; camera stream ownership is centralized and persists through setup into camera gameplay without duplicate device openings.

**FR-026 P0:** Model load and camera access have independent states; camera-success must never be presented as tracking-success.

**FR-027 P0:** A visible camera-active indicator appears whenever tracks are active. Stop all tracks on manual-mode switch, lobby exit, session termination and unloading.

**FR-028 P0:** When tracking or initialization fails, preserve a working manual fallback and a Retry action with error-specific advice.

### 4.4 Hand calibration and tracking

**FR-030 P0:** Track one stable active hand with 21 MediaPipe landmarks and handedness classification; lock chosen active hand to avoid jumping to an unrelated second hand.

**FR-031 P0:** Normalize thumb-tip to index-tip pinch distance using reference palm width; apply separate entering/exiting thresholds and a 30–80 ms initial debounce window.

**FR-032 P0:** Smooth mapped palm location with a low-latency filter such as One Euro; record a bounded 120–200 ms timestamped velocity history and reject implausible jumps.

**FR-033 P0:** Support calibration sequence: find hand, pinch/hold, open/release, find comfortable range, complete practice throw. Each step has an animated custom vector demo and readable status copy.

**FR-034 P0:** Calibration is not forcibly failed after a short timer. User can retry, change dominant hand, mirror preview, adjust sensitivity or switch input.

**FR-035 P0:** Maintain states IDLE, HOVER, HOLDING, RELEASE_CANDIDATE, IN_FLIGHT, RESOLVED, COOLDOWN and RECOVERY. Do not commit two throws for one release.

**FR-036 P0:** Hand disappearance while holding a ball must not auto-launch. Freeze hand-owned ball briefly; restore holding on reliable reacquisition or return it to pickup after timeout.

**FR-037 P0:** Canvas input mappings consistently transform raw camera coordinates, mirrored coordinates, normalized gameplay controls and physics world coordinates.

**FR-038 P0:** Preview may show custom 21-point landmark overlay; tracking failures must be distinguishable from player misses.

### 4.5 Manual and keyboard accessibility

**FR-040 P0:** Both games must work without camera or MediaPipe model download.

**FR-041 P0:** Pointer can acquire visible ball from marked pickup zone, aim by movement and release via pointerup. Keyboard can acquire, adjust aim/power and release using documented keys.

**FR-042 P0:** Manual mode uses the same game rules, scoring constraints and reward eligibility as camera mode. Input adapters produce common game commands.

**FR-043 P0:** Default keyboard mapping: Tab moves among controls; Enter activates; arrows adjust aim and power; Space picks up/releases based on game state; P pauses; Escape invokes pause/back. All controls explain current behavior.

**FR-044 P0:** Disabled input while paused, transitioning, cooldown or completed is enforced; event listeners cleaned on navigation to prevent duplicate firing.

### 4.6 Shared simulation

**FR-050 P0:** Independent simulation, rendering, input, score resolution and persistence modules. Fixed timestep approximately 60 Hz, with max accumulated-step budget to avoid spiral of death.

**FR-051 P0:** One active ball at pickup, held or in flight per launch stage; stable shot ID, launched timestamp, collision flags, outcome and resolution status.

**FR-052 P0:** The throw trajectory must respond predictably to lateral aim, motion intensity and allowed game-specific assistance. Never award random scores disconnected from simulated target interaction.

**FR-053 P0:** Score resolver is idempotent: a shot can resolve and award points exactly once.

**FR-054 P0:** Collision sounds are throttled; offscreen/out-of-bounds or nonmoving balls resolve within a bounded timeout.

**FR-055 P0:** Pause freezes time, physics progression and new shot input. Resume uses a brief reposition countdown. Browser tab hidden triggers auto-pause.

### 4.7 Hoop Dreams mechanics and display

**FR-060 P0 — Machine:** Red-orange enamel cabinet, custom basketball asset, hardwood-textured miniature court, backboard, rim, animated net and inset red LED score/time/streak digits. Decorative frame must never cover the shooting zone.

**FR-061 P0 — Round:** 60 seconds; unlimited sequential balls; valid launched balls already in flight after timer expiration can resolve before results.

**FR-062 P0 — Pickup and aim:** Ball starts in visible accessible pickup location. Pinch near ball or pointer/keyboard acquire. Holding attaches ball to cursor; optional short trajectory shows prospective arc.

**FR-063 P0 — Release:** Open pinch or release manual input with recent velocity-based launch and clamped assistance. Stationary gestures produce gentle constrained toss, not automatic score.

**FR-064 P0 — Collision:** Physical hoop/rim and backboard colliders create plausible bounce; gravity and ball radius are coherent. Swish animation tied to a ball that actually passes through rim.

**FR-065 P0 — Basket test:** Ball must cross from above to below within rim scoring aperture with valid shot identity. Crossing from beneath or merely touching rim does not score.

**FR-066 P0 — Scoring:** Regular basket 2; clean swish 3; consecutive made baskets streak; third and later consecutive baskets double points. A miss resets streak. Scoring display increments from committed score only.

**FR-067 P0 — Feedback:** Grab tactile click and scale, aiming guide, release swoosh, rim/backboard sound, score chime, combo light animation, last-ten-seconds visual warning, buzzer with capped volume.

**FR-068 P0 — Results:** Final score, attempts, baskets, accuracy (baskets / valid attempts), swishes, best streak, previous best and newly achieved best.

### 4.8 Roll With It mechanics and display

**FR-070 P0 — Machine:** Cyan-blue physical skee-ball cabinet with wood-perspective lane, side rails, ascending ramp, seven or more mutually exclusive numbered scoring captures, ball track and inset score/balls-left LEDs.

**FR-071 P0 — Round:** Exactly 9 valid launched balls; no timer; do not end until final ball is resolved. Cancelled pickups do not consume balls.

**FR-072 P0 — Aim:** Lateral hand movement changes direction; roll strength derived from forward gesture or screen-space pullback/release. Camera depth is not assumed reliable. Keyboard/manual power controls are available.

**FR-073 P0 — Physics:** Ball rolls with plausible friction, wall rebounds, ramp ascent, brief launch, target capture and miss/return. No arbitrary teleport to target.

**FR-074 P0 — Pocket scoring:** Numbered exclusive captures at 10, 20, 30, 40, 50 and challenging 100-point slots. Award only on valid capture in correct direction, once per ball. Target graphics match collision locations.

**FR-075 P0 — Counter:** Balls-left decremented on committed launch, not grab. LAST ROLL shows on ninth launched ball; results wait until resolved.

**FR-076 P0 — Feedback:** Roll sound, rail impacts, ring glow, point label, larger jackpot animation at 100, short re-enable delay with no obstructive celebration.

**FR-077 P0 — Results:** Total, score per ball, best pocket, count of 100-point hits, number of valid balls, personal best and new-best state.

### 4.9 Rewards, tickets and persistence

**FR-080 P0 — Results visual:** A custom original sticker-vending arcade cabinet acts as a results screen. Left side score board, honest metrics and Play Again/Back to Arcade; right side illuminated collectible slots and ticket printer.

**FR-081 P0 — Inventory:** Define at least 12 original sticker illustrations and distinct persistent locked/unlocked states. Stickers unlock on explicit milestones: first completed round, first basket, first swish, first 3-streak, score thresholds, first 100-point pocket, high skee-ball result and personal-best events. Each condition is documented with exact thresholds before shipping; avoid unlocking on abandoned sessions.

**FR-082 P0 — Persistence:** Versioned localStorage schema for settings, personal best, aggregate completed game stats and unlock collection. Handle unavailable/corrupt storage without gameplay crashing.

**FR-083 P0 — Download:** Save ticket produces actual local PNG output containing game title, score, date and accurate stats with original artwork; disabled only with actionable error when unsupported.

**FR-084 P0 — Sharing:** If native Web Share supported, show share sheet; otherwise offer download or clipboard copy and truthful confirmation. Never expose nonexistent challenge leaderboards.

**FR-085 P0 — Repeat:** Play Again starts a completely reset round using remembered game/input preferences, with explicit camera reactivation if stream ended. Change Game returns lobby.

### 4.10 Audio, feedback and settings

**FR-090 P0:** Original arcade sounds or appropriately licensed effects; distinct button, pickup, release, collision, swish, roll, score, buzzer, ticket and unlock cues.

**FR-091 P0:** Separate music/effects toggles and levels; no unsolicited audio autoplay; browser audio initiated on user action.

**FR-092 P0:** Settings include hand preference, sensitivity, mirror, optional camera preview, trajectory guide, sound and music, reduced motion and reset local scores/collection with confirmation.

**FR-093 P0:** Every essential audio event has corresponding visual meaning.

**FR-094 P0:** Original art and sound assets loaded only as necessary; safe low-quality mode reduces effects before reducing input responsiveness.

### 4.11 Reliability, error and security

**FR-100 P0:** Detailed recoverable error cases for camera denied, no device, device busy, insecure context, WASM 404, model 404, GPU failure, no detected hand, low light, tracking dropout, audio failure, storage unavailable, WebGL context loss, offline state and stale deployment.

**FR-101 P0:** Camera frames remain local, with no image recording, upload, face analysis, demographic inference or biometric identity storage.

**FR-102 P0:** App runs over HTTPS in production. Pin packages; use first-party served model/WASM and restrictive CSP tested for compatibility. No server secrets embedded in client.

**FR-103 P0:** Active run is abandoned safely on unexpected refresh; only completed result can update personal best.

**FR-104 P0:** Diagnostic overlays and logs may show model load stages, FPS, delegate, tracked/untracked and gesture state, but must not transmit camera frames or retain user-specific landmark histories.

## 5. User experience

### 5.1 Detailed stage design

**Lobby:** At 1440×900, one central theatrical sign sits above two close-set full-height illustrated cabinets. Hoop Dreams left with amber-orange rim, Roll With It right with blue-cyan trim. A narrow collectible station on the edge shows local progress. Detailed small screws, bevels, warm bulbs and light scratches establish tactile depth; the central arcade room is subdued. No emoji or generic feature cards. On keyboard focus the active cabinet illuminates without requiring hover.

**Input selection:** The chosen machine zooms forward; an inset two-position control desk slides up. Choice text stays concise. Privacy appears immediately adjacent to camera activation. Back is always in the same corner.

**Camera setup:** A bespoke calibration cabinet shows live video on the left and a vertical four-step illustrated procedure on the right. A hand silhouette and landmark overlay help spatial orientation. Track progress is labeled, not inferred from colors. A bottom physical console holds left/right hand control, mirror, camera off and continue.

**Basketball:** The environment is a purpose-built court cabinet, not a full-screen generic website. The ball remains the most saturated mobile subject, the hoop central, the LED HUD in a narrow band above. Small tracked-hand picture-in-picture is optional. Aiming and point popups must never hide the ball or rim.

**Skee-ball:** Camera perspective emphasizes the long lane and ascending score pockets. The front lip and lower ball pickup are visibly reachable. The numbered rings are large enough to distinguish at standard laptop resolution. An aim-power affordance follows the hand in front of the lane, not in a floating settings dialog.

**Results:** The original sticker machine slides into focus. Score display is immediate; optional short ticket paper feed and unlocked capsule illumination follows. Buttons are always available even while optional animations complete.

### 5.2 Interaction affordances

- A ball pulses only while it is available to pick up, not while already committed to flight.
- Hand cursor is visibly different for tracking, hovering, holding, aiming, lost and paused.
- Input recognition is confirmed promptly by change in object ownership, sound and concise status.
- Aim and release mappings are consistent; release cannot silently turn into a miss when tracking was lost.
- Error recovery can occur without navigating back to lobby or losing a previously completed result.
- On small screens, buttons become larger, HUD compresses, unnecessary decorative elements reduce before functional content.

### 5.3 Exact screen text samples

- Lobby: “Your hands are the controller.”
- Hand mode: “Pinch to grab. Move to aim. Open to throw.”
- Permission: “Enable camera when you're ready. Your video stays on this device.”
- Model loading: “Loading hand tracking. This may take a moment the first time.”
- Hand found: “Hand detected. Try a pinch.”
- Poor visibility: “We can't reliably see your hand. Adjust lighting or move into frame.”
- Tracking lost: “Tracking paused. Your ball won't be thrown.”
- Invalid release: “Release wasn't recognized. Keep holding or try again.”
- Manual option: “Use mouse and keyboard instead.”
- End of round: “Your score is in.”
- Best: “New personal best.”
- Sticker unlock: “New sticker unlocked.”
- Failed ticket export: “Could not save your ticket. Please try again.”

No emoji glyphs or fake enthusiasm. Errors must explain what happened and how to recover.

### 5.4 Responsive breakpoints and fallbacks

| Viewport | UI layout | Input support |
| --- | --- | --- |
| 1440×900 and larger | Full marquee, dual machines, prize station | Camera/manual |
| 1280×720 | Scaled marquee and game HUD, all essential controls visible | Camera/manual |
| 1024–1279 | Condensed machine framing and controls | Camera where tested/manual |
| 768–1023 | Stacked lobby; adaptive stage | Manual baseline, camera only after QA |
| Under 768 | Informational lobby or verified manual play layout | Manual only if tested; no false camera promises |

### 5.5 Accessibility specification

The whole menu is keyboard operable; pointer and keyboard can complete each round. Provide visible focus, tooltips that do not require hover, high contrast scores, labels for all controls, clear pause function, alternatives to sounds, respect for prefers-reduced-motion, settings for camera mirror/dominant hand/sensitivity, minimal range of motion, seated participation and explicit technical versus player failure distinctions. Do not rely on color, fine motor hover, audio or a webcam for essential access.

## 6. Narrative

I open this tool on my laptop and see a beautifully lit miniature arcade rather than a conventional home page. The two machines make it clear what I can play, and I choose basketball. I can play with my hands or mouse; I select my camera and understand that my video stays on my device. My hand appears inside a little calibration display, I pinch, and the game shows me exactly when it recognizes the gesture. In practice, I can feel through movement and visible feedback that I'm picking up a ball. I release and watch it arc toward a real hoop. A made shot causes the rim lights and score display to react immediately, so I try again. When time is up, a ticket prints and a collectible sticker becomes available only because I earned it. I can replay, try skee-ball or save my score, and at any time I know how to stop the camera or switch to mouse controls.

## 7. Success metrics

### 7.1 User-centric metrics

- First-run task success: share of participants who select game, choose input and understand the control system without outside intervention. Target at least 90% in moderated samples.
- First recognized release: at least 85% within 30 seconds of completed calibration, measured from successful ready state.
- Completion rate: at least 80% of started rounds complete within valid system conditions.
- Ease score: target median at least 4/5 for “I understood how to throw or roll.”
- Perceived agency: target median at least 4/5 for “The ball responded to my actions.”
- Camera recovery: user can transition from any camera error to manual game in two user actions or fewer.
- Voluntary replay: at least 50% of research participants initiate second round without facilitator prompting.
- Error attribution: observers can distinguish tracking failures from missed shots in at least 90% of presented scenarios.

### 7.2 Product metrics

- Zero dead-end routes in main journey.
- Both games selectable and complete with manual mode at MVP.
- Every displayed sticker award has an auditable local condition.
- Best score changes only after a valid completed session.
- Share/download operations actually complete or show accurate failure.
- Optional analytic events: lobby_view, game_select, input_select, camera_start_requested, camera_ready, calibration_complete, valid_release, shot_resolved, round_completed, replay_started, ticket_saved and sticker_unlocked. Store no raw landmark or video data. Analytics opt-in/consent if introduced.

### 7.3 Technical metrics

- Target sustained 60 render FPS, minimum acceptable active 30 FPS on support matrix.
- MediaPipe inference 20–30 Hz target while game rendering remains responsive.
- Release-to-visual-launch target under 100 ms; profile actual hardware.
- Initial interactive lobby target under 3 seconds on defined connection.
- Camera to tracking-ready target under 5 seconds after permission under test conditions.
- Zero duplicate scoring for repeated collision events.
- Exactly 9 consumed valid skee-ball releases for a completed round.
- Zero camera tracks running after navigation to manual/lobby.
- Zero runtime cross-origin ES import requests to jsDelivr/unpkg for hand tracking after production bundling.

## 8. Technical considerations

### 8.1 Proposed stack and rationale

React, TypeScript and Vite for app and bundle; React Three Fiber/Three.js for illustrated 3D stage; Rapier for fixed-step rigid-body collisions; @mediapipe/tasks-vision for on-device tracking; an explicit state machine or typed store for game session transitions; Web Audio or Howler for effects; localStorage for local progress; Playwright and Vitest for coverage; GitHub repository linked to Vercel for deployment. Pin compatible versions; maintain a lockfile.

### 8.2 MediaPipe implementation contract

The current app has produced errors while trying to dynamically import CDN-hosted vision_bundle.mjs from jsDelivr/unpkg. The replacement architecture must be tested before art polish proceeds:

1. Install and bundle the JavaScript library through npm/Vite rather than browser dynamic import from external URL.
2. Include the relevant .wasm binaries and .task model in local public/mediapipe directories; use verified paths from production root.
3. Instantiate vision fileset using a first-party WASM path, then create HandLandmarker with first-party modelAssetPath; GPU first where appropriate and CPU fallback.
4. Test live network responses and MIME types for assets and inspect Vercel build output for actual files.
5. Keep camera lifecycle separate from model lifecycle: webcam video being visible does not mean model initialized.
6. Run one persistent video and one bounded inference loop. Avoid duplicate requestAnimationFrame loops or stale video timestamps.
7. Process normalized landmarks entirely in-browser, including smoothing, pinch hysteresis and throw events.
8. Maintain readiness diagnostics and accurate errors; stop media tracks reliably on exit.
9. Validate in real Chrome and Safari laptop browsers with successful repeated pinches and throws. CI unit tests alone do not validate real camera behavior.

### 8.3 Physics and collision contracts

Use shared command types GRAB_BALL, UPDATE_AIM, RELEASE_BALL, CANCEL_HOLD, PAUSE, RESUME, RESTART. Every launched object has unique shot ID, measured launch timestamp, simulated trajectory and outcome. Basketball awards on descending hoop crossing, not ring contact; skee-ball awards on exclusive capture sensor. ScoreResolver rejects second resolution for same ID. Simulation uses fixed timestep and caps large elapsed time when focus returns.

### 8.4 Storage and privacy

Store versioned user preferences, optional calibration thresholds, completed session summaries, personal bests and unlocked sticker IDs locally. Never store video, screenshots of webcam, long-term hand geometry, biometric signatures, identities, raw tracking traces or audio recordings. Camera permission is owned by browser. Support Reset local data with confirmation. Optional server features require separate data-governance review, validated submitted scores, moderation and privacy policy updates.

### 8.5 Performance and scalability

Load lobby quickly with critical illustrated assets; lazy-load models, cabinet geometry and audio as needed; compress textures, instance bulbs, use limited shadows and capped particle counts. Ensure mobile/manual fallback remains possible without initializing MediaPipe. Prioritize stable gesture latency over bloom or decorative animation. The offline state may allow manual game if assets are already cached; do not promise full offline support until explicitly tested.

### 8.6 Main risks and mitigations

| Risk | Severity | Mitigation and launch gate |
| --- | --- | --- |
| Camera model fails to import | Critical | Bundled npm library, local WASM/model, real deployed browser test |
| Unreliable pinch timing | High | Calibration, hysteresis, dwell, low-latency smoothing, human tests |
| Artificial or unfair scores | High | Physics sensor-based deterministic score resolution |
| Game does not feel controllable | High | Adjustable assist, trajectory guide, constrained velocity |
| Camera loss triggers phantom throw | High | Recovery state and safe cancellation |
| High-detail machines obscure controls | High | Separate presentation frame from interaction layer, responsive QA |
| Large models reduce FPS | High | LOD, texture compression, lazy loading, quality presets |
| Emoji or placeholder asset leakage | Medium | Artwork QA and source/content lint policy |
| Personal best incorrectly saved | High | Finalized-only persistence and unit tests |
| Collection implies unearned items | Medium | Predicate-based sticker inventory, default locked view |
| Misleading privacy copy | High | Network and data-flow review, no raw media upload |

## 9. Milestones & sequencing

### 9.1 Suggested team and estimate

A suggested team: 1 product/interaction designer, 1 creative frontend/3D engineer, 1 computer-vision/gameplay engineer, 1 part-time 2D/3D artist and 1 part-time QA/playtest partner. A solo developer can implement a phased version but should plan for a longer calendar. **Indicative** 10–16 weeks for a carefully tested P0 by a small team; not a committed delivery date.

### 9.2 Phase 0 — Baseline assessment and model-loading repair (1–2 weeks)

Audit current repo, inspect network failures and state lifecycle, create a camera-only proof of concept with first-party MediaPipe assets, verify one hand and 20 clean pinch/release recognitions on real hardware. Gate: no CDN ESM import failure, correct camera stop behavior, retry/manual escape path.

### 9.3 Phase 1 — Typed game foundation (1–2 weeks)

Refactor into modular React/TypeScript project, define input adapters, camera service, game state, physics tick, idempotent score records, local persistence and basic unit tests. Gate: correct reset/pause/exit and no duplicate input events in a small test scene.

### 9.4 Phase 2 — Basketball vertical slice (2–3 weeks)

Implement scene, pickup, release, ballistic physics, rim/backboard contacts, descending score sensor, timer, streak/swishes, manual/camera controls, result object. Gate: full 60-second round works in both input modes on target laptop.

### 9.5 Phase 3 — Skee-ball vertical slice (2–3 weeks)

Build lane/pockets, rolling friction and ramp, aiming/power mapping, exactly nine launches, exclusive pocket capture and results. Gate: complete round with deterministic valid pocket scores.

### 9.6 Phase 4 — High-fidelity cabinet and original art (2–3 weeks)

Create original marquee, physical machine frames, camera setup cabinet, tiny icon family, score LED graphics, reusable physical buttons, game environments, responsive layout and reduced-motion states. Gate: all reference-level layout intents achieved without reducing gameplay clarity; no emoji.

### 9.7 Phase 5 — Reward machine, audio and share artifacts (1–2 weeks)

Create original stickers and unlock conditions, ticket print effect, PNG export, sound engine, settings and accurate result statistics. Gate: prize awards traceably accurate, saves persist, exported ticket matches run.

### 9.8 Phase 6 — QA, performance and release (1–2 weeks)

Automated unit/integration/e2e and cross-browser/device tests, real camera playtests, tune gestures, accessible input check, stress test repeated play, verify production Vercel deploy and its asset URLs. Gate: all P0 acceptance tests passed and critical issues cleared.

## 10. User stories

Every story includes a unique ID and a testable acceptance criterion. Unless noted, priority is P0. Development tickets should link stories to FR IDs above.

### 10.1 Discovery, lobby and navigation

**US-001 — View the arcade lobby (P0).** Description: As a visitor, I want to see the game's choices immediately so that I can begin without signing in. Acceptance criteria: On a fresh session the lobby renders two named selectable cabinets, functioning settings/help controls and no webcam prompt.

**US-002 — Choose Hoop Dreams (P0).** Description: As a player, I want to select basketball from its machine. Acceptance criteria: Click/Enter opens input choice with game ID hoops retained through setup and start.

**US-003 — Choose Roll With It (P0).** Description: As a player, I want to select skee-ball from its machine. Acceptance criteria: Click/Enter opens input choice with game ID skee retained through setup and start.

**US-004 — Preview game affordances (P0).** Description: As a new user, I want to understand game length and action before playing. Acceptance criteria: Each machine presents accurate mode, rules summary and a distinct preview; focus and hover activate readable feedback.

**US-005 — Navigate back safely (P0).** Description: As a player, I want to correct my selection without refreshing. Acceptance criteria: Back returns to prior step preserving valid preferences and does not open camera unexpectedly.

**US-006 — Learn controls before play (P0).** Description: As a player, I want brief, accurate instructions. Acceptance criteria: Help surfaces explain both game controls and close with keyboard and pointer.

**US-007 — Access global settings (P0).** Description: As a player, I want sound and sensitivity settings. Acceptance criteria: Settings open from lobby/setup/pause and correctly persist applied values.

**US-008 — See actual collection preview (P0).** Description: As a returning player, I want to see my sticker progress. Acceptance criteria: Locked/unlocked icons reflect persistent predicates; no fake score, rank or token inventory.

### 10.2 Camera permissions, loading and calibration

**US-009 — Choose camera play (P0).** Description: As a player, I want to select webcam controls. Acceptance criteria: Before enable click camera is off; selected mode proceeds to permission view with privacy explanation.

**US-010 — Choose manual play (P0).** Description: As a player, I want to play without permission. Acceptance criteria: Choosing manual bypasses getUserMedia and MediaPipe initialization and can reach practice/round.

**US-011 — Request camera explicitly (P0).** Description: As a privacy-conscious player, I want to control activation. Acceptance criteria: Only Enable Camera invokes getUserMedia; local camera indicator appears if tracks active.

**US-012 — Show permission pending (P0).** Description: As a player, I want to know why nothing is happening. Acceptance criteria: A distinct loading state appears while permission request is unresolved, without claiming success.

**US-013 — Recover permission denial (P0).** Description: As a player, I want guidance after denying camera. Acceptance criteria: Denied permission shows retry guidance and manual-mode action; never leaves inert black video.

**US-014 — Recover no-device state (P0).** Description: As a player, I want to understand missing webcam. Acceptance criteria: Missing device shows specific message, retry and manual alternative.

**US-015 — Recover busy camera (P0).** Description: As a player, I want to resolve device conflict. Acceptance criteria: Device-in-use failure shows close-other-app guidance and retry, without losing game selection.

**US-016 — Recover insecure context (P0).** Description: As a player, I need clear guidance if browser blocks camera on HTTP. Acceptance criteria: Unsupported origin message states HTTPS/localhost requirement and offers manual path.

**US-017 — Load hand tracking locally (P0).** Description: As a player, I need dependable tracking setup. Acceptance criteria: Production script bundle contains MediaPipe; WASM and model resolve at first-party URLs; no jsDelivr/unpkg dynamic import; tracker ready state confirmed.

**US-018 — Fall back to CPU (P0).** Description: As a player with incompatible graphics driver, I want tracking to continue. Acceptance criteria: Deliberately failed GPU initialization attempts CPU and reports outcome; manual path remains available.

**US-019 — Detect my hand (P0).** Description: As a player, I want feedback that tracking sees me. Acceptance criteria: Stable detected landmarks show hand-found state; absent hand shows guidance; confidence cannot be falsely reported as tracked.

**US-020 — Choose dominant hand (P0).** Description: As a left/right-handed player, I want the correct hand tracked. Acceptance criteria: Choice persists, active-hand lock works and mirrored preview does not invert handedness classification.

**US-021 — Configure preview mirroring (P0).** Description: As a player, I want intuitive tracking position. Acceptance criteria: Mirror toggle changes preview and input mapper coherently; object follows displayed hand horizontal movement.

**US-022 — Calibrate pinch (P0).** Description: As a player, I want my grip recognized. Acceptance criteria: Closed pinch is measured over multiple stable frames and status only advances after threshold confirmation.

**US-023 — Calibrate release (P0).** Description: As a player, I want opening my hand to throw once. Acceptance criteria: Open gesture uses separate hysteresis threshold and emits exactly one release event after dwell/debounce.

**US-024 — Calibrate movement range (P0).** Description: As a seated player, I want comfortable aiming. Acceptance criteria: Small natural movement defines mapped range with clear visual bounds and configurable sensitivity.

**US-025 — Complete practice throw (P0).** Description: As a novice, I want safe practice before a timed round. Acceptance criteria: A valid grab/release produces visible attempted trajectory; misses do not block completion; explicit Start Game required.

**US-026 — Handle model load failure (P0).** Description: As a player, I want a way around missing WASM/model assets. Acceptance criteria: Distinct error stage displayed; Retry and manual path operable, without saying permission was denied.

**US-027 — Recover lost tracking safely (P0).** Description: As a player holding a ball, I do not want losing tracking to launch it. Acceptance criteria: Dropout enters recovery; no throw committed; reacquisition resumes holding or ball returns.

**US-028 — Stop my webcam (P0).** Description: As a privacy-conscious player, I want the stream off immediately. Acceptance criteria: Camera Off, manual switch or lobby exit stop all active media tracks and clear active indicator.

### 10.3 Shared controls and engine

**US-029 — Grab ball with manual pointer (P0).** Description: As a manual player, I want to pick up the same ball. Acceptance criteria: Pointerdown inside pickup hit zone enters HOLDING; outside cannot acquire.

**US-030 — Grab/release via keyboard (P0).** Description: As a keyboard player, I want full control. Acceptance criteria: Focusable game region maps Space to grab/release and arrows to aim/power, and a complete round is possible without pointer.

**US-031 — See an aim guide (P0).** Description: As a player, I want feedback before throwing. Acceptance criteria: Holding shows a predicted constrained trajectory tied to current aim/power; setting can disable guide.

**US-032 — Throw exactly once (P0).** Description: As a player, I want one release to mean one ball. Acceptance criteria: Duplicate pointerup/gesture events cannot create another shot before cooldown/next acquisition.

**US-033 — Score only from simulated outcome (P0).** Description: As a player, I want fair scoring. Acceptance criteria: A shot earns points only after correct physics scoring sensor event; invalid contact/out-of-bounds scores zero.

**US-034 — Pause and resume (P0).** Description: As a player, I want to pause without holding a gesture. Acceptance criteria: Button or P pauses clock, movement and new input; resume includes reposition countdown.

**US-035 — Auto-pause on lost focus (P0).** Description: As a player, I don't want unseen rounds progressing. Acceptance criteria: Hidden tab pauses immediately and does not accumulate simulation time when returned.

**US-036 — Restart current round (P0).** Description: As a player, I want a clean attempt. Acceptance criteria: Restart clears score, ball states, streaks, timers and shot IDs while keeping preferences; unfinished score not saved.

**US-037 — Exit without score corruption (P0).** Description: As a player, I want to leave gameplay. Acceptance criteria: Exit offers abandon confirmation for unfinished run, removes game listeners, stops camera and does not overwrite best.

**US-038 — Recover game-render failure (P0).** Description: As a player, I want understandable WebGL errors. Acceptance criteria: Context loss pauses play and shows recovery or implemented manual 2D alternative, not broken controls.

### 10.4 Hoop Dreams

**US-039 — Begin timed basketball round (P0).** Description: As a player, I want a fair 60-second challenge. Acceptance criteria: Clock starts only after Start; reaches zero from exactly configured duration, respecting pause.

**US-040 — Launch basketball predictably (P0).** Description: As a player, I want movement to control direction and power. Acceptance criteria: Ball follows real release parameters within caps; changing aim/power results in observably different trajectories.

**US-041 — Score standard basket (P0).** Description: As a player, I want two points for a make. Acceptance criteria: Descending valid ball through hoop opening commits +2 once, excluding swish or multiplier rules.

**US-042 — Score clean swish (P0).** Description: As a player, I want precise shots recognized. Acceptance criteria: Shot entering without flagged rim/backboard contact yields +3 before any streak multiplier.

**US-043 — Activate and reset streaks (P0).** Description: As a competitive player, I want combo rules. Acceptance criteria: On third consecutive make the 2× multiplier applies; miss resets current streak; longest streak remains accurate.

**US-044 — See accurate live HUD (P0).** Description: As a player, I want score/time/streak outside the play zone. Acceptance criteria: HUD shows committed score and actual timer/streak on every state; figures remain readable at 1280×720.

**US-045 — Finish in-flight shot (P0).** Description: As a player, I want fair last-second shots. Acceptance criteria: After timer expires no new launch begins; already released shots resolve within bounded timeout before results.

**US-046 — Get accurate basketball results (P0).** Description: As a player, I want trustworthy stats. Acceptance criteria: Attempt count, baskets, swishes, accuracy, best streak and score reconcile to finalized shot log.

### 10.5 Roll With It

**US-047 — Start nine-ball round (P0).** Description: As a player, I want nine attempts without a timer. Acceptance criteria: Initial inventory 9, no automatic countdown, only valid releases consume balls.

**US-048 — Roll with meaningful aim/power (P0).** Description: As a player, I want controlled rolling. Acceptance criteria: Lateral input and strength modify velocity; observable roll respects lane/ramp constraints.

**US-049 — Hit numbered pockets (P0).** Description: As a player, I want accurate target points. Acceptance criteria: Captured sensor awards associated 10/20/30/40/50/100 values, matching displayed label.

**US-050 — Prevent double pocket points (P0).** Description: As a player, I want exclusive scores. Acceptance criteria: Crossing overlapping contact surfaces cannot resolve two rewards for same ball.

**US-051 — Handle miss and ball return (P0).** Description: As a player, I want another attempt after a miss. Acceptance criteria: Miss resolves zero, gives short explanation and spawns next ball unless inventory exhausted.

**US-052 — Resolve final ball (P0).** Description: As a player, I want my ninth roll counted. Acceptance criteria: Ball-left shows zero after ninth launch; result screen waits until final ball captured/missed.

**US-053 — See accurate skee-ball results (P0).** Description: As a player, I want reliable pocket stats. Acceptance criteria: Nine valid shots, per-ball scores, highest pocket, 100-point hits and total reconcile.

### 10.6 Rewards and sharing

**US-054 — View actual final ticket (P0).** Description: As a player, I want a celebratory but readable result. Acceptance criteria: Results machine displays actual game/score/stats and buttons immediately, with optional nonblocking print animation.

**US-055 — Earn conditional sticker (P0).** Description: As a player, I want a meaningful collectible reward. Acceptance criteria: A documented completed-session predicate awards only its matching sticker; abandoned rounds award none.

**US-056 — Review collection (P0).** Description: As a returning player, I want to view my stickers. Acceptance criteria: Unlock inventory survives reload and locked slots clearly show condition and cannot appear earned.

**US-057 — Save a score ticket image (P0).** Description: As a player, I want to download my result. Acceptance criteria: Save generates a valid readable PNG with accurate score and original graphics; failure is explained.

**US-058 — Share or copy score (P0).** Description: As a player, I want a portable achievement. Acceptance criteria: Supported Web Share opens; unsupported browser gets actual copy/download fallback with truthful status.

**US-059 — Replay quickly (P0).** Description: As a player, I want to play again. Acceptance criteria: Replay resets game session and returns to ready/current input flow without stale scores or phantom shots.

**US-060 — Change games (P0).** Description: As a player, I want to move to another cabinet. Acceptance criteria: Change Game returns lobby with all camera tracks stopped and no abandoned score added to history.

### 10.7 Settings, reliability and accessibility

**US-061 — Adjust sound effects and music (P0).** Description: As a player, I want independent audio control. Acceptance criteria: Each setting updates volume/mute immediately and persists, without unexpected autoplay.

**US-062 — Choose reduced motion (P0).** Description: As a motion-sensitive player, I want a calmer experience. Acceptance criteria: OS and app preference suppress unnecessary zoom/parallax/particle motion while preserving functional feedback.

**US-063 — Adjust sensitivity and trajectory guide (P0).** Description: As a player, I want comfortable control. Acceptance criteria: Settings change input mapping/guide immediately during safe states and persist across sessions.

**US-064 — Clear my local data (P0).** Description: As a player, I want control over saved data. Acceptance criteria: Confirmed reset clears local preferences/scores/stickers; cancellation preserves them.

**US-065 — Handle disabled storage (P0).** Description: As a player, I still want to play privately. Acceptance criteria: Storage exceptions do not crash gameplay; best-score-saving limitations are explained.

**US-066 — Use readable alternatives to audio (P0).** Description: As a player with muted sound, I want equivalent feedback. Acceptance criteria: All grabs, throws, scores, errors, pauses and round endings have visible state labels.

**US-067 — Navigate everything with keyboard (P0).** Description: As an alternative-input player, I want full access. Acceptance criteria: All menu, settings, pause, replay and complete game flows work with keyboard and visible focus.

**US-068 — Play at different desktop sizes (P0).** Description: As a laptop user, I want unclipped controls. Acceptance criteria: Screens at 1440×900 and 1280×720 show readable game HUD, actions and setup without scroll during gameplay or overlap.

**US-069 — Handle intermittent network (P0).** Description: As a player with interrupted connection, I want graceful degradation. Acceptance criteria: After locally loaded game assets, offline transition does not invent online state; optional services fail gracefully; user understands when camera model cannot load.

**US-070 — Prevent stale deployment confusion (P0).** Description: As a player testing fixes, I want to know the running version. Acceptance criteria: Version/build identifier appears in diagnostics, and updated assets use hashed build filenames rather than stale handwritten CDN version strings.

**US-071 — Preserve privacy during session (P0).** Description: As a player, I want to know camera status. Acceptance criteria: Active stream indicator and Camera Off are operable; no network requests send raw camera pixels or landmarks; tracks end after exit.

**US-072 — Test genuine camera throws (P0).** Description: As a product team, we need proof that motion play works. Acceptance criteria: On supported production browser, at least 20 repeated pinch/release tests produce corresponding at-most-one launches with recorded success/failure; no claim of completion without manual verification.

**US-073 — Test deterministic physics scores (P0).** Description: As QA, I need score integrity. Acceptance criteria: Unit tests cover normal baskets, swishes, beneath-rim crossings, rim grazing, multiple sensors, skee pockets, final ball and timer expiry.

**US-074 — Verify deployment and first-party vision assets (P0).** Description: As an operator, I need reliable production release. Acceptance criteria: CI passes install/typecheck/build/tests; Vercel is READY; model/WASM URLs return valid responses; manual end-to-end and camera smoke tests pass.

**US-075 — Handle unexpected app recovery (P0).** Description: As a player, I want broken sessions contained. Acceptance criteria: Refresh/reload never persists unfinished run as best, old camera tracks are released, previously finalized local data remains readable.

**US-076 — Enjoy original non-emoji visuals everywhere (P0).** Description: As a player, I want coherent high-end artwork. Acceptance criteria: Visual audit of every screen, tutorial, button, loading state and error reveals no native emoji, no generic replacement icon mismatches and no placeholder screenshots.

### 10.8 Expansion stories

**US-077 — Use a nickname (P1).** Description: As a returning player, I want a local display name on my ticket. Acceptance criteria: Optional nickname length/content validated, stored locally, editable and not required for games.

**US-078 — Open challenge URLs (P1).** Description: As a friend, I want a link to the same game challenge. Acceptance criteria: URL loads named game and challenge rules without claiming online competition or permitting spoofed ranking.

**US-079 — Unlock extended sticker sets (P1).** Description: As a repeat player, I want new original rewards. Acceptance criteria: Additional stickers have documented predicates and migrations preserve old unlocks.

**US-080 — Compare verified leaderboard scores (P2).** Description: As a competitive player, I want credible ranks. Acceptance criteria: Server validation/rate limits/moderation and consent are implemented before rankings appear; client scores alone do not constitute verified submissions.

**US-081 — Play additional arcade games (P2).** Description: As a returning player, I want more machines. Acceptance criteria: New game uses shared input/session infrastructure with its own rules, scoring sensors, instructions and completed results.

**US-082 — Pass and play (P2).** Description: As friends sharing one laptop, we want alternating rounds. Acceptance criteria: Named/local turn states do not mix scores, camera remains explicitly permission-gated, and local results are attributed to the correct turn.
