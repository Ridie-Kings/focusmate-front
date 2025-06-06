"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Cake, Locate, Mail, PersonStanding, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useProfile, useProfileStore } from "@/stores/profileStore";

type FormData = {
  fullname: string;
  email: string;
  bio: string;
  birthDate: Date | null;
  phoneNumber: number | null;
};

type Message = {
  text: string;
  type: "success" | "error";
};

type UserField = {
  icon: React.ReactNode;
  type: string;
  title: string;
  field: keyof FormData;
};

const userFields: UserField[] = [
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

const EditableField = ({
  value,
  type,
  onSave,
  onCancel,
  onChange,
}: {
  value: string | number | Date | null;
  type: string;
  onSave: () => void;
  onCancel: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  const t = useTranslations("Common");
  const displayValue =
    value instanceof Date
      ? value.toISOString().split("T")[0]
      : String(value || "");

  return (
    <div className="flex items-center gap-2">
      <input
        type={type}
        value={displayValue}
        onChange={onChange}
        className="border text-black px-2 py-1 rounded"
      />
      <button
        onClick={onSave}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        {t("save")}
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white px-2 py-1 rounded"
      >
        {t("cancel")}
      </button>
    </div>
  );
};

const BioField = ({
  value,
  onSave,
  onCancel,
  onChange,
}: {
  value: string;
  onSave: () => void;
  onCancel: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  const t = useTranslations("Common");

  return (
    <div className="flex items-center gap-2">
      <textarea
        value={value}
        onChange={onChange}
        className="bg-gray-800 text-white px-2 py-1 rounded w-full"
      />
      <button
        onClick={onSave}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        {t("save")}
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white px-2 py-1 rounded"
      >
        {t("cancel")}
      </button>
    </div>
  );
};

export default function InformationUser() {
  const profile = useProfile();
  const { updateProfile, updateUser } = useProfileStore(
    (state) => state.actions
  );
  const [editingField, setEditingField] = useState<keyof FormData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    bio: "",
    birthDate: null,
    phoneNumber: null,
  });
  const [message, setMessage] = useState<Message | null>(null);

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

  const handleDoubleClick = (field: keyof FormData) => {
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

    setFormData((prev) => ({ ...prev, [editingField]: value }));
  };

  const handleSave = async () => {
    if (!profile || !editingField) return;

    try {
      const value = formData[editingField];
      const isUserField = [
        "fullname",
        "email",
        "birthDate",
        "phoneNumber",
      ].includes(editingField);

      const response = isUserField
        ? await updateUser({ [editingField]: value })
        : await updateProfile({ bio: value as string });

      if (response?.success) {
        setMessage({
          text: response.message,
          type: "success",
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ text: response.message, type: "error" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: err as string, type: "error" });
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
        [editingField]: originalValues[editingField],
      }));
    }
    setEditingField(null);
  };

  return (
    <div className="flex flex-col">
      <div className="grid sm:grid-cols-2">
        {userFields.map(({ icon, type, title, field }) => (
          <div key={field} className="flex gap-4 sm:px-6 py-2">
            {icon}
            <div>
              <p>{title}</p>
              {editingField === field ? (
                <EditableField
                  value={formData[field]}
                  type={type}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onChange={handleChange}
                />
              ) : (
                <p
                  className="text-sm text-gray-400 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(field)}
                >
                  {String(formData[field] || `Añade tu ${title.toLowerCase()}`)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 sm:px-6 py-2">
        <Locate />
        <div>
          <p>Biografía</p>
          {editingField === "bio" ? (
            <BioField
              value={formData.bio}
              onSave={handleSave}
              onCancel={handleCancel}
              onChange={handleChange}
            />
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
