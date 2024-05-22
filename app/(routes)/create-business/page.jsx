"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/services/firebase";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

const CreateBusiness = () => {
  const [businessName, setBusinessName] = useState();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const onCreateBusiness = async () => {
    await setDoc(doc(db, "Business", user.uid), {
      businessName: businessName.replace(" ", "_"),
      email: user.email,
      userName: user.displayName,
    }).then((_) => {
      toast.success("New Business Created!");
      router.replace("/dashboard");
    });
  };

  return (
    <div className="p-14 items-center flex flex-col gap-20 my-10">
      <Image src="/logo.svg" width={200} height={200} />
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">
          What should we call your business?
        </h2>
        <p className="text-slate-500">
          You can always change this later from settings
        </p>
        <div className="w-full">
          <label className="text-slate-400">Team Name</label>
          <Input
            placeholder="Ex. My Business"
            className="mt-2"
            onChange={(event) => setBusinessName(event.target.value)}
          />
        </div>
        <Button
          className="w-full"
          disabled={!businessName}
          onClick={onCreateBusiness}
        >
          Create Business
        </Button>
      </div>
    </div>
  );
};

export default CreateBusiness;
