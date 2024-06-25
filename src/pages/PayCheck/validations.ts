import { format } from "date-fns";
import { z } from "zod";

export const validationRegisterPayCheck = z.object({
  descricao: z.string().min(1),
  dt_venc: z.coerce.date().transform((v) => format(v, "yyyy-MM-dd")),
  valor_multa: z.number().positive(),
  juros: z.number().positive(),
});
