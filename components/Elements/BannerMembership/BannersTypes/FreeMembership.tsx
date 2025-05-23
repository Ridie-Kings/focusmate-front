import FreeMembershipSvg from "../../Svg/BannerMembership/FreeMembershipSvg";

export default function FreeMembership() {
  return (
    <>
      <FreeMembershipSvg />
      <div className="absolute w-full sm:w-3/5 px-8 flex flex-col gap-2 z-50">
        <p className="text-xl text-black">Membresía Gratuita</p>
        <p className="text-sm text-gray-400 line-clamp-3">
          Explora lo esencial. Accede a funciones básicas para organizar tus
          hábitos y avanzar a tu ritmo. Ideal para comenzar tu camino sin
          límites.
        </p>
      </div>
    </>
  );
}
