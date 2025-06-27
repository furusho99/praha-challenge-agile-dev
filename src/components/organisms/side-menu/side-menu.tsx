"use client";

import { signOut } from "@/actions/sign-out";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  isLoggedIn: boolean;
};

export const SideMenu = ({ isLoggedIn }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-64 bg-gray-800 text-white h-auto">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-bold">Menu</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  href="/user/assignments"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  課題一覧
                </Link>
              </li>
                <li>
                    <Link
                    href="/admin/assignments/create"
                    className="block px-4 py-2 hover:bg-gray-700 rounded"
                    >
                    課題登録
                    </Link>
                </li>
              <li>
                <Link
                  href="/admin/team-assignments"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  課題公開申請
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    signOut()
                      .then(() => {
                        router.push("/sign-in");
                        router.refresh();
                      })
                      .catch((error) => {
                        router.push("/error");
                        console.error("Sign out failed:", error);
                      });
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded cursor-pointer"
                >
                  ログアウト
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/sign-in"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  サインイン
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  サインアップ
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
