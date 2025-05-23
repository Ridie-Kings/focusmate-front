import PremiumMembershipSvg from "../../Svg/BannerMembership/PremiumMembershipSvg";

export default function PremiumMembership() {
  return (
    <>
      <PremiumMembershipSvg />
      <div className="absolute w-full sm:w-3/5 px-8 flex flex-col gap-2 z-50">
        <p className="text-xl text-black">Membresía Premium - Todo en uno</p>
        <p className="text-sm text-gray-400 line-clamp-3">
          Accede a todas las funciones exclusivas: planes de estudio
          personalizados, hábitos ilimitados, estadísticas avanzadas,
          recordatorios inteligentes y más,
        </p>
      </div>
    </>
  );
}
