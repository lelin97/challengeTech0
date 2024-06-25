import { z } from "zod";

export const validationRegisterPayCheck = z.object({
  descricao: z
    .string({
      errorMap: () => ({
        message: "Descrição é um campo obrigatório.",
      }),
    })
    .min(1),
  dt_venc: z.coerce.date(),
  valor_multa: z
    .string({
      errorMap: () => ({
        message: "Valor Multa é um campo obrigatório.",
      }),
    })
    .min(1),
  juros: z
    .string({
      errorMap: () => ({
        message: "Juros é um campo obrigatório.",
      }),
    })
    .min(1),
});

export type DefaultPayCheckInput = z.input<typeof validationRegisterPayCheck>;
export type DefaultPayCheckOutput = z.output<typeof validationRegisterPayCheck>;
