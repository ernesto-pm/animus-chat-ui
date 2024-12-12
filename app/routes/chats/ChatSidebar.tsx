import {AnimusBetaChat} from "~/services/openapi";
import {Plus} from "lucide-react";
import {useNavigate} from "@remix-run/react";

interface PropTypes {
    chats: Array<AnimusBetaChat>
}

export default function ChatsSidebar(props: PropTypes) {
    const {chats} = props
    const navigate = useNavigate()

    return (
        <div className="w-64 flex flex-col border-r">
            {/* Fixed buttons at top */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between gap-2">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Plus className="w-4 h-4"/>
                        New
                    </button>
                </div>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto">
                <ul className="p-2">
                    {
                        chats.map(
                            (c) => (
                                <li
                                    key={c.id}
                                    className="px-4 py-2 mb-1 rounded-lg hover:bg-slate-700 cursor-pointer"
                                    onClick={() => navigate(`/chats/${c.id}`)}
                                >
                                    {c.name}
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    )
}