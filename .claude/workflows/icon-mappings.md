# Icon Mappings — Lucide React

Every production site MUST use Lucide React icons, NOT emoji. Install `lucide-react` during scaffold.

## Usage

```tsx
import { Hammer, Wrench, Phone } from "lucide-react";
<Hammer className="w-6 h-6 text-primary" />
```

## By Trade Category

### Landscaping
- Design/Planning: `TreePine`, `Leaf`, `Palette`
- Installation: `Shovel`, `TreeDeciduous`, `Flower2`
- Maintenance: `Scissors`, `Droplets`, `Wind`
- Snow: `Snowflake`, `CloudSnow`
- Hardscape: `Cuboid`, `Layers`, `Mountain`

### Carpentry / Woodworking
- Kitchens: `ChefHat`, `Utensils`, `LayoutDashboard`
- Furniture: `Armchair`, `Table`, `Bed`
- Cabinetry: `DoorOpen`, `Archive`, `Bookmark`
- Trim/Millwork: `Ruler`, `PencilRuler`, `Frame`
- General: `Hammer`, `Wrench`, `Drill`

### Electrical
- Residential: `Lightbulb`, `Plug`, `Home`
- Commercial: `Building`, `Warehouse`, `Factory`
- Emergency: `Zap`, `AlertTriangle`, `Siren`
- EV: `BatteryCharging`, `Car`, `Fuel`
- Panel/Wiring: `CircuitBoard`, `Cable`, `Network`
- Smart Home: `Smartphone`, `Wifi`, `Settings`

### Plumbing
- Pipes: `Pipette`, `ArrowUpDown`, `GitBranch`
- Fixtures: `Bath`, `ShowerHead`, `Droplets`
- Emergency: `AlertTriangle`, `Flame`, `PhoneCall`
- Water heater: `Thermometer`, `Flame`, `Gauge`

### HVAC
- Heating: `Flame`, `Thermometer`, `Sun`
- Cooling: `Snowflake`, `Wind`, `Fan`
- Ventilation: `AirVent`, `Wind`, `ArrowUpDown`
- Maintenance: `Wrench`, `CalendarCheck`, `ClipboardCheck`

### Roofing
- Installation: `Home`, `Layers`, `ArrowUp`
- Repair: `Wrench`, `Shield`, `HardHat`
- Inspection: `Search`, `ClipboardCheck`, `Camera`
- Materials: `Cuboid`, `Layers`, `Palette`

### Metalwork / Welding
- Fabrication: `Hammer`, `Flame`, `Anvil`
- Structural: `Building`, `Pillar`, `Frame`
- Ornamental: `Sparkles`, `Shapes`, `PenTool`
- Repair: `Wrench`, `RefreshCw`, `Shield`

### Fencing
- Installation: `Fence`, `Grid3X3`, `Ruler`
- Materials: `Cuboid`, `TreePine`, `Link`
- Gates: `DoorOpen`, `Lock`, `KeyRound`
- Privacy: `Eye`, `ShieldCheck`, `Home`

### Masonry / Concrete
- Brickwork: `Cuboid`, `Layers`, `LayoutGrid`
- Stonework: `Mountain`, `Gem`, `Shapes`
- Concrete: `SquareStack`, `Layers`, `Pillar`
- Restoration: `RefreshCw`, `History`, `Paintbrush`

### Painting
- Interior: `Paintbrush`, `PaintBucket`, `Palette`
- Exterior: `Home`, `Building`, `Sun`
- Specialty: `Sparkles`, `Star`, `Wand`
- Prep: `Eraser`, `Layers`, `ClipboardCheck`

### Marine / Dock
- Construction: `Anchor`, `Ship`, `Waves`
- Repair: `Wrench`, `RefreshCw`, `Hammer`
- Seasonal: `Calendar`, `Snowflake`, `Sun`

### Automotive
- Repair: `Car`, `Wrench`, `Settings`
- Performance: `Gauge`, `Zap`, `TrendingUp`
- Body: `Paintbrush`, `Sparkles`, `Camera`

## Common (All Trades)

- Contact: `Phone`, `Mail`, `MapPin`
- About: `Users`, `Award`, `Clock`
- Process: `ListOrdered`, `ArrowRight`, `CheckCircle`
- Trust: `Shield`, `Star`, `ThumbsUp`
- Emergency: `AlertTriangle`, `PhoneCall`, `Clock`
- Free estimate: `Calculator`, `FileText`, `ClipboardCheck`

## Rules

1. Use ONE icon style consistently (outline or solid) — don't mix
2. Standard size: `w-6 h-6` for inline, `w-8 h-8` for cards, `w-10 h-10` or `w-12 h-12` for featured
3. Colour: `text-primary` for default, `text-accent` for highlights, `text-base-content/60` for decorative
4. Never use emoji in production components — emoji is banned
5. Wrap icons in a container div for card layouts:
   ```tsx
   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
     <Hammer className="w-6 h-6 text-primary" />
   </div>
   ```

## Image Treatment Classes

Add these to `archetype.css` for consistent image styling across sites.

```css
/* Duotone overlay — tints images with the brand colour */
.img-duotone {
  position: relative;
}
.img-duotone::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--clr-primary);
  mix-blend-mode: color;
  opacity: 0.3;
  pointer-events: none;
}

/* Gradient mask — fades image into section background */
.img-gradient-mask {
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}

/* Rounded treatment with shadow */
.img-elevated {
  border-radius: var(--card-radius, 0.75rem);
  box-shadow: 0 8px 30px oklch(0% 0 0 / 0.3);
}
```

### Usage

```tsx
{/* Duotone: wrap image in a relative container */}
<div className="img-duotone overflow-hidden rounded-lg">
  <Image src="..." alt="..." fill className="object-cover" />
</div>

{/* Gradient mask: apply directly to image wrapper */}
<div className="img-gradient-mask">
  <Image src="..." alt="..." fill className="object-cover" />
</div>

{/* Elevated: apply to image wrapper */}
<div className="img-elevated overflow-hidden">
  <Image src="..." alt="..." fill className="object-cover" />
</div>
```
