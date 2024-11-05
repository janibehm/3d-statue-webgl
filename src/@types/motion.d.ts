declare module "motion" {
  export function animate(
    elements: string | Element | Element[],
    keyframes: any,
    options?: any,
  ): any;

  export function stagger(duration: number, options?: any): number;
}
