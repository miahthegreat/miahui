import fs from "fs-extra";
const { readFileSync, writeFileSync, existsSync } = fs;
import { join } from "path";
import { MiahuiConfig, StyleType } from "../types/config.js";

const CONFIG_FILE = "components.json";

export function getConfig(cwd: string = process.cwd()): MiahuiConfig | null {
  const configPath = join(cwd, CONFIG_FILE);

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    const content = readFileSync(configPath, "utf-8");
    return JSON.parse(content) as MiahuiConfig;
  } catch (error) {
    console.error("Error reading config file:", error);
    return null;
  }
}

export function saveConfig(
  config: MiahuiConfig,
  cwd: string = process.cwd()
): void {
  const configPath = join(cwd, CONFIG_FILE);
  writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
}

export function getDefaultConfig(style: StyleType): MiahuiConfig {
  const baseConfig: MiahuiConfig = {
    style,
    rsc: false,
    tsx: true,
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
    },
  };

  if (style === "tailwind") {
    baseConfig.tailwind = {
      config: "tailwind.config.js",
      css: "src/app/globals.css",
      baseColor: "slate",
      cssVariables: true,
    };
  } else {
    baseConfig.css = {
      outputDir: "src/styles/components",
      scss: style === "scss",
    };
  }

  return baseConfig;
}
