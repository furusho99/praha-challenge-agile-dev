"use client";

import Link from "next/link";

export const SideMenu = () => {
    return (
        <div className="flex flex-col h-full w-64 bg-gray-800 text-white h-auto">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <h1 className="text-xl font-bold">Menu</h1>
        </div>
        <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-4">
            <li>
                <Link href="/user/assignments" className="block px-4 py-2 hover:bg-gray-700 rounded">
                課題一覧
                </Link>
            </li>            
            <li>
                <Link href="/admin/team-assignments" className="block px-4 py-2 hover:bg-gray-700 rounded">
                課題公開申請
                </Link>
            </li>
            <li>
                <button
                onClick={() => {
                    // ログアウト処理をここに追加
                    // 例えば、セッションをクリアするなど
                    console.log("ログアウト処理を実行");
                }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded cursor-pointer"
                >
                ログアウト
                </button>
            </li>
            </ul>
        </nav>
        </div>
    );
}