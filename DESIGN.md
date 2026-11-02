---
name: Julia Maschietto
description: Editorial warmth for strategy, content and creative direction.
colors:
  paper: "#eff0eb"
  ink: "#0a0f15"
  red: "#c1121f"
  wine: "#721919"
  rose: "#f3e7e5"
  muted: "#635b57"
  line: "rgba(60,35,35,.17)"
  white: "#fff"
  deliverables: "#e9e6df"
  testimonials: "#e8ded8"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(48px, 4.2vw, 75px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(35px, 3.2vw, 50px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.035em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "34px"
    fontWeight: 500
    lineHeight: 1.09
    letterSpacing: "-.035em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.65
  caption-small:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
  caption-compact:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.5
  emphasis:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.14em"
    fontWeight: 400
    lineHeight: .98
    letterSpacing: "-.012em"
rounded:
  field: "12px"
  proof: "14px"
  preview: "18px"
  surface: "24px"
  frame: "28px"
  pill: "999px"
  circle: "50%"
spacing:
  tab-gap: "8px"
  action-gap: "10px"
  button-gap: "20px"
  mobile-gutter: "22px"
  mobile-section: "74px"
  section: "104px"
components:
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "7px 7px 7px 23px"
    height: "54px"
  button-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "7px 7px 7px 23px"
  button-red-hover:
    backgroundColor: "{colors.wine}"
  tab-selected:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "9px 14px"
  dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
  field:
    backgroundColor: "#f8f4ef"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "14px"
---

# Design System: Julia Maschietto

## Overview

**Creative North Star: “The Editorial Portrait.”**

This is the implemented world extracted from `dist/styles.css`, `dist/index.html` and `dist/app.js`. It follows the user-selected Leticia Bassan reference: a clear geometric sans, expressive italic serif, warm paper, editorial photography and compact rounded controls. Julia's wine and red accents make the reference grammar her own. The approved composition remains recorded in `docs/surface-brief.md`; it is not a required template for every future surface.

The density alternates between generous reading space and compact evidence rows. Portraits and actual project artifacts carry the visual weight; rules and tonal sections organize the rest. Motion adds editorial pacing while essential text remains visible without JavaScript.

**Key Characteristics:**

- Warm, restrained paper surfaces with deep wine anchors and active red details.
- Manrope structure with Instrument Serif Italic expression.
- Floating pill navigation and rolling-label, circular-arrow actions.
- Large rounded photographs beside comparatively flat text and evidence.

## Colors

The palette is warm and grounded, with red supplying energy and wine supplying continuity. The frontmatter records the reused color primitives; CSS remains the implementation authority for local overlays and image treatments.

### Primary

- **Wine:** navigation action, selected book tab, signatures, quote text, key outcomes and the closing section.
- **Red:** principal action, service icons, light-button arrow circles, hover shifts and keyboard outlines.

### Neutral

- **Paper:** page canvas, dialogs and light foreground over wine.
- **Ink:** headings and primary reading text.
- **Muted:** supporting text, credits and explanatory copy.
- **Line:** thin warm dividers across services, evidence rows, credentials and FAQ.
- **Rose:** expanded evidence accents and soft hover treatment.
- **Deliverables / Testimonials:** separate warm tonal fields, without introducing a new accent family.
- **White:** hero typography and selected control foregrounds.

**The Accent Continuity Rule.** Carry wine and red through typography and controls rather than assigning a new accent to every section.

## Typography

**Display and body font:** self-hosted Manrope, with Arial and sans-serif fallbacks; the loaded variable face supports weights (400–800). **Expressive font:** self-hosted Instrument Serif Italic, with Georgia and serif fallbacks, at weight (400). Preserve this pairing, which the user expressly selected from the reference.

Manrope supplies measured, closely tracked headings and quiet reading text. Instrument Serif is the italic voice inside headings, handwritten-feeling signatures, large outcomes, process numbers and the principal quote. It does not replace the general body face.

### Hierarchy

- **Display:** hero scale in frontmatter; its emphasized phrase grows to (1.16em). Responsive overrides are described below.
- **Headline:** fluid section headings; individual about and closing headings have narrower local clamps. Headings default to medium weight and tight tracking.
- **Title:** service titles use the frontmatter role; project titles vary from (22px) row names to (25px) expanded case headings.
- **Body:** the page default is the frontmatter role; most section copy uses (14–16px), line heights (1.65–1.8), and line lengths (32–60ch). Contact text is intentionally denser.
- **Label:** navigation and links are compact; supporting project labels and credits use (9–12px). There is no separate mono face or general uppercase-label system.

**The Two Voices Rule.** Keep Manrope for structure and Instrument Serif Italic for emphasis. Do not replace either font or turn all headings into serif text.

## Layout

The central container caps at (1280px), with a default width of the viewport minus (112px). Standard section padding is (104px) vertically, with authored exceptions. The outer photographic frame has a (12px) page margin. Three equal service columns, four process steps, and asymmetrical two-column proof, biography and FAQ layouts are separated by space or a thin rule rather than card grids.

At widths up to (1200px), the container becomes viewport minus (80px), major gaps tighten, and the hero uses a smaller heading. At widths up to (1000px), hero content becomes one column with a compact supporting block; the book presentation stacks while its copy temporarily uses two columns. At widths up to (760px), the container becomes viewport minus (44px), standard vertical padding becomes (74px), and the outer frame becomes an (8px) margin with (22px) corners. Services, expanded case content, biography, testimonials and FAQ stack; process steps use two columns; footer links use two columns. At widths up to (380px), selected hero and heading sizes tighten further. A large-screen override begins at (1600px), expanding hero insets and supporting copy.

The implemented hero is a framed portrait with text at the bottom: desktop heading left, supporting copy and actions right. Its default height is `min(92svh,1040px)` with a (730px) minimum. On mobile, it uses `calc(100svh - 16px)` with a (780px) minimum and (980px) maximum; the minimum is (760px) on the narrowest phones. The crop shifts from (67% 37%) to (77% 5%), and a stronger lower gradient supports readable copy. The redundant top-left hero descriptor and signature have been removed at every width by explicit user request. The mobile heading uses `clamp(35px,8.9vw,51px)` and becomes (34px) below the narrowest breakpoint. Hero actions remain side by side at every tested width, including 320px; the primary label is “Vamos conversar”.

## Elevation & Depth

Most content is flat, with paper, warm tonal sections, thin rules and photographic contrast creating depth. Elevation is reserved for floating navigation, transient image previews, the notebook artifact, dialogs and the contact shortcut. This is not a general shadow-card system.

### Shadow Vocabulary

- **Floating navigation:** inset hairline plus `0 12px 30px -23px rgba(10,15,21,.4)`; translucent fill and blur (22px) separate the pill from photography.
- **Project preview:** `0 22px 55px -25px rgba(25,15,15,.45)` beneath the pointer-following image.
- **Notebook:** `drop-shadow(0 20px 16px rgba(25,20,20,.1))` grounds the supplied device image.
- **Modal:** `0 30px 100px -30px rgba(10,5,10,.6)` above a dark, blurred backdrop.
- **Contact shortcut:** `0 9px 25px -10px rgba(50,5,10,.5)`.

## Shapes

Pills and circles characterize controls; gently rounded rectangles characterize imagery and overlays. The reusable radii are in frontmatter. Desktop hero framing is larger than ordinary image surfaces; mobile photography uses smaller corners. Evidence rows, service columns and FAQ entries remain open, ruled surfaces. Borders are thin (1px), with outlined pills reserved for secondary actions, tabs and small status details.

## Components

### Buttons

Confident, compact pills pair a rolling text label with a circular arrow. The default minimum height is (54px), with a (38px) arrow circle and (18px) arrow. Light buttons use an active red circle; red buttons use a paper circle. Hover rolls duplicate visual labels in opposite vertical directions over (.55s), rotates the arrow circle (-45deg) over (.5s), and shifts the fill. Press scales the whole button to (.97). The ghost action has a translucent white fill, white outline and no colored disc. Mobile hero controls use a (49px) minimum height, and (34px) circles. Text links use a bottom border and a diagonally shifting arrow.

### Navigation

The fixed, centered desktop pill sits (20px) from the top, with only the three links Serviços, Projetos, Sobre and a wine contact action. A translucent moving pill tracks hovered, focused or currently observed links. Its colors adapt over the hero and wine footer. At the mobile breakpoint, the bar spans between (17px) side insets, desktop links collapse into the toggle while the contact action stays visible, and a (44px) circular two-line toggle opens a full-screen paper menu. The toggle becomes an X; the menu uses large ruled links. Menu behavior locks scroll, makes background content inert, traps Tab and closes on Escape or selection.

### Evidence rows and FAQ

Native disclosure rows retain visible names and outcomes while closed. The project rows use a three-column desktop grid and circular plus control; opening rotates the plus (45deg) and reveals image/text evidence. On mobile, outcomes move below the project name. FAQ is a simpler ruled disclosure list. Essential evidence does not depend on pointer previews: those previews run only for a fine hover pointer, and are suppressed on mobile, touch and reduced motion.

### Book tabs and notebook

Outlined pills select a single project book; the active pill is wine with white text. Hover uses rose without changing the selected treatment. Selection updates the image, heading, description, credit and accessible panel label together. Arrow keys, Home and End support the tab set with a roving tab stop. The supplied notebook frame surrounds actual project imagery; an underlined control enlarges the selected book in a dialog.

### Dialogs and fields

Paper dialogs have rounded corners, a dark blurred backdrop, constrained height (90svh) and scrolling overflow. Contact and image variants cap at (550px) and (1100px). Contact padding reduces from (44px) to (40px 25px 25px). Cases, including Bahari, use inline native details rather than a dedicated case dialog. Circular close controls are (40px). Opening uses a (.4s) upward fade and slight scale. Native modal behavior, explicit close buttons, backdrop click, Escape and focus restoration complete the interaction.

The contact textarea has a warm off-paper fill, thin muted border, soft corners, padding (14px), and a minimum height (115px). Its copy action shows a small persistent status area. The current presentation previews and copies a message; it does not imply that a message was sent. No custom error or disabled appearance exists.

### Motion and focus

Shared easing is `cubic-bezier(.16,1,.3,1)`; the second curve is `cubic-bezier(.22,1,.36,1)`. Reveals combine opacity, a (26px) rise and blur (5px) over roughly (.8–1s). Split headings rise word by word with (45ms) staggering. Fine-pointer users receive smooth wheel scrolling and decorative previews. The closing video has an explicit play/pause control and is synchronized to visibility.

Keyboard focus is an offset red outline (2px, 6px offset), with a light outline inside dialogs and the closing section. Under reduced motion, smooth scrolling stops, animations and transitions reduce to (.01ms), content reveals immediately, pointer previews disappear, parallax stops, and the closing video begins paused. Preserve this behavior when extending controls.


The concept paragraph uses word opacity from .16 to 1 as the section traverses the viewport, with a .45s ease-out transition. Tags drift independently in translation and rotation only while the section is visible; reduced motion shows all text immediately and stops the tags. All six project rows use hover previews on fine pointers and open their content through native details on click or keyboard. Bahari has no permanent feature block. Services omit the three redundant colored supporting phrases.


### Approved second-execution components

The process now uses a horizontally translated four-stage rail with a thin wine progress line. Above 1000px width and at least 680px height, a 100svh sticky scene maps vertical passage to horizontal travel and releases at completion. Smaller/reduced-motion layouts keep native horizontal scrolling. Process and About share continuous pastel wave artwork; the SVG is not clipped at internal section boundaries.

About uses a genuine Three.js card with an extruded matte body, photograph texture, metal clasp, flexible wine strap, soft light and a real shadow. It loads only near the section, stops rendering out of view and accepts pointer drag, touch and keyboard. A static printed-card fallback stays visible if WebGL is unavailable. The separate About signature is removed; the factual biography remains unchanged.

The testimonial treatment is an explicitly illustrative wall with three columns moving down/up/down in 68/62/74-second cycles and two columns on mobile. Paper cards sit on the existing rose surface, with initials rather than invented portrait photographs. Soft horizontal and vertical edge masks support the requested reference. Motion pauses offscreen, in a hidden tab, on hover and via a dedicated control. Reduced motion presents static, scrollable text with duplicates removed. The user-approved fictional status must remain visible until replaced by real client material.

Service icons translate -4px and rotate -3 degrees on hover/focus, returning over .8s. Reduced motion disables this movement. No second-round CSS changes the hero, book caption, footer wordmark, commercial CTAs or FAQ; these latter refinements are held for a third execution.

## Do's and Don'ts

### Do:

- **Do** preserve the selected font pair, wine/red hierarchy, pill navigation and circular-arrow control language.
- **Do** use actual project artifacts and editorial portraits as the dominant visual material.
- **Do** preserve touch and keyboard access to all evidence and the book selector.
- **Do** inspect the final cascade: mobile readability refinements override earlier smaller text rules.
- **Do** keep content visible without motion and provide control over background video.

### Don't:

- **Don't** replace the selected visual identity with a different type pairing or an unrelated accent palette.
- **Don't** convert every text grouping into an elevated rounded card.
- **Don't** hide essential outcomes behind hover-only interactions.
- **Don't** bake semantic headings or actions into photographic assets.
- **Don't** treat the current hero composition as a mandatory layout for every future page.

### Approved fifth-execution hero

Historical fifth-round direction, superseded by the sixth correction below: centered generated portrait over white with independent stories and dark text.

### Approved sixth-execution correction

Restore the incumbent rounded frame, warm gray #d1cec8, dark lower fade and white hero copy. Reuse the earlier approved portrait with unchanged facial RGB and no body extension. Center the photo at a controlled scale. All three 9:16 story frames are monochrome and static, with two behind the person and the profile shot in front; they have decorative Instagram-like UI and no links or interaction. Keep the Manrope/Instrument Serif pair and pill/circle-arrow controls.

Editorial testimonials show one quote at a time, a wine serif highlight, attribution/context and understated manual navigation with a short transition. No endless wall or automatic rotation. Waves stay fixed in the viewport during the process traversal and end at the About boundary. The badge has wider elastic drag and release inertia; camera-aware bounds prevent clipping. Existing service/project/FAQ/footer content is retained.

### Approved seventh execution — current refinements

Hero retains the sixth photographic treatment. Lift the portrait by 54–80px on ordinary desktop and reduce stories to 108–142px behind and 92–120px in front. Two layers remain behind Julia and one ahead; no supporting-copy overlap. The title uses a 0.16em gap before its italic second line (0.18em on mobile). Copy/actions are capped at 1280px total measure on wide screens. Mobile hero uses a scene followed by in-flow copy, content-width CTAs and a compact centered navigation pill. Tablet copy clears the inherited narrow maximum. Short landscape viewports use a flowing hero and a scrollable menu.

Testimonials now use the paper surface, white 14px-radius cards, Manrope 16px/1.7 quotes, wine attribution and the existing serif emphasis in a centered heading. Manual 46px circular arrows sit above the rail. A 360px card is centered with partial neighbors and soft edge fades; narrow cards use viewport minus64px. No automatic cycling or hover-dependent pause. Fictional status stays visible. Native swipe, scroll-snap, keyboard arrows/Home/End and reduced-motion behavior are retained.

Waves use absolute artwork translated only to compensate the pinned process travel. The translation clamps at the final step; ordinary vertical movement resumes immediately afterward. No pin compensation on mobile or reduced-motion layouts. Link and tab hit areas are at least44px; footer columns use zero-minimum grid tracks so links wrap at320px. Earlier round descriptions above are historical where they differ.

### Eighth execution — current refinements

Bahari leads the project section in a two-column image/narrative feature, stacking on mobile. Use the existing illustrative photograph with its caption, shared credits and contextualized411mil result. Expandable evidence sits below; the other five case rows retain their appearance. Feature corner radius14px; title34–46px, body15px/1.75 and wine serif result54–60px.

The baseline process is a single vertical column with a2px wine progress line,8px nodes and40px step gaps. All steps remain readable without module JavaScript. The pinned lateral variant requires fine pointer/hover, sticky support, sufficient viewport size and motion enabled. Vertical progress follows the list passing the60% viewport reading line. Wave compensation still applies only to pinned travel.

The testimonial rail no longer opts out of vertical wheel handling. Native horizontal swipe and normal vertical scrolling coexist; fade width is12–28px. Concept tags reserve four corner zones outside an88px top/bottom text inset (78px on mobile); mobile corners may bleed modestly but never overlap the heading. Drift amplitudes are bounded to3/5px mobile and6/8px desktop.

The new imagegen desktop composition is a separate approval proposal, not the current live hero or a responsive template. Keep the seventh-round live hero until the user approves the raster direction.

### Ninth execution — approved photographic implementation

The raster direction is approved and now uses the portrait exported from the user's native PSD, with no new face generation. Supply three flattened compositions through picture, keeping semantic white copy separate. Warm-gray background, lower charcoal overlay and two rear/one front story frames persist. Portrait matte fades only near the base; the face is untouched. Local overlay recipe uses rgba(14,10,12) with opacity0.10/0.12 through0.76/0.86/0.98 according to viewport. These are photographic readability overlays, not new accents.

Biography comes before the badge on mobile/tablet up to1000px, with desktop grid retaining photograph left. Add two static pale-rose52px wave strokes at the outside edges of Services and Testimonials, opacity0.42/0.36; preserve existing Process/About art. SVG overflow is visible; section overflow clips only at the viewport edge.

Bahari now leads with the actual campaign photograph and a compact native video/story gallery inside its expandable evidence. Vertical screenshots cap at300px desktop/280px mobile, with separate compact gallery heights and a dialog for reading the full capture. Media frames use a near-ink #101416 background,12px corners, captions12px desktop/11px mobile, and native video controls. Bruna's horizontal evidence balances its short copy. Júlia Nunes uses paired compact evidence thumbnails.

Testimonials have no fade masks or gradient edge overlays. Wider1120px rail window shows clean white cards with ordinary clipping and native scroll-snap. Preserve arrows, keyboard access and vertical page scrolling. Earlier notes about testimonial fades and pending hero approval are historical.


### Tenth execution — original PNG and scroll-linked tags

Use hero-desktop/tablet/mobile-v10.webp with the supplied transparent PNG portrait, no face synthesis or retouching. The three monochrome story cards use original photo assets, flattened into each raster composition. Upper-right card is closer to the portrait and contains no external hair artifact. Preserve the warm-gray rounded frame, dark lower readability overlay, white semantic copy and existing responsive layout.

Concept tags now follow section passage with eased translations, small rotations and delayed lower-pair entrances. No elapsed-time drift. Reverse scrolling retraces the same positions. Desktop reserves side space; compact layouts preserve the four corner zones. Reduced motion is static and fully visible. tenth-round.css overrides prior motion styling.

Contact links use official WhatsApp with prefilled message; email and LinkedIn are native links. The generated matte stage-muslin texture is a separate comparison proposal only. It is not a replacement for the published warm-gray hero.


### Media update in tenth execution

Image enlargement uses a transparent fit-content dialog exactly matching the displayed image or video, capped by the viewport, with an accessible close control outside the top corner. Proof thumbnails size to the source aspect ratio; no added dark pillarboxes. Notebook previews use muted looping inline H.264 video, start on viewport arrival and tab selection, pause away/hidden, and offer a restrained pause control. Reduced motion keeps the static cover. New original covers for Sepulveda, Júlia Nunes, Bruna and Copa; Copa gets three compact expandable pieces. media-update.css overrides the earlier fixed-size media frames.


### Final production refinement

The final source of truth is the existing editorial world with `hero-desktop/tablet/mobile-final.webp`. Original PNG portrait, warm-gray ground and front story are retained. Rear cards overlap the portrait by approximately16–20% of their area at each export. The biography stays before the badge up to1000px. The notebook frame aperture is16:9 to fit supplied recordings without cutting slide content; its percentages cover the pale inner lip.

The production stylesheet is `dist/site.min.css`, generated from the preserved ordered sources in `styles/`. Fonts are complete WOFF2 exports. A custom path-based JM monogram supplies SVG/ICO/Apple icons. Deferred modal/hover media and video posters avoid speculative downloads. Static contacts remain native links. Concept inactive words use opacity.56 rather than.16 for readable contrast. A26px lower endpoint is an intentional narrow-screen display size; body copy retains the existing ramp. The footer fallback uses the existing wine token.

No testimonial fades or automatic rotation were reintroduced. The final crawl files and accurate Person/WebSite/WebPage/Service data contain no illustrative ratings. `docs/FINALIZACAO.md` records the verification evidence and external limits.

### Approved company-facing portfolio extension — 2 November 2026

The portfolio inherits “The Editorial Portrait”: Manrope/Instrument Serif Italic, paper/ink/wine/red, original portrait and story composition, floating pill navigation and circular-arrow controls. Commercial history above remains in force for `/`; portfolio purpose and composition are scoped in `.impeccable/surfaces/dist-portfolio-index-html.md`.

Implementation authority is `dist/portfolio/portfolio.css` over `dist/site.min.css`, with shared overrides in `styles/final.css`. Artifacts lead: flat ruled scopes, supplied notebook frames with a 16:9 aperture, rounded photographic covers (16px) and proportional evidence media (12px). Wide book rows pair copy and media; the featured case precedes a three-column grid. At (1100px) that grid becomes two columns with the last case spanning both; at (760px) books, cases, contact and participation stack, and participation headings stop sticking. Case documents cap at (1150px).

Portfolio type intentionally extends the inherited ramp: hero `clamp(38px,3.65vw,65px)`, compact hero `clamp(34px,5vw,48px)` through (1100px), phone hero `clamp(29px,7.9vw,43px)` through (760px). Case headings use `clamp(39px,4.4vw,64px)` and become (36px) on phones. Reading copy is generally (14–17px); captions and metadata use (11–12px). These authored roles explain mechanical type-ramp advisories; they are not a new global scale.

Local colors are intentional contextual treatments: branding paper (#e8e7e1), its pale sculptural stroke (#dfd4ce), unloaded cover ground (#ddd6cf), translucent cover action `rgba(250,248,244,.95)` and closing divider (#a46a66). Shared compact photography uses warm-gray (#d2cfc9), charcoal (#140e10) and intermediate alpha stops of that charcoal. Color advisories do not authorize replacing these neutrals or photographic overlays with new brand accents.

Through (1100px), clean mobile/tablet artwork preserves the original face and stories without the former gray matte. One photograph-local overlay (`hero-scene::after`) descends from transparent at (45%) to charcoal at (84%). The separate shade is hidden; in-flow copy sits on matching solid charcoal with a (-1px) seam overlap. The fade is independent of copy length and also applies to the commercial hero through the shared stylesheet. Desktop photography and fade remain unchanged.

Three books remain simultaneously present, rather than gated by tabs. Scopes use native details and a quarter-second rotating plus. Muted inline previews pause offscreen, in hidden tabs and during enlargement; static covers support reduced motion, data saving and autoplay failure. Campaign films use native controls. Enlargement is a transparent fit-content native dialog with circular close control, Escape/backdrop dismissal and focus restoration. Portfolio reveal content is immediately visible. Preserve actual supplied artifacts, shared credits and accessible source links.


### Approved portfolio layout refinement — 2 November 2026

This supersedes the sequential three-notebook portfolio arrangement only. The shared stage has three prominent named selectors, a single top-aligned notebook at the left and the selected copy/scope at the right; compact layouts put the preview before copy and disclosure. Opening details must not recenter or displace the preview. Selection updates text, cover, film, credit and enlargement together; tabs support arrows, Home and End. All source content remains in the server HTML for unenhanced access.

Case galleries now express their purpose: Bahari contribution/film, paired results, then communication and production; Júlia Nunes paired films followed by three aligned Insights records; Sepulveda supplied product photography followed by an attributed commercial result and the original report. No screenshot detail is fabricated or cropped to equalize ratios. Compact layouts stack the proof records for reading. The portfolio and all case pages reuse the original commercial silk-video footer, with the portfolio contact message. Original hero and commercial page remain untouched.

Implementation: scripts/portfolio_layout.py, dist/portfolio/portfolio.css and portfolio.js. Within the inherited palette, the wine selected-project control, ruled disclosure, notebook stage and chapter spacing provide hierarchy. Touch targets stay at least 44px for primary controls. The 21px chapter subheading role extends the existing portfolio type scale intentionally. Source fidelity and validation evidence: docs/PORTFOLIO-REFINAMENTO.md and docs/qa/portfolio-v14/.


Bruna Mariana refinement approved during the same execution: pair the supplied presentation portrait with participation, give the actual feed its own chapter, and replace the low-resolution montage with four separate original result captures from the supplied portfolio PDF. Preserve client authorship of the written copy and the context of individual publication metrics.
