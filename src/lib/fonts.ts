type FontOptions = {
  variable?: string;
  subsets?: string[];
};

function createFont(name: string) {
  return (options: FontOptions = {}) => ({
    className: `${name}-font`,
    variable: options.variable?.replace(/^--/, '') ?? `${name}-font`,
    style: { fontFamily: `var(${options.variable ?? `--font-${name}`})` },
  });
}

export const Geist = createFont('geist');
export const Geist_Mono = createFont('geist-mono');
export const JetBrains_Mono = createFont('jetbrains-mono');
export const Inter = createFont('inter');
