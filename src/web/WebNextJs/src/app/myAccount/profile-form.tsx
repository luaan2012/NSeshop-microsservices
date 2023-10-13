"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button, Input } from "@/components";
import { cn } from "@/utils";
import { brazilianStates } from "@/constants";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "react";
import { AccountContext } from "@/contexts/AccountContext";
import { Address } from "@/types";

const profileFormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  publicPlace: z
  .string({
    required_error: "Informe o endereço.",
  }),
  neighborhood: z
  .string({
    required_error: "Informe o bairro.",
  }),
  complement: z
  .string({
    required_error: "Informe o complemento.",
  }),
  cep: z
  .string({
    required_error: "Informe o cep.",
  }),
  number: z
  .string({
    required_error: "Informe o número.",
  }),
  city: z
  .string({
    required_error: "Informe a cidade.",
  }),
  state: z
  .string({
    required_error: "Selecione um estado.",
  })
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API

export function ProfileForm() {
  const {address, getAddressApi, data, addAddressApi, updateAddressApi} = useContext(AccountContext)

  useEffect(() => {
    if(data && Object.keys(address).length === 0) getAddressApi()

  }, [data] )

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),    
    mode: "onChange",
  });

  useEffect(() => {
    form.setValue('cep', address.cep || ''); 
    form.setValue('email', data?.user.email || ''); 
    form.setValue('publicPlace', address.publicPlace || ''); 
    form.setValue('neighborhood', address.neighborhood || ''); 
    form.setValue('complement', address.complement || ''); 
    form.setValue('number', address.number || ''); 
    form.setValue('city', address.city || ''); 
    form.setValue('state', address.state || ''); 
  }, [address]);

  function onSubmit(data: ProfileFormValues) {
    
    if(Object.keys(address).length !== 0)
      updateAddressApi({...address, ...data})
    else
      addAddressApi(data as Address) 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publicPlace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Av Paulista" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input placeholder="Complemento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cep</FormLabel>
              <FormControl>
                <Input placeholder="Cep" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input placeholder="Número" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>UF</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}>
                      {field.value ? brazilianStates.find((value) => value.value === field.value)?.label : "Selecione UF"}
                      {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Procurar..." />
                    <CommandEmpty>Nenhum UF encontrada.</CommandEmpty>
                    <CommandGroup>
                      {brazilianStates.map((value, key) => (
                        <CommandItem
                          value={value.label}
                          key={value.value}
                          onSelect={() => {
                            form.setValue("state", value.value);
                          }}
                        >
                          <CheckIcon className={cn("mr-2 h-4 w-4", value.value === field.value ? "opacity-100" : "opacity-0")} />
                          {value.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Atualizar perfil</Button>
      </form>
    </Form>
  );
}
