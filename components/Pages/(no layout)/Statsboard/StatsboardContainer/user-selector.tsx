"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Check, User, AlertCircle } from "lucide-react";
import { GetAllUsers } from "@/services/User/GetAllUsers";
import LoadingState from "@/components/Elements/General/LoadingState";
import { useClickOutside } from "@/hooks/useClickOutside";

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
  const [open, setOpen] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() => {
    if (open) setOpen(false);
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { success, res } = await GetAllUsers();

      if (!success) {
        throw new Error(`Error: ${res}`);
      }

      if (!Array.isArray(res)) {
        throw new Error("Formato de datos inválido");
      }

      setUsers(res);
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

  const handleUserSelect = (user: User | null) => {
    setSelectedUser(user);
    onUserSelect(user?._id || null);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const handleRetry = () => {
    loadUsers();
  };

  return (
    <div ref={modalRef}>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <span>{selectedUser ? selectedUser.username : defaultLabel}</span>
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
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
              <div className="w-full px-4 py-2">
                <LoadingState
                  variant="dots"
                  size="sm"
                  text="Cargando usuarios..."
                />
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
