import { z } from "zod";

export const validationRegisterPayCheck = z.object({
  id_boleto: z.string().uuid().nullable(),
  descricao: z
    .string({
      errorMap: () => ({
        message: "Descrição é um campo obrigatório.",
      }),
    })
    .min(1),
  dt_venc: z.coerce.date(),
  valor: z
    .string({
      errorMap: () => ({
        message: "Valor inválido. Exemplo: R$250,00",
      }),
    })
    .min(1)
    .pipe(
      z.coerce.number({
        errorMap: () => ({
          message: "Valor inválido. Exemplo: R$250,00",
        }),
      })
    ),
  valor_multa: z
    .string({
      errorMap: () => ({
        message: "Valor inválido. Exemplo: R$250,00",
      }),
    })
    .min(1)
    .pipe(
      z.coerce.number({
        errorMap: () => ({
          message: "Valor inválido. Exemplo: R$250,00",
        }),
      })
    ),
  juros: z
    .string({
      errorMap: () => ({
        message: "Valor inválido. Exemplo: R$250,00",
      }),
    })
    .min(1)
    .pipe(
      z.coerce.number({
        errorMap: () => ({
          message: "Valor inválido. Exemplo: R$250,00",
        }),
      })
    ),
});

export type DefaultPayCheckInput = z.input<typeof validationRegisterPayCheck>;
export type DefaultPayCheckOutput = z.output<typeof validationRegisterPayCheck>;
