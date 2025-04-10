import TrialMembershipSvg from "../../Svg/BannerMembership/TrialMembershipSvg";

export default function TrialMembership() {
  return (
    <>
      <TrialMembershipSvg />
      <div className="absolute w-3/4 px-8 flex flex-col gap-2">
        <p className="text-xl text-black">Membresía Premium - Todo en uno</p>
        <p className="text-sm text-gray-400">
          Accedé a todas las funciones exclusivas: planes de estudio
          personalizados, hábitos ilimitados, estadísticas avanzadas,
          recordatorios inteligentes y más,
        </p>
      </div>
    </>
  );
}
