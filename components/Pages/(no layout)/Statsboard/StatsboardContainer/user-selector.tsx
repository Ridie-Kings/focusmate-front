"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Check, ChevronDown, User, AlertCircle } from "lucide-react";
import { GetAllUsers } from "@/services/User/GetAllUsers";

interface User {
  _id: string;
  username: string;
}

interface UserSelectorProps {
  onUserSelect: (userId: string | null) => void;
  apiUrl?: string;
  defaultLabel?: string;
}

export function UserSelector({
  onUserSelect,
  apiUrl = "https://sherp-app.com/api/v0/users",
  defaultLabel = "Todos los usuarios",
}: UserSelectorProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { success, data } = await GetAllUsers();

      if (!success) {
        throw new Error(`Error: ${data}`);
      }

      if (!Array.isArray(data)) {
        throw new Error("Formato de datos inválido");
      }

      setUsers(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case "Tab":
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleUserSelect = (user: User | null) => {
    setSelectedUser(user);
    onUserSelect(user?._id || null);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRetry = () => {
    loadUsers();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Seleccionar usuario"
        type="button"
      >
        <User className="h-4 w-4" aria-hidden="true" />
        <span className="truncate max-w-[150px]">
          {selectedUser ? selectedUser.username : defaultLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 opacity-50 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 max-h-60 overflow-auto"
          role="listbox"
          aria-label="Lista de usuarios"
        >
          <div className="py-1">
            <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b border-gray-200">
              Seleccionar Usuario
            </div>

            <button
              className="w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              onClick={() => handleUserSelect(null)}
              role="option"
              aria-selected={selectedUser === null}
              tabIndex={0}
            >
              <span>{defaultLabel}</span>
              {!selectedUser && (
                <Check className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            {isLoading && (
              <div className="w-full px-4 py-2 text-sm text-gray-500 text-left flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full" />
                <span>Cargando usuarios...</span>
              </div>
            )}

            {error && (
              <div className="p-4">
                <div className="bg-red-50 p-2 rounded text-sm text-red-800 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Error al cargar usuarios</span>
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                    onClick={handleRetry}
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            )}

            {!isLoading && !error && users.length === 0 && (
              <div className="w-full px-4 py-2 text-sm text-gray-500 text-left">
                No hay usuarios disponibles
              </div>
            )}

            {!isLoading && !error && users.length > 0 && (
              <div className="max-h-48 overflow-y-auto">
                {users.map((user) => (
                  <button
                    key={user._id}
                    className="w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    onClick={() => handleUserSelect(user)}
                    role="option"
                    aria-selected={selectedUser?._id === user._id}
                    tabIndex={0}
                  >
                    <span className="truncate">{user.username}</span>
                    {selectedUser?._id === user._id && (
                      <Check
                        className="h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
