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

  constructor() {
    this.url = '';
    this.method = 'GET';
    this.headers = {};
    this.data = null;
    this.callbacks = {
      loading: () => {},
      failed: () => {},
      success: () => {},
      end: () => {},
    };
  }

  request(url: string) {
    this.url = url;
    return this;
  }

  type(method: string) {
    this.method = method.toUpperCase();
    return this;
  }

  header(headers: Record<string, string>) {
    this.headers = {
      ...this.headers,
      ...headers
    };
    return this;
  }

  send(data: any) {
    if (this.headers['Content-Type'] && this.headers['Content-Type'] === 'application/json') {
      this.data = JSON.stringify(data);
    } else {
      if (!(data instanceof FormData)) {
        const formData = new FormData();
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
          }
        }
        this.data = formData;
      } else {
        this.data = data;
      }
    }
    return this;
  }

  loading(callback: () => void) {
    this.callbacks.loading = callback;
    return this;
  }

  failed(callback: (error: any) => void) {
    this.callbacks.failed = callback;
    return this;
  }

  success(callback: (data: any) => void) {
    this.callbacks.success = callback;
    return this;
  }

  end(callback: () => void) {
    this.callbacks.end = callback;
    return this;
  }

  async execute() {
    const {
      url,
      method,
      headers,
      data,
      callbacks
    } = this;

    callbacks.loading();

    try {
      const options: RequestInit = {
        method,
        headers: {
          ...headers,
        },
        body: data,
      };

      const response = await fetch(url, options);

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      callbacks.success(responseData);
    } catch (error: any) {
      // Detect network issues (like typo in URL) or failed HTTP requests
      if (error.message === 'Failed to fetch') {
        callbacks.failed({
          type: 'Network Error',
          message: 'The request could not reach the server. Please check your URL or internet connection.',
          originalError: error,
        });
      } else {
        // Other fetch-related errors
        callbacks.failed({
          type: 'HTTP Error',
          message: error.message,
          originalError: error,
        });
      }
    } finally {
      callbacks.end();
    }
  }
}

export default function moniAjax() {
  return new Ajax();
}