"use client";

import { useEffect, useState } from "react";
import { Trophy, Flame, Crown } from "lucide-react";
import { GetGlobalInfo } from "@/services/MyStats/GetGlobalInfo";
import LoadingState from "@/components/Elements/General/LoadingState";

interface UserStreak {
  id: string;
  username: string;
  completedTasks: number;
}

export default function StreaksRanking() {
  const [topUsers, setTopUsers] = useState<UserStreak[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await GetGlobalInfo();

        if (response.success) {
          const sortedUsers = response.data.topUsers
            .map(
              (
                user: { username: string; completedTasks: number },
                index: number
              ) => ({
                id: index,
                username: user.username,
                completedTasks: user.completedTasks || 0,
              })
            )
            .sort(
              (a: UserStreak, b: UserStreak) =>
                b.completedTasks - a.completedTasks
            )
            .slice(0, 10);
          setTopUsers(sortedUsers);
        }
      } catch (error) {
        console.error("Error fetching top users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-2xl font-bold text-secondary-600">
            Los guardianes del fuego más constantes
          </p>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : (
          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <div
                key={user.id}
                className={`relative flex items-center p-4 rounded-xl transition-all duration-300 ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                    : index === 1
                    ? "bg-gradient-to-r from-gray-300 to-gray-400 text-white"
                    : index === 2
                    ? "bg-gradient-to-r from-amber-600 to-amber-800 text-white"
                    : "bg-white hover:bg-secondary-50"
                }`}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    {index === 0 ? (
                      <Crown className="w-8 h-8 text-yellow-200" />
                    ) : index === 1 ? (
                      <Trophy className="w-8 h-8 text-gray-200" />
                    ) : index === 2 ? (
                      <Flame className="w-8 h-8 text-amber-200" />
                    ) : (
                      <span className="text-xl font-bold text-secondary-600">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-200 flex items-center justify-center">
                        <span className="text-lg font-semibold text-secondary-600">
                          {user.username.charAt(0)}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-semibold">{user.username}</h3>
                        <p className="text-sm opacity-80">
                          {user.completedTasks}{" "}
                          {user.completedTasks === 1 ? "día" : "días"} seguidos
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-bold">{user.completedTasks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
