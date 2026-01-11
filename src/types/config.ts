export type StyleType = 'tailwind' | 'css' | 'scss';

export interface TailwindConfig {
  config: string;
  css: string;
  baseColor: string;
  cssVariables: boolean;
}

export interface CSSConfig {
  outputDir: string;
  scss: boolean;
}

export interface Aliases {
  components: string;
  utils: string;
}

export interface MiahuiConfig {
  style: StyleType;
  rsc: boolean;
  tsx: boolean;
  tailwind?: TailwindConfig;
  css?: CSSConfig;
  aliases: Aliases;
}

