declare module "moni" {
  interface Callbacks {
    loading: () => void;
    failed: (error: any) => void;
    success: (data: any) => void;
    end: () => void;
  }

  class Ajax {
    url: string;
    method: string;
    headers: Record<string, string>;
    data: any;
    callbacks: Callbacks;

    constructor();

    request(url: string): Ajax;
    type(method: string): Ajax;
    header(headers: Record<string, string>): Ajax;
    send(data: any): Ajax;

    loading(callback: () => void): Ajax;
    failed(callback: (error: any) => void): Ajax;
    success(callback: (data: any) => void): Ajax;
    end(callback: () => void): Ajax;

    execute(): Promise<void>;
  }

  interface MoniInstance {
    length: number;

    // Event handling
    on(event: string, callback: (event: Event) => void): MoniInstance;
    off(event: string, callback: (event: Event) => void): MoniInstance;

    // AJAX method
    ajax(): Ajax;

    // Style manipulation
    css(property: string, value?: string): string | MoniInstance;

    // HTML content manipulation
    html(value?: string): string | MoniInstance;

    // Element manipulation
    each(callback: (el: Element, index: number) => void): MoniInstance;
    remove(): MoniInstance;
    attr(name: string, value?: string): string | MoniInstance;
    data(name: string, value?: string): string | MoniInstance;
    add(content: string | MoniInstance, times?: number): MoniInstance;
    addPrevious(content: string | MoniInstance): MoniInstance;
    addBehind(content: string | MoniInstance): MoniInstance;
    siblings(): MoniInstance;
    val(value?: string): string | MoniInstance;
    first(): MoniInstance | null;
    last(): MoniInstance | null;
    at(index: number): MoniInstance | null;
    values(): { [key: string]: any };
    after(html: string): MoniInstance;
    before(html: string): MoniInstance;
    children(): MoniInstance;
    empty(): MoniInstance;
    clone(deep?: boolean): MoniInstance;
    search(query: string | MoniInstance): MoniInstance;
    near(query: string | MoniInstance): MoniInstance;

    // Class manipulation methods
    classes(): ClassMethods;
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
