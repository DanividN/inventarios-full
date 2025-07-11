import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import OrgChartComponent from "./OrgChartComponent"


type OrgData = {
  name: string
  children?: OrgData[]
}

type ModalOrgProps = {
  isOpen: boolean
  close: () => void
  orgData: OrgData
}

const ModalOrg: React.FC<ModalOrgProps> = ({ isOpen, close, orgData }) => {
  return (
    <Dialog open={isOpen} as="div" className="relative focus:outline-none z-9999" onClose={close}>
      <div className="fixed inset-0 z-10 w-screen overflow-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="max-w-6xl w-full max-h-[90vh] overflow-auto rounded-xl bg-gray-100 shadow-md p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-bold text-black text-center">
              Organigrama
            </DialogTitle>

            <div className="max-h-[70vh] overflow-auto">
              <OrgChartComponent orgData={orgData} />
            </div>

            <div className="mt-4">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-green-dark py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-dark/80 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={close}
              >
                Cerrar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ModalOrg
