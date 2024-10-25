import Projects from "@/components/Projects/Projects";
import { projects } from "@/data/globalData";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects | Yash Raj Portfolio",
  description: "Generated by create next app",
};

const page = () => {
  return (
    <div className="w-full h-full py-10">
      <h2 className="w-11/12 mx-auto pb-2 text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Projects portfolio
      </h2>
      <div>
        <Projects projects={projects} />
      </div>
    </div>
  );
};

export default page;