import "@testing-library/jest-dom";

// Declare global types
declare global {
  var RequestCookies: new (cookieHeader?: string) => {
    get(name: string): { name: string; value: string } | undefined;
    getAll(): Array<{ name: string; value: string }>;
    has(name: string): boolean;
    set(name: string, value: string): void;
    delete(name: string): void;
    toString(): string;
  };
}

// Mock global Request
global.Request = class MockRequest {
  private _url: string;

  constructor(url: string) {
    this._url = url;
  }

  get url(): string {
    return this._url;
  }
} as unknown as typeof Request;

// Mock global Response
global.Response = class MockResponse {
  status: number;
  statusText: string;
  body: ReadableStream | null;
  headers: Headers;

  constructor(body?: string | null, init?: ResponseInit) {
    this.status = init?.status ?? 200;
    this.statusText = init?.statusText ?? "OK";
    this.body = body ? new ReadableStream() : null;
    this.headers = new Headers(init?.headers);
  }

  async json(): Promise<unknown> {
    return JSON.parse(this.body as unknown as string);
  }

  async text(): Promise<string> {
    return this.body as unknown as string;
  }
} as unknown as typeof Response;

// Mock RequestCookies
global.RequestCookies = class MockRequestCookies {
  private cookies: Map<string, string> = new Map();

  constructor(cookieHeader?: string) {
    if (cookieHeader) {
      cookieHeader.split(";").forEach((cookie) => {
        const [name, value] = cookie.trim().split("=");
        if (name && value) {
          this.cookies.set(name, value);
        }
      });
    }
  }

  get(name: string): { name: string; value: string } | undefined {
    const value = this.cookies.get(name);
    return value ? { name, value } : undefined;
  }

  getAll(): Array<{ name: string; value: string }> {
    return Array.from(this.cookies.entries()).map(([name, value]) => ({ name, value }));
  }

  has(name: string): boolean {
    return this.cookies.has(name);
  }

  set(name: string, value: string): void {
    this.cookies.set(name, value);
  }

  delete(name: string): void {
    this.cookies.delete(name);
  }

  toString(): string {
    return Array.from(this.cookies.entries())
      .map(([name, value]) => `${name}=${value}`)
      .join("; ");
  }
} as unknown as typeof RequestCookies;

// Mock window.location
const mockLocation = {
  href: "http://localhost:3000",
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};

// Mock window.location by replacing the entire window object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).window = {
  ...window,
  location: mockLocation,
};
