import { Separator } from "@/components/ui/separator"
import { TransferForm } from "./TransferForm"

export default function TransferPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Transfer</h3>
        <p className="text-sm text-muted-foreground">
          Configure your transfer settings.
        </p>
      </div>
        <Separator />
        <TransferForm />
    </div>
  )
}