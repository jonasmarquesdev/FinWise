import Link from "next/link";
import { Button } from "../_components/ui/button";
import { ConstructionIcon } from "lucide-react";

const BuildingPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <ConstructionIcon size={32} />
      <h1 className="text-xl">Em construção</h1>
      <Button variant="outline" asChild className="mt-5 w-[200px]">
        <Link href="/">Voltar</Link>
      </Button>
    </div>
  );
};

export default BuildingPage;
