import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import StreaksBg from "@/components/Elements/Svg/StreaksBg";

export default function Streaks({ number }: { number: number }) {

  // const text: {title: string, desc: string} = (number: number) => {
  //   switch (number) {
  //     case:
  //       return {title: "", desc: ""}
  //   }
  // }


  return (
    <TemplateDashboard
      title=""
      grid="text-base items-start text-primary-700 bg-secondary-100"
      link=""
    >
      <div className="w-full">
        <p className=" text-xl font-semibold">Fuego sagrado</p>
        <p className="text-xs">
          Alcanzaste el equilibrio perfecto. Tu hábito ya es parte de vos.
        </p>
      </div>
      <p className="p-2 text-sm bg-secondary-600 z-10 rounded-sm text-white">
        {number} días seguidos
      </p>
      <StreaksBg />
    </TemplateDashboard>
  );
}
