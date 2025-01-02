import Image from "next/image";
import LinkElement from "./Form/LinkElement";
import React from "react";
import { itemsForm } from "@/components/Pages/Auth";
import FormComponent from "./Form/FormComponent";

export default function Form({
  title,
  page,
  itemsForm,
}: {
  title: string;
  page: "Login" | "Register";
  itemsForm: itemsForm[];
}) {
  return (
    <section className="w-[45%] h-full flex flex-col items-center justify-center gap-10">
      {page === "Login" && (
        <Image
          src={"/images/logoLogin.png"}
          width={75}
          height={75}
          alt="logo"
        />
      )}
      <h1 className="text-6xl">{title}</h1>
      <LinkElement page={page} />
      <FormComponent itemsForm={itemsForm} page={page} />
    </section>
  );
}
