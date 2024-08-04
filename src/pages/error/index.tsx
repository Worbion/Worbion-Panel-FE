import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const Errorcomponent = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-6">
      <div className="font-medium text-2xl">
        Aradığınız sayfayı bulamadık :/
      </div>
      <Button onClick={() => navigate("/")}>Eve dön</Button>
    </div>
  )
}
