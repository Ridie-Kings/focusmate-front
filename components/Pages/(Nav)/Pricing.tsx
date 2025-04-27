import { getMyProfile } from "@/services/Profile/getMyProfile";
import ButtonSend from "./Pricing/ButtonSend";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

export default async function Pricing() {
  const profile = await getMyProfile();

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-6 p-9 text-primary-500 bg-background-primary">
      <p className="text-5xl font-medium z-10 text-center">
        Organizate mejor y alcanza tus metas con sherpapp
      </p>
      <p className="text-3xl z-10">
        Hola, nos has pillado antes de estar listos
      </p>
      <p className="text-center z-10">
        Estamos trabajando a tope para poner los últimos toques a SherpApp. Todo
        va por buen camino y muy pronto estará lista para ayudarte a estudiar
        mejor, organizarte y alcanzar tus objetivos. <br />
        Te avisaremos en cuanto esté disponible. Muchas gracias.
      </p>
      <ButtonSend profile={profile ?? ({} as ProfileType)} />
      <svg
        width="1440"
        height="1024"
        viewBox="0 0 1440 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 bottom-0"
      >
        <g opacity="0.5">
          <path
            d="M712.672 1435.87C1129.47 1434.99 1470.76 1096.41 1474.97 679.635C1479.18 262.862 1144.71 -74.2825 727.916 -73.3972C311.122 -72.5119 -30.1683 266.067 -34.3778 682.841C-38.5873 1099.61 295.878 1436.76 712.672 1435.87Z"
            fill="#B0C8B1"
            fillOpacity="0.05"
          />
          <path
            d="M715.668 1310.07C1063 1309.34 1347.41 1027.19 1350.91 679.876C1354.42 332.565 1075.7 51.6117 728.372 52.3494C381.044 53.0871 96.6346 335.237 93.1267 682.548C89.6188 1029.86 368.34 1310.81 715.668 1310.07Z"
            fill="#B0C8B1"
            fillOpacity="0.15"
          />
          <path
            d="M718.659 1184.28C996.522 1183.69 1224.05 957.97 1226.86 680.121C1229.66 402.272 1006.68 177.51 728.822 178.1C450.959 178.69 223.432 404.41 220.626 682.259C217.819 960.107 440.797 1184.87 718.659 1184.28Z"
            fill="#B0C8B1"
            fillOpacity="0.25"
          />
          <path
            opacity="0.6"
            d="M718.594 1059.2C926.991 1058.76 1097.64 889.466 1099.74 681.079C1101.85 472.692 934.613 304.12 726.216 304.563C517.819 305.006 347.174 474.295 345.069 682.682C342.964 891.069 510.197 1059.64 718.594 1059.2Z"
            fill="#B0C8B1"
            fillOpacity="0.35"
          />
          <path
            d="M720.874 930.338C859.806 930.043 973.569 817.183 974.972 678.258C976.375 539.334 864.887 426.953 725.956 427.248C587.024 427.543 473.261 540.403 471.858 679.327C470.454 818.251 581.943 930.633 720.874 930.338Z"
            fill="#B0C8B1"
            fillOpacity="0.45"
          />
          <path
            d="M720.809 805.255C790.275 805.108 847.156 748.678 847.858 679.216C848.56 609.754 792.815 553.563 723.35 553.71C653.884 553.858 597.002 610.288 596.301 679.75C595.599 749.212 651.343 805.403 720.809 805.255Z"
            fill="#B0C8B1"
          />
        </g>
      </svg>
      <svg
        width="600"
        height="700"
        viewBox="0 0 1440 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -right-0 -top-70"
      >
        <g opacity="0.5">
          <path
            d="M712.672 1435.87C1129.47 1434.99 1470.76 1096.41 1474.97 679.635C1479.18 262.862 1144.71 -74.2825 727.916 -73.3972C311.122 -72.5119 -30.1683 266.067 -34.3778 682.841C-38.5873 1099.61 295.878 1436.76 712.672 1435.87Z"
            fill="#B0C8B1"
            fillOpacity="0.05"
          />
          <path
            d="M715.668 1310.07C1063 1309.34 1347.41 1027.19 1350.91 679.876C1354.42 332.565 1075.7 51.6117 728.372 52.3494C381.044 53.0871 96.6346 335.237 93.1267 682.548C89.6188 1029.86 368.34 1310.81 715.668 1310.07Z"
            fill="#B0C8B1"
            fillOpacity="0.15"
          />
          <path
            d="M718.659 1184.28C996.522 1183.69 1224.05 957.97 1226.86 680.121C1229.66 402.272 1006.68 177.51 728.822 178.1C450.959 178.69 223.432 404.41 220.626 682.259C217.819 960.107 440.797 1184.87 718.659 1184.28Z"
            fill="#B0C8B1"
            fillOpacity="0.25"
          />
          <path
            opacity="0.6"
            d="M718.594 1059.2C926.991 1058.76 1097.64 889.466 1099.74 681.079C1101.85 472.692 934.613 304.12 726.216 304.563C517.819 305.006 347.174 474.295 345.069 682.682C342.964 891.069 510.197 1059.64 718.594 1059.2Z"
            fill="#B0C8B1"
            fillOpacity="0.35"
          />
          <path
            d="M720.874 930.338C859.806 930.043 973.569 817.183 974.972 678.258C976.375 539.334 864.887 426.953 725.956 427.248C587.024 427.543 473.261 540.403 471.858 679.327C470.454 818.251 581.943 930.633 720.874 930.338Z"
            fill="#B0C8B1"
            fillOpacity="0.45"
          />
          <path
            d="M720.809 805.255C790.275 805.108 847.156 748.678 847.858 679.216C848.56 609.754 792.815 553.563 723.35 553.71C653.884 553.858 597.002 610.288 596.301 679.75C595.599 749.212 651.343 805.403 720.809 805.255Z"
            fill="#B0C8B1"
          />
        </g>
      </svg>
    </main>
  );
}
