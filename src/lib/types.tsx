import {
  StickyNote
} from "lucide-react"

export type NoteType = "red" | "blue" | "green" | "yellow" | "purple" | "orange"

export type Note = {
  drawer: number
  id: number
  type: NoteType
  title: string
  content: string
}

export const getNoteIcon = (type: NoteType) => {
  switch (type) {
    case "red": return <StickyNote className="h-4 w-4 text-red-500" />
    case "blue": return <StickyNote className="h-4 w-4 text-blue-500" />
    case "green": return <StickyNote className="h-4 w-4 text-green-500" />
    case "yellow": return <StickyNote className="h-4 w-4 text-yellow-500" />
    case "purple": return <StickyNote className="h-4 w-4 text-purple-500" />
    case "orange": return <StickyNote className="h-4 w-4 text-orange-500" />
    default: return <StickyNote className="h-4 w-4 text-gray-500" />
  }
}

export const noteTypes = [
  { value: "red", label: "", icon: <StickyNote className="mr-2 h-4 w-4 text-red-500" /> },
  { value: "blue", label: "", icon: <StickyNote className="mr-2 h-4 w-4 text-blue-500" /> },
  { value: "green", label: "", icon: <StickyNote className="mr-2 h-4 w-4 text-green-500" /> },
  { value: "yellow", label: "", icon: <StickyNote className="mr-2 h-4 w-4 text-yellow-500" /> },
  { value: "purple", label: "", icon: <StickyNote className="mr-2 h-4 w-4 text-purple-500" /> },
  { value: "orange", label: "", icon: <StickyNote className="mr-2 h-4 w-4 text-orange-500" /> },
]
