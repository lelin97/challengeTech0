export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

export type RetornoDB<T extends any = any> =
  | {
      sucesso: true;
      data: T;
      mensagem?: string | undefined;
    }
  | {
      sucesso: false;
      mensagem: string;
      erro: string;
    };
