declare module "moni" {
  interface MoniInstance {
    length: number;
    ajax(): void;
    // Add other methods and properties from moni.fn here
  }

  interface MoniStatic {
    (selector: any): MoniInstance;
    fn: MoniInstance;
    loaded(callback: () => void): void;
    // Add other static methods and properties here
  }

  const moni: MoniStatic;
  export default moni;
}