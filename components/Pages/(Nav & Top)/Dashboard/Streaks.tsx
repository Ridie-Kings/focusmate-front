import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import StreaksBg from "@/components/Elements/Svg/StreaksBg";

export default function Streaks({ number }: { number: number }) {
  
  const text = (): { title: string; desc: string } => {
    switch (number) {
      case 0:
        return {
          title: "Leña húmeda",
          desc: "Todavía no encendiste tu chispa… pero el bosque está lleno de posibilidades.. ",
        };
      case 1:
        return {
          title: "Chispa Inicial ",
          desc: "Comenzaste tu recorrido. Una chispa de intención basta para encender algo grande",
        };
      default:
        if (number > 1 && number <= 3) {
          return {
            title: "Fuego Encendido ",
            desc: "Se mantiene la fogata viva. La constancia empieza a notarse.",
          };
        }
        if (number > 3 && number <= 15)
          return {
            title: "Guardiana del fuego",
            desc: "Tu fuego no se apaga. Tu marcas el ritmo y tu rutina es mas estable ",
          };
        if (number > 30)
          return {
            title: "Fuego sagrado",
            desc: "Alcanzaste el equilibrio perfecto. Tu hábito ya es parte de vos.",
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
      grid="text-base items-start text-primary-700 bg-secondary-100"
      link=""
    >
      <div className="w-full">
        <p className=" text-xl font-semibold">{text().title}</p>
        <p className="text-xs">{text().desc}</p>
      </div>
      <p className="p-2 text-sm bg-secondary-600 z-10 rounded-sm text-white">
        {number} días seguidos
      </p>
      <StreaksBg />
    </TemplateDashboard>
  );
}
