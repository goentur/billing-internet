import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { useState } from "react";

export default function ThemeApp() {
    const [themeApp, setThemeApp] = useState(() => {
        // Default to dark mode if localStorage has no color mode set
        return localStorage.getItem("theme") !== "light";
    });

    // Handle toggling of color mode
    const toggleThemeApp = (mode:any) => {
        setThemeApp(mode);
        const newMode = mode ? "dark" : "light";
        localStorage.setItem("theme", newMode);

        // Update the class on the <html> element
        document.documentElement.classList.toggle("dark", mode);
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Mode Tema</CardTitle>
                <CardDescription>
                    Ubah warna tema pada aplikasi.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2">
                    <Label htmlFor={themeApp ? "color-mode" : undefined}>Light Mode</Label>
                    <Switch
                        checked={themeApp}
                        onCheckedChange={toggleThemeApp}
                        id="color-mode"
                    />
                    <Label htmlFor={themeApp ? undefined : "color-mode"}>Dark Mode</Label>
                </div>
            </CardContent>
        </Card>
    );
}
