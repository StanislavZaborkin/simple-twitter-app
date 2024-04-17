export interface RequestProps {
  method: 'get' | 'post' | 'delete' | 'patch' | 'put';
  url: string;
  body?: unknown;
  token?: string;
  options?: Record<never, never>;
}

export interface Response {
  data: never;
  name: 'AxiosError';
  response: {
    status: number;
    data: {
      details: string;
    };
  };
}

export interface IError {
  response: { status: number };
}

export type OmittedRequestProps = Omit<RequestProps, 'method'>;
