import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { AccountContextProvider } from "@/contexts/AccountContext";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Endereço</h3>
        <p className="text-sm text-muted-foreground">Usamos essas informações para enviar o seu pedido.</p>
      </div>
      <Separator />
      <AccountContextProvider>
        <ProfileForm />
      </AccountContextProvider>
    </div>
  );
}
