"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, User } from "lucide-react";

interface User {
	_id: string;
	username: string;
}

interface UserSelectorProps {
	onUserSelect: (userId: string | null) => void;
}

export function UserSelector({ onUserSelect }: UserSelectorProps) {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadUsers = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/api/v0/dashboard/users");
				if (!response.ok) {
					throw new Error(`Error en la API: ${response.status}`);
				}
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.error("Error loading users:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadUsers();
	}, []);

	useEffect(() => {
		// Cerrar el menú desplegable cuando se hace clic fuera de él
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleUserSelect = (user: User | null) => {
		setSelectedUser(user);
		onUserSelect(user?._id || null);
		setIsOpen(false);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			{/* Botón del dropdown */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				<User className="h-4 w-4" />
				<span>
					{selectedUser
						? selectedUser.username
						: "Todos los usuarios"}
				</span>
				<ChevronDown
					className={`h-4 w-4 opacity-50 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{/* Menú desplegable */}
			{isOpen && (
				<div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
					<div className="py-1">
						<div className="px-4 py-2 text-sm font-medium text-gray-900 border-b border-gray-200">
							Seleccionar Usuario
						</div>

						<button
							className="w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-100"
							onClick={() => handleUserSelect(null)}
						>
							<span>Todos los usuarios</span>
							{!selectedUser && <Check className="h-4 w-4" />}
						</button>

						{isLoading ? (
							<div className="w-full px-4 py-2 text-sm text-gray-500 text-left">
								Cargando usuarios...
							</div>
						) : (
							users.map((user) => (
								<button
									key={user._id}
									className="w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-100"
									onClick={() => handleUserSelect(user)}
								>
									<span>{user.username}</span>
									{selectedUser?._id === user._id && (
										<Check className="h-4 w-4" />
									)}
								</button>
							))
						)}
					</div>
				</div>
			)}
		</div>
	);
}
