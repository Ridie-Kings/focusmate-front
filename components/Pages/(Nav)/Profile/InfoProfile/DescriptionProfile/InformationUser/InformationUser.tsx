import { useState } from "react";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { Cake, Locate, Mail, PersonStanding, Phone } from "lucide-react";
import { updateProfile } from "@/services/Profile/UpdateProfile";

export default function InformationUser({
  profile,
}: {
  profile: ProfileType | null;
}) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullname: profile?.user?.fullname || "",
    email: profile?.user?.email || "",
    bio: profile?.bio || "",
  });

  const handleDoubleClick = (field: string) => {
    setEditingField(field);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [editingField!]: e.target.value });
  };

  const handleSave = async () => {
    setEditingField(null);
  };

  const userFormatted = [
    {
      icon: <PersonStanding />,
      type: "text",
      title: "Nombre Completo",
      field: "fullname",
      label: formData.fullname,
    },
    {
      icon: <Cake />,
      type: "date",
      title: "Fecha de Nacimiento",
      field: "dob",
      label: null,
    },
    {
      icon: <Mail />,
      type: "email",
      title: "Correo Electrónico",
      field: "email",
      label: formData.email,
    },
    {
      icon: <Phone />,
      type: "tel",
      title: "Número de Teléfono",
      field: "phone",
      label: null,
    },
    {
      icon: <Locate />,
      type: "text",
      title: "Ubicación",
      field: "location",
      label: null,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2">
        {userFormatted.map((item) => (
          <div key={item.title} className="flex gap-4 px-6 py-2">
            {item.icon}
            <div>
              <p>{item.title}</p>
              {editingField === item.field ? (
                <div className="flex items-center gap-2">
                  <input
                    type={item.type}
                    value={formData[item.field as keyof typeof formData] || ""}
                    onChange={handleChange}
                    className="border text-black px-2 py-1 rounded"
                  />
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    ok
                  </button>
                </div>
              ) : (
                <p
                  className="text-sm text-gray-400 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(item.field)}
                >
                  {item.label ?? `Añade tu ${item.title}`}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 px-6 py-2">
        <PersonStanding />
        <div>
          <p>Biografía</p>
          {editingField === "bio" ? (
            <div className="flex items-center gap-2">
              <textarea
                value={formData.bio}
                onChange={handleChange}
                className="bg-gray-800 text-white px-2 py-1 rounded w-full"
              />
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <p
              className="text-sm text-gray-400 cursor-pointer"
              onDoubleClick={() => handleDoubleClick("bio")}
            >
              {formData.bio === "" ? `Añade tu biografía` : formData.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
