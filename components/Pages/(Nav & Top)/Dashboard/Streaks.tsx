import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import StreaksBg1 from "@/components/Elements/Svg/Streaks/StreaksBg1";
import StreaksBg2 from "@/components/Elements/Svg/Streaks/StreaksBg2";
import StreaksBg3 from "@/components/Elements/Svg/Streaks/StreaksBg3";
import StreaksBgMax from "@/components/Elements/Svg/Streaks/StreaksBgMax";
import StreaksNull from "@/components/Elements/Svg/Streaks/StreaksNull";

export default function Streaks({ number }: { number: number }) {
  const text = (): { title: string; desc: string } => {
    switch (number) {
      case 0:
        return {
          title: "Leña húmeda",
          desc: "Todavía no encendiste tu chispa… pero el bosque está lleno de posibilidades.. ",
        };
      default:
        if (number >= 1 && number < 3)
          return {
            title: "Chispa Inicial ",
            desc: "Comenzaste tu recorrido. Una chispa de intención basta para encender algo grande",
          };
        if (number >= 3 && number < 15) {
          return {
            title: "Fuego Encendido ",
            desc: "Se mantiene la fogata viva. La constancia empieza a notarse.",
          };
        }
        if (number >= 15 && number < 30)
          return {
            title: "Guardiana del fuego",
            desc: "Tu fuego no se apaga. Tu marcas el ritmo y tu rutina es mas estable ",
          };
        if (number >= 30)
          return {
            title: "Fuego sagrado",
            desc: "Alcanzaste el equilibrio perfecto. Tu hábito ya es parte de ti.",
          };
        return {
          title: "dasdsa",
          desc: "dasda",
        };
    }
  };

  return (
    <TemplateDashboard
      title=""
      grid={`text-base items-start mx-3 md:mx-0 col-span-2 ${
        number <= 0
          ? "bg-quaternary-700 text-white"
          : "bg-secondary-100 text-primary-700"
      }`}
      link=""
      id="streaks-component"
    >
      <div className="w-full z-20">
        <p className=" text-xl font-semibold">{text().title}</p>
        <p className="text-xs text-secondary-700">{text().desc}</p>
      </div>
      <p className="p-2 text-sm bg-secondary-600 z-10 rounded-sm text-white">
        {number} {number <= 1 ? "día seguido" : "días seguidos"}
      </p>
      {number === 0 ? (
        <StreaksNull />
      ) : number >= 1 && number < 3 ? (
        <StreaksBg1 />
      ) : number >= 3 && number < 15 ? (
        <StreaksBg2 />
      ) : number >= 15 && number < 30 ? (
        <StreaksBg3 />
      ) : (
        number >= 30 && <StreaksBgMax />
      )}
    </TemplateDashboard>
  );
}
