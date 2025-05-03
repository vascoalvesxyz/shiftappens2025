import { useLighting } from "@/context/LightningContext";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function Settings() {
const { lightColor, setLightColor, lightIntensity, setLightIntensity, ambientIntensity, setAmbientIntensity, lightPosition, setLightPosition } = useLighting()

  return (
    <div className="pt-2 space-y-4 text-sm">
      <div className="space-y-2">
        <Label>Light Color</Label>
        <Input
          type="color"
          value={lightColor}
          onChange={(e) => setLightColor(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Light Intensity: {lightIntensity.toFixed(1)}</Label>
        <Slider
          min={0}
          max={10}
          step={0.1}
          value={[lightIntensity]}
          onValueChange={([val]) => setLightIntensity(val)}
        />
      </div>

      <div className="space-y-2">
        <Label>Ambient Intensity: {ambientIntensity.toFixed(2)}</Label>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[ambientIntensity]}
          onValueChange={([val]) => setAmbientIntensity(val)}
        />
      </div>

      <div className="space-y-2">
        <Label>Light Position</Label>
        <div className="grid grid-cols-3 gap-2">
          {["x", "y", "z"].map((axis) => (
            <Input
              key={axis}
              type="number"
              step="0.1"
              value={lightPosition[axis as "x" | "y" | "z"]}
              onChange={(e) =>
                setLightPosition({
                  ...lightPosition,
                  [axis]: parseFloat(e.target.value),
                })
              }
              placeholder={axis.toUpperCase()}
            />
          ))}
        </div>
      </div>
  </div>
  )
}
