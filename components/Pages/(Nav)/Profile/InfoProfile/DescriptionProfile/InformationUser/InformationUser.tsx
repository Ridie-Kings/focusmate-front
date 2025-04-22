import { useEffect, useState } from "react";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { Cake, Locate, Mail, PersonStanding, Phone } from "lucide-react";
import { updateProfile } from "@/services/Profile/UpdateProfile";
import { UpdateUser } from "@/services/User/UpdateUser";

export default function InformationUser({
  profile,
}: {
  profile: ProfileType | null;
}) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    bio: "",
    birthDate: null as Date | null,
    phoneNumber: null as number | null,
  });
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.user.fullname || "",
        email: profile.user.email || "",
        bio: profile.bio || "",
        birthDate: profile.user.birthDate
          ? new Date(profile.user.birthDate)
          : null,
        phoneNumber: profile.user.phoneNumber || null,
      });
    }
  }, [profile]);

  const handleDoubleClick = (field: string) => {
    setEditingField(field);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editingField) return;

    const value =
      editingField === "phoneNumber"
        ? parseInt(e.target.value) || null
        : editingField === "birthDate"
        ? new Date(e.target.value)
        : e.target.value;

    setFormData({ ...formData, [editingField]: value });
  };

  const handleSave = async () => {
    if (!profile || !editingField) return;

    try {
      let response;
      const value = formData[editingField as keyof typeof formData];

      const isUserField = [
        "fullname",
        "email",
        "birthDate",
        "phoneNumber",
      ].includes(editingField);

      if (isUserField) {
        response = await UpdateUser({
          id: profile.user._id,
          user: { [editingField]: value },
        });
      } else if (editingField === "bio") {
        response = await updateProfile({
          id: profile._id,
          profile: { bio: value },
        });
      }

      if (response?.success) {
        setMessage({
          text: "Perfil actualizado correctamente",
          type: "success",
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ text: response?.data, type: "error" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Error al actualizar el perfil", type: "error" });
    } finally {
      setEditingField(null);
    }
  };

  const handleCancel = () => {
    if (profile && editingField) {
      const originalValues = {
        fullname: profile.user.fullname || "",
        email: profile.user.email || "",
        bio: profile.bio || "",
        birthDate: profile.user.birthDate
          ? new Date(profile.user.birthDate)
          : null,
        phoneNumber: profile.user.phoneNumber || null,
      };

      setFormData((prev) => ({
        ...prev,
        [editingField]:
          originalValues[editingField as keyof typeof originalValues],
      }));
    }
    setEditingField(null);
  };

  const userFields = [
    {
      icon: <PersonStanding />,
      type: "text",
      title: "Nombre Completo",
      field: "fullname",
    },
    {
      icon: <Cake />,
      type: "date",
      title: "Fecha de Nacimiento",
      field: "birthDate",
    },
    {
      icon: <Mail />,
      type: "email",
      title: "Correo Electrónico",
      field: "email",
    },
    {
      icon: <Phone />,
      type: "tel",
      title: "Número de Teléfono",
      field: "phoneNumber",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2">
        {userFields.map(({ icon, type, title, field }) => {
          const value = formData[field as keyof typeof formData];

          const displayValue =
            value instanceof Date
              ? value.toISOString().split("T")[0]
              : value || "";

          return (
            <div key={field} className="flex gap-4 px-6 py-2">
              {icon}
              <div>
                <p>{title}</p>
                {editingField === field ? (
                  <div className="flex items-center gap-2">
                    <input
                      type={type}
                      value={displayValue}
                      onChange={handleChange}
                      className="border text-black px-2 py-1 rounded"
                    />
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <p
                    className="text-sm text-gray-400 cursor-pointer"
                    onDoubleClick={() => handleDoubleClick(field)}
                  >
                    {displayValue || `Añade tu ${title.toLowerCase()}`}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 px-6 py-2">
        <Locate />
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
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-2 py-1 rounded"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <p
              className="text-sm text-gray-400 cursor-pointer"
              onDoubleClick={() => handleDoubleClick("bio")}
            >
              {formData.bio || "Añade tu biografía"}
            </p>
          )}
        </div>
      </div>

      {message && (
        <div
          className={`px-4 py-2 mt-4 rounded ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white text-center`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
