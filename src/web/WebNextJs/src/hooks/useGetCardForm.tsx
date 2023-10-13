import { CardTypes } from "@/types";
import { Control, useController } from "react-hook-form";

export default function useGetCardForm({ control }: { control: Control<CardTypes> }) {
  const { field: number } = useController({
    name: "number",
    control,
  });

  const { field: name } = useController({
    name: "name",
    control,
  });

  const { field: expiry } = useController({
    name: "expiry",
    control,
  });
  const { field: cvc } = useController({
    name: "cvc",
    control,
  });

  return { number, name, expiry, cvc };
}
